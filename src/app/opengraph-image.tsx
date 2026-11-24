import { ImageResponse } from "next/og";

export const alt = "MathWhiz World Academy: O-Level Maths Tutor Online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 64, color: "white", fontFamily: "sans-serif",
          background: "radial-gradient(circle at 20% 20%, #1f4489 0%, #0b1a38 45%, #060f24 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg,#2ccbc0,#13b0a7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 800, color: "#060f24" }}>π</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 1 }}>MATHWHIZ WORLD</div>
            <div style={{ fontSize: 20, letterSpacing: 10, color: "#62e2d6" }}>ACADEMY</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#ffd23f", fontWeight: 700 }}>Cambridge O Level Mathematics 4024</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 12 }}>O-Level Maths Tutor</div>
          <div style={{ fontSize: 34, color: "#cbd5e1", marginTop: 16 }}>IGCSE · GCSE · Edexcel · AQA · Year 4–11 · Online worldwide</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, color: "#62e2d6", fontStyle: "italic" }}>Understand. Practice. Apply. Succeed.</div>
          <div style={{ background: "linear-gradient(90deg,#f8911e,#ffd23f)", color: "#060f24", padding: "14px 28px", borderRadius: 999, fontSize: 28, fontWeight: 800 }}>FREE Demo Class</div>
        </div>
      </div>
    ),
    size,
  );
}
