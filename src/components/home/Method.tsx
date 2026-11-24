"use client";

import { motion } from "framer-motion";
import { Lightbulb, PenLine, Puzzle, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  { Icon: Lightbulb, title: "Understand", text: "Concepts first, formula second. We explain the 'why' with visuals on a live whiteboard.", color: "#2ccbc0" },
  { Icon: PenLine, title: "Practice", text: "Guided examples, topical worksheets and quizzes build accuracy and fluency.", color: "#7bb4ff" },
  { Icon: Puzzle, title: "Apply", text: "Exam-style and past-paper questions teach students to apply ideas to new problems.", color: "#ffd23f" },
  { Icon: Trophy, title: "Succeed", text: "Exam strategies, timing and confidence. Walk into the exam ready to achieve.", color: "#f8911e" },
];

export function Method() {
  return (
    <section className="section overflow-hidden bg-gradient-to-b from-transparent via-navy-900/60 to-transparent">
      <div className="container">
        <SectionHeading
          eyebrow="Our method"
          title={<>Understand. Practice. Apply. <span className="text-gradient-warm">Succeed.</span></>}
          subtitle="A proven four-step learning cycle behind every lesson, building strong concepts one lesson at a time."
        />
        <div className="relative grid gap-6 md:grid-cols-4">
          <svg className="absolute left-0 top-12 hidden h-2 w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
            <motion.line
              x1="5" y1="1" x2="95" y2="1" stroke="url(#method-line)" strokeWidth="0.6" strokeDasharray="2 1.2"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="method-line"><stop offset="0" stopColor="#2ccbc0" /><stop offset="1" stopColor="#f8911e" /></linearGradient>
            </defs>
          </svg>
          {STEPS.map(({ Icon, title, text, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.18, duration: 0.6 }}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-white/15 bg-navy-900 shadow-2xl"
                style={{ boxShadow: `0 20px 60px -20px ${color}` }}
              >
                <Icon className="h-10 w-10" style={{ color }} />
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white font-display text-sm font-extrabold text-navy-950">
                  {i + 1}
                </span>
              </motion.div>
              <h3 className="mt-6 font-display text-2xl font-extrabold text-white">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-400">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
