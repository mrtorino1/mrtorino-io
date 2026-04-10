import { ImageResponse } from "next/og";
import { productMap } from "@/data/products";
export const runtime = "edge";
export const alt = "Product page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const accentColors: Record<string, string> = { "tradeschool-ai": "#f97316", "weatherdashboard": "#22d3ee", "claudeomatic": "#8b5cf6", "btcpredictor": "#f59e0b", "kashitrader": "#22c55e", "contentforge": "#ec4899", "backtrader": "#eab308", "tradetracker": "#14b8a6", "tradecreator": "#f43f5e", "weatherscout": "#0ea5e9", "daytrader": "#6366f1", "valuefinder": "#10b981" };
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productMap[slug];
  if (!product) return new Response("Not found", { status: 404 });
  const accent = accentColors[slug] || "#fff";
  return new ImageResponse((
    <div style={{ background: "#070B10", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", fontFamily: "sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "400px", background: `radial-gradient(ellipse at 20% 0%, ${accent}30, transparent 55%)` }} />
      <div style={{ width: 44, height: 44, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#070B10", marginBottom: 40 }}>M</div>
      <div style={{ fontSize: 13, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 20 }}>{product.tag} · mrtorino.io</div>
      <div style={{ fontSize: 62, fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 24, maxWidth: 900 }}>{product.headline}</div>
      <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", maxWidth: 750, lineHeight: 1.5 }}>{product.subheadline}</div>
      <div style={{ display: "flex", gap: 10, marginTop: 48 }}>
        {product.stats.map((s: string) => (<div key={s} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "7px 16px", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{s}</div>))}
      </div>
    </div>
  ), { ...size });
}
