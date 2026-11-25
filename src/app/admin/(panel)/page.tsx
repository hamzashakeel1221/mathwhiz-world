import Link from "next/link";
import { CalendarCheck, Star, BookOpen, Inbox, ArrowRight } from "lucide-react";
import { all, first, toBooking, type BookingRow } from "@/lib/db";
import { AdminHeader, Badge, Panel } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";
import { statusTone } from "./bookings/status";

export const metadata = { title: "Dashboard" };

export default async function Dashboard() {
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  type Stats = { newBookings: number; weekBookings: number; totalBookings: number; pendingReviews: number; approvedReviews: number; curricula: number };
  const [stats, recentRows, byCurriculum] = await Promise.all([
    first<Stats>(
      `SELECT
        (SELECT COUNT(*) FROM demo_bookings WHERE status = 'NEW') AS newBookings,
        (SELECT COUNT(*) FROM demo_bookings WHERE created_at >= ?) AS weekBookings,
        (SELECT COUNT(*) FROM demo_bookings) AS totalBookings,
        (SELECT COUNT(*) FROM reviews WHERE approved = 0) AS pendingReviews,
        (SELECT COUNT(*) FROM reviews WHERE approved = 1) AS approvedReviews,
        (SELECT COUNT(*) FROM curricula WHERE published = 1) AS curricula`,
      weekAgo,
    ),
    all<BookingRow>("SELECT * FROM demo_bookings ORDER BY created_at DESC LIMIT 6"),
    all<{ curriculum: string; n: number }>("SELECT curriculum, COUNT(*) AS n FROM demo_bookings GROUP BY curriculum ORDER BY n DESC LIMIT 6"),
  ]);
  const { newBookings = 0, weekBookings = 0, totalBookings = 0, pendingReviews = 0, approvedReviews = 0, curricula = 0 } = stats ?? {};
  const recent = recentRows.map(toBooking);
  const max = Math.max(1, ...byCurriculum.map((b) => b.n));

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
                  <div className="flex justify-between text-xs text-slate-300"><span className="truncate pr-2">{b.curriculum}</span><span>{b.n}</span></div>
                  <div className="mt-1 h-2 rounded-full bg-white/5"><div className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-sun-400" style={{ width: `${(b.n / max) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
