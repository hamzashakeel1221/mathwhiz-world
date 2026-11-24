import Link from "next/link";
import { Megaphone } from "lucide-react";

export function AnnouncementBar({ text }: { text: string }) {
  if (!text.trim()) return null;
  return (
    <div className="relative z-50 overflow-hidden bg-gradient-to-r from-teal-600 via-navy-700 to-brandorange-600 text-white">
      <Link href="/contact" className="container flex items-center justify-center gap-2 py-2 text-center text-xs font-semibold sm:text-sm">
        <Megaphone className="h-4 w-4 shrink-0 text-sun-400" />
        <span>{text}</span>
        <span className="hidden underline decoration-sun-400 underline-offset-4 sm:inline">Book now →</span>
      </Link>
    </div>
  );
}
