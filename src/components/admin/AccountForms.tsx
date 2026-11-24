"use client";

import { useActionState } from "react";
import { addAdmin, changePassword } from "@/app/admin/actions";
import { initialFormState, type FormState } from "@/lib/validation";
import { Field, btn } from "./ui";

function Msg({ state }: { state: FormState }) {
  if (!state.message) return null;
  return <p className={`rounded-xl border p-3 text-sm ${state.ok ? "border-teal-300/40 bg-teal-400/10 text-teal-100" : "border-rose-400/40 bg-rose-500/10 text-rose-200"}`}>{state.message}</p>;
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, initialFormState);
  return (
    <form action={action} className="space-y-3">
      <Msg state={state} />
      <Field label="Current password"><input name="current" type="password" autoComplete="current-password" required className="input py-2" /></Field>
      <Field label="New password" hint="At least 10 characters."><input name="next" type="password" autoComplete="new-password" required className="input py-2" /></Field>
      <Field label="Confirm new password"><input name="confirm" type="password" autoComplete="new-password" required className="input py-2" /></Field>
      <button disabled={pending} className={btn.primary}>{pending ? "Saving…" : "Update password"}</button>
    </form>
  );
}

export function AddAdminForm() {
  const [state, action, pending] = useActionState(addAdmin, initialFormState);
  return (
    <form action={action} className="space-y-3">
      <Msg state={state} />
      <Field label="Name"><input name="name" required className="input py-2" /></Field>
      <Field label="Email"><input name="email" type="email" required className="input py-2" /></Field>
      <Field label="Password" hint="At least 10 characters."><input name="password" type="password" autoComplete="new-password" required className="input py-2" /></Field>
      <button disabled={pending} className={btn.primary}>{pending ? "Adding…" : "Add admin"}</button>
    </form>
  );
}
