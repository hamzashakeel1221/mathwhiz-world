import { z } from "zod";

const optional = (max: number) => z.string().trim().max(max).optional().transform((v) => (v ? v : undefined));

export const bookingSchema = z.object({
  studentName: z.string().trim().min(2, "Please enter the student's name").max(120),
  parentName: optional(120),
  email: z.string().trim().email("Please enter a valid email").max(190),
  whatsapp: z.string().trim().min(7, "Please enter a WhatsApp / phone number").max(30).regex(/^[+\d\s()-]+$/, "Use digits, spaces, + or -"),
  country: optional(80),
  timezone: optional(80),
  curriculum: z.string().trim().min(2, "Please choose a curriculum").max(120),
  yearLevel: optional(40),
  preferredTime: optional(120),
  message: optional(2000),
});

export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  role: optional(80),
  country: optional(60),
  curriculum: optional(80),
  rating: z.coerce.number().int().min(1).max(5),
  content: z.string().trim().min(20, "Please write at least 20 characters").max(1500),
});

export type FormState = { ok: boolean; message: string; errors?: Record<string, string[] | undefined> };
export const initialFormState: FormState = { ok: false, message: "" };
