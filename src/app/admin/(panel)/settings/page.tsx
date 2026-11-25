import { all } from "@/lib/db";
import { AdminHeader } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { defaultSettings } from "@/lib/defaults";

export const metadata = { title: "Site content" };

export default async function SettingsAdmin() {
  const rows = await all<{ key: string; value: string }>("SELECT key, value FROM site_settings");
  const values = { ...defaultSettings, ...Object.fromEntries(rows.map((r) => [r.key, r.value])) };
  return (
    <>
      <AdminHeader title="Site content" subtitle="Edit the hero text, announcement bar, contact details and social links." />
      <SettingsForm values={values} />
    </>
  );
}
