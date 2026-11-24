"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div
        className={cn(
          "mx-auto flex max-w-[1240px] items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled ? "glass-strong shadow-2xl shadow-black/30" : "border border-transparent bg-transparent",
        )}
      >
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  l.highlight ? "text-sun-400 hover:text-sun-500" : "text-slate-300 hover:text-white",
                  active && "text-white",
                )}
              >
                {active && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                {l.highlight && <Sparkles className="mr-1 inline h-3.5 w-3.5" />}
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-to-r from-brandorange-500 to-sun-400 px-5 py-2.5 text-sm font-bold text-navy-950 shadow-lg shadow-brandorange-500/30 transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Free Demo Class
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-auto mt-2 max-w-[1240px] rounded-2xl p-4 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {[{ href: "/", label: "Home" }, ...navLinks].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link
                    href={l.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-semibold",
                      pathname === l.href ? "bg-white/10 text-white" : "text-slate-300",
                      "highlight" in l && l.highlight && "text-sun-400",
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/contact" className="mt-3 rounded-xl bg-gradient-to-r from-brandorange-500 to-sun-400 px-4 py-3 text-center font-bold text-navy-950">
                Book a FREE Demo Class
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
