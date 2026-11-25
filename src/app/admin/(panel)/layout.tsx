import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/auth";
import { first } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const counts = await first<{ bookings: number; reviews: number }>(
    "SELECT (SELECT COUNT(*) FROM demo_bookings WHERE status = 'NEW') AS bookings, (SELECT COUNT(*) FROM reviews WHERE approved = 0) AS reviews",
  );
  const bookings = counts?.bookings ?? 0, reviews = counts?.reviews ?? 0;
  return (
    <>
      <Sidebar name={admin.name} counts={{ bookings, reviews }} />
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{children}</main>
      </div>
    </>
  );
}
