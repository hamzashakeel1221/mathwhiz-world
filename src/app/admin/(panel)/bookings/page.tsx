import Link from "next/link";
import { Mail, Globe2, Clock, Trash2 } from "lucide-react";
import { all, toBooking, type BookingRow, type BookingStatus } from "@/lib/db";
import { deleteBooking, updateBooking } from "../../actions";
import { AdminHeader, Badge, EmptyState, Panel, btn } from "@/components/admin/ui";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";
import { WhatsAppIcon } from "@/components/layout/WhatsAppButton";
import { formatDate } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { STATUSES, statusTone } from "./status";

export const metadata = { title: "Demo bookings" };

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { status, q } = await searchParams;
  const conds: string[] = [];
  const params: unknown[] = [];
  if (status && STATUSES.includes(status as BookingStatus)) { conds.push("status = ?"); params.push(status); }
  if (q) {
    conds.push("(student_name LIKE ? OR email LIKE ? OR whatsapp LIKE ? OR parent_name LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like, like, like);
  }
  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";
  const [rows, counts] = await Promise.all([
    all<BookingRow>(`SELECT * FROM demo_bookings ${where} ORDER BY created_at DESC LIMIT 200`, ...params),
    all<{ status: string; n: number }>("SELECT status, COUNT(*) AS n FROM demo_bookings GROUP BY status"),
  ]);
  const bookings = rows.map(toBooking);
  const countOf = (s: string) => counts.find((c) => c.status === s)?.n ?? 0;

  return (
    <>
      <AdminHeader title="Demo bookings" subtitle="Free demo requests from the website. Update status and keep notes." />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Link href="/admin/bookings" className={`${btn.ghost} ${!status ? "ring-1 ring-teal-300/50" : ""}`}>All</Link>
        {STATUSES.map((s) => (
          <Link key={s} href={`/admin/bookings?status=${s}`} className={`${btn.ghost} ${status === s ? "ring-1 ring-teal-300/50" : ""}`}>
            {s} <span className="text-slate-500">{countOf(s)}</span>
          </Link>
        ))}
        <form className="ml-auto">
          {status && <input type="hidden" name="status" value={status} />}
          <input name="q" defaultValue={q} placeholder="Search name, email, phone…" className="input w-64 py-2" />
        </form>
      </div>

      {bookings.length === 0 ? <EmptyState>No bookings found.</EmptyState> : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <Panel key={b.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-bold text-white">{b.studentName}</h2>
                    <Badge tone={statusTone[b.status]}>{b.status}</Badge>
                    <Badge tone="teal">{b.curriculum}</Badge>
                    {b.yearLevel && <Badge>{b.yearLevel}</Badge>}
                  </div>
                  {b.parentName && <p className="mt-1 text-sm text-slate-400">Parent: {b.parentName}</p>}
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                    <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 hover:text-white"><Mail className="h-4 w-4 text-teal-300" /> {b.email}</a>
                    <a href={whatsappLink(b.whatsapp, `Hi ${b.parentName || b.studentName}, this is MathWhiz World Academy about your free demo class request.`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> {b.whatsapp}</a>
                    {b.country && <span className="flex items-center gap-1.5"><Globe2 className="h-4 w-4 text-slate-500" /> {b.country}{b.timezone ? ` (${b.timezone})` : ""}</span>}
                    {b.preferredTime && <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-slate-500" /> {b.preferredTime}</span>}
                  </div>
                  {b.message && <p className="mt-3 whitespace-pre-line rounded-xl bg-white/5 p-3 text-sm text-slate-300">{b.message}</p>}
                  <p className="mt-2 text-xs text-slate-500">Received {formatDate(b.createdAt)}</p>
                </div>
                <div className="w-full space-y-2 lg:w-72">
                  <form action={updateBooking} className="space-y-2">
                    <input type="hidden" name="id" value={b.id} />
                    <select name="status" defaultValue={b.status} className="input py-2">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <textarea name="adminNotes" defaultValue={b.adminNotes ?? ""} rows={2} placeholder="Private notes…" className="input resize-none py-2" />
                    <SubmitButton className={`${btn.primary} w-full`}>Save</SubmitButton>
                  </form>
                  <form action={deleteBooking}>
                    <input type="hidden" name="id" value={b.id} />
                    <ConfirmButton className={`${btn.danger} w-full`} message="Delete this booking permanently?"><Trash2 className="h-3.5 w-3.5" /> Delete</ConfirmButton>
                  </form>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </>
  );
}
