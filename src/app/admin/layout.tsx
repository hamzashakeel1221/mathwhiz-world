import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | MathWhiz Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#070d1f] text-slate-100">{children}</div>;
}
