import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        navy: {
          50: "#eef3fb", 100: "#d6e2f5", 200: "#adc4ea", 300: "#7b9fd9", 400: "#4b76c1",
          500: "#2c58a6", 600: "#1f4489", 700: "#17346c", 800: "#10264f", 900: "#0b1a38", 950: "#060f24",
        },
        teal: {
          50: "#ecfdfb", 100: "#cff8f3", 200: "#9ff0e7", 300: "#62e2d6", 400: "#2ccbc0",
          500: "#13b0a7", 600: "#0b8f8a", 700: "#0e7170", 800: "#115a5a", 900: "#124b4b",
        },
        brandorange: {
          300: "#ffc67a", 400: "#ffab45", 500: "#f8911e", 600: "#e07510",
        },
        sun: { 400: "#ffd23f", 500: "#fbbf24" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      backgroundImage: {
        "grid-light": "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        shimmer: { from: { backgroundPosition: "0% 50%" }, to: { backgroundPosition: "200% 50%" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: "0.7" }, "100%": { transform: "scale(1.9)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spin-slow 30s linear infinite",
        "pulse-ring": "pulseRing 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
