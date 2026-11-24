"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroSceneInner = dynamic(() => import("./HeroScene"), { ssr: false });
const WaveSceneInner = dynamic(() => import("./WaveScene"), { ssr: false });

function useCanRender3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {}
    setOk(webgl && !reduce);
  }, []);
  return ok;
}

export function HeroBackground() {
  const ok = useCanRender3D();
  return ok ? <HeroSceneInner /> : null;
}

export function WaveBackground() {
  const ok = useCanRender3D();
  return ok ? <WaveSceneInner /> : null;
}
