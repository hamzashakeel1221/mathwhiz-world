import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { deleteAdmin } from "../../actions";
import { AdminHeader, Badge, Panel, btn } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { AddAdminForm, ChangePasswordForm } from "@/components/admin/AccountForms";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const me = await requireAdmin();
  const admins = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" }, select: { id: true, email: true, name: true, lastLoginAt: true } });
  return (
    <>
      <AdminHeader title="Account & admins" subtitle={`Signed in as ${me.email}`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel><h2 className="mb-4 font-display font-bold text-white">Change password</h2><ChangePasswordForm /></Panel>
        <Panel><h2 className="mb-4 font-display font-bold text-white">Add another admin</h2><AddAdminForm /></Panel>
      </div>
      <Panel className="mt-6">
        <h2 className="mb-4 font-display font-bold text-white">Admins</h2>
        <ul className="divide-y divide-white/5">
          {admins.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="font-semibold text-white">{a.name} {a.id === me.id && <Badge tone="teal">You</Badge>}</p>
                <p className="text-xs text-slate-500">{a.email} · Last login {a.lastLoginAt ? formatDate(a.lastLoginAt) : "never"}</p>
              </div>
              {a.id !== me.id && (
                <form action={deleteAdmin}>
                  <input type="hidden" name="id" value={a.id} />
                  <ConfirmButton className={btn.danger} message={`Remove admin ${a.email}?`}><Trash2 className="h-3.5 w-3.5" /> Remove</ConfirmButton>
                </form>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
