import { AdminHeader } from "@/components/admin/ui";
import { CurriculumForm } from "@/components/admin/CurriculumForm";

export const metadata = { title: "New curriculum" };

export default function NewCurriculum() {
  return (
    <>
      <AdminHeader title="New curriculum" subtitle="Creates a new public page with full SEO." />
      <CurriculumForm />
    </>
  );
}
