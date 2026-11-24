"use client";

import { useActionState } from "react";
import { saveSettings } from "@/app/admin/actions";
import { initialFormState } from "@/lib/validation";
import { settingFields } from "@/lib/defaults";
import { Field, Panel, btn } from "./ui";

export function SettingsForm({ values }: { values: Record<string, string> }) {
  const [state, action, pending] = useActionState(saveSettings, initialFormState);
  const groups = Array.from(new Set(settingFields.map((f) => f.group)));
  return (
    <form action={action} className="space-y-6">
      {state.message && <p className={`rounded-xl border p-3 text-sm ${state.ok ? "border-teal-300/40 bg-teal-400/10 text-teal-100" : "border-rose-400/40 bg-rose-500/10 text-rose-200"}`}>{state.message}</p>}
      {groups.map((g) => (
        <Panel key={g} className="space-y-4">
          <h2 className="font-display font-bold text-white">{g}</h2>
          {settingFields.filter((f) => f.group === g).map((f) => (
            <Field key={f.key} label={f.label} hint={f.help}>
              {f.type === "textarea"
                ? <textarea name={f.key} rows={f.key === "aboutText" ? 7 : 3} defaultValue={values[f.key]} className="input" />
                : <input name={f.key} type={f.type === "url" ? "url" : "text"} defaultValue={values[f.key]} className="input" />}
            </Field>
          ))}
        </Panel>
      ))}
      <div className="sticky bottom-4 flex justify-end">
        <button type="submit" disabled={pending} className={`${btn.primary} shadow-xl`}>{pending ? "Saving…" : "Save all settings"}</button>
      </div>
    </form>
  );
}
