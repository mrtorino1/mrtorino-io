import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

/*
 * Photo provenance — public/mining/. All images are public domain (US federal
 * government works) or CC0; no attribution required, recorded here for audit.
 *
 * rig-night-nevada.jpg (hero background)
 *   Source: https://commons.wikimedia.org/wiki/File:Drilling_rig_NV_(35231574420).jpg
 *   Author: BLM Nevada (Flickr) · License: Public domain (US federal government work)
 *
 * drill-crew-pretty-rocks.jpg ("Built for the field" panel)
 *   Source: https://commons.wikimedia.org/wiki/File:Drilling_occurred_at_Pretty_Rocks_in_2018._Core_samples_from_the_drilling_indicate_how_much_ice_underlies_this_part_of_the_(db7aa7dd-5660-41f2-8ced-0f001b7f2a6f).jpg
 *   Author: Mary Lewandowski, National Park Service (NPGallery) · License: Public domain (US federal government work)
 *
 * drill-core-closeup.jpg (texture band above the closing CTA)
 *   Source: https://commons.wikimedia.org/wiki/File:Listwaenite_drill_core_Oman.jpg
 *   Author: Diorit · License: CC0 (public domain dedication)
 *
 * pit-candelaria-nevada.jpg (candidate, not currently placed)
 *   Source: https://commons.wikimedia.org/wiki/File:Pit_Mine_at_Candelaria_(54091288221).jpg
 *   Author: BLM Nevada · License: Public domain (US federal government work)
 *
 * high-desert-aerial-nevada.jpg (candidate, not currently placed)
 *   Source: https://commons.wikimedia.org/wiki/File:Abandon_Mine_Closure_BLM_Nevada_(44912037374).jpg
 *   Author: BLM Nevada ("mypubliclands" Flickr) · License: Public domain (US federal government work)
 */

// Industrial display type for the demonstration mockup only — loaded here so
// the rest of the studio site keeps its own branding.
const barlowCondensed = Barlow_Condensed({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-mining-display",
});

const PAGE_URL = "https://www.mrtorino.io/mining";
const PAGE_TITLE = "Websites for Mining & Drilling Contractors";
const PAGE_DESCRIPTION =
  "Professional website design and build for drilling contractors, exploration services, and mine-site support companies. Fast, mobile-ready, built to win bids.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    "mining contractor website",
    "drilling contractor website",
    "website design for drilling companies",
    "exploration services website",
    "mine site services website",
    "contractor web design",
  ],
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "mrtorino.io",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Website design and development for mining and drilling contractors",
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  provider: { "@type": "Organization", name: "mrtorino.io", url: "https://www.mrtorino.io" },
  areaServed: "US",
};

const audience = [
  {
    lead: "Drilling contractors",
    body: "Core, RC, water well, and geotechnical drilling outfits that win work on reputation but have no web presence to back it up.",
  },
  {
    lead: "Exploration services",
    body: "Sampling, mapping, claim staking, and geophysics crews whose clients check them out online before the first phone call.",
  },
  {
    lead: "Mine-site support",
    body: "Earthworks, reclamation, hauling, and pad construction companies bidding against outfits with polished websites.",
  },
  {
    lead: "Equipment & consumables",
    body: "Rig-parts suppliers, bit and rod dealers, and field-service shops that need a catalog customers can actually find.",
  },
];

const packageGroups = [
  {
    heading: "The build",
    items: [
      "Custom design — no templates, built around your equipment, your crews, and your work",
      "Copywriting that speaks your clients' language: recovery rates, uptime, safety record",
      "Photo treatment that makes field photography look as good as the work behind it",
    ],
  },
  {
    heading: "Getting found",
    items: [
      "Local + industry SEO so you show up when project managers search for contractors",
      "Mobile-first build — most of your clients will open it from a truck, not a desk",
      "Lead capture wired to your email — every inquiry lands in your inbox, no portal to check",
    ],
  },
  {
    heading: "The foundation",
    items: [
      "Fast hosting with SSL included — pages load in under a second on a jobsite connection",
      "You own everything: domain, content, and code. No monthly builder ransom.",
    ],
  },
];

const quoteHref =
  "mailto:hello@mrtorino.io?subject=Website%20quote%20%E2%80%94%20mining%20%2F%20drilling%20contractor";

