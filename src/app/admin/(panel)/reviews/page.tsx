import Link from "next/link";
import { Check, EyeOff, Pin, PinOff, Trash2, Pencil } from "lucide-react";
import { all, first, toReview, type ReviewRow } from "@/lib/db";
import { deleteReview, saveReview, setReviewFlags } from "../../actions";
import { AdminHeader, Badge, EmptyState, Field, Panel, btn } from "@/components/admin/ui";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";
import { Stars } from "@/components/ui/Stars";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Reviews" };

export default async function ReviewsAdmin({ searchParams }: { searchParams: Promise<{ filter?: string; edit?: string }> }) {
  const { filter, edit } = await searchParams;
  const where = filter === "pending" ? "WHERE approved = 0" : filter === "approved" ? "WHERE approved = 1" : "";
  const [rows, editRow] = await Promise.all([
    all<ReviewRow>(`SELECT * FROM reviews ${where} ORDER BY approved ASC, created_at DESC`),
    edit ? first<ReviewRow>("SELECT * FROM reviews WHERE id = ?", edit) : null,
  ]);
  const reviews = rows.map(toReview);
  const editing = editRow ? toReview(editRow) : null;

  return (
    <>
      <AdminHeader title="Reviews" subtitle="Approve, feature, edit or delete reviews. Only approved reviews appear on the website." />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-4 flex gap-2">
            {[["", "All"], ["pending", "Pending"], ["approved", "Approved"]].map(([v, l]) => (
              <Link key={v} href={v ? `/admin/reviews?filter=${v}` : "/admin/reviews"} className={`${btn.ghost} ${(filter ?? "") === v ? "ring-1 ring-teal-300/50" : ""}`}>{l}</Link>
            ))}
          </div>
          {reviews.length === 0 ? <EmptyState>No reviews here.</EmptyState> : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <Panel key={r.id} className={r.approved ? "" : "border-brandorange-500/30"}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">{r.name}</span>
                    <Stars rating={r.rating} className="h-3.5 w-3.5" />
                    {r.approved ? <Badge tone="green">Approved</Badge> : <Badge tone="orange">Pending</Badge>}
                    {r.featured && <Badge tone="teal">Featured</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{[r.role, r.curriculum, r.country].filter(Boolean).join(" · ")} · {formatDate(r.createdAt)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{r.content}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <form action={setReviewFlags}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="approved" value={String(!r.approved)} />
                      <button className={r.approved ? btn.ghost : btn.primary + " px-3 py-2 text-xs"}>{r.approved ? <><EyeOff className="h-3.5 w-3.5" /> Unpublish</> : <><Check className="h-3.5 w-3.5" /> Approve</>}</button>
                    </form>
                    <form action={setReviewFlags}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="featured" value={String(!r.featured)} />
                      <button className={btn.ghost}>{r.featured ? <><PinOff className="h-3.5 w-3.5" /> Unfeature</> : <><Pin className="h-3.5 w-3.5" /> Feature</>}</button>
                    </form>
                    <Link href={`/admin/reviews?edit=${r.id}`} className={btn.ghost}><Pencil className="h-3.5 w-3.5" /> Edit</Link>
                    <form action={deleteReview}>
                      <input type="hidden" name="id" value={r.id} />
                      <ConfirmButton className={btn.danger} message="Delete this review permanently?"><Trash2 className="h-3.5 w-3.5" /> Delete</ConfirmButton>
                    </form>
                  </div>
                </Panel>
              ))}
            </div>
          )}
        </div>
        <Panel className="h-fit xl:sticky xl:top-8">
          <h2 className="mb-4 font-display font-bold text-white">{editing ? "Edit review" : "Add a review"}</h2>
          <form action={saveReview} className="space-y-3" key={editing?.id ?? "new"}>
            {editing && <input type="hidden" name="id" value={editing.id} />}
            <Field label="Name"><input name="name" required defaultValue={editing?.name} className="input py-2" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Role"><input name="role" defaultValue={editing?.role ?? ""} placeholder="Parent / Student" className="input py-2" /></Field>
              <Field label="Country"><input name="country" defaultValue={editing?.country ?? ""} className="input py-2" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Curriculum"><input name="curriculum" defaultValue={editing?.curriculum ?? ""} className="input py-2" /></Field>
              <Field label="Rating">
                <select name="rating" defaultValue={editing?.rating ?? 5} className="input py-2">{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}</select>
              </Field>
            </div>
            <Field label="Review"><textarea name="content" required rows={5} defaultValue={editing?.content} className="input resize-none py-2" /></Field>
            <div className="flex gap-4 text-sm text-slate-300">
              <label className="flex items-center gap-2"><input type="checkbox" name="approved" defaultChecked={editing?.approved ?? true} /> Approved</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={editing?.featured ?? false} /> Featured</label>
            </div>
            <div className="flex gap-2">
              <SubmitButton className={`${btn.primary} flex-1`}>{editing ? "Save changes" : "Add review"}</SubmitButton>
              {editing && <Link href="/admin/reviews" className={btn.ghost}>Cancel</Link>}
            </div>
          </form>
        </Panel>
      </div>
    </>
  );
}
