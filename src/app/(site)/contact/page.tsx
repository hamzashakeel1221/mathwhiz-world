import { PageHero } from "@/components/ui/PageHero";
import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/home/CtaSection";
import { getCurricula, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Book a Free Demo Maths Class | Contact MathWhiz World Academy",
  description: "Book a free one-to-one demo class for O Level, IGCSE or GCSE maths. Contact us on WhatsApp +92 349 5047810 or email onlinemathstutor118@gmail.com.",
  path: "/contact",
});

export default async function ContactPage() {
  const base = await getSiteUrl();
  const [settings, curricula] = await Promise.all([getSettings(), getCurricula()]);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(base, crumbs), { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact MathWhiz World Academy", url: absoluteUrl(base, "/contact") }]} />
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s start with a <span className="text-gradient-warm">free demo</span></>}
        subtitle="No obligation. Just a step towards better results."
        crumbs={crumbs}
      />
      <div className="-mt-16"><CtaSection settings={settings} curricula={curricula.map((c) => c.title)} /></div>
    </>
  );
}
