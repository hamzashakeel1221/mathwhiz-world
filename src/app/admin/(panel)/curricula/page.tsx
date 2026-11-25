import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, Eye, EyeOff, Star } from "lucide-react";
import { all, type CurriculumRow } from "@/lib/db";
import { toCurriculum } from "@/lib/data";
import { deleteCurriculum, toggleCurriculum } from "../../actions";
import { AdminHeader, Badge, EmptyState, btn } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

export const metadata = { title: "Curricula" };

export default async function CurriculaAdmin() {
  const list = (await all<CurriculumRow>("SELECT * FROM curricula ORDER BY sort_order")).map(toCurriculum);
  return (
    <>
      <AdminHeader
        title="Curricula"
        subtitle="Each curriculum gets its own SEO page at /curricula/[slug]. Lower sort order shows first."
        action={<Link href="/admin/curricula/new" className={btn.primary}><Plus className="h-4 w-4" /> New curriculum</Link>}
      />
      {list.length === 0 ? <EmptyState>No curricula yet. Run the seed script or add one.</EmptyState> : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
              <tr><th className="px-4 py-3">#</th><th className="px-4 py-3">Title</th><th className="px-4 py-3">Level</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-slate-500">{c.sortOrder}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-white">{c.title}</p>
                    <p className="text-xs text-slate-500">/curricula/{c.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{c.level}<span className="block text-xs text-slate-500">{c.board}</span></td>
                  <td className="space-x-1 px-4 py-3">
                    {c.published ? <Badge tone="green">Published</Badge> : <Badge>Draft</Badge>}
                    {c.featured && <Badge tone="orange">Featured</Badge>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <form action={toggleCurriculum}>
                        <input type="hidden" name="id" value={c.id} /><input type="hidden" name="field" value="published" /><input type="hidden" name="value" value={String(!c.published)} />
                        <button className={btn.ghost} title={c.published ? "Unpublish" : "Publish"}>{c.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button>
                      </form>
                      <form action={toggleCurriculum}>
                        <input type="hidden" name="id" value={c.id} /><input type="hidden" name="field" value="featured" /><input type="hidden" name="value" value={String(!c.featured)} />
                        <button className={btn.ghost} title="Toggle featured"><Star className={`h-3.5 w-3.5 ${c.featured ? "fill-sun-400 text-sun-400" : ""}`} /></button>
                      </form>
                      <a href={`/curricula/${c.slug}`} target="_blank" className={btn.ghost} title="View"><ExternalLink className="h-3.5 w-3.5" /></a>
                      <Link href={`/admin/curricula/${c.id}`} className={btn.ghost}><Pencil className="h-3.5 w-3.5" /> Edit</Link>
                      <form action={deleteCurriculum}>
                        <input type="hidden" name="id" value={c.id} />
                        <ConfirmButton className={btn.danger} message={`Delete "${c.title}"? Its page will be removed.`}><Trash2 className="h-3.5 w-3.5" /></ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
