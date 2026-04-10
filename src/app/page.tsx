import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Search, MessageSquare } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScreenMock from "@/components/ScreenMock";
import { featuredProducts, libraryProducts, products } from "@/data/products";

export const metadata: Metadata = {
  title: "mrtorino.io — Software Studio",
  description:
    "A software studio building trading tools, AI automation systems, and education platforms. TradeSchool AI, WeatherDashboard, ClaudeOmatic, and more.",
};

const chips = ["Day Trading", "AI Automation", "Weather Markets", "BTC Signals", "Content AI"];

const pricingLabel: Record<string, string> = {
  free: "Free",
  paid: "Paid",
  freemium: "Free + Paid",
};

const statusColor: Record<string, string> = {
  live: "text-green-400 border-green-500/30 bg-green-500/10",
  beta: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  "coming-soon": "text-white/40 border-white/10 bg-white/[0.03]",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070B10] text-white overflow-x-hidden">
      {/* Global glow background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.08),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.10),transparent_24%)]" />
      </div>

      <div className="relative z-10">
        <SiteHeader />

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-24 pb-16">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/65 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                Live software across trading, AI automation &amp; education
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.045em] leading-[0.96] max-w-xl">
                I build software
                <span className="block text-white/55 mt-1">that does real things.</span>
              </h1>

              <p className="mt-6 text-lg text-white/55 max-w-xl leading-relaxed">
                Trading tools, AI systems, and education platforms — built by one person, shipped live, and used daily. No demos. No mockups. Real products.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/55">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/products/tradeschool-ai"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl bg-white text-[#070B10] text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  View flagship products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#ideas"
                  className="inline-flex items-center h-11 px-6 rounded-2xl border border-white/12 bg-white/[0.04] text-white text-sm hover:bg-white/[0.08] transition-colors"
                >
                  Read the build log
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-sm">
                {[["6", "live products"], ["3", "core showcases"], ["Free+", "software mix"]].map(([val, label]) => (
                  <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
                    <div className="text-xl font-semibold tracking-tight">{val}</div>
                    <div className="text-xs text-white/42 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero mock */}
            <div className="relative hidden lg:block max-h-[420px] overflow-hidden">
              <div className="absolute -inset-4 rounded-[32px] bg-white/[0.03] blur-2xl" />
              <ScreenMock title="mrtorino / featured products" />
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-[#0D121A]/90 px-4 py-3 backdrop-blur-xl shadow-xl">
                <div className="text-[9px] uppercase tracking-[0.22em] text-white/35">Flagship</div>
                <div className="font-semibold text-sm mt-1">TradeSchool AI</div>
                <div className="text-xs text-white/45">Simulator · AI mentor · curriculum</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.035] hover:bg-white/[0.055] transition-all duration-300 p-6 block"
                style={{ borderColor: product.border.replace("border-", "").replace("/30", "") }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle at top left, ${product.glowColor}, transparent 60%)` }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <img src={`/logos/${product.slug}.svg`} alt={product.name} className="w-10 h-10 rounded-xl" />
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-white/38">{product.tag}</div>
                        <h3 className="text-xl font-semibold tracking-tight mt-2">{product.name}</h3>
                      </div>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] ${statusColor[product.status]}`}>
                      {product.status}
                    </span>
                  </div>

                  <p className="text-sm text-white/52 leading-relaxed min-h-[60px]">{product.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.stats.map((s) => (
                      <span key={s} className="rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-1 text-[10px] text-white/52">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className={`${product.accent} group-hover:underline`}>Explore {product.shortName} →</span>
                    <span className="text-[10px] text-white/30">{pricingLabel[product.pricing]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FLAGSHIP FEATURE — TradeSchool */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <div className="text-[10px] uppercase tracking-[0.26em] text-orange-400 mb-4">Flagship product</div>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] leading-tight max-w-sm">
                TradeSchool AI leads the studio.
              </h2>
              <p className="mt-5 text-white/55 text-lg leading-relaxed max-w-md">
                The clearest expression of what this site is about: deep product design, strong interface systems,
                serious training logic, and a category-defining concept.
              </p>
              <div className="mt-6 space-y-3">
                {featuredProducts[0].bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3 text-white/65 text-sm">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products/tradeschool-ai" className="inline-flex items-center h-11 px-6 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-colors">
                  View TradeSchool AI
                </Link>
                <Link href="/products/tradeschool-ai#screenshots" className="inline-flex items-center h-11 px-6 rounded-2xl border border-white/12 bg-white/[0.04] text-white text-sm hover:bg-white/[0.08] transition-colors">
                  See screenshots
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-500/[0.06] blur-2xl rounded-[32px]" />
              <ScreenMock
                title="TradeSchool AI / lesson + sim"
                bars={["72px", "112px", "84px", "132px", "106px"]}
                accentColor="rgba(249,115,22,0.25)"
              />
            </div>
          </div>
        </section>

        {/* SECONDARY PRODUCTS */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-5">
            {featuredProducts.slice(1).map((product) => (
              <div
                key={product.slug}
                className="rounded-[24px] border bg-white/[0.035] overflow-hidden"
                style={{ borderColor: `${product.glowColor.slice(0, -4)}0.22)` }}
              >
                <div className="p-7 border-b border-white/[0.07]">
                  <div className={`text-[10px] uppercase tracking-[0.24em] mb-3 ${product.accent}`}>
                    {product.tag}
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight">{product.name}</h3>
                      <p className="mt-2 text-white/52 text-sm leading-relaxed max-w-xs">{product.description}</p>
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className={`inline-flex items-center h-9 px-4 rounded-xl text-sm font-medium transition-colors flex-shrink-0 ${product.buttonClass}`}
                    >
                      Open product
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <ScreenMock
                    title={`${product.name} / interface`}
                    bars={product.slug === "weatherdashboard"
                      ? ["88px", "64px", "96px", "78px", "118px"]
                      : ["62px", "92px", "54px", "116px", "84px"]}
                    accentColor={product.glowColor}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT LIBRARY */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16" id="library">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-2">Product library</div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">Everything in the studio.</h2>
            </div>
            <div className="relative w-full lg:w-[320px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
              <input
                type="text"
                placeholder="Search products, tools, ideas..."
                className="w-full h-10 bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 text-sm text-white placeholder:text-white/28 outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {libraryProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-[20px] border border-white/[0.08] bg-white/[0.035] hover:bg-white/[0.055] p-5 transition-colors block"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <img src={`/logos/${product.slug}.svg`} alt={product.name} className="w-10 h-10 rounded-xl" />
                    <div>
                      <div className="font-semibold text-sm">{product.name}</div>
                      <div className="text-xs text-white/38 mt-0.5">{product.tag}</div>
                    </div>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] ${statusColor[product.status]}`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-xs text-white/48 leading-relaxed">{product.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-white/32 group-hover:text-white/55 transition-colors">
                  <span>View details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* IDEAS / INTERACTION */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16" id="ideas">
          <div className="rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 lg:p-10">
            <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-4">Ideas &amp; interaction</div>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] max-w-lg">
                  Got a feature idea? Found a bug? Just want to say something works — or doesn&apos;t?
                </h2>
                <p className="mt-4 text-white/52 text-lg leading-relaxed max-w-lg">
                  I read everything. Not a support ticket system. Just a direct line to the person who built it.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="mailto:hello@mrtorino.io" className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl bg-white text-[#070B10] text-sm font-medium hover:bg-white/90 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    Share an idea
                  </a>
                  <button className="inline-flex items-center h-11 px-6 rounded-2xl border border-white/12 bg-white/[0.04] text-white text-sm hover:bg-white/[0.08] transition-colors">
                    View build notes
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ["Comments", "Discuss product decisions and updates per release"],
                  ["Feature Requests", "Structured idea collection from real users"],
                  ["Build Log", "Transparent changelog — what shipped and why"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-[18px] border border-white/[0.08] bg-black/20 p-4">
                    <div className="font-semibold text-sm">{title}</div>
                    <div className="text-xs text-white/42 mt-1">{desc}</div>
                  </div>
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
