"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroFallback } from "./HeroFallback";

const HeroSceneInner = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => <HeroFallback /> });
const WaveSceneInner = dynamic(() => import("./WaveScene"), { ssr: false });

type Support = "pending" | "webgl" | "none";

/** Checks WebGL support once on the client. (Reduced-motion users still get the 3D scene, just calmer.) */
function useWebGL(): Support {
  const [support, setSupport] = useState<Support>("pending");
  useEffect(() => {
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"));
    } catch {}
    setSupport(ok ? "webgl" : "none");
  }, []);
  return support;
}

export function HeroBackground() {
  const support = useWebGL();
  // Animated CSS/SVG fallback while loading and on devices without WebGL, so the hero is never empty.
  return support === "webgl" ? <HeroSceneInner /> : <HeroFallback />;
}

export function WaveBackground() {
  const support = useWebGL();
  return support === "webgl" ? <WaveSceneInner /> : null;
}
