"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Globe2, Sparkles, UserRound, CalendarClock } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackground } from "@/components/three/Scenes";
import { WhatsAppIcon } from "@/components/layout/WhatsAppButton";
import { whatsappLink } from "@/lib/site";

const WORDS = ["O-Level 4024", "IGCSE 0580", "Add Maths 0606", "GCSE 9–1", "Edexcel", "AQA", "Cambridge"];

export function Hero({ settings }: { settings: Record<string, string> }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_left,#143a6e_0%,#0b1a38_40%,#060f24_75%)]" />
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute -left-40 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-teal-500/20 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-brandorange-500/15 blur-[120px]" />
      <div className="absolute inset-0 -z-10 opacity-40 md:opacity-100"><HeroBackground /></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-gradient-to-r from-navy-950/70 via-navy-950/30 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-navy-950" />

      <div className="container relative">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow border-sun-400/40 bg-sun-400/10 text-sun-400">
              <Sparkles className="h-3.5 w-3.5" /> {settings.heroBadge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {settings.heroTitle} <span className="text-gradient">{settings.heroHighlight}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center gap-3 text-lg font-semibold text-slate-200 sm:text-xl"
          >
            <span>Online tutoring for</span>
            <span className="relative inline-flex h-11 min-w-[12rem] items-center overflow-hidden rounded-xl border border-teal-300/30 bg-teal-400/10 px-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[i]}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="whitespace-nowrap font-display text-teal-300"
                >
                  {WORDS[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="/contact" className="px-8 py-4 text-base">
              Book a FREE Demo Class <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={whatsappLink(settings.whatsappNumber)} external variant="ghost" className="px-7 py-4 text-base">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp us
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
            className="mt-10 grid max-w-xl grid-cols-2 gap-3 text-sm text-slate-200 sm:grid-cols-4"
          >
            {[
              { Icon: UserRound, t: "One-to-one" },
              { Icon: CheckCircle2, t: "Year 4 – 11" },
              { Icon: Globe2, t: "Worldwide" },
              { Icon: CalendarClock, t: "Flexible timings" },
            ].map(({ Icon, t }) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="glass flex items-center gap-2 rounded-xl px-3 py-2.5"
              >
                <Icon className="h-4 w-4 shrink-0 text-teal-300" /> {t}
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 font-hand text-2xl text-sun-400 sm:text-3xl"
          >
            Understand. Practice. Apply. Succeed.
          </motion.p>
        </div>

        {/* Floating info card over the 3D scene */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-0 right-6 hidden animate-float xl:block"
        >
          <div className="glass gradient-border w-72 rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-300">Cambridge O Level</p>
            <p className="mt-1 font-display text-2xl font-extrabold text-white">Mathematics 4024</p>
            <div className="mt-4 space-y-3">
              {[
                ["Paper 1 · Non-calculator", 92],
                ["Paper 2 · Calculator", 88],
              ].map(([label, v]) => (
                <div key={label as string}>
                  <div className="flex justify-between text-xs text-slate-300"><span>{label}</span><span className="text-sun-400">Exam-ready</span></div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${v}%` }}
                      transition={{ delay: 1.6, duration: 1.4, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-sun-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <motion.span animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-2 w-1 rounded-full bg-teal-300" />
        </div>
      </motion.div>
    </section>
  );
}
