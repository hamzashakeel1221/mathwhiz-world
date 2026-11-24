"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

export function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.question} className={`rounded-2xl border transition-colors ${isOpen ? "border-teal-300/40 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]"}`}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-bold text-white sm:text-lg"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
              >
                {f.question}
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-teal-300">
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-slate-300">{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
