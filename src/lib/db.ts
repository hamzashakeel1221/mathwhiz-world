import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function db(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  return env.DB;
}

export async function env() {
  return (await getCloudflareContext({ async: true })).env;
}

export const now = () => new Date().toISOString();
export const newId = (prefix: string) => `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 20)}`;
export const bool = (v: unknown) => v === 1 || v === true || v === "1";

export async function all<T>(sql: string, ...params: unknown[]): Promise<T[]> {
  const res = await (await db()).prepare(sql).bind(...params).all<T>();
  return res.results ?? [];
}

export async function first<T>(sql: string, ...params: unknown[]): Promise<T | null> {
  return (await (await db()).prepare(sql).bind(...params).first<T>()) ?? null;
}

export async function run(sql: string, ...params: unknown[]) {
  return (await db()).prepare(sql).bind(...params).run();
}

/* ---------- Row types (snake_case, as stored) and mappers ---------- */

export type BookingStatus = "NEW" | "CONTACTED" | "SCHEDULED" | "COMPLETED" | "CANCELLED";
export const BOOKING_STATUSES: BookingStatus[] = ["NEW", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"];

export type CurriculumRow = {
  id: string; slug: string; title: string; short_title: string; code: string | null; board: string; level: string;
  year_range: string; tagline: string; summary: string; description: string; topics: string; highlights: string;
  exam_structure: string | null; accent: string; featured: number; published: number; sort_order: number;
  seo_title: string | null; seo_description: string | null; created_at: string; updated_at: string;
};

export type Review = {
  id: string; name: string; role: string | null; country: string | null; curriculum: string | null;
  rating: number; content: string; approved: boolean; featured: boolean; createdAt: string;
};
export type ReviewRow = Omit<Review, "approved" | "featured" | "createdAt"> & { approved: number; featured: number; created_at: string };
export const toReview = (r: ReviewRow): Review => ({ ...r, approved: bool(r.approved), featured: bool(r.featured), createdAt: r.created_at });

export type Booking = {
  id: string; studentName: string; parentName: string | null; email: string; whatsapp: string; country: string | null;
  timezone: string | null; curriculum: string; yearLevel: string | null; preferredTime: string | null; message: string | null;
  status: BookingStatus; adminNotes: string | null; createdAt: string;
};
export type BookingRow = {
  id: string; student_name: string; parent_name: string | null; email: string; whatsapp: string; country: string | null;
  timezone: string | null; curriculum: string; year_level: string | null; preferred_time: string | null; message: string | null;
  status: BookingStatus; admin_notes: string | null; created_at: string;
};
export const toBooking = (r: BookingRow): Booking => ({
  id: r.id, studentName: r.student_name, parentName: r.parent_name, email: r.email, whatsapp: r.whatsapp, country: r.country,
  timezone: r.timezone, curriculum: r.curriculum, yearLevel: r.year_level, preferredTime: r.preferred_time, message: r.message,
  status: r.status, adminNotes: r.admin_notes, createdAt: r.created_at,
});

export type Faq = { id: string; question: string; answer: string; category: string; sortOrder: number; published: boolean };
export type FaqRow = { id: string; question: string; answer: string; category: string; sort_order: number; published: number };
export const toFaq = (r: FaqRow): Faq => ({ id: r.id, question: r.question, answer: r.answer, category: r.category, sortOrder: r.sort_order, published: bool(r.published) });

export type Service = { id: string; title: string; description: string; icon: string; sortOrder: number; published: boolean };
export type ServiceRow = { id: string; title: string; description: string; icon: string; sort_order: number; published: number };
export const toService = (r: ServiceRow): Service => ({ id: r.id, title: r.title, description: r.description, icon: r.icon, sortOrder: r.sort_order, published: bool(r.published) });
