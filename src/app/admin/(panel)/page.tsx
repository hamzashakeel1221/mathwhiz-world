import Link from "next/link";
import { CalendarCheck, Star, BookOpen, Inbox, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader, Badge, Panel } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";
import { statusTone } from "./bookings/status";

export const metadata = { title: "Dashboard" };

export default async function Dashboard() {
  const weekAgo = new Date(Date.now() - 7 * 864e5);
  const [newBookings, weekBookings, totalBookings, pendingReviews, approvedReviews, curricula, recent, byCurriculum] = await Promise.all([
    prisma.demoBooking.count({ where: { status: "NEW" } }),
    prisma.demoBooking.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.demoBooking.count(),
    prisma.review.count({ where: { approved: false } }),
    prisma.review.count({ where: { approved: true } }),
    prisma.curriculum.count({ where: { published: true } }),
    prisma.demoBooking.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.demoBooking.groupBy({ by: ["curriculum"], _count: { _all: true }, orderBy: { _count: { curriculum: "desc" } }, take: 6 }),
  ]);
  const max = Math.max(1, ...byCurriculum.map((b) => b._count._all));

  const cards = [
    { label: "New demo requests", value: newBookings, sub: `${weekBookings} this week · ${totalBookings} total`, Icon: Inbox, href: "/admin/bookings?status=NEW", tone: "from-brandorange-500/30" },
    { label: "Reviews awaiting approval", value: pendingReviews, sub: `${approvedReviews} published`, Icon: Star, href: "/admin/reviews?filter=pending", tone: "from-sun-400/30" },
    { label: "Published curricula", value: curricula, sub: "Manage pages", Icon: BookOpen, href: "/admin/curricula", tone: "from-teal-400/30" },
    { label: "All bookings", value: totalBookings, sub: "View pipeline", Icon: CalendarCheck, href: "/admin/bookings", tone: "from-sky-400/30" },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Overview of your website activity." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, sub, Icon, href, tone }) => (
          <Link key={label} href={href} className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${tone} to-transparent p-5 transition hover:border-white/25`}>
            <Icon className="h-6 w-6 text-white/80" />
            <p className="mt-4 font-display text-4xl font-extrabold text-white">{value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">{label}</p>
            <p className="mt-1 text-xs text-slate-400">{sub}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-bold text-white">Latest demo requests</h2>
            <Link href="/admin/bookings" className="flex items-center gap-1 text-xs font-semibold text-teal-300">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          {recent.length === 0 ? <p className="text-sm text-slate-400">No bookings yet.</p> : (
            <ul className="divide-y divide-white/5">
              {recent.map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{b.studentName} <span className="font-normal text-slate-400">· {b.curriculum}</span></p>
                    <p className="text-xs text-slate-500">{formatDate(b.createdAt)} · {b.country ?? "—"}</p>
                  </div>
                  <Badge tone={statusTone[b.status]}>{b.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel>
          <h2 className="mb-4 font-display font-bold text-white">Requests by curriculum</h2>
          {byCurriculum.length === 0 ? <p className="text-sm text-slate-400">No data yet.</p> : (
            <ul className="space-y-3">
              {byCurriculum.map((b) => (
                <li key={b.curriculum}>
                  <div className="flex justify-between text-xs text-slate-300"><span className="truncate pr-2">{b.curriculum}</span><span>{b._count._all}</span></div>
                  <div className="mt-1 h-2 rounded-full bg-white/5"><div className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-sun-400" style={{ width: `${(b._count._all / max) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
