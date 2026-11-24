"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveCurriculum } from "@/app/admin/actions";
import { initialFormState } from "@/lib/validation";
import type { CurriculumData } from "@/lib/defaults";
import { Field, Panel, btn } from "./ui";

type Initial = CurriculumData & { id: string };

export function CurriculumForm({ initial }: { initial?: Initial }) {
  const [state, action, pending] = useActionState(saveCurriculum, initialFormState);
  const exam = initial?.examStructure?.map((p) => [p.name, p.duration, p.marks, p.weight, p.note].filter((x) => x !== undefined).join(" | ")).join("\n") ?? "";
  return (
    <form action={action} className="space-y-6">
      {initial && <input type="hidden" name="id" value={initial.id} />}
      {state.message && <p className={`rounded-xl border p-3 text-sm ${state.ok ? "border-teal-300/40 bg-teal-400/10 text-teal-100" : "border-rose-400/40 bg-rose-500/10 text-rose-200"}`}>{state.message}</p>}

      <Panel className="grid gap-4 md:grid-cols-2">
        <Field label="Title *" className="md:col-span-2"><input name="title" required defaultValue={initial?.title} className="input" placeholder="Cambridge O Level Mathematics (4024)" /></Field>
        <Field label="Short title *"><input name="shortTitle" required defaultValue={initial?.shortTitle} className="input" placeholder="O-Level Maths" /></Field>
        <Field label="URL slug" hint="Leave empty to generate from the title."><input name="slug" defaultValue={initial?.slug} className="input" placeholder="o-level-mathematics-4024" /></Field>
        <Field label="Syllabus code"><input name="code" defaultValue={initial?.code ?? ""} className="input" placeholder="4024" /></Field>
        <Field label="Exam board *"><input name="board" required defaultValue={initial?.board} className="input" placeholder="Cambridge (CAIE)" /></Field>
        <Field label="Level *"><input name="level" required defaultValue={initial?.level} className="input" placeholder="O Level" /></Field>
        <Field label="Year range *"><input name="yearRange" required defaultValue={initial?.yearRange} className="input" placeholder="Year 9 – 11" /></Field>
        <Field label="Tagline *" className="md:col-span-2"><input name="tagline" required maxLength={255} defaultValue={initial?.tagline} className="input" /></Field>
        <Field label="Summary *" className="md:col-span-2" hint="Shown on cards and as the page intro."><textarea name="summary" required rows={3} defaultValue={initial?.summary} className="input" /></Field>
        <Field label="Description *" className="md:col-span-2" hint="Separate paragraphs with a blank line."><textarea name="description" required rows={6} defaultValue={initial?.description} className="input" /></Field>
      </Panel>

      <Panel className="grid gap-4 md:grid-cols-2">
        <Field label="Topics" hint="One per line. Use 'Topic: details' to add a description."><textarea name="topics" rows={8} defaultValue={initial?.topics.join("\n")} className="input font-mono text-xs" /></Field>
        <Field label="Highlights" hint="One per line."><textarea name="highlights" rows={8} defaultValue={initial?.highlights.join("\n")} className="input font-mono text-xs" /></Field>
        <Field label="Exam structure" className="md:col-span-2" hint="One paper per line: Name | Duration | Marks | Weight | Note (optional). Leave empty to hide."><textarea name="examStructure" rows={3} defaultValue={exam} className="input font-mono text-xs" /></Field>
      </Panel>

      <Panel className="grid gap-4 md:grid-cols-3">
        <Field label="Accent colour">
          <select name="accent" defaultValue={initial?.accent ?? "teal"} className="input">
            {["teal", "orange", "blue", "violet"].map((a) => <option key={a}>{a}</option>)}
          </select>
        </Field>
        <Field label="Sort order"><input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 10} className="input" /></Field>
        <div className="flex items-end gap-6 pb-3 text-sm text-slate-300">
          <label className="flex items-center gap-2"><input type="checkbox" name="published" defaultChecked={initial?.published ?? true} /> Published</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} /> Featured</label>
        </div>
      </Panel>

      <Panel className="grid gap-4">
        <h2 className="font-display font-bold text-white">SEO</h2>
        <Field label="SEO title" hint="~60 characters. Defaults to '<Title> Tutor Online'."><input name="seoTitle" defaultValue={initial?.seoTitle ?? ""} className="input" /></Field>
        <Field label="SEO description" hint="~155 characters. Defaults to the summary."><textarea name="seoDescription" rows={2} maxLength={320} defaultValue={initial?.seoDescription ?? ""} className="input" /></Field>
      </Panel>

      <div className="flex gap-3">
        <button type="submit" disabled={pending} className={btn.primary}>{pending ? "Saving…" : initial ? "Save changes" : "Create curriculum"}</button>
        <Link href="/admin/curricula" className={btn.ghost}>Cancel</Link>
      </div>
    </form>
  );
}
