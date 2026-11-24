"use client";

import { useActionState, useState } from "react";
import { Loader2, Star, CheckCircle2 } from "lucide-react";
import { submitReview } from "@/app/actions";
import { initialFormState } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export function ReviewForm({ curricula }: { curricula: string[] }) {
  const [state, action, pending] = useActionState(submitReview, initialFormState);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  if (state.ok) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-teal-300/40 bg-teal-400/10 p-4 text-sm text-teal-100" role="status">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" /> {state.message}
      </div>
    );
  }
  const err = (k: string) => state.errors?.[k]?.[0];
  return (
    <form action={action} className="space-y-4" noValidate>
      {state.message && <p className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200" role="alert">{state.message}</p>}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="rating" value={rating} />
      <div>
        <span className="label">Your rating</span>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} className="transition-transform hover:scale-125">
              <Star className={`h-8 w-8 ${(hover || rating) >= n ? "fill-sun-400 text-sun-400" : "text-slate-600"}`} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="label" htmlFor="r-name">Name *</label>
        <input id="r-name" name="name" className="input" placeholder="e.g. Sara M." />
        {err("name") && <p className="mt-1 text-xs text-rose-300">{err("name")}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="r-role">You are a</label>
          <select id="r-role" name="role" className="input" defaultValue="Student">
            <option>Student</option><option>Parent</option><option>Other</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="r-country">Country</label>
          <input id="r-country" name="country" className="input" placeholder="Optional" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="r-curriculum">Curriculum</label>
        <select id="r-curriculum" name="curriculum" className="input" defaultValue="">
          <option value="">Select (optional)</option>
          {curricula.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="r-content">Your review *</label>
        <textarea id="r-content" name="content" rows={5} className="input resize-none" placeholder="How has MathWhiz World helped you?" />
        {err("content") && <p className="mt-1 text-xs text-rose-300">{err("content")}</p>}
      </div>
      <Button type="submit" variant="secondary" disabled={pending} className="w-full">
        {pending && <Loader2 className="h-4 w-4 animate-spin" />} {pending ? "Submitting…" : "Submit review"}
      </Button>
    </form>
  );
}
