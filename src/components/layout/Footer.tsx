import Link from "next/link";
import { Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { WhatsAppIcon } from "./WhatsAppButton";
import { siteConfig, whatsappLink } from "@/lib/site";
import type { CurriculumData } from "@/lib/defaults";

export function Footer({ settings, curricula }: { settings: Record<string, string>; curricula: CurriculumData[] }) {
  const socials = [
    { href: settings.facebookUrl, label: "Facebook", Icon: Facebook },
    { href: settings.instagramUrl, label: "Instagram", Icon: Instagram },
    { href: settings.youtubeUrl, label: "YouTube", Icon: Youtube },
  ].filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-950">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <LogoMark className="h-14 w-16" />
            <span>
              <span className="block font-display text-lg font-extrabold text-white">MATHWHIZ WORLD</span>
              <span className="block text-xs font-semibold tracking-[0.4em] text-teal-300">ACADEMY</span>
            </span>
          </Link>
          <p className="mt-5 font-hand text-2xl text-sun-400">{siteConfig.taglines.primary}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Personalised one-to-one online maths tutoring for O-Level, IGCSE, GCSE and Cambridge learners worldwide.
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-teal-300/50 hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Curricula</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {curricula.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link href={`/curricula/${c.slug}`} className={`transition hover:text-white ${c.featured && c.code === "4024" ? "font-semibold text-sun-400" : "text-slate-400"}`}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-slate-400">
            {[
              ["/o-level-maths-tutor", "O-Level Maths Tutor"],
              ["/curricula", "All Curricula"],
              ["/about", "About Us"],
              ["/reviews", "Reviews"],
              ["/faq", "FAQ"],
              ["/contact", "Book a Free Demo"],
            ].map(([href, label]) => (
              <li key={href}><Link href={href} className="transition hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-sm text-slate-300">
            <li>
              <a href={`mailto:${settings.contactEmail}`} className="flex items-start gap-3 transition hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" /> <span className="break-all">{settings.contactEmail}</span>
              </a>
            </li>
            <li>
              <a href={whatsappLink(settings.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition hover:text-white">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" /> {settings.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" /> {settings.location} · Teaching worldwide</li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" /> Flexible timings in your time zone</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="font-hand text-base text-slate-400">Because every student can succeed ♡</p>
        </div>
      </div>
    </footer>
  );
}
