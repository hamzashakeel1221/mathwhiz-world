import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/ui/JsonLd";
import { CurriculumCard, accentClasses } from "@/components/home/CurriculaGrid";
import { Highlights, TopicsGrid, ExamStructure } from "@/components/CurriculumDetail";
import { CtaSection } from "@/components/home/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCurricula, getCurriculum, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, courseJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCurriculum(slug);
  if (!c) return { title: "Curriculum not found" };
  return pageMetadata({
    title: c.seoTitle || `${c.title} Tutor Online`,
    description: c.seoDescription || c.summary,
    path: `/curricula/${c.slug}`,
    keywords: [`${c.shortTitle} tutor`, `${c.title} online tutor`, `${c.level} maths tutor`, `${c.board} maths`, "online maths tutor"],
  });
}

export default async function CurriculumPage({ params }: { params: Promise<{ slug: string }> }) {
  const base = await getSiteUrl();
  const { slug } = await params;
  const [c, all, settings] = await Promise.all([getCurriculum(slug), getCurricula(), getSettings()]);
  if (!c) notFound();
  const others = all.filter((o) => o.slug !== c.slug).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Curricula", path: "/curricula" }, { name: c.shortTitle, path: `/curricula/${c.slug}` }];

  return (
    <>
      <JsonLd data={[courseJsonLd(base, c), breadcrumbJsonLd(base, crumbs)]} />
      <PageHero
        eyebrow={`${c.board} · ${c.yearRange}`}
        title={<>{c.title}</>}
        subtitle={c.summary}
        crumbs={crumbs}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className={cn("rounded-xl bg-gradient-to-br px-4 py-2 font-display font-extrabold text-navy-950", accentClasses[c.accent] ?? accentClasses.teal)}>{c.code ?? c.level}</span>
          <span className="font-hand text-2xl text-sun-400">{c.tagline}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#book">Book a FREE demo <ArrowRight className="h-4 w-4" /></ButtonLink>
          <ButtonLink href="/curricula" variant="ghost">All curricula</ButtonLink>
        </div>
      </PageHero>
      <Highlights c={c} />
      <TopicsGrid c={c} />
      <ExamStructure c={c} />
      {others.length > 0 && (
        <section className="section pt-0">
          <div className="container">
            <SectionHeading eyebrow="Explore more" title="Other programmes" />
            <div className="grid gap-5 md:grid-cols-3">
              {others.map((o) => <CurriculumCard key={o.slug} c={o} />)}
            </div>
          </div>
        </section>
      )}
      <CtaSection settings={settings} curricula={all.map((x) => x.title)} defaultCurriculum={c.title} />
    </>
  );
}
