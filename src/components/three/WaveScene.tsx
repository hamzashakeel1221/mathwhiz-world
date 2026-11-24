"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";

function Wave({ cols = 90, rows = 45 }: { cols?: number; rows?: number }) {
  const points = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(cols * rows * 3);
    const colors = new Float32Array(cols * rows * 3);
    const a = new THREE.Color("#2ccbc0"), b = new THREE.Color("#f8911e"), c = new THREE.Color();
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        positions[i * 3] = (x - cols / 2) * 0.32;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z - rows / 2) * 0.32;
        c.copy(a).lerp(b, x / cols);
        colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
        i++;
      }
    }
    return { positions, colors };
  }, [cols, rows]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.8;
    const geo = points.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      pos.setY(i, Math.sin(x * 0.45 + t) * 0.55 + Math.cos(z * 0.6 + t * 0.8) * 0.45);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points} rotation={[0.35, 0, 0]} position={[0, -1.6, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function WaveScene() {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas frameloop={inView ? "always" : "never"} dpr={[1, 1.5]} camera={{ position: [0, 2.2, 9], fov: 50 }} gl={{ alpha: true }}>
        <Wave />
      </Canvas>
    </div>
  );
}
