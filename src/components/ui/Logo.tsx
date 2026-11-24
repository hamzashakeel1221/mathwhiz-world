import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  const rays = Array.from({ length: 11 }, (_, i) => -75 + i * 15);
  return (
    <svg viewBox="0 0 120 104" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mw-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#62e2d6" />
          <stop offset="1" stopColor="#13b0a7" />
        </linearGradient>
        <linearGradient id="mw-book" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b9cf0" />
          <stop offset="1" stopColor="#1f4489" />
        </linearGradient>
      </defs>
      <g stroke="#f8911e" strokeWidth="2.2" strokeLinecap="round">
        {rays.map((a) => {
          const r = (a * Math.PI) / 180;
          const x1 = 60 + Math.sin(r) * 30, y1 = 36 - Math.cos(r) * 30;
          const x2 = 60 + Math.sin(r) * 40, y2 = 36 - Math.cos(r) * 40;
          return <line key={a} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} />;
        })}
      </g>
      <path d="M41 42 L79 42 L77 60 Q60 68 43 60 Z" fill="#0e8a85" />
      <path d="M60 18 L96 32 L60 46 L24 32 Z" fill="url(#mw-cap)" />
      <path d="M60 32 L88 36 L88 52" stroke="#0b1a38" strokeWidth="1.6" fill="none" />
      <circle cx="88" cy="54" r="2.6" fill="#0b1a38" />
      <g fill="url(#mw-book)">
        <path d="M58 100 C48 84 30 76 8 76 L10 68 C32 68 50 76 58 90 Z" />
        <path d="M58 88 C50 74 34 66 14 64 L17 57 C36 58 51 66 58 78 Z" opacity=".85" />
        <path d="M58 76 C52 66 40 58 24 55 L28 49 C42 51 53 58 58 66 Z" opacity=".7" />
        <path d="M62 100 C72 84 90 76 112 76 L110 68 C88 68 70 76 62 90 Z" />
        <path d="M62 88 C70 74 86 66 106 64 L103 57 C84 58 69 66 62 78 Z" opacity=".85" />
        <path d="M62 76 C68 66 80 58 96 55 L92 49 C78 51 67 58 62 66 Z" opacity=".7" />
      </g>
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="MathWhiz World Academy home">
      <LogoMark className="h-10 w-11 shrink-0 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[15px] font-extrabold tracking-wide text-white">MATHWHIZ WORLD</span>
          <span className="mt-1 block text-[10px] font-semibold tracking-[0.42em] text-teal-300">ACADEMY</span>
        </span>
      )}
    </Link>
  );
}
