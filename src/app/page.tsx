import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScreenMock from "@/components/ScreenMock";
import SectionHeading from "@/components/SectionHeading";
import ProductCard, { accentVars } from "@/components/ProductCard";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { featuredProducts, libraryProducts } from "@/data/products";

export const metadata: Metadata = {
  // No title here — the root segment doesn't get layout's title.template,
  // so fall back to layout's default: "mrtorino.io — Software Studio"
  description:
    "A software studio building trading tools, AI automation systems, and education platforms. TradeSchool AI, WeatherDashboard, ClaudeOmatic, and more.",
};

const chips = ["Day Trading", "AI Automation", "Weather Markets", "BTC Signals", "Content AI"];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#111111] overflow-x-hidden">
      <OrganizationJsonLd />
      <SiteHeader />

      {/* HERO */}
      <section className="border-b border-[#e7e4de]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-16">
          <div className="fade-up">
            <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-[#75706b] mb-8">
              <span className="h-2 w-2 bg-orange-500 flex-shrink-0" />
              Live software across trading, AI automation &amp; education
            </div>

            <h1
              className="font-display uppercase leading-[0.88] max-w-5xl"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              I build software
              <span className="block">
                that does <span className="text-outline">real things</span><span className="text-orange-500">.</span>
              </span>
            </h1>

            <p className="mt-8 text-lg text-[#75706b] max-w-xl leading-relaxed">
              Trading tools, AI systems, and education platforms — built by one person, shipped live, and used daily. No demos. No mockups. Real products.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/tradeschool-ai"
                className="inline-flex items-center gap-2 h-12 px-7 bg-[#111111] text-[#faf9f7] text-sm font-medium uppercase tracking-[0.1em] hover:bg-black transition-colors"
              >
                View flagship products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#ideas"
                className="inline-flex items-center h-12 px-7 border border-[#111111] text-[#111111] text-sm uppercase tracking-[0.1em] hover:bg-[#111111] hover:text-[#faf9f7] transition-colors"
              >
                Read the build log
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span key={chip} className="border border-[#e7e4de] bg-[#ffffff] px-3 py-1.5 text-xs text-[#75706b]">
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 max-w-md divide-x divide-[#e7e4de] border-y border-[#e7e4de]">
              {[["9", "live products"], ["3", "core showcases"], ["Free+", "software mix"]].map(([val, label]) => (
                <div key={label} className="py-5 pr-6 first:pl-0 pl-6">
                  <div className="font-display text-3xl leading-none">{val}</div>
                  <div className="text-xs text-[#75706b] mt-2 uppercase tracking-[0.14em]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <SectionHeading eyebrow="The lineup" title="Featured products" />
        <div className="grid lg:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* FLAGSHIP FEATURE — TradeSchool */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-orange-600 mb-4">
              <span className="h-2 w-2 bg-orange-500 flex-shrink-0" />
              Flagship product
            </div>
            <h2 className="font-display uppercase text-5xl sm:text-6xl leading-[0.92] max-w-md">
              TradeSchool AI leads the studio.
            </h2>
            <p className="mt-5 text-[#75706b] text-lg leading-relaxed max-w-md">
              The clearest expression of what this site is about: deep product design, strong interface systems,
              serious training logic, and a category-defining concept.
            </p>
            <div className="mt-6 space-y-3">
              {featuredProducts[0].bullets.map((b) => (
                <div key={b} className="flex items-start gap-3 text-[#111111]/75 text-sm">
                  <div className="mt-1.5 h-1.5 w-1.5 bg-orange-500 flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products/tradeschool-ai" className="inline-flex items-center h-12 px-7 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium uppercase tracking-[0.1em] transition-colors">
                View TradeSchool AI
              </Link>
              <Link href="/products/tradeschool-ai#screenshots" className="inline-flex items-center h-12 px-7 border border-[#111111] text-[#111111] text-sm uppercase tracking-[0.1em] hover:bg-[#111111] hover:text-[#faf9f7] transition-colors">
                See screenshots
              </Link>
            </div>
          </div>
          <ScreenMock
            title="TradeSchool AI / lesson + sim"
            bars={["72px", "112px", "84px", "132px", "106px"]}
            accentColor="rgba(249,115,22,0.3)"
          />
        </div>
      </section>

      {/* SECONDARY PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-5">
          {featuredProducts.slice(1).map((product) => (
            <div key={product.slug} className="product-card overflow-hidden" style={accentVars(product)}>
              <div className="p-7 border-b border-[#e7e4de]">
                <div className="text-[10px] uppercase tracking-[0.24em] mb-3" style={{ color: product.glowColor.replace(/[\d.]+\)$/, "1)") }}>
                  {product.tag}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{product.name}</h3>
                    <p className="mt-2 text-[#75706b] text-sm leading-relaxed max-w-xs">{product.description}</p>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className={`inline-flex items-center h-9 px-4 text-sm font-medium transition-colors flex-shrink-0 ${product.buttonClass}`}
                  >
                    Open product
                  </Link>
                </div>
              </div>
              <div className="p-5 bg-[#faf9f7]">
                <ScreenMock
                  title={`${product.name} / interface`}
                  bars={product.slug === "weatherdashboard"
                    ? ["88px", "64px", "96px", "78px", "118px"]
                    : ["62px", "92px", "54px", "116px", "84px"]}
                  accentColor={product.glowColor.replace(/[\d.]+\)$/, "0.3)")}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT LIBRARY */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16" id="library">
        <SectionHeading eyebrow="Product library" title="Everything in the studio" />
        <div className="mb-8 max-w-[320px]">
          <input
            type="text"
            placeholder="Search products, tools, ideas..."
            className="w-full h-10 bg-[#ffffff] border border-[#e7e4de] px-4 text-sm text-[#111111] placeholder:text-[#75706b]/60 outline-none focus:border-[#111111] transition-colors"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {libraryProducts.map((product) => (
            <ProductCard key={product.slug} product={product} variant="compact" />
          ))}
        </div>
      </section>

      {/* IDEAS / INTERACTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16" id="ideas">
        <div className="border border-[#111111] bg-[#111111] text-[#faf9f7] p-8 lg:p-10">
          <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#faf9f7]/50 mb-4">Ideas &amp; interaction</div>
              <h2 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95] max-w-lg">
                Got a feature idea? Found a bug? Just want to say something works — or doesn&apos;t?
              </h2>
              <p className="mt-4 text-[#faf9f7]/60 text-lg leading-relaxed max-w-lg">
                I read everything. Not a support ticket system. Just a direct line to the person who built it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:hello@mrtorino.io" className="inline-flex items-center gap-2 h-12 px-7 bg-[#faf9f7] text-[#111111] text-sm font-medium uppercase tracking-[0.1em] hover:bg-white transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  Share an idea
                </a>
                <button className="inline-flex items-center h-12 px-7 border border-[#faf9f7]/30 text-[#faf9f7] text-sm uppercase tracking-[0.1em] hover:border-[#faf9f7] transition-colors">
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
                <div key={title} className="border border-[#faf9f7]/15 p-4">
                  <div className="font-semibold text-sm">{title}</div>
                  <div className="text-xs text-[#faf9f7]/50 mt-1">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
