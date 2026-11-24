import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow, title, subtitle, crumbs, children,
}: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; crumbs: { name: string; path: string }[]; children?: ReactNode }) {
  return (
    <section className="noise relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,#143a6e_0%,#0b1a38_45%,#060f24_80%)]" />
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-teal-500/20 blur-[110px]" />
      <div className="absolute -right-32 top-32 -z-10 h-96 w-96 rounded-full bg-brandorange-500/15 blur-[110px]" />
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {i < crumbs.length - 1 ? <Link href={c.path} className="hover:text-white">{c.name}</Link> : <span className="text-slate-200">{c.name}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <Reveal className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">{title}</h1>
          {subtitle && <p className="mt-6 text-lg leading-relaxed text-slate-300">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
