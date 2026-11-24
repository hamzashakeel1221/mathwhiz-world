import type { BookingStatus } from "@prisma/client";

export const statusTone: Record<BookingStatus, "orange" | "blue" | "teal" | "green" | "red"> = {
  NEW: "orange",
  CONTACTED: "blue",
  SCHEDULED: "teal",
  COMPLETED: "green",
  CANCELLED: "red",
};
export const STATUSES: BookingStatus[] = ["NEW", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"];
