"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { BOOKING_STATUSES, first, newId, now, run, db, type BookingStatus } from "@/lib/db";
import { createSession, destroySession, hashPassword, requireAdmin, safeEqual, verifyPassword } from "@/lib/auth";
import { clearRateLimit, rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";
import { linesToArray, slugify } from "@/lib/utils";
import { settingFields, type ExamPaper } from "@/lib/defaults";
import type { FormState } from "@/lib/validation";

// A real PBKDF2 hash of a random string, compared against when the email is unknown so timing stays similar.
const DUMMY_HASH = "pbkdf2:100000:5f0c3b7e2a9d4c1e8b6a7f2d3c4e5a6b:0f9e8d7c6b5a49382716f5e4d3c2b1a00f9e8d7c6b5a49382716f5e4d3c2b1a0";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const bool = (fd: FormData, k: string) => (fd.get(k) === "on" || fd.get(k) === "true" ? 1 : 0);
const int = (fd: FormData, k: string, d = 0) => { const n = parseInt(str(fd, k), 10); return Number.isFinite(n) ? n : d; };
const orNull = (v: string) => v || null;

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

  type AdminRow = { id: string; password_hash: string };
  let admin: AdminRow | null;
  let adminCount = 1;
  try {
    admin = await first<AdminRow>("SELECT id, password_hash FROM admin_users WHERE email = ?", email);
    if (!admin) adminCount = (await first<{ n: number }>("SELECT COUNT(*) AS n FROM admin_users"))?.n ?? 0;
  } catch {
    return { ok: false, message: "Database is not reachable. Check the D1 binding and run the migrations." };
  }

  // First-time setup: no admins yet → the ADMIN_EMAIL / ADMIN_PASSWORD secrets create the first admin.
  if (!admin && adminCount === 0) {
    const envEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase().trim();
    const envPassword = process.env.ADMIN_PASSWORD ?? "";
    if (!envEmail || envPassword.length < 10) {
      return { ok: false, message: "No admin exists yet. Set the ADMIN_EMAIL and ADMIN_PASSWORD (10+ characters) secrets in Cloudflare, then sign in with them." };
    }
    if (!safeEqual(email, envEmail) || !safeEqual(password, envPassword)) return { ok: false, message: "Invalid email or password." };
    const id = newId("adm");
    await run("INSERT INTO admin_users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)", id, email, "Admin", await hashPassword(password), now());
    admin = { id, password_hash: "" };
  } else {
    const valid = await verifyPassword(password, admin?.password_hash ?? DUMMY_HASH);
    if (!admin || !valid) return { ok: false, message: "Invalid email or password." };
  }

  clearRateLimit(key);
  await run("UPDATE admin_users SET last_login_at = ? WHERE id = ?", now(), admin.id);
  await createSession(admin.id);
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
  if (!BOOKING_STATUSES.includes(status)) return;
  await run("UPDATE demo_bookings SET status = ?, admin_notes = ?, updated_at = ? WHERE id = ?", status, orNull(str(fd, "adminNotes")), now(), id);
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

export async function deleteBooking(fd: FormData) {
  await requireAdmin();
  await run("DELETE FROM demo_bookings WHERE id = ?", str(fd, "id"));
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

/* ---------------- Reviews ---------------- */

export async function setReviewFlags(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  if (fd.has("approved")) await run("UPDATE reviews SET approved = ?, updated_at = ? WHERE id = ?", bool(fd, "approved"), now(), id);
  if (fd.has("featured")) await run("UPDATE reviews SET featured = ?, updated_at = ? WHERE id = ?", bool(fd, "featured"), now(), id);
  revalidatePath("/admin/reviews");
  revalidateSite();
}

export async function deleteReview(fd: FormData) {
  await requireAdmin();
  await run("DELETE FROM reviews WHERE id = ?", str(fd, "id"));
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
  const vals = [parsed.name, parsed.role ?? null, parsed.country ?? null, parsed.curriculum ?? null, parsed.rating, parsed.content, bool(fd, "approved"), bool(fd, "featured")];
  if (id) {
    await run("UPDATE reviews SET name = ?, role = ?, country = ?, curriculum = ?, rating = ?, content = ?, approved = ?, featured = ?, updated_at = ? WHERE id = ?", ...vals, now(), id);
  } else {
    await run("INSERT INTO reviews (name, role, country, curriculum, rating, content, approved, featured, id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ...vals, newId("rev"), now(), now());
  }
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
  const d = {
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
    topics: JSON.stringify(linesToArray(str(fd, "topics"))),
    highlights: JSON.stringify(linesToArray(str(fd, "highlights"))),
    examStructure: exam ? JSON.stringify(exam) : null,
    accent: str(fd, "accent") || "teal",
    featured: bool(fd, "featured"),
    published: bool(fd, "published"),
    sortOrder: int(fd, "sortOrder"),
    seoTitle: str(fd, "seoTitle") || null,
    seoDescription: str(fd, "seoDescription").slice(0, 320) || null,
  };
  const clash = await first<{ id: string }>("SELECT id FROM curricula WHERE slug = ? AND id != ?", slug, id || "");
  if (clash) return { ok: false, message: "That URL slug is already used by another curriculum." };
  const vals = [d.slug, d.title, d.shortTitle, d.code, d.board, d.level, d.yearRange, d.tagline, d.summary, d.description, d.topics, d.highlights,
    d.examStructure, d.accent, d.featured, d.published, d.sortOrder, d.seoTitle, d.seoDescription];
  const cols = "slug, title, short_title, code, board, level, year_range, tagline, summary, description, topics, highlights, exam_structure, accent, featured, published, sort_order, seo_title, seo_description";
  if (id) {
    await run(`UPDATE curricula SET ${cols.split(", ").map((c) => `${c} = ?`).join(", ")}, updated_at = ? WHERE id = ?`, ...vals, now(), id);
  } else {
    await run(`INSERT INTO curricula (${cols}, id, created_at, updated_at) VALUES (${vals.map(() => "?").join(", ")}, ?, ?, ?)`, ...vals, newId("cur"), now(), now());
  }
  revalidateSite();
  redirect("/admin/curricula");
}

export async function toggleCurriculum(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const field = str(fd, "field");
  if (field !== "published" && field !== "featured") return;
  await run(`UPDATE curricula SET ${field} = ?, updated_at = ? WHERE id = ?`, bool(fd, "value"), now(), id);
  revalidatePath("/admin/curricula");
  revalidateSite();
}

export async function deleteCurriculum(fd: FormData) {
  await requireAdmin();
  await run("DELETE FROM curricula WHERE id = ?", str(fd, "id"));
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
  const vals = [data.question, data.answer, data.category, data.sortOrder, data.published];
  if (id) await run("UPDATE faqs SET question = ?, answer = ?, category = ?, sort_order = ?, published = ?, updated_at = ? WHERE id = ?", ...vals, now(), id);
  else await run("INSERT INTO faqs (question, answer, category, sort_order, published, id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", ...vals, newId("faq"), now(), now());
  revalidatePath("/admin/faqs");
  revalidateSite();
}

export async function deleteFaq(fd: FormData) {
  await requireAdmin();
  await run("DELETE FROM faqs WHERE id = ?", str(fd, "id"));
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
  const vals = [data.title, data.description, data.icon, data.sortOrder, data.published];
  if (id) await run("UPDATE services SET title = ?, description = ?, icon = ?, sort_order = ?, published = ?, updated_at = ? WHERE id = ?", ...vals, now(), id);
  else await run("INSERT INTO services (title, description, icon, sort_order, published, id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", ...vals, newId("svc"), now(), now());
  revalidatePath("/admin/services");
  revalidateSite();
}

export async function deleteService(fd: FormData) {
  await requireAdmin();
  await run("DELETE FROM services WHERE id = ?", str(fd, "id"));
  revalidatePath("/admin/services");
  revalidateSite();
}

/* ---------------- Settings ---------------- */

export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const whatsapp = str(fd, "whatsappNumber").replace(/\D/g, "");
  const d1 = await db();
  const t = now();
  await d1.batch(
    settingFields.map((f) => {
      const value = f.key === "whatsappNumber" ? whatsapp : str(fd, f.key);
      return d1
        .prepare("INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
        .bind(f.key, value, t);
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
  const admin = await first<{ password_hash: string }>("SELECT password_hash FROM admin_users WHERE id = ?", me.id);
  if (!admin || !(await verifyPassword(current, admin.password_hash))) return { ok: false, message: "Current password is incorrect." };
  await run("UPDATE admin_users SET password_hash = ? WHERE id = ?", await hashPassword(next), me.id);
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
  if (await first("SELECT id FROM admin_users WHERE email = ?", email)) return { ok: false, message: "An admin with that email already exists." };
  await run("INSERT INTO admin_users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)", newId("adm"), email, name, await hashPassword(password), now());
  revalidatePath("/admin/account");
  return { ok: true, message: `Admin ${email} added.` };
}

export async function deleteAdmin(fd: FormData) {
  const me = await requireAdmin();
  const id = str(fd, "id");
  if (id === me.id) return;
  await run("DELETE FROM admin_sessions WHERE admin_id = ?", id);
  await run("DELETE FROM admin_users WHERE id = ?", id);
  revalidatePath("/admin/account");
}
