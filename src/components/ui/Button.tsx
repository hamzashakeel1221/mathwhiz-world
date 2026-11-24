import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brandorange-500 via-brandorange-400 to-sun-400 text-navy-950 shadow-[0_10px_40px_-10px_rgba(248,145,30,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(248,145,30,0.9)]",
  secondary:
    "bg-gradient-to-r from-teal-400 to-teal-500 text-navy-950 shadow-[0_10px_40px_-12px_rgba(44,203,192,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(44,203,192,0.9)]",
  ghost: "border border-white/15 bg-white/5 text-white backdrop-blur hover:border-teal-300/50 hover:bg-white/10",
  whatsapp: "bg-[#25D366] text-navy-950 shadow-[0_10px_40px_-12px_rgba(37,211,102,0.8)] hover:bg-[#2fe476]",
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

export function ButtonLink({
  href, children, variant = "primary", className, external, ...rest
}: { href: string; children: ReactNode; variant?: Variant; className?: string; external?: boolean } & Omit<ComponentProps<"a">, "href">) {
  const cls = cn(base, styles[variant], className);
  const shine = (
    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {shine}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {shine}
      {children}
    </Link>
  );
}

export function Button({ children, variant = "primary", className, ...rest }: { variant?: Variant } & ComponentProps<"button">) {
  return (
    <button className={cn(base, styles[variant], className)} {...rest}>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      {children}
    </button>
  );
}
