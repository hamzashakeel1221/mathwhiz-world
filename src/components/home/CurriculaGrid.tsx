import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { CurriculumData } from "@/lib/defaults";
import { cn } from "@/lib/utils";

export const accentClasses: Record<string, string> = {
  orange: "from-brandorange-500 to-sun-400",
  teal: "from-teal-400 to-teal-600",
  blue: "from-sky-400 to-navy-500",
  violet: "from-violet-400 to-fuchsia-500",
};

export function CurriculumCard({ c, big = false }: { c: CurriculumData; big?: boolean }) {
  return (
    <Link href={`/curricula/${c.slug}`} className="block h-full" aria-label={c.title}>
      <SpotlightCard className={cn("group flex h-full flex-col overflow-hidden p-6", big && "p-8")}>
        <div className="flex items-start justify-between gap-4">
          <span className={cn("rounded-xl bg-gradient-to-br px-3 py-1.5 font-display text-sm font-extrabold text-navy-950", accentClasses[c.accent] ?? accentClasses.teal)}>
            {c.code ?? c.level}
          </span>
          <ArrowUpRight className="h-5 w-5 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-300" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-teal-300">{c.board} · {c.yearRange}</p>
        <h3 className={cn("mt-2 font-display font-extrabold text-white", big ? "text-3xl sm:text-4xl" : "text-xl")}>{c.title}</h3>
        <p className={cn("mt-3 leading-relaxed text-slate-400", big ? "text-base" : "text-sm")}>{big ? c.summary : c.tagline}</p>
        {big && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {c.highlights.slice(0, 6).map((h) => (
              <li key={h} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">{h}</li>
            ))}
          </ul>
        )}
        <span className="mt-auto pt-6 text-sm font-bold text-sun-400">Learn more →</span>
      </SpotlightCard>
    </Link>
  );
}

export function CurriculaGrid({ curricula }: { curricula: CurriculumData[] }) {
  const [first, ...rest] = curricula;
  return (
    <section id="curricula" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Curricula & exam boards"
          title={<>For students at <span className="text-gradient">all levels</span>, Year 4 to 11</>}
          subtitle="Cambridge, CAIE, IGCSE, O-Level, GCSE, Edexcel, AQA and more. Complete support for your child's maths journey."
        />
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {first && (
            <StaggerItem className="md:col-span-2 lg:row-span-2">
              <CurriculumCard c={first} big />
            </StaggerItem>
          )}
          {rest.map((c) => (
            <StaggerItem key={c.slug}><CurriculumCard c={c} /></StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
