"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function ConfirmButton({ children, message = "Are you sure? This cannot be undone.", className }: { children: ReactNode; message?: string; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}
    >
      {children}
    </button>
  );
}

export function SubmitButton({ children, className }: { children: ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className={className}>{pending ? "Saving…" : children}</button>;
}
