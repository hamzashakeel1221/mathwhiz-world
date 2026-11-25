"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";

const SYMBOLS = ["π", "∑", "√x", "∞", "x²", "θ", "∫", "Δ", "÷", "y=mx+c", "a²+b²", "%", "sin θ", "∠", "f(x)", "±"];
const COLORS = ["#62e2d6", "#ffd23f", "#f8911e", "#ffffff", "#7bb4ff"];

function useSymbolTexture(text: string, color: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    const size = 256;
    canvas.width = size * 2;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fontSize = text.length > 4 ? 78 : 140;
    ctx.font = `700 ${fontSize}px "Sora", "Segoe UI", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 24;
    ctx.fillStyle = color;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [text, color]);
}

function MathSymbol({ text, color, position, scale, speed }: { text: string; color: string; position: [number, number, number]; scale: number; speed: number }) {
  const tex = useSymbolTexture(text, color);
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.6}>
      <sprite position={position} scale={[scale * 2, scale, 1]}>
        <spriteMaterial map={tex} transparent opacity={0.85} depthWrite={false} />
      </sprite>
    </Float>
  );
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ring1.current) ring1.current.rotation.z += dt * 0.35;
    if (ring2.current) ring2.current.rotation.x += dt * 0.25;
    if (wire.current) { wire.current.rotation.y -= dt * 0.12; wire.current.rotation.x += dt * 0.05; }
    if (group.current) group.current.rotation.y += dt * 0.08;
  });
  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.45, 8]} />
          <MeshDistortMaterial color="#13b0a7" emissive="#0b4f63" emissiveIntensity={0.6} roughness={0.15} metalness={0.65} distort={0.38} speed={1.8} />
        </mesh>
      </Float>
      <mesh ref={wire}>
        <icosahedronGeometry args={[2.25, 1]} />
        <meshBasicMaterial color="#62e2d6" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={ring1} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.9, 0.025, 16, 160]} />
        <meshBasicMaterial color="#f8911e" transparent opacity={0.9} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[3.35, 0.018, 16, 160]} />
        <meshBasicMaterial color="#ffd23f" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Satellites() {
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.x = t * (0.2 + i * 0.07);
      m.rotation.y = t * (0.3 + i * 0.05);
    });
  });
  const items: { pos: [number, number, number]; geo: React.ReactNode; color: string }[] = [
    { pos: [-2.6, 2.4, -2], geo: <octahedronGeometry args={[0.5, 0]} />, color: "#ffd23f" },
    { pos: [3.6, -2.4, -1.5], geo: <torusKnotGeometry args={[0.42, 0.12, 100, 12]} />, color: "#f8911e" },
    { pos: [-2.4, -2.8, -1], geo: <dodecahedronGeometry args={[0.45, 0]} />, color: "#62e2d6" },
    { pos: [3.4, 2.6, -3], geo: <tetrahedronGeometry args={[0.6, 0]} />, color: "#7bb4ff" },
    { pos: [0.6, 3.4, -4], geo: <boxGeometry args={[0.55, 0.55, 0.55]} />, color: "#62e2d6" },
  ];
  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={1.5} floatIntensity={2} rotationIntensity={1}>
          <mesh position={it.pos} ref={(m) => { if (m) refs.current[i] = m; }}>
            {it.geo}
            <meshStandardMaterial color={it.color} emissive={it.color} emissiveIntensity={0.35} roughness={0.3} metalness={0.4} wireframe={i % 2 === 1} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Symbols({ count }: { count: number }) {
  const items = useMemo(() => {
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    return SYMBOLS.slice(0, count).map((s, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = rand(3.3, 4.6);
      return {
        text: s,
        color: COLORS[i % COLORS.length],
        position: [Math.cos(angle) * radius * 1.05, Math.sin(angle) * radius * 0.75, rand(-3, 0.5)] as [number, number, number],
        scale: s.length > 4 ? rand(0.9, 1.2) : rand(0.55, 0.85),
        speed: rand(1.2, 2.2),
      };
    });
  }, [count]);
  return <>{items.map((it, i) => <MathSymbol key={i} {...it} />)}</>;
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isNarrow = viewport.width < 9;
  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.pointer;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x * 0.25, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.15, 0.04);
  });
  return (
    <group ref={ref} position={[isNarrow ? 1.2 : viewport.width * 0.22, isNarrow ? -1.2 : 0, 0]} scale={isNarrow ? 0.7 : 1}>
      {children}
    </group>
  );
}

export default function HeroScene() {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        frameloop={inView ? (reduce ? "demand" : "always") : "never"}
        dpr={[1, mobile ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <pointLight position={[-4, -2, 3]} color="#f8911e" intensity={30} />
        <pointLight position={[4, 3, 2]} color="#2ccbc0" intensity={40} />
        <Stars radius={60} depth={40} count={mobile ? 1200 : 2600} factor={3} saturation={0} fade speed={0.6} />
        <Sparkles count={mobile ? 40 : 90} scale={[14, 8, 6]} size={2.6} speed={0.35} color="#62e2d6" />
        <Rig>
          <Core />
          <Satellites />
          <Symbols count={mobile ? 9 : SYMBOLS.length} />
        </Rig>
      </Canvas>
    </div>
  );
}
