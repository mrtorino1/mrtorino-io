import type { Metadata } from "next";
import Link from "next/link";
import { Figure, Nameplate, SheetHeader } from "./sheet";
import { BSE_DESCRIPTION, BSE_TITLE, BSE_URL } from "./seo";

export const metadata: Metadata = {
  // absolute: the BSE layout's title.default would otherwise be formatted by
  // the ROOT layout's "%s | mrtorino.io" template (templates apply to child
  // segments, and /bse's default comes from a child layout of root).
  title: { absolute: BSE_TITLE },
};

// Value props — headings are the first sentence of each original blurb,
// bodies are the remaining client copy verbatim.
const strengths = [
  {
    title: "Highly skilled and professional",
    body: "We provide industry clients with high core recovery in an economical and reliable manner, every time.",
  },
  {
    title: "Current equipment and tooling",
    body: "We proudly stock multiple drill parts in our inventory, minimizing down time due to mechanical breakdowns.",
  },
  {
    title: "Timely, within budget, without sacrificing quality",
    body: "We strive to run an efficient drill program, in return, keeping the project cost at a minimum.",
  },
  {
    title: "Unwavering commitment to safety",
    body: "We continually train our crews and stay up-to-date on the latest regulations and safety information.",
  },
];

const gallery = [
  {
    src: "/bse/lf90-sunrise.jpg",
    label: "LF 90 at first light",
    alt: "Sunrise over the mountains from the drill shack doorway, heater glowing and a trailer of drill rod in the foreground",
    wide: true,
  },
  {
    src: "/bse/lf90-1.jpg",
    label: "LF 90 on a northern Nevada core program",
    alt: "Drill rig with mast raised under a double rainbow after a passing storm",
  },
  {
    src: "/bse/lf90-lf230.jpg",
    label: "LF 90 and LF 230 running side by side",
    alt: "Two core rigs working neighboring pads on a juniper-covered hillside",
  },
  {
    src: "/bse/lf90-2.jpg",
    label: "LF 90 set up on a ridgetop pad",
    alt: "Rig on a graded ridgetop pad with the access road and basin visible below",
  },
  {
    src: "/bse/reclamation.jpg",
    label: "Site reclamation after program completion",
    alt: "Backhoe regrading a hillside drill pad during reclamation work",
  },
  {
    src: "/bse/dolomite-1.jpg",
    label: "Sanded dolomite core",
    alt: "Wooden tray holding a run of freshly recovered sanded dolomite core",
  },
  {
    src: "/bse/dolomite-closeup.jpg",
    label: "Sanded dolomite — close-up",
    alt: "Hand holding a broken section of sanded dolomite core above the tray",
  },
  {
    src: "/bse/dolomite-2.jpg",
    label: "Recovered core boxed for logging",
    alt: "Core boxes filled with sanded dolomite intervals awaiting geologic logging",
  },
];

// Figure numbering runs per page: the hero photo is Fig. 1, the gallery 2–9.
const heroImage = {
  src: "/bse/hero.jpg",
  alt: "LF 90 drill rig with mast raised on a graded pad, support truck and drill pipe alongside",
  caption: "LF 90 on site",
  fig: 1,
};

