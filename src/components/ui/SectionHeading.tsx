import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow, title, subtitle, align = "center", className,
}: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; align?: "center" | "left"; className?: string }) {
  return (
    <Reveal className={cn("mb-14 max-w-3xl", align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
