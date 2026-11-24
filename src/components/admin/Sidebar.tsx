"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, CalendarCheck, Star, BookOpen, HelpCircle, Sparkles, Settings, UserCog, LogOut, Menu, X, ExternalLink } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { logout } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Demo bookings", Icon: CalendarCheck, badge: "bookings" },
  { href: "/admin/reviews", label: "Reviews", Icon: Star, badge: "reviews" },
  { href: "/admin/curricula", label: "Curricula", Icon: BookOpen },
  { href: "/admin/services", label: "Services", Icon: Sparkles },
  { href: "/admin/faqs", label: "FAQs", Icon: HelpCircle },
  { href: "/admin/settings", label: "Site content", Icon: Settings },
  { href: "/admin/account", label: "Account & admins", Icon: UserCog },
] as const;

export function Sidebar({ name, counts }: { name: string; counts: { bookings: number; reviews: number } }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {LINKS.map(({ href, label, Icon, ...rest }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        const badge = "badge" in rest ? counts[rest.badge] : 0;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
              active ? "bg-gradient-to-r from-teal-400/20 to-transparent text-white ring-1 ring-teal-300/30" : "text-slate-400 hover:bg-white/5 hover:text-white",
            )}
          >
            <Icon className={cn("h-4 w-4", active && "text-teal-300")} />
            <span className="flex-1">{label}</span>
            {badge > 0 && <span className="rounded-full bg-brandorange-500 px-2 py-0.5 text-[10px] font-bold text-navy-950">{badge}</span>}
          </Link>
        );
      })}
    </nav>
  );
  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#070d1f]/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/admin" className="flex items-center gap-2 font-display font-bold"><LogoMark className="h-8 w-9" /> Admin</Link>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="rounded-lg border border-white/10 p-2">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0a1430] p-4 transition-transform lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}>
        <Link href="/admin" className="mb-6 flex items-center gap-2 px-2">
          <LogoMark className="h-10 w-11" />
          <span className="leading-tight"><span className="block font-display text-sm font-extrabold">MATHWHIZ</span><span className="block text-[10px] tracking-[0.3em] text-teal-300">ADMIN</span></span>
        </Link>
        {nav}
        <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
          <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 hover:text-white"><ExternalLink className="h-4 w-4" /> View website</a>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 hover:text-rose-300"><LogOut className="h-4 w-4" /> Sign out</button>
          </form>
          <p className="truncate px-3 pt-2 text-xs text-slate-500">Signed in as {name}</p>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
    </>
  );
}
