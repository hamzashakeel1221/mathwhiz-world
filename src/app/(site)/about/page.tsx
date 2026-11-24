import Image from "next/image";
import { Heart, Globe2, Lightbulb, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { Method } from "@/components/home/Method";
import { CtaSection } from "@/components/home/CtaSection";
import { getCurricula, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "About MathWhiz World Academy | Online Maths Tutors in Islamabad",
  description: "MathWhiz World Academy is an online maths academy in Islamabad, Pakistan, teaching O Level, IGCSE and GCSE students worldwide. Better concepts, brighter futures.",
  path: "/about",
});

const VALUES = [
  { Icon: Lightbulb, title: "Concepts first", text: "We teach understanding, not memorising." },
  { Icon: Heart, title: "Every student can succeed", text: "Patient, encouraging and supportive teaching." },
  { Icon: Globe2, title: "Worldwide classroom", text: "Students across time zones, one shared goal." },
  { Icon: ShieldCheck, title: "Transparent progress", text: "Regular reports so parents always know where things stand." },
];

export default async function AboutPage() {
  const [settings, curricula] = await Promise.all([getSettings(), getCurricula()]);
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="About us"
        title={<>Your online maths <span className="text-gradient">learning partner</span></>}
        subtitle="Building strong concepts, one lesson at a time."
        crumbs={crumbs}
      />
      <section className="section pt-4">
        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="prose-mw text-lg">
              {settings.aboutText.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <p className="mt-6 font-hand text-3xl text-sun-400">Better concepts. Brighter futures.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-3xl border border-white/10"><Image src="/flyers/build-concepts.jpg" alt="Build concepts, build confidence: MathWhiz World Academy services flyer" width={1122} height={1402} className="h-auto w-full" sizes="(max-width:1024px) 50vw, 300px" /></div>
              <div className="mt-12 overflow-hidden rounded-3xl border border-white/10"><Image src="/flyers/learning-partner.jpg" alt="Your online maths learning partner: one-to-one online maths sessions, Year 4 to 11" width={1092} height={1440} className="h-auto w-full" sizes="(max-width:1024px) 50vw, 300px" /></div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="glass h-full rounded-3xl p-6">
                  <Icon className="h-8 w-8 text-teal-300" />
                  <h2 className="mt-4 font-display text-lg font-bold text-white">{title}</h2>
                  <p className="mt-2 text-sm text-slate-400">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <Method />
      <CtaSection settings={settings} curricula={curricula.map((c) => c.title)} />
    </>
  );
}
