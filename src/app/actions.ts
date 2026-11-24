"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
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
    await prisma.demoBooking.create({ data: parsed.data });
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
    await prisma.review.create({ data: { ...parsed.data, approved: false } });
  } catch (err) {
    console.error("[submitReview]", err);
    return { ok: false, message: "Sorry, we couldn't save your review right now. Please try again later." };
  }
  return { ok: true, message: "Thank you! Your review has been received and will appear once it's approved." };
}
