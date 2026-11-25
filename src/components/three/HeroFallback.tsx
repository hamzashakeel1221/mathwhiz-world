// Pure CSS/SVG version of the 3D hero: glowing orb, orbit rings and floating maths symbols.
// Shown while the 3D scene loads and on devices/browsers without WebGL.
const SYMBOLS = [
  { t: "π", x: "62%", y: "18%", c: "#62e2d6", d: "0s" },
  { t: "∑", x: "92%", y: "40%", c: "#ffd23f", d: "1s" },
  { t: "√x", x: "86%", y: "14%", c: "#f8911e", d: "2s" },
  { t: "x²", x: "70%", y: "70%", c: "#ffffff", d: "0.5s" },
  { t: "θ", x: "58%", y: "48%", c: "#7bb4ff", d: "1.5s" },
  { t: "∞", x: "78%", y: "8%", c: "#62e2d6", d: "2.5s" },
  { t: "f(x)", x: "90%", y: "78%", c: "#ffd23f", d: "3s" },
];

export function HeroFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute right-[-10%] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 sm:right-[2%] lg:right-[6%]">
        <div className="absolute inset-[22%] animate-float rounded-full bg-[radial-gradient(circle_at_35%_30%,#62e2d6_0%,#13b0a7_35%,#0b4f63_70%,transparent_72%)] shadow-[0_0_120px_20px_rgba(44,203,192,0.35)]" />
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
          <ellipse cx="100" cy="100" rx="96" ry="34" fill="none" stroke="#f8911e" strokeWidth="1.2" transform="rotate(-18 100 100)" />
          <ellipse cx="100" cy="100" rx="88" ry="60" fill="none" stroke="#ffd23f" strokeOpacity=".5" strokeWidth=".8" transform="rotate(40 100 100)" />
          <polygon points="100,22 168,62 168,138 100,178 32,138 32,62" fill="none" stroke="#62e2d6" strokeOpacity=".25" strokeWidth=".6" />
        </svg>
      </div>
      {SYMBOLS.map((s) => (
        <span
          key={s.t}
          className="absolute animate-float font-display text-3xl font-bold sm:text-4xl"
          style={{ left: s.x, top: s.y, color: s.c, animationDelay: s.d, textShadow: `0 0 18px ${s.c}` }}
        >
          {s.t}
        </span>
      ))}
    </div>
  );
}
