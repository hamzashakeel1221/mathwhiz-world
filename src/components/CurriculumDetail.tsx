import { CheckCircle2, Clock, FileText, Percent } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CurriculumData } from "@/lib/defaults";

export function TopicsGrid({ c }: { c: CurriculumData }) {
  if (!c.topics.length) return null;
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Syllabus coverage" title={<>Every topic, <span className="text-gradient">explained clearly</span></>} subtitle={`We cover the complete ${c.shortTitle} syllabus, at your pace.`} />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.topics.map((t, i) => {
            const [head, ...rest] = t.split(":");
            return (
              <StaggerItem key={t}>
                <div className="glass group h-full rounded-2xl p-5 transition hover:-translate-y-1 hover:border-teal-300/40">
                  <span className="font-display text-3xl font-extrabold text-white/10 transition group-hover:text-teal-300/40">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">{head}</h3>
                  {rest.length > 0 && <p className="mt-1 text-sm text-slate-400">{rest.join(":").trim()}</p>}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export function ExamStructure({ c }: { c: CurriculumData }) {
  if (!c.examStructure?.length) return null;
  return (
    <section className="section pt-0">
      <div className="container">
        <SectionHeading eyebrow="Exam format" title="Know your papers" subtitle="Exam structure for the current syllabus. Always confirm details with your school or the exam board." />
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {c.examStructure.map((p) => (
            <Reveal key={p.name}>
              <div className="glass gradient-border h-full rounded-3xl p-6">
                <FileText className="h-7 w-7 text-sun-400" />
                <h3 className="mt-3 font-display text-xl font-bold text-white">{p.name}</h3>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl bg-white/5 p-3"><dt className="flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" /> Time</dt><dd className="mt-1 font-semibold text-white">{p.duration}</dd></div>
                  <div className="rounded-xl bg-white/5 p-3"><dt className="text-xs text-slate-400">Marks</dt><dd className="mt-1 font-semibold text-white">{p.marks}</dd></div>
                  <div className="rounded-xl bg-white/5 p-3"><dt className="flex items-center gap-1 text-xs text-slate-400"><Percent className="h-3 w-3" /> Weight</dt><dd className="mt-1 font-semibold text-white">{p.weight}</dd></div>
                </dl>
                {p.note && <p className="mt-3 text-xs text-slate-400">{p.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Highlights({ c }: { c: CurriculumData }) {
  return (
    <section className="section pb-0">
      <div className="container grid gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">About this programme</span>
          <div className="prose-mw mt-6 text-lg">
            {c.description.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-7">
            <h2 className="font-display text-xl font-bold text-white">What you get</h2>
            <ul className="mt-5 space-y-3">
              {c.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-slate-200"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" /> {h}</li>
              ))}
              {["One-to-one live online sessions", "Interactive whiteboard", "Flexible worldwide timings", "Homework & doubt support"].map((h) => (
                <li key={h} className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sun-400" /> {h}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
