"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { BookingStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, requireAdmin } from "@/lib/auth";
import { clearRateLimit, rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";
import { linesToArray, slugify } from "@/lib/utils";
import { settingFields, type ExamPaper } from "@/lib/defaults";
import type { FormState } from "@/lib/validation";

const DUMMY_HASH = "$2b$12$RbSeotlqkZs4rFdjxUeqp.8xXbI9aX1ehBBwUuQCV0gVvXEmPMGrS";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const bool = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";
const int = (fd: FormData, k: string, d = 0) => { const n = parseInt(str(fd, k), 10); return Number.isFinite(n) ? n : d; };

function revalidateSite() {
  revalidatePath("/", "layout");
}

/* ---------------- Auth ---------------- */

export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email").toLowerCase();
  const password = str(fd, "password");
  const ip = await clientIp();
  const key = `login:${ip}`;
  const rl = rateLimit(key, 5, 15 * 60 * 1000);
  if (!rl.ok) return { ok: false, message: `Too many attempts. Try again in ${Math.ceil(rl.retryAfter / 60)} minutes.` };
  if (!email || !password) return { ok: false, message: "Enter your email and password." };

  let admin;
  try {
    admin = await prisma.adminUser.findUnique({ where: { email } });
  } catch {
    return { ok: false, message: "Database is not reachable. Check DATABASE_URL." };
  }
  // Compare against a dummy hash when the user doesn't exist to keep timing similar.
  const valid = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
  if (!admin || !valid) return { ok: false, message: "Invalid email or password." };

  clearRateLimit(key);
  await prisma.adminUser.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });
  await createSession(admin);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------------- Bookings ---------------- */

