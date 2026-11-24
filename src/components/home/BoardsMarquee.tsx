const ITEMS = [
  "O-Level Mathematics 4024", "Cambridge IGCSE 0580", "Additional Maths 0606", "International Maths 0607",
  "GCSE Edexcel", "GCSE AQA", "GCSE OCR", "Edexcel International GCSE", "Cambridge Primary", "Cambridge Lower Secondary",
  "British Curriculum", "Year 4 – 11 & Beyond",
];

export function BoardsMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section aria-label="Curricula and exam boards" className="relative overflow-hidden border-y border-white/10 bg-navy-900/60 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent" />
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span
            key={i}
            className={`flex items-center gap-3 whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-sm font-bold ${
              t.startsWith("O-Level") ? "border-sun-400/50 bg-sun-400/10 text-sun-400" : "border-white/10 bg-white/[0.03] text-slate-300"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> {t}
          </span>
        ))}
      </div>
    </section>
  );
}
