import { notFound } from "next/navigation";
import { first, type CurriculumRow } from "@/lib/db";
import { toCurriculum } from "@/lib/data";
import { AdminHeader } from "@/components/admin/ui";
import { CurriculumForm } from "@/components/admin/CurriculumForm";

export const metadata = { title: "Edit curriculum" };

export default async function EditCurriculum({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await first<CurriculumRow>("SELECT * FROM curricula WHERE id = ?", id);
  if (!row) notFound();
  const c = toCurriculum(row);
  return (
    <>
      <AdminHeader title={`Edit: ${c.shortTitle}`} subtitle={`/curricula/${c.slug}`} />
      <CurriculumForm
        initial={c}
      />
    </>
  );
}
