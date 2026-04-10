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
                <button
                  className={`inline-flex items-center h-11 px-6 rounded-2xl text-sm font-medium transition-colors ${product.buttonClass}`}
                >
                  Request access
                </button>
                <button className="inline-flex items-center h-11 px-6 rounded-2xl border border-white/12 bg-white/[0.04] text-white text-sm hover:bg-white/[0.08] transition-colors">
                  View screenshots
                </button>
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
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-6">Screenshots</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[16px] overflow-hidden border border-white/10">
                <Image src="/screenshots/tradeschool/controlroom.png" alt="Control Room" width={1280} height={800} className="w-full h-auto" />
              </div>
              <div className="rounded-[16px] overflow-hidden border border-white/10">
                <Image src="/screenshots/tradeschool/simulator.png" alt="Live Simulator" width={1280} height={800} className="w-full h-auto" />
              </div>
              <div className="rounded-[16px] overflow-hidden border border-white/10">
                <Image src="/screenshots/tradeschool/lesson.png" alt="Lesson Player" width={1280} height={800} className="w-full h-auto" />
              </div>
              <div className="rounded-[16px] overflow-hidden border border-white/10">
                <Image src="/screenshots/tradeschool/scorecard.png" alt="Score Card" width={1280} height={800} className="w-full h-auto" />
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
