import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Calculator, PencilRuler } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { CurriculumData } from "@/lib/defaults";

export function OLevelSpotlight({ intro, curriculum }: { intro: string; curriculum: CurriculumData | null }) {
  const topics = (curriculum?.topics ?? []).map((t) => t.split(":")[0]);
  return (
    <section id="o-level" className="section overflow-hidden">
      <div className="absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brandorange-500/10 blur-[140px]" />
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <span className="eyebrow border-sun-400/40 bg-sun-400/10 text-sun-400">★ Our Speciality</span>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                O-Level <span className="text-gradient-warm">Mathematics</span>
                <span className="mt-2 block text-2xl font-bold text-teal-300 sm:text-3xl">Cambridge CAIE · Syllabus 4024</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{intro}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Concepts Made Simple", "Past-Paper Practice", "Exam Strategies", "One-to-One Online Sessions", "Topical Worksheets & Quizzes", "Progress Reports for Parents"].map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600">
                    <Check className="h-4 w-4 text-navy-950" strokeWidth={3} />
                  </span>
                  {t}
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-8 grid gap-4 sm:grid-cols-2">
              <SpotlightCard className="p-5">
                <PencilRuler className="h-7 w-7 text-sun-400" />
                <p className="mt-3 font-display text-lg font-bold text-white">Paper 1 · Non-calculator</p>
                <p className="mt-1 text-sm text-slate-400">2 hours · 100 marks · 50%. Mental methods, fractions, algebra fluency.</p>
              </SpotlightCard>
              <SpotlightCard className="p-5">
                <Calculator className="h-7 w-7 text-teal-300" />
                <p className="mt-3 font-display text-lg font-bold text-white">Paper 2 · Calculator</p>
                <p className="mt-1 text-sm text-slate-400">2 hours · 100 marks · 50%. Multi-step problems, trigonometry, statistics.</p>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/o-level-maths-tutor">Explore O-Level programme <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/contact" variant="ghost">Free O-Level demo</ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto max-w-md [perspective:1200px]">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-teal-400/30 via-transparent to-brandorange-500/30 blur-2xl" />
              <div className="relative rotate-2 overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl shadow-black/60 transition-transform duration-700 [transform:rotateY(-10deg)_rotateX(4deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)]">
                <Image
                  src="/flyers/o-level-maths-tutor.jpg"
                  alt="O-Level Maths Tutor flyer: Learn, Practice, Excel. Concepts made simple, past-paper practice, exam strategies and one-to-one online sessions."
                  width={1199}
                  height={1312}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 90vw, 440px"
                />
              </div>
              {topics.length > 0 && (
                <div className="glass-strong absolute -bottom-12 -left-4 hidden w-64 rounded-2xl p-4 shadow-2xl shadow-black/60 sm:block lg:-left-20">
                  <p className="text-xs font-bold uppercase tracking-widest text-teal-300">Full 4024 syllabus</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {topics.slice(0, 10).map((t) => (
                      <span key={t} className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-medium text-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              <Link href="/contact" className="absolute -right-3 -top-5 rotate-6 rounded-2xl bg-gradient-to-r from-brandorange-500 to-sun-400 px-4 py-3 font-display text-sm font-extrabold text-navy-950 shadow-xl shadow-brandorange-500/40 transition hover:rotate-0">
                FREE Trial Session!
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
