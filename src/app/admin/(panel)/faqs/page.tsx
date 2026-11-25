import { Trash2 } from "lucide-react";
import { all, toFaq, type FaqRow } from "@/lib/db";
import { deleteFaq, saveFaq } from "../../actions";
import { AdminHeader, Badge, Field, Panel, btn } from "@/components/admin/ui";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";

export const metadata = { title: "FAQs" };

export default async function FaqsAdmin() {
  const faqs = (await all<FaqRow>("SELECT * FROM faqs ORDER BY sort_order")).map(toFaq);
  return (
    <>
      <AdminHeader title="FAQs" subtitle="Shown on the FAQ page and home page, and published as FAQPage structured data for Google." />
      <div className="space-y-4">
        {faqs.map((f) => (
          <Panel key={f.id}>
            <details>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="font-semibold text-white">{f.question}</span>
                <span className="flex shrink-0 gap-1"><Badge>{f.category}</Badge>{f.published ? <Badge tone="green">Live</Badge> : <Badge>Hidden</Badge>}</span>
              </summary>
              <form action={saveFaq} className="mt-4 grid gap-3 md:grid-cols-4">
                <input type="hidden" name="id" value={f.id} />
                <Field label="Question" className="md:col-span-4"><input name="question" defaultValue={f.question} className="input py-2" /></Field>
                <Field label="Answer" className="md:col-span-4"><textarea name="answer" rows={3} defaultValue={f.answer} className="input py-2" /></Field>
                <Field label="Category"><input name="category" defaultValue={f.category} className="input py-2" /></Field>
                <Field label="Sort order"><input name="sortOrder" type="number" defaultValue={f.sortOrder} className="input py-2" /></Field>
                <label className="flex items-end gap-2 pb-3 text-sm text-slate-300"><input type="checkbox" name="published" defaultChecked={f.published} /> Published</label>
                <div className="flex items-end gap-2"><SubmitButton className={btn.primary}>Save</SubmitButton></div>
              </form>
              <form action={deleteFaq} className="mt-2">
                <input type="hidden" name="id" value={f.id} />
                <ConfirmButton className={btn.danger}><Trash2 className="h-3.5 w-3.5" /> Delete</ConfirmButton>
              </form>
            </details>
          </Panel>
        ))}
        <Panel className="border-teal-300/30">
          <h2 className="mb-4 font-display font-bold text-white">Add FAQ</h2>
          <form action={saveFaq} className="grid gap-3 md:grid-cols-4">
            <Field label="Question" className="md:col-span-4"><input name="question" required className="input py-2" /></Field>
            <Field label="Answer" className="md:col-span-4"><textarea name="answer" required rows={3} className="input py-2" /></Field>
            <Field label="Category"><input name="category" defaultValue="General" className="input py-2" /></Field>
            <Field label="Sort order"><input name="sortOrder" type="number" defaultValue={faqs.length + 1} className="input py-2" /></Field>
            <label className="flex items-end gap-2 pb-3 text-sm text-slate-300"><input type="checkbox" name="published" defaultChecked /> Published</label>
            <div className="flex items-end"><SubmitButton className={btn.primary}>Add FAQ</SubmitButton></div>
          </form>
        </Panel>
      </div>
    </>
  );
}
