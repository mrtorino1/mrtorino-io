import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "mrtorino.io — Software Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  return new ImageResponse((
    <div style={{ background: "#070B10", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", fontFamily: "sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "300px", background: "radial-gradient(ellipse at 30% 0%, rgba(249,115,22,0.25), transparent 60%)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "500px", height: "300px", background: "radial-gradient(ellipse at 70% 0%, rgba(139,92,246,0.2), transparent 60%)" }} />
      <div style={{ width: 52, height: 52, background: "#fff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#070B10", marginBottom: 36 }}>M</div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 20 }}>mrtorino.io</div>
      <div style={{ fontSize: 64, fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 24, maxWidth: 800 }}>I build software that does real things.</div>
      <div style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", maxWidth: 700, lineHeight: 1.5 }}>Trading tools · AI automation · Education platforms</div>
      <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
        {["TradeSchool AI", "WeatherDashboard", "ClaudeOmatic", "BTCPredictor"].map(name => (
          <div key={name} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "8px 18px", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{name}</div>
        ))}
      </div>
    </div>
  ), { ...size });
}