// ————————————————————————————————————————————————————————————————
// Demonstration mockups. "Service Contractors LLC" is a fictional company —
// both frames below are illustrative design samples, not client work.
// ————————————————————————————————————————————————————————————————

function BrowserFrame({
  label,
  sublabel,
  children,
}: {
  label: string;
  sublabel: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="border border-[#1f1f1f] bg-[#111111]">
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
        <span className="ml-3 hidden sm:block flex-1 truncate border border-[#1f1f1f] bg-[#0a0a0a] px-3 py-1 text-[10px] text-[#6b6b6b]">
          servicecontractors.example
        </span>
        <span className="ml-auto flex-shrink-0 border border-[#2a2a2a] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#6b6b6b]">
          Design sample
        </span>
      </div>
      {children}
      <figcaption className="border-t border-[#1f1f1f] px-4 py-3">
        <div className="text-sm font-semibold">{label}</div>
        <div className="mt-0.5 text-xs text-[#6b6b6b]">{sublabel}</div>
      </figcaption>
    </figure>
  );
}

function BeforeMock() {
  return (
    <div className="bg-[#fdfdfb] px-5 py-6 text-[#444444]" aria-label="Illustrative mockup of a generic DIY template website">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e5e5e0] pb-3">
        <span className="font-serif italic text-lg text-[#333333]">Service Contractors LLC</span>
        <div className="flex gap-3 text-[10px] uppercase text-[#999999]">
          <span>Home</span>
          <span>About</span>
          <span className="text-[#bbbbbb]">/blank-1</span>
          <span className="text-[#bbbbbb]">/blank-2</span>
        </div>
      </div>
      <div className="mt-4 flex h-28 items-center justify-center bg-gradient-to-b from-[#dde4e8] to-[#c9d2d8]">
        <span className="font-serif text-xl text-[#7a8a94]">Welcome To Our Website!!</span>
      </div>
      <p className="mx-auto mt-4 max-w-[36ch] text-center font-serif text-[11px] leading-relaxed text-[#888888]">
        We are a company that does drilling and other services. We have been in business for many
        years. Please contact us for more information about our services.
      </p>
      <p className="mt-3 text-center text-[11px] text-[#4a6fa5] underline">
        servicecontractorsllc1987@gmail.com
      </p>
      <div className="mt-4 border-t border-[#e5e5e0] pt-3 text-center text-[9px] text-[#bbbbbb]">
        Made with SiteBuilder Free · Remove this banner?
      </div>
    </div>
  );
}

