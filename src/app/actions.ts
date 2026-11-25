"use server";

import { revalidatePath } from "next/cache";
import { newId, now, run } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";
import { bookingSchema, reviewSchema, type FormState } from "@/lib/validation";

function fields(formData: FormData) {
  return Object.fromEntries(Array.from(formData.entries()).filter(([, v]) => typeof v === "string")) as Record<string, string>;
}

export async function bookDemo(_prev: FormState, formData: FormData): Promise<FormState> {
  const data = fields(formData);
  // Honeypot: real users never fill this hidden field.
  if (data.website) return { ok: true, message: "Thank you! We'll be in touch shortly." };

  const ip = await clientIp();
  if (!rateLimit(`book:${ip}`, 5, 60 * 60 * 1000).ok) {
    return { ok: false, message: "Too many requests. Please message us on WhatsApp instead." };
  }

  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const d = parsed.data;
    const t = now();
    await run(
      `INSERT INTO demo_bookings (id, student_name, parent_name, email, whatsapp, country, timezone, curriculum, year_level, preferred_time, message, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', ?, ?)`,
      newId("bk"), d.studentName, d.parentName ?? null, d.email, d.whatsapp, d.country ?? null, d.timezone ?? null,
      d.curriculum, d.yearLevel ?? null, d.preferredTime ?? null, d.message ?? null, t, t,
    );
  } catch (err) {
    console.error("[bookDemo]", err);
    return { ok: false, message: "Sorry, we couldn't save your request. Please contact us on WhatsApp or email." };
  }
  revalidatePath("/admin");
  return {
    ok: true,
    message: `Thank you, ${parsed.data.studentName.split(" ")[0]}! Your free demo request is in. We'll contact you on WhatsApp or email within 24 hours.`,
  };
}

export async function submitReview(_prev: FormState, formData: FormData): Promise<FormState> {
  const data = fields(formData);
  if (data.website) return { ok: true, message: "Thank you for your review!" };

  const ip = await clientIp();
  if (!rateLimit(`review:${ip}`, 3, 60 * 60 * 1000).ok) {
    return { ok: false, message: "You've submitted several reviews already. Please try again later." };
  }

  const parsed = reviewSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const r = parsed.data;
    const t = now();
    await run(
      `INSERT INTO reviews (id, name, role, country, curriculum, rating, content, approved, featured, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?)`,
      newId("rev"), r.name, r.role ?? null, r.country ?? null, r.curriculum ?? null, r.rating, r.content, t, t,
    );
  } catch (err) {
    console.error("[submitReview]", err);
    return { ok: false, message: "Sorry, we couldn't save your review right now. Please try again later." };
  }
  return { ok: true, message: "Thank you! Your review has been received and will appear once it's approved." };
}
