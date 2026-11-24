"use client";

import { useActionState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { login } from "@/app/admin/actions";
import { initialFormState } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialFormState);
  return (
    <form action={action} className="mt-8 space-y-4">
      {state.message && <p className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200" role="alert">{state.message}</p>}
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="input" />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="input" />
      </div>
      <Button type="submit" variant="secondary" disabled={pending} className="w-full py-3.5">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />} Sign in
      </Button>
    </form>
  );
}