export async function updateBooking(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const status = str(fd, "status") as BookingStatus;
  if (!Object.values(BookingStatus).includes(status)) return;
  await prisma.demoBooking.update({ where: { id }, data: { status, adminNotes: str(fd, "adminNotes") || null } });
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

export async function deleteBooking(fd: FormData) {
  await requireAdmin();
  await prisma.demoBooking.delete({ where: { id: str(fd, "id") } });
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

/* ---------------- Reviews ---------------- */

export async function setReviewFlags(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const data: Prisma.ReviewUpdateInput = {};
  if (fd.has("approved")) data.approved = str(fd, "approved") === "true";
  if (fd.has("featured")) data.featured = str(fd, "featured") === "true";
  await prisma.review.update({ where: { id }, data });
  revalidatePath("/admin/reviews");
  revalidateSite();
}

export async function deleteReview(fd: FormData) {
  await requireAdmin();
  await prisma.review.delete({ where: { id: str(fd, "id") } });
  revalidatePath("/admin/reviews");
  revalidateSite();
}

const adminReviewSchema = z.object({
  name: z.string().min(2).max(80),
  role: z.string().max(80).optional(),
  country: z.string().max(60).optional(),
  curriculum: z.string().max(80).optional(),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(5).max(1500),
});

export async function saveReview(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const parsed = adminReviewSchema.parse({
    name: str(fd, "name"),
    role: str(fd, "role") || undefined,
    country: str(fd, "country") || undefined,
    curriculum: str(fd, "curriculum") || undefined,
    rating: int(fd, "rating", 5),
    content: str(fd, "content"),
  });
  const data = { ...parsed, approved: bool(fd, "approved"), featured: bool(fd, "featured") };
  if (id) await prisma.review.update({ where: { id }, data });
  else await prisma.review.create({ data });
  revalidatePath("/admin/reviews");
  revalidateSite();
  redirect("/admin/reviews");
}

/* ---------------- Curricula ---------------- */

function parseExam(input: string): ExamPaper[] | null {
  // One paper per line: Name | Duration | Marks | Weight | Note(optional)
  const rows = linesToArray(input).map((l) => l.split("|").map((p) => p.trim()));
  const papers = rows.filter((r) => r[0]).map(([name, duration = "", marks = "", weight = "", note]) => ({ name, duration, marks, weight, ...(note ? { note } : {}) }));
  return papers.length ? papers : null;
}

export async function saveCurriculum(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const slug = slugify(str(fd, "slug") || title);
  if (!title || !slug) return { ok: false, message: "Title is required." };
  const required = ["shortTitle", "board", "level", "yearRange", "tagline", "summary", "description"];
  const missing = required.filter((k) => !str(fd, k));
  if (missing.length) return { ok: false, message: `Please fill in: ${missing.join(", ")}` };

  const exam = parseExam(str(fd, "examStructure"));
  const data = {
    slug,
    title,
    shortTitle: str(fd, "shortTitle"),
    code: str(fd, "code") || null,
    board: str(fd, "board"),
    level: str(fd, "level"),
    yearRange: str(fd, "yearRange"),
    tagline: str(fd, "tagline").slice(0, 255),
    summary: str(fd, "summary"),
    description: str(fd, "description"),
    topics: linesToArray(str(fd, "topics")),
    highlights: linesToArray(str(fd, "highlights")),
    examStructure: exam ?? Prisma.JsonNull,
    accent: str(fd, "accent") || "teal",
    featured: bool(fd, "featured"),
    published: bool(fd, "published"),
    sortOrder: int(fd, "sortOrder"),
    seoTitle: str(fd, "seoTitle") || null,
    seoDescription: str(fd, "seoDescription").slice(0, 320) || null,
  };
  try {
    if (id) await prisma.curriculum.update({ where: { id }, data });
    else await prisma.curriculum.create({ data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { ok: false, message: "That URL slug is already used by another curriculum." };
    }
    throw e;
  }
  revalidateSite();
  redirect("/admin/curricula");
}

export async function toggleCurriculum(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const field = str(fd, "field");
  if (field !== "published" && field !== "featured") return;
  await prisma.curriculum.update({ where: { id }, data: { [field]: str(fd, "value") === "true" } });
  revalidatePath("/admin/curricula");
  revalidateSite();
}

export async function deleteCurriculum(fd: FormData) {
  await requireAdmin();
  await prisma.curriculum.delete({ where: { id: str(fd, "id") } });
  revalidatePath("/admin/curricula");
  revalidateSite();
}

/* ---------------- FAQs ---------------- */

export async function saveFaq(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const data = {
    question: str(fd, "question").slice(0, 500),
    answer: str(fd, "answer"),
    category: str(fd, "category") || "General",
    sortOrder: int(fd, "sortOrder"),
    published: bool(fd, "published"),
  };
  if (!data.question || !data.answer) return;
  if (id) await prisma.faq.update({ where: { id }, data });
  else await prisma.faq.create({ data });
  revalidatePath("/admin/faqs");
  revalidateSite();
}

export async function deleteFaq(fd: FormData) {
  await requireAdmin();
  await prisma.faq.delete({ where: { id: str(fd, "id") } });
  revalidatePath("/admin/faqs");
  revalidateSite();
}

/* ---------------- Services ---------------- */

export async function saveService(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const data = {
    title: str(fd, "title"),
    description: str(fd, "description"),
    icon: str(fd, "icon") || "Sparkles",
    sortOrder: int(fd, "sortOrder"),
    published: bool(fd, "published"),
  };
  if (!data.title || !data.description) return;
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  revalidatePath("/admin/services");
  revalidateSite();
}

export async function deleteService(fd: FormData) {
  await requireAdmin();
  await prisma.service.delete({ where: { id: str(fd, "id") } });
  revalidatePath("/admin/services");
  revalidateSite();
}

/* ---------------- Settings ---------------- */

export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const whatsapp = str(fd, "whatsappNumber").replace(/\D/g, "");
  await prisma.$transaction(
    settingFields.map((f) => {
      const value = f.key === "whatsappNumber" ? whatsapp : str(fd, f.key);
      return prisma.siteSetting.upsert({ where: { key: f.key }, update: { value }, create: { key: f.key, value } });
    }),
  );
  revalidateSite();
  return { ok: true, message: "Settings saved. The website has been updated." };
}

/* ---------------- Account ---------------- */

export async function changePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const current = str(fd, "current");
  const next = str(fd, "next");
  if (next.length < 10) return { ok: false, message: "New password must be at least 10 characters." };
  if (next !== str(fd, "confirm")) return { ok: false, message: "New passwords do not match." };
  const admin = await prisma.adminUser.findUniqueOrThrow({ where: { id: me.id } });
  if (!(await bcrypt.compare(current, admin.passwordHash))) return { ok: false, message: "Current password is incorrect." };
  await prisma.adminUser.update({ where: { id: me.id }, data: { passwordHash: await bcrypt.hash(next, 12) } });
  return { ok: true, message: "Password updated." };
}

export async function addAdmin(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const email = str(fd, "email").toLowerCase();
  const name = str(fd, "name");
  const password = str(fd, "password");
  if (!z.string().email().safeParse(email).success) return { ok: false, message: "Enter a valid email." };
  if (!name) return { ok: false, message: "Enter a name." };
  if (password.length < 10) return { ok: false, message: "Password must be at least 10 characters." };
  try {
    await prisma.adminUser.create({ data: { email, name, passwordHash: await bcrypt.hash(password, 12) } });
  } catch {
    return { ok: false, message: "An admin with that email already exists." };
  }
  revalidatePath("/admin/account");
  return { ok: true, message: `Admin ${email} added.` };
}

export async function deleteAdmin(fd: FormData) {
  const me = await requireAdmin();
  const id = str(fd, "id");
  if (id === me.id) return;
  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/account");
}
