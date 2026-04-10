import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScreenMock from "@/components/ScreenMock";
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
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Every screen is purpose-built.</h2>

            {/* Screenshot 1 — full width hero */}
            <div className="mb-6">
              <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                <Image src="/screenshots/tradeschool/controlroom.png" alt="TradeSchool AI Control Room" width={1280} height={800} className="w-full h-auto" />
              </div>
              <div className="mt-4 flex items-start gap-4">
                <div className="text-orange-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-28 flex-shrink-0">Control Room</div>
                <p className="text-sm text-white/55 leading-relaxed">Your mission hub. Rex AI Coach on the left, current zone progress in the center, live domain scores across pattern recognition, entry timing, risk management, and strategy discipline.</p>
              </div>
            </div>

            {/* Screenshot 2 — full width */}
            <div className="mb-6">
              <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                <Image src="/screenshots/tradeschool/simulator.png" alt="Live Simulator" width={1280} height={800} className="w-full h-auto" />
              </div>
              <div className="mt-4 flex items-start gap-4">
                <div className="text-orange-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-28 flex-shrink-0">Live Simulator</div>
                <p className="text-sm text-white/55 leading-relaxed">Real candlestick data, VWAP and EMA overlays, MACD panel. Every trade graded live across 5 execution dimensions — not just profit/loss. Grade B means your execution was sound even if the trade lost.</p>
              </div>
            </div>

            {/* 2-col row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/screenshots/tradeschool/scenarios.png" alt="Scenario Picker" width={1280} height={800} className="w-full h-auto" />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <div className="text-orange-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-24 flex-shrink-0">Scenarios</div>
                  <p className="text-xs text-white/50 leading-relaxed">Curated setups across SPY, NVDA, AAPL, TSLA. Each tagged by module, difficulty, and setup type. Not random — built to teach specific patterns.</p>
                </div>
              </div>
              <div>
                <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/screenshots/tradeschool/scorecard.png" alt="Session Complete Score Card" width={1280} height={800} className="w-full h-auto" />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <div className="text-orange-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-24 flex-shrink-0">Score Card</div>
                  <p className="text-xs text-white/50 leading-relaxed">Session complete modal shows your grade, execution score, and exactly which dimension cost you. Ask Rex to explain the grade before trading again.</p>
                </div>
              </div>
            </div>

            {/* 2-col row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/screenshots/tradeschool/lesson.png" alt="Lesson Player" width={1280} height={800} className="w-full h-auto" />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <div className="text-orange-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-24 flex-shrink-0">Lessons</div>
                  <p className="text-xs text-white/50 leading-relaxed">Structured text lessons with micro-checks on the right panel. Rex available inline to explain harder, give examples, or quiz you mid-section.</p>
                </div>
              </div>
              <div>
                <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/screenshots/tradeschool/journal.png" alt="Trade Journal" width={1280} height={800} className="w-full h-auto" />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <div className="text-orange-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-24 flex-shrink-0">Journal</div>
                  <p className="text-xs text-white/50 leading-relaxed">Every trade logged with date, ticker, direction, entry/exit, P&amp;L, grade, and score. Filter by grade, module, result. Track improvement over time, not just wins.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {product.slug === "weatherdashboard" && (
          <section id="screenshots" className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-2">Inside the product</div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-12">Built for weather traders specifically.</h2>

            <div className="mb-6">
              <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                <Image src="/screenshots/weatherdashboard/contracts.png" alt="Kalshi Contracts View" width={1280} height={800} className="w-full h-auto" />
              </div>
              <div className="mt-4 flex items-start gap-4">
                <div className="text-cyan-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-28 flex-shrink-0">Contracts</div>
                <p className="text-sm text-white/55 leading-relaxed">All Kalshi contracts for a city in one clean table. Strike ranges, YES bid-ask, probability bars, volume, and ticker side by side. Scout analysis panel shows edge, NWS forecast, and last 5 settlements.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/screenshots/weatherdashboard/forecasts.png" alt="Forecasts View" width={1280} height={800} className="w-full h-auto" />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <div className="text-cyan-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-24 flex-shrink-0">Forecasts</div>
                  <p className="text-xs text-white/50 leading-relaxed">NWS official, Weather Underground, and NBM blend model side by side with confidence scores. Consensus panel shows average high, low, model spread, and confidence in one row.</p>
                </div>
              </div>
              <div>
                <div className="rounded-[18px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/screenshots/weatherdashboard/home.png" alt="Home Market View" width={1280} height={800} className="w-full h-auto" />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <div className="text-cyan-400 text-[10px] uppercase tracking-[0.24em] mt-1 w-24 flex-shrink-0">Market View</div>
                  <p className="text-xs text-white/50 leading-relaxed">Live Kalshi contracts with real-time bid-ask and probability. NWS city forecast panel on the right keeps all 15 cities visible while you work one contract in detail.</p>
                </div>
              </div>
            </div>
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
