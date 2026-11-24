import { redirect } from "next/navigation";
import { LogoMark } from "@/components/ui/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  const admin = await getAdmin().catch(() => null);
  if (admin) redirect("/admin");
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-teal-500/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brandorange-500/15 blur-[120px]" />
      <div className="glass-strong gradient-border relative w-full max-w-md rounded-3xl p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <LogoMark className="h-16 w-20" />
          <h1 className="mt-4 font-display text-2xl font-extrabold text-white">Admin sign in</h1>
          <p className="mt-1 text-sm text-slate-400">MathWhiz World Academy control panel</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
