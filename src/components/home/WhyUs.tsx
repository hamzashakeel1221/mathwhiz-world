import { Brain, Target, Users, Star } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const REASONS = [
  { Icon: Target, title: "Concepts first, formula second", text: "Students learn why methods work, so they can tackle unfamiliar questions." },
  { Icon: Users, title: "Interactive & supportive style", text: "Friendly, patient teaching that makes students comfortable asking questions." },
  { Icon: Brain, title: "Understanding, not memorising", text: "Deep understanding that lasts beyond the exam and into A Level." },
  { Icon: Star, title: "Build confidence & reach goals", text: "Clear targets, regular feedback and visible progress every week." },
];

const STATS = [
  { to: 8, suffix: "+", label: "Curricula & exam boards" },
  { to: 100, suffix: "%", label: "One-to-one, personalised" },
  { to: 24, suffix: "/7", label: "WhatsApp enquiries" },
  { to: 0, suffix: "", label: "Cost of your demo class", prefix: "$" },
];

export function WhyUs() {
  return (
    <section className="section">
      <div className="container">
        <div className="glass gradient-border relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brandorange-500/20 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow">Why MathWhiz World Academy?</span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                Better concepts.<br /><span className="text-gradient">Brighter futures.</span>
              </h2>
              <p className="mt-5 max-w-md text-slate-300">Build concepts. Build confidence. Because every student can succeed.</p>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-navy-950/40 p-5">
                    <p className="font-display text-4xl font-extrabold text-white">
                      {s.prefix}<Counter to={s.to} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Stagger className="grid gap-4 self-center">
              {REASONS.map(({ Icon, title, text }) => (
                <StaggerItem key={title}>
                  <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-teal-300/40 hover:bg-white/[0.06]">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-400/15 text-teal-300"><Icon className="h-6 w-6" /></span>
                    <div>
                      <h3 className="font-display font-bold text-white">{title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