function AfterMock() {
  return (
    <div
      className="bg-[#161616] px-5 py-6 text-[#f5f0e8]"
      aria-label="Illustrative mockup of the demonstration website design for the fictional Service Contractors LLC"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a2a2a] pb-3">
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 flex-shrink-0 bg-[#f97316]" />
          <span className="mining-display text-base tracking-wide">Service Contractors LLC</span>
        </span>
        <div className="flex gap-3 text-[10px] uppercase tracking-[0.14em] text-[#b8b2a7]">
          <span>Services</span>
          <span>Equipment</span>
          <span>Safety</span>
          <span className="text-[#f97316]">Request a bid</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[3fr_2fr] gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.24em] text-[#f97316]">
            Licensed &amp; insured · Est. 1987
          </p>
          <p className="mining-display mt-2 text-2xl sm:text-3xl leading-[0.95]">
            Core drilling &amp; mine-site services
          </p>
          <p className="mt-2 max-w-[32ch] text-[11px] leading-relaxed text-[#b8b2a7]">
            High recovery, tight timelines, clean reclamation. Crews and equipment ready for your
            next program.
          </p>
          <span className="mt-3 inline-block bg-[#f97316] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1a0d02]">
            Request a bid
          </span>
        </div>
        {/* Rig photography placement — abstract silhouette stands in for the client's field photos */}
        <div className="relative flex items-end justify-center overflow-hidden border border-[#2a2a2a] bg-gradient-to-b from-[#3a2f26] via-[#241d17] to-[#161311]">
          <svg viewBox="0 0 80 72" className="h-full w-auto max-h-28 text-[#0c0a08]" aria-hidden="true">
            <polygon points="34,4 38,4 40,60 32,60" fill="currentColor" />
            <polygon points="36,4 62,60 54,60 35,14" fill="currentColor" />
            <rect x="20" y="56" width="48" height="8" fill="currentColor" />
            <rect x="14" y="62" width="60" height="6" fill="currentColor" />
            <circle cx="24" cy="68" r="4" fill="currentColor" />
            <circle cx="62" cy="68" r="4" fill="currentColor" />
          </svg>
          <span className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 text-[8px] text-[#b8b2a7]">
            Your rig photos here
          </span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 divide-x divide-[#2a2a2a] border-y border-[#2a2a2a] text-center">
        {[
          ["Core", "drilling"],
          ["24/7", "field support"],
          ["Zero", "lost-time goal"],
        ].map(([val, label]) => (
          <div key={label} className="py-2">
            <div className="mining-display text-sm text-[#f5f0e8]">{val}</div>
            <div className="text-[8px] uppercase tracking-[0.14em] text-[#b8b2a7]">{label}</div>
          </div>
        ))}
      </div>
      <div
        className="mt-4 h-2"
        style={{
          background:
            "repeating-linear-gradient(-45deg, #f97316 0 8px, #161616 8px 16px)",
        }}
      />
    </div>
  );
}

export default function MiningPage() {
  return (
    <div
      className={`${barlowCondensed.variable} min-h-screen bg-[#0a0a0a] text-[#f5f5f5] overflow-x-hidden`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader cta={{ label: "Get a quote", href: quoteHref }} />

      {/* HERO — night drill-rig photo as a subdued atmosphere layer, kept well
          under the text with a heavy dark overlay */}
      <section className="relative">
        <Image
          src="/mining/rig-night-nevada.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/75 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        <p className="absolute bottom-3 right-4 z-10 text-[10px] text-[#6b6b6b]">
          Drill rig on public land, Nevada — BLM photo, public domain
        </p>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-16">
          <div className="fade-up">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#6b6b6b] mb-8">
              Website design &amp; build · Mining, drilling &amp; exploration services
            </p>

            <h1
              className="font-display uppercase leading-[0.88]"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)" }}
            >
              Your crews are professional.
              <span className="block">Your website should be too.</span>
            </h1>

            <p className="mt-8 text-lg text-[#6b6b6b] max-w-xl leading-relaxed">
              Project managers look you up before they call you back. A fast, credible website built
              around your equipment, your safety record, and your work — not a DIY template with
              placeholder pages.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={quoteHref}
                className="inline-flex items-center gap-2 h-12 px-7 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium uppercase tracking-[0.1em] transition-colors"
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#sample"
                className="inline-flex items-center h-12 px-7 border border-[#2a2a2a] text-[#f5f5f5] text-sm uppercase tracking-[0.1em] hover:bg-[#f5f5f5] hover:text-[#0a0a0a] hover:border-[#f5f5f5] transition-colors"
              >
                See a sample build
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hazard-stripe divider — once on the page, hero → sample only */}
      <div
        aria-hidden="true"
        className="h-1.5"
        style={{
          background: "repeating-linear-gradient(-45deg, #f97316 0 8px, #0a0a0a 8px 16px)",
        }}
      />

      {/* SAMPLE PROJECT — fictional demonstration */}
      <section id="sample" className="scroll-mt-20 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h2 className="font-display uppercase text-4xl sm:text-5xl leading-none">
          Sample project: Service Contractors LLC
        </h2>
        <p className="mt-6 mb-10 max-w-2xl text-sm text-[#6b6b6b] leading-relaxed">
          Service Contractors LLC is a <strong className="text-[#f5f5f5]/80">fictional company</strong> —
          this section is a demonstration of the kind of site I design and build for contractors in
          this space, not a client project. Both frames below are illustrative.
        </p>
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <BrowserFrame
            label="Before — a typical DIY template"
            sublabel="Illustrative: stock builder theme, unfinished pages, personal email as the only contact"
          >
            <BeforeMock />
          </BrowserFrame>
          <BrowserFrame
            label="After — the demonstration build"
            sublabel="Illustrative: industrial design language, clear services, a bid request front and center"
          >
            <AfterMock />
          </BrowserFrame>
        </div>
        <p className="mt-6 text-xs text-[#6b6b6b]">
          The &ldquo;after&rdquo; frame shows the design system I bring to this niche — condensed
          industrial type, dark palette, safety-orange accents, and space for your real field
          photography. Your site is designed from scratch around your company.
        </p>
      </section>

      {/* WHO IT'S FOR */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h2 className="font-display uppercase text-4xl sm:text-5xl leading-none mb-10">
          Built for the field
        </h2>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="grid gap-x-12 sm:grid-cols-2">
            {audience.map(({ lead, body }) => (
              <p
                key={lead}
                className="border-t border-[#1f1f1f] py-6 text-sm text-[#6b6b6b] leading-relaxed"
              >
                <strong className="font-semibold text-[#f5f5f5]">{lead}.</strong> {body}
              </p>
            ))}
          </div>
          <figure className="border border-[#1f1f1f]">
            <div className="relative aspect-[3/2]">
              <Image
                src="/mining/drill-crew-pretty-rocks.jpg"
                alt="Core drilling crew working a rig on a mountain road, snow-capped peaks behind"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-[#1f1f1f] px-4 py-3 text-xs text-[#6b6b6b]">
              Core drilling at Pretty Rocks, Denali — National Park Service photo, public domain
            </figcaption>
          </figure>
        </div>
      </section>

      {/* WHO YOU'RE WORKING WITH */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h2 className="font-display uppercase text-4xl sm:text-5xl leading-none">
          Who you&apos;re working with
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#6b6b6b] leading-relaxed">
          I design, build, and answer the email myself — one person, no account managers, no
          handoffs. I work from Medford, Oregon, where I&apos;ve designed, built, and shipped nine
          live products solo at{" "}
          <Link
            href="/"
            className="text-[#f5f5f5] underline decoration-[#2a2a2a] underline-offset-4 transition-colors hover:decoration-[#f5f5f5]"
          >
            the studio
          </Link>
          . When you email about your site, I&apos;m the one who reads it.
        </p>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h2 className="font-display uppercase text-4xl sm:text-5xl leading-none mb-10">
          The whole package
        </h2>
        <div className="grid gap-10 md:grid-cols-3 max-w-5xl">
          {packageGroups.map(({ heading, items }) => (
            <div key={heading}>
              <h3 className="font-semibold">{heading}</h3>
              <div className="mt-4 space-y-4">
                {items.map((item) => (
                  <p key={item} className="text-sm text-[#6b6b6b] leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core-sample texture band — atmosphere, not portfolio */}
      <div className="relative mt-6 h-32 md:h-44">
        <Image
          src="/mining/drill-core-closeup.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/35" />
        <p className="absolute bottom-2 right-4 text-[10px] text-[#f5f5f5]/60">
          Oriented exploration drill core — CC0 photo
        </p>
      </div>

      {/* QUOTE CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="border border-[#1f1f1f] bg-[#f5f5f5] text-[#0a0a0a] p-8 lg:p-10">
          <div className="text-sm text-[#0a0a0a]/50 mb-4">Straight answer, no sales call.</div>
          <h2 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95] max-w-lg">
            Send me what you do. I&apos;ll send back a fixed quote.
          </h2>
          <p className="mt-4 text-[#0a0a0a]/60 text-lg leading-relaxed max-w-lg">
            Tell me about your company — services, service area, and whether you have photos of your
            equipment and crews. You&apos;ll get a scope, a timeline, and a price.
          </p>
          <div className="mt-8">
            <a
              href={quoteHref}
              className="inline-flex items-center gap-2 h-12 px-7 bg-[#0a0a0a] text-[#f5f5f5] text-sm font-medium uppercase tracking-[0.1em] hover:bg-black transition-colors"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-sm text-[#0a0a0a]/60">
            You&apos;ll hear back from me — the person who builds it.
          </p>
        </div>
      </section>

      {/* Slim footer — a drilling prospect doesn't need the product catalog */}
      <footer className="border-t border-[#1f1f1f] mt-10 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="font-display uppercase text-2xl leading-none">
              mrtorino.io<span className="text-orange-500">.</span>
            </div>
            <div className="text-xs text-[#6b6b6b] mt-2">
              Designed and built by one person. Medford, OR.
            </div>
          </div>
          <div className="sm:text-right">
            <Link
              href="/"
              className="text-xs text-[#6b6b6b] hover:text-[#f5f5f5] transition-colors"
            >
              More from the studio →
            </Link>
            <div className="text-xs text-[#6b6b6b]/70 mt-2">
              © {new Date().getFullYear()} mrtorino.io
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
