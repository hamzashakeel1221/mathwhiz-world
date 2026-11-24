import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/ui";
import { CurriculumForm } from "@/components/admin/CurriculumForm";
import type { ExamPaper } from "@/lib/defaults";

export const metadata = { title: "Edit curriculum" };

export default async function EditCurriculum({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = await prisma.curriculum.findUnique({ where: { id } });
  if (!c) notFound();
  return (
    <>
      <AdminHeader title={`Edit: ${c.shortTitle}`} subtitle={`/curricula/${c.slug}`} />
      <CurriculumForm
        initial={{
          ...c,
          topics: (c.topics as string[]) ?? [],
          highlights: (c.highlights as string[]) ?? [],
          examStructure: (c.examStructure as ExamPaper[] | null) ?? null,
        }}
      />
    </>
  );
}
