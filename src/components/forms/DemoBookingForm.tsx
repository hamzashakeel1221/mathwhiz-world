"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { bookDemo } from "@/app/actions";
import { initialFormState } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

const YEARS = ["Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12+ / A Level", "Other"];

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs font-medium text-rose-300">{errors[0]}</p>;
}

export function DemoBookingForm({ curricula, defaultCurriculum }: { curricula: string[]; defaultCurriculum?: string }) {
  const [state, action, pending] = useActionState(bookDemo, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);
  const [tz, setTz] = useState("");
  useEffect(() => setTz(Intl.DateTimeFormat().resolvedOptions().timeZone), []);

  return (
    <div className="relative">
      <AnimatePresence>
        {state.ok && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-start gap-3 rounded-2xl border border-teal-300/40 bg-teal-400/10 p-4 text-sm text-teal-100"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" /> {state.message}
          </motion.div>
        )}
      </AnimatePresence>
      {!state.ok && state.message && (
        <p className="mb-4 rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200" role="alert">{state.message}</p>
      )}
      <form ref={formRef} action={action} className="grid gap-4 sm:grid-cols-2" noValidate>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input type="hidden" name="timezone" value={tz} />
        <div>
          <label className="label" htmlFor="studentName">Student name *</label>
          <input id="studentName" name="studentName" className="input" placeholder="e.g. Ayesha Khan" required />
          <FieldError errors={state.errors?.studentName} />
        </div>
        <div>
          <label className="label" htmlFor="parentName">Parent name</label>
          <input id="parentName" name="parentName" className="input" placeholder="Optional" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" className="input" placeholder="you@example.com" required />
          <FieldError errors={state.errors?.email} />
        </div>
        <div>
          <label className="label" htmlFor="whatsapp">WhatsApp / phone *</label>
          <input id="whatsapp" name="whatsapp" type="tel" className="input" placeholder="+44 7700 900000" required />
          <FieldError errors={state.errors?.whatsapp} />
        </div>
        <div>
          <label className="label" htmlFor="curriculum">Curriculum *</label>
          <select id="curriculum" name="curriculum" className="input" defaultValue={defaultCurriculum ?? curricula[0]} required>
            {curricula.map((c) => <option key={c} value={c}>{c}</option>)}
            <option value="Other">Other / not sure</option>
          </select>
          <FieldError errors={state.errors?.curriculum} />
        </div>
        <div>
          <label className="label" htmlFor="yearLevel">Year / grade</label>
          <select id="yearLevel" name="yearLevel" className="input" defaultValue="">
            <option value="">Select year</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="country">Country</label>
          <input id="country" name="country" className="input" placeholder="e.g. Pakistan, UK, UAE" />
        </div>
        <div>
          <label className="label" htmlFor="preferredTime">Preferred days / time</label>
          <input id="preferredTime" name="preferredTime" className="input" placeholder="e.g. Weekdays after 5pm" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="message">What would you like help with?</label>
          <textarea id="message" name="message" rows={4} className="input resize-none" placeholder="Topics, upcoming exams, target grade…" />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={pending} className="w-full py-4 text-base">
            {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            {pending ? "Sending…" : "Book my FREE demo class"}
          </Button>
          <p className="mt-3 text-center text-xs text-slate-400">No obligation. Just a step towards better results.</p>
        </div>
      </form>
    </div>
  );
}
