import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScreenMock from "@/components/ScreenMock";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import AccessRequestForm from "@/components/AccessRequestForm";
import { products, productMap } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productMap[slug];
  if (!product) return {};
  return {
    title: `${product.name} — mrtorino.io`,
    description: product.subheadline,
    openGraph: {
      title: `${product.name} — mrtorino.io`,
      description: product.subheadline,
      url: `https://mrtorino.io/products/${product.slug}`,
    },
    twitter: {
      title: `${product.name} — mrtorino.io`,
      description: product.subheadline,
    },
  };
}

const pricingLabel: Record<string, string> = {
  free: "Free",
  paid: "Paid",
  freemium: "Free + Paid",
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productMap[slug];
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#070B10] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at top right, ${product.glowColor}, transparent 40%)`,
          }}
        />
      </div>

      <div className="relative z-10">
        <SiteHeader />

        {/* Back */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/42 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-14">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/58 mb-5">
                <span className={`text-xs font-medium ${product.accent}`}>{product.tag}</span>
                <span className="text-white/25">·</span>
                <span>{pricingLabel[product.pricing]}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.045em] leading-[0.96] max-w-xl">
                {product.headline}
              </h1>

              <p className="mt-6 text-lg text-white/55 max-w-xl leading-relaxed">
                {product.subheadline}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.stats.map((s) => (
                  <span key={s} className="rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-1.5 text-xs text-white/58">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:hello@mrtorino.io?subject=Access Request: ${product.name}`}
                  className={`inline-flex items-center h-11 px-6 rounded-2xl text-sm font-medium transition-colors ${product.buttonClass}`}
                >
                  Request access
                </a>
                <a href="#screenshots" className="inline-flex items-center h-11 px-6 rounded-2xl border border-white/12 bg-white/[0.04] text-white text-sm hover:bg-white/[0.08] transition-colors">
                  View screenshots
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-5 blur-2xl rounded-[36px]"
                style={{ background: product.glowColor }}
              />
              {product.slug === "tradeschool-ai" ? (
                <div className="relative rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/screenshots/tradeschool/trackmap.png" alt="TradeSchool AI Track Map" width={1280} height={800} className="w-full h-auto" priority />
                </div>
              ) : product.slug === "weatherdashboard" ? (
                <div className="relative rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/screenshots/weatherdashboard/home.png" alt="WeatherDashboard" width={1280} height={800} className="w-full h-auto" priority />
                </div>
              ) : (
                <ScreenMock
                  title={`${product.name} / interface preview`}
                  accentColor={product.glowColor}
                />
              )}
            </div>
          </div>
        </section>

        {/* WHY IT MATTERS */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <div className={`text-[10px] uppercase tracking-[0.26em] mb-4 ${product.accent}`}>
                Why it matters
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.035em] leading-tight max-w-sm">
                {product.name} is built as a serious product, not a side project.
              </h2>
              <p className="mt-5 text-white/55 text-lg leading-relaxed">{product.description}</p>
              <div className="mt-6 space-y-3">
                {product.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3 text-white/65 text-sm">
                    <div
                      className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: product.glowColor.replace("0.15", "1").replace("0.13", "1").replace("0.18", "1") }}
                    />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-[26px] border p-7"
              style={{
                borderColor: product.glowColor.replace("0.15", "0.22").replace("0.13", "0.2"),
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-3">Positioning</div>
              <div className="text-2xl font-semibold tracking-tight mb-3">{product.shortName}</div>
              <p className="text-white/52 leading-relaxed text-sm mb-5">{product.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {product.stats.map((s) => (
                  <div key={s} className="rounded-xl border border-white/[0.08] bg-black/20 px-3 py-3 text-xs text-white/55">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="mb-8">
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-2">Capabilities</div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em]">What powers the experience.</h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {product.features.map((f) => (
              <div
                key={f.name}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] hover:bg-white/[0.055] transition-colors p-5"
              >
                <div className="font-semibold text-sm mb-2">{f.name}</div>
                <p className="text-xs text-white/52 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SCREENSHOTS */}
        {product.slug === "tradeschool-ai" && (
          <section id="screenshots" className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-2">Inside the product</div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-10">Every screen is purpose-built.</h2>
            <ScreenshotGallery accent="text-orange-400" shots={[
              { src: "/screenshots/tradeschool/trackmap.png", alt: "TradeSchool AI Track Map", label: "Track Map", desc: "The 3D building map that replaces a boring course list. Each room is a learning zone — Risk Desk, Indicator Lab, Psychology Ward, The Pit. Rooms unlock as you progress.", full: true },
              { src: "/screenshots/tradeschool/controlroom.png", alt: "Control Room", label: "Control Room", desc: "Mission hub. Rex AI Coach on the left, current zone progress center, live domain scores across pattern recognition, entry timing, risk management, and strategy discipline.", full: true },
              { src: "/screenshots/tradeschool/simulator.png", alt: "Live Simulator", label: "Live Simulator", desc: "Real candlestick data with VWAP and EMA overlays. Every trade graded live across 5 execution dimensions — not just P&L.", full: true },
              { src: "/screenshots/tradeschool/scenarios.png", alt: "Scenario Picker", label: "Scenarios", desc: "Curated setups across SPY, NVDA, AAPL, TSLA. Tagged by module, difficulty, and setup type. Built to teach specific patterns." },
              { src: "/screenshots/tradeschool/scorecard.png", alt: "Session Score Card", label: "Score Card", desc: "Grade, execution score, and the exact dimension that cost you. Ask Rex to explain the grade before trading again." },
              { src: "/screenshots/tradeschool/lesson.png", alt: "Lesson Player", label: "Lessons", desc: "Structured text lessons with micro-checks on the right. Rex available inline to explain harder or quiz you." },
              { src: "/screenshots/tradeschool/journal.png", alt: "Trade Journal", label: "Journal", desc: "Every trade logged with ticker, direction, P&L, grade, and score. Filter by grade or module. Track improvement over time." },
              { src: "/screenshots/tradeschool/backtest.png", alt: "Backtest", label: "Backtest", desc: "Pick any historical date, ticker, and strategy. Replay real market sessions graded at 50% XP." },
              { src: "/screenshots/tradeschool/debrief.png", alt: "Debrief", label: "Debrief", desc: "Weekly Rex summary. Domain scores, coaching notes, strongest and weakest dimension identified." },
              { src: "/screenshots/tradeschool/lab.png", alt: "Simulator Lab", label: "Lab", desc: "Structured lab exercises. Rex asks graded questions mid-session before the bar closes." },
              { src: "/screenshots/tradeschool/lessonvisual.png", alt: "Visual Lesson", label: "Visual", desc: "Rich visual lesson slides — ownership grids, market diagrams, side-by-side comparisons." },
            ]} />
          </section>
        )}

        {product.slug === "weatherdashboard" && (
          <section id="screenshots" className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-2">Inside the product</div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-10">Built for weather traders specifically.</h2>
            <ScreenshotGallery accent="text-cyan-400" shots={[
              { src: "/screenshots/weatherdashboard/contracts.png", alt: "Kalshi Contracts", label: "Contracts", desc: "All Kalshi contracts for a city in one table. Strike ranges, YES bid-ask, probability bars, volume. Scout analysis shows edge, NWS forecast, and last 5 settlements inline.", full: true },
              { src: "/screenshots/weatherdashboard/forecasts.png", alt: "Forecasts View", label: "Forecasts", desc: "NWS official, Weather Underground, and NBM blend model side by side with confidence scores. Consensus panel averages all models." },
              { src: "/screenshots/weatherdashboard/home.png", alt: "Home Market View", label: "Market View", desc: "Live Kalshi contracts with real-time bid-ask. NWS city forecast panel keeps all 15 cities visible while you work one contract." },
            ]} />
          </section>
        )}

        {/* STORY */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-4">
            {product.story.map((s) => (
              <div key={s.title} className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-5">
                <div className="font-semibold text-sm mb-2">{s.title}</div>
                <p className="text-xs text-white/52 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ACCESS REQUEST */}
        {(product.pricing === "paid" || product.pricing === "freemium") && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-3">Get access</div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-4">Ready to use {product.shortName}?</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {product.pricing === "paid" ? "This is a paid product. Request access and I'll send pricing and next steps directly." : "Free tier available. Request access for the full version and I'll follow up with details."}
                </p>
                <div className="space-y-3">
                  {product.bullets.map((b: string) => (
                    <div key={b} className="flex items-start gap-3 text-sm text-white/55">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/30 flex-shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <AccessRequestForm productName={product.name} productSlug={product.slug} />
            </div>
          </section>
        )}

        {/* RELATED */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 lg:p-10">
            <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-4">Keep exploring</div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] max-w-sm">
                  More from the studio.
                </h2>
                <p className="mt-4 text-white/52 leading-relaxed">
                  Every product in the studio is built as a real system. Explore the full lineup.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/products/${related[0].slug}`}
                    className="inline-flex items-center h-11 px-6 rounded-2xl bg-white text-[#070B10] text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    View {related[0].shortName}
                  </Link>
                  <Link
                    href={`/products/${related[1].slug}`}
                    className="inline-flex items-center h-11 px-6 rounded-2xl border border-white/12 bg-white/[0.04] text-white text-sm hover:bg-white/[0.08] transition-colors"
                  >
                    View {related[1].shortName}
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="block rounded-[20px] border border-white/[0.08] bg-black/20 p-4 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-xs text-white/42 mt-1">{p.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
