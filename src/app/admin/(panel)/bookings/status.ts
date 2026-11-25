import { BOOKING_STATUSES, type BookingStatus } from "@/lib/db";

export const statusTone: Record<BookingStatus, "orange" | "blue" | "teal" | "green" | "red"> = {
  NEW: "orange",
  CONTACTED: "blue",
  SCHEDULED: "teal",
  COMPLETED: "green",
  CANCELLED: "red",
};
export const STATUSES = BOOKING_STATUSES;
