import { Hero } from "@/components/home/Hero";
import { BoardsMarquee } from "@/components/home/BoardsMarquee";
import { OLevelSpotlight } from "@/components/home/OLevelSpotlight";
import { Services } from "@/components/home/Services";
import { Method } from "@/components/home/Method";
import { CurriculaGrid } from "@/components/home/CurriculaGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaSection } from "@/components/home/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { getApprovedReviews, getCurricula, getFaqs, getServices, getSettings } from "@/lib/data";
import { faqJsonLd } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, curricula, services, faqs, reviews] = await Promise.all([
    getSettings(), getCurricula(), getServices(), getFaqs(), getApprovedReviews(12),
  ]);
  const oLevel = curricula.find((c) => c.code === "4024") ?? null;
  const ordered = oLevel ? [oLevel, ...curricula.filter((c) => c !== oLevel)] : curricula;
  const homeFaqs = faqs.slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero settings={settings} />
      <BoardsMarquee />
      <OLevelSpotlight intro={settings.oLevelIntro} curriculum={oLevel} />
      <Services services={services} />
      <Method />
      <CurriculaGrid curricula={ordered} />
      <WhyUs />
      <Testimonials reviews={reviews} />
      <section className="section">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={<>Questions? <span className="text-gradient">We&apos;ve got answers.</span></>} />
          <FaqAccordion faqs={homeFaqs} />
          <p className="mt-8 text-center"><Link href="/faq" className="text-sm font-bold text-sun-400 hover:underline">See all FAQs →</Link></p>
        </div>
      </section>
      <CtaSection settings={settings} curricula={ordered.map((c) => c.title)} />
    </>
  );
}
