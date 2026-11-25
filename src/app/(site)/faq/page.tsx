import { PageHero } from "@/components/ui/PageHero";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { getFaqs } from "@/lib/data";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "FAQ: Online O Level & IGCSE Maths Tutoring",
  description: "Answers to common questions about our online O Level, IGCSE and GCSE maths tutoring: free demo classes, curricula, timings, progress reports and more.",
  path: "/faq",
});

export default async function FaqPage() {
  const base = await getSiteUrl();
  const faqs = await getFaqs();
  const groups = faqs.reduce<Record<string, typeof faqs>>((acc, f) => {
    (acc[f.category] ||= []).push(f);
    return acc;
  }, {});
  const crumbs = [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }];
  return (
    <>
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd(base, crumbs)]} />
      <PageHero eyebrow="FAQ" title={<>Frequently asked <span className="text-gradient">questions</span></>} subtitle="Everything you need to know before your free demo class." crumbs={crumbs} />
      <section className="section pt-4">
        <div className="container max-w-3xl space-y-12">
          {Object.entries(groups).map(([cat, list]) => (
            <div key={cat}>
              <h2 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.2em] text-teal-300">{cat}</h2>
              <FaqAccordion faqs={list} />
            </div>
          ))}
          <div className="glass rounded-3xl p-8 text-center">
            <p className="font-display text-xl font-bold text-white">Still have a question?</p>
            <p className="mt-2 text-slate-400">Message us any time. We usually reply within a few hours.</p>
            <ButtonLink href="/contact" className="mt-6">Contact us</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
