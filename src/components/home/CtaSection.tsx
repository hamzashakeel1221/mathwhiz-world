import { Mail, MapPin } from "lucide-react";
import { WaveBackground } from "@/components/three/Scenes";
import { DemoBookingForm } from "@/components/forms/DemoBookingForm";
import { WhatsAppIcon } from "@/components/layout/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/site";

export function CtaSection({ settings, curricula, defaultCurriculum }: { settings: Record<string, string>; curricula: string[]; defaultCurriculum?: string }) {
  return (
    <section id="book" className="section overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-70"><WaveBackground /></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950 via-transparent to-navy-950" />
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <span className="eyebrow border-sun-400/40 bg-sun-400/10 text-sun-400">Free demo class</span>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
              Book your <span className="text-gradient-warm">FREE</span> demo session today
            </h2>
            <p className="mt-5 max-w-md text-lg text-slate-300">
              Tell us about the student and we&apos;ll arrange a free one-to-one demo at a time that suits you, anywhere in the world.
            </p>
            <div className="mt-8 space-y-3">
              <a href={whatsappLink(settings.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-[#25D366]/50">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/15"><WhatsAppIcon className="h-6 w-6 text-[#25D366]" /></span>
                <span><span className="block text-xs uppercase tracking-wider text-slate-400">WhatsApp</span><span className="font-semibold text-white">{settings.whatsappDisplay}</span></span>
              </a>
              <a href={`mailto:${settings.contactEmail}`} className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-teal-300/50">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/15"><Mail className="h-6 w-6 text-teal-300" /></span>
                <span className="min-w-0"><span className="block text-xs uppercase tracking-wider text-slate-400">Email</span><span className="block truncate font-semibold text-white">{settings.contactEmail}</span></span>
              </a>
              <div className="glass flex items-center gap-4 rounded-2xl p-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brandorange-500/15"><MapPin className="h-6 w-6 text-brandorange-400" /></span>
                <span><span className="block text-xs uppercase tracking-wider text-slate-400">Based in</span><span className="font-semibold text-white">{settings.location} · Online worldwide</span></span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="glass-strong gradient-border rounded-[2rem] p-6 sm:p-10">
              <DemoBookingForm curricula={curricula} defaultCurriculum={defaultCurriculum} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
