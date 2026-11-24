import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-white/10 bg-white/[0.03] p-5", className)}>{children}</div>;
}

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "teal" | "orange" | "green" | "red" | "blue" }) {
  const tones = {
    slate: "bg-white/10 text-slate-300",
    teal: "bg-teal-400/15 text-teal-300",
    orange: "bg-brandorange-500/15 text-brandorange-300",
    green: "bg-emerald-400/15 text-emerald-300",
    red: "bg-rose-400/15 text-rose-300",
    blue: "bg-sky-400/15 text-sky-300",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone])}>{children}</span>;
}

export const btn = {
  primary: "inline-flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-4 py-2.5 text-sm font-bold text-navy-950 transition hover:bg-teal-300 disabled:opacity-60",
  ghost: "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10",
  danger: "inline-flex items-center justify-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20",
};

export function Field({ label, children, hint, className }: { label: string; children: ReactNode; hint?: string; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="label">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-slate-400">{children}</div>;
}
