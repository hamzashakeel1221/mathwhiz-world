import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const [bookings, reviews] = await Promise.all([
    prisma.demoBooking.count({ where: { status: "NEW" } }),
    prisma.review.count({ where: { approved: false } }),
  ]);
  return (
    <>
      <Sidebar name={admin.name} counts={{ bookings, reviews }} />
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{children}</main>
      </div>
    </>
  );
}