const galleryImages = gallery.map((g, i) => ({
  src: g.src,
  alt: g.alt,
  caption: g.label,
  fig: i + 2,
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Big Sky Exploration, LLC",
  telephone: "+1-602-329-6330",
  email: "bse.b.sieben@gmail.com",
  url: BSE_URL,
  description: BSE_DESCRIPTION,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "AZ ROC",
    value: "354039",
  },
};

export default function BseHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sheet 01 — hero. Split layout kept; the photo panel sits flush to the
          sheet rule and the right content edge (no floating-card inset).
          hero.jpg is portrait (2202x2578) so it fills the row height. */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5">
          <SheetHeader
            n={1}
            title="Surface diamond core drilling"
            meta={<>Licensed &amp; insured · AZ ROC 354039</>}
          />
          <div className="grid items-stretch gap-10 md:grid-cols-[3fr_2fr] md:gap-12">
            <div className="flex flex-col justify-center pt-12 md:py-20">
              <h1 className="bse-display text-6xl sm:text-8xl lg:text-[6.75rem]">
                Specializing in Core Recovery
              </h1>
              <p className="mt-6 max-w-xl text-base text-[var(--bse-muted)]">
                Where Integrity, Ingenuity, and Quality Result In Success.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link
                  href="/bse/contact"
                  className="bg-[var(--bse-accent)] px-7 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
                >
                  Request a bid
                </Link>
                <a
                  href="tel:+16023296330"
                  className="text-[var(--bse-text)] underline decoration-[var(--bse-border-strong)] underline-offset-4 transition-colors hover:decoration-[var(--bse-accent)]"
                >
                  or call 602-329-6330
                </a>
              </div>
            </div>
            <Figure
              fig={1}
              src={heroImage.src}
              alt={heroImage.alt}
              caption={heroImage.caption}
              images={[heroImage]}
              label="Expand image: LF 90 on site"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              aspectClass="aspect-[4/5] md:aspect-auto md:flex-1"
              className="border-t-0 md:border-r-0"
            />
          </div>
        </div>
      </section>

      {/* Nameplate — equipment data plate */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <Nameplate />
        </div>
      </section>

      {/* Sheet 02 — value props */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <SheetHeader n={2} title="Why clients hire us" meta="Licensed & insured" />
          <h2 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Why clients hire us</h2>
          <div className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {strengths.map((s) => (
              <div key={s.title} className="border-b border-[var(--bse-border)] pb-8">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--bse-muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sheet 03 — gallery as numbered figures */}
      <section id="work" className="scroll-mt-20 border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <SheetHeader n={3} title="Recent work" meta="Figs. 2–9" />
          <h2 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Recent work</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <Figure
                key={g.src}
                fig={i + 2}
                src={g.src}
                alt={g.alt}
                caption={g.label}
                images={galleryImages}
                startIndex={i}
                label={`Expand image: ${g.label}`}
                sizes={
                  g.wide
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                aspectClass={g.wide ? "aspect-[4/3] sm:aspect-[8/3]" : "aspect-[4/3]"}
                className={g.wide ? "sm:col-span-2" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sheet 04 — client references */}
      <section className="border-b border-[var(--bse-border)] bg-[var(--bse-card)]">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <SheetHeader n={4} title="Client references" meta="2 letters on file" />
          <h2 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Client references</h2>
          <blockquote className="mt-8 max-w-3xl text-xl leading-relaxed">
            “BSE provides a high quality, very cost-effective, and efficient core drilling service. I
            highly recommend them and consider them to be our first choice core driller.”
          </blockquote>
          <p className="mt-4 text-sm text-[var(--bse-muted)]">
            Steven A. Osterberg, Ph.D., P.G. — Vice President, Exploration, Timberline Resources Corporation
          </p>
          <Link
            href="/bse/testimonials"
            className="mt-6 inline-block text-[var(--bse-accent)] underline underline-offset-4 hover:no-underline"
          >
            Read the full letters
          </Link>
        </div>
      </section>

      {/* Contact band — inside a light title-block frame */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="border border-[var(--bse-text)]">
            <div className="bse-mono flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-[var(--bse-text)] px-6 py-2 text-[var(--bse-muted)] sm:px-8">
              <span>Project inquiry</span>
              <span>602-329-6330</span>
            </div>
            <div className="px-6 py-10 sm:px-8">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Send us your project details</h2>
              <p className="mt-3 max-w-2xl text-[15px] text-[var(--bse-muted)]">
                Call{" "}
                <a href="tel:+16023296330" className="text-[var(--bse-text)] underline underline-offset-4">
                  602-329-6330
                </a>{" "}
                or use the contact form. We&rsquo;ll get back to you with a straight answer on approach,
                timeline, and cost.
              </p>
              <Link
                href="/bse/contact"
                className="mt-7 inline-block bg-[var(--bse-accent)] px-7 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
