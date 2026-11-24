import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteService, saveService } from "../../actions";
import { AdminHeader, Badge, Field, Panel, btn } from "@/components/admin/ui";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";
import { Icon, iconNames } from "@/components/ui/Icon";

export const metadata = { title: "Services" };

function ServiceFields({ s }: { s?: { title: string; description: string; icon: string; sortOrder: number; published: boolean } }) {
  return (
    <>
      <Field label="Title" className="md:col-span-2"><input name="title" required defaultValue={s?.title} className="input py-2" /></Field>
      <Field label="Icon">
        <select name="icon" defaultValue={s?.icon ?? "Sparkles"} className="input py-2">{iconNames.map((n) => <option key={n}>{n}</option>)}</select>
      </Field>
      <Field label="Sort order"><input name="sortOrder" type="number" defaultValue={s?.sortOrder ?? 10} className="input py-2" /></Field>
      <Field label="Description" className="md:col-span-4"><textarea name="description" required rows={2} defaultValue={s?.description} className="input py-2" /></Field>
      <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" name="published" defaultChecked={s?.published ?? true} /> Published</label>
    </>
  );
}

export default async function ServicesAdmin() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <AdminHeader title="Services" subtitle="The 'What's included' cards on the home page." />
      <div className="grid gap-4 lg:grid-cols-2">
        {services.map((s) => (
          <Panel key={s.id}>
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/15 text-teal-300"><Icon name={s.icon} className="h-5 w-5" /></span>
              <span className="flex-1 font-semibold text-white">{s.title}</span>
              {s.published ? <Badge tone="green">Live</Badge> : <Badge>Hidden</Badge>}
            </div>
            <form action={saveService} className="grid gap-3 md:grid-cols-4">
              <input type="hidden" name="id" value={s.id} />
              <ServiceFields s={s} />
              <div className="flex justify-end gap-2 md:col-span-3"><SubmitButton className={btn.primary}>Save</SubmitButton></div>
            </form>
            <form action={deleteService} className="mt-2">
              <input type="hidden" name="id" value={s.id} />
              <ConfirmButton className={btn.danger}><Trash2 className="h-3.5 w-3.5" /> Delete</ConfirmButton>
            </form>
          </Panel>
        ))}
      </div>
      <Panel className="mt-6 border-teal-300/30">
        <h2 className="mb-4 font-display font-bold text-white">Add service</h2>
        <form action={saveService} className="grid gap-3 md:grid-cols-4">
          <ServiceFields />
          <div className="flex justify-end md:col-span-3"><SubmitButton className={btn.primary}>Add service</SubmitButton></div>
        </form>
      </Panel>
    </>
  );
}
