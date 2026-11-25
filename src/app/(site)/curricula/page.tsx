import { PageHero } from "@/components/ui/PageHero";
import { CurriculumCard } from "@/components/home/CurriculaGrid";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/home/CtaSection";
import { getCurricula, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Maths Curricula We Teach: O Level, IGCSE, GCSE, Edexcel, AQA",
  description: "Online maths tutoring for Cambridge O Level 4024, IGCSE 0580, 0606, 0607, GCSE (Edexcel, AQA, OCR), Edexcel International GCSE, Cambridge Primary and Lower Secondary.",
  path: "/curricula",
});

export default async function CurriculaPage() {
  const base = await getSiteUrl();
  const [curricula, settings] = await Promise.all([getCurricula(), getSettings()]);
  return (
    <>
      <JsonLd data={[
        breadcrumbJsonLd(base, [{ name: "Home", path: "/" }, { name: "Curricula", path: "/curricula" }]),
        { "@context": "https://schema.org", "@type": "ItemList", itemListElement: curricula.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(base, `/curricula/${c.slug}`), name: c.title })) },
      ]} />
      <PageHero
        eyebrow="Curricula & exam boards"
        title={<>Maths tutoring for <span className="text-gradient">every curriculum</span></>}
        subtitle="Year 4 to 11 and beyond. Cambridge, CAIE, IGCSE, O-Level, GCSE, Edexcel, AQA and the British curriculum."
        crumbs={[{ name: "Home", path: "/" }, { name: "Curricula", path: "/curricula" }]}
      />
      <section className="section pt-4">
        <div className="container">
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {curricula.map((c) => (
              <StaggerItem key={c.slug} className={c.code === "4024" ? "md:col-span-2" : ""}>
                <CurriculumCard c={c} big={c.code === "4024"} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CtaSection settings={settings} curricula={curricula.map((c) => c.title)} />
    </>
  );
}
