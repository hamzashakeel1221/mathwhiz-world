import Image from "next/image";
import { ArrowRight, Check, X, Target, Timer, BookOpenCheck, LineChart } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TopicsGrid, ExamStructure } from "@/components/CurriculumDetail";
import { CtaSection } from "@/components/home/CtaSection";
import { Testimonials } from "@/components/home/Testimonials";
import { getApprovedReviews, getCurricula, getFaqs, getSettings } from "@/lib/data";
import { defaultCurricula } from "@/lib/defaults";
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "O Level Maths Tutor Online | Cambridge O Level Mathematics 4024",
  description:
    "Struggling with O-Level Maths? Expert one-to-one online tutoring for Cambridge O Level Mathematics 4024. Concepts made simple, past-paper practice and exam strategies for Paper 1 & 2. Free demo class.",
  path: "/o-level-maths-tutor",
  keywords: [
    "O Level maths tutor", "O Level Mathematics 4024", "online O Level maths tuition", "O Level maths tutor Pakistan",
    "O Level maths tutor Islamabad", "O Level maths past papers help", "CAIE O Level maths", "O Level D Maths tutor",
  ],
});

const PROBLEMS = [
  "Formulas memorised but not understood",
  "Losing marks on non-calculator Paper 1",
  "Running out of time in the exam",
  "Struggling with word problems & multi-step questions",
];
const SOLUTIONS = [
  "Concepts explained step by step, with visuals",
  "Targeted mental-maths and non-calculator drills",
  "Timed past papers & exam time-management strategy",
  "Mark-scheme based answer technique",
];

const PLAN = [
  { Icon: Target, title: "Diagnostic & target grade", text: "The free demo identifies strengths, gaps and a realistic target grade." },
  { Icon: BookOpenCheck, title: "Topic-by-topic mastery", text: "A personalised plan through all 4024 topics with worksheets and quizzes." },
  { Icon: Timer, title: "Past papers & timing", text: "Topical, then full timed past papers with mark-scheme walkthroughs." },
  { Icon: LineChart, title: "Progress reports", text: "Regular updates for parents with scores and next steps." },
];

export default async function OLevelPage() {
  const [curricula, settings, faqs, reviews] = await Promise.all([getCurricula(), getSettings(), getFaqs(), getApprovedReviews(12)]);
  const c = curricula.find((x) => x.code === "4024") ?? defaultCurricula[0];
  const crumbs = [{ name: "Home", path: "/" }, { name: "O-Level Maths Tutor", path: "/o-level-maths-tutor" }];
  const olFaqs = faqs.filter((f) => /o level|o-level|demo|online|progress/i.test(f.question + f.category)).slice(0, 6);

  return (
    <>
      <JsonLd data={[courseJsonLd(c), breadcrumbJsonLd(crumbs), faqJsonLd(olFaqs)]} />
      <PageHero
        eyebrow="Cambridge O Level · Syllabus 4024"
        title={<>O-Level <span className="text-gradient-warm">Maths Tutor</span> online</>}
        subtitle={settings.oLevelIntro}
        crumbs={crumbs}
      >
        <p className="mt-6 font-hand text-3xl text-sun-400">Learn · Practice · Excel</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#book" className="px-8 py-4 text-base">Book a FREE trial session <ArrowRight className="h-5 w-5" /></ButtonLink>
          <ButtonLink href="#syllabus" variant="ghost" className="px-7 py-4 text-base">View syllabus</ButtonLink>
        </div>
      </PageHero>

      <section className="section pt-4">
        <div className="container grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-rose-400/20 bg-rose-500/[0.06] p-7">
              <h2 className="font-display text-2xl font-bold text-white">Struggling with O-Level Maths?</h2>
              <ul className="mt-5 space-y-3">
                {PROBLEMS.map((p) => <li key={p} className="flex gap-3 text-slate-300"><X className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" /> {p}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-teal-300/30 bg-teal-400/[0.07] p-7">
              <h2 className="font-display text-2xl font-bold text-white">Let&apos;s make it easier.</h2>
              <ul className="mt-5 space-y-3">
                {SOLUTIONS.map((p) => <li key={p} className="flex gap-3 text-slate-200"><Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" /> {p}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHeading eyebrow="Your O-Level journey" title={<>A clear plan to your <span className="text-gradient">best grade</span></>} />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PLAN.map(({ Icon, title, text }, i) => (
              <StaggerItem key={title}>
                <div className="glass relative h-full rounded-3xl p-6">
                  <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-white/5">{i + 1}</span>
                  <Icon className="h-8 w-8 text-sun-400" />
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div id="syllabus" />
      <TopicsGrid c={c} />
      <ExamStructure c={c} />

      <section className="section pt-0">
        <div className="container">
          <SectionHeading eyebrow="From our flyers" title="O-Level Mathematics at MathWhiz World" />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { src: "/flyers/o-level-mathematics.jpg", w: 1122, h: 1402, alt: "O-Level Mathematics CAIE & Cambridge flyer: IGCSE, GCSE, Edexcel, AQA. Book your free demo class today." },
              { src: "/flyers/caie-cambridge.jpg", w: 1122, h: 1402, alt: "CAIE Cambridge Maths Tutoring flyer, Year 4 to Year 10, including O Level Mathematics 4024." },
            ].map((f, i) => (
              <Reveal key={f.src} delay={i * 0.1}>
                <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50 transition duration-500 hover:-translate-y-2 hover:rotate-1">
                  <Image src={f.src} alt={f.alt} width={f.w} height={f.h} className="h-auto w-full" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials reviews={reviews} />

      {olFaqs.length > 0 && (
        <section className="section pt-0">
          <div className="container max-w-3xl">
            <SectionHeading eyebrow="O-Level FAQ" title="Common questions" />
            <FaqAccordion faqs={olFaqs} />
          </div>
        </section>
      )}

      <CtaSection settings={settings} curricula={curricula.map((x) => x.title)} defaultCurriculum={c.title} />
    </>
  );
}
