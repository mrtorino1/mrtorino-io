import Image from "next/image";
import Link from "next/link";

const strengths = [
  {
    n: "01",
    title: "Core Recovery",
    body: "Highly skilled and professional. We provide industry clients with high core recovery in an economical and reliable manner, every time.",
  },
  {
    n: "02",
    title: "Equipment & Tooling",
    body: "Current equipment and tooling. We proudly stock multiple drill parts in our inventory, minimizing down time due to mechanical breakdowns.",
  },
  {
    n: "03",
    title: "On Time, On Budget",
    body: "Timely, within budget, without sacrificing quality. We strive to run an efficient drill program, in return, keeping the project cost at a minimum.",
  },
  {
    n: "04",
    title: "Safety First",
    body: "Unwavering commitment to safety. We continually train our crews and stay up-to-date on the latest regulations and safety information.",
  },
];

const gallery = [
  { src: "/bse/lf90-1.jpg", label: "LF 90" },
  { src: "/bse/lf90-lf230.jpg", label: "LF 90 and LF 230" },
  { src: "/bse/reclamation.jpg", label: "Reclamation" },
  { src: "/bse/dolomite-1.jpg", label: "Sanded Dolomite" },
  { src: "/bse/dolomite-closeup.jpg", label: "Sanded Dolomite, Close-Up" },
  { src: "/bse/lf90-sunrise.jpg", label: "LF 90 Sunrise" },
];

export default function BseHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <Image
          src="/bse/hero.jpg"
          alt="Diamond core drill rig operating on a Big Sky Exploration project site"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161616] via-[#161616]/80 to-[#161616]/30" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-24">
          <p className="bse-eyebrow mb-5">Surface Diamond Core Drilling · AZ ROC 354039</p>
          <h1 className="bse-display max-w-3xl text-6xl sm:text-7xl md:text-8xl">
            Specializing in <span className="text-[var(--bse-accent)]">Core Recovery</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--bse-muted)]">
            Where Integrity, Ingenuity, and Quality Result In Success. Big Sky Exploration, LLC is a
            surface diamond core drilling company serving mineral exploration programs across the West.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/bse/contact"
              className="bg-[var(--bse-accent)] px-7 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
            >
              Request a Bid
            </Link>
            <Link
              href="#work"
              className="border border-[var(--bse-border-strong)] px-7 py-3.5 font-semibold transition-colors hover:border-[var(--bse-accent)] hover:text-[var(--bse-accent)]"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="border-t border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="bse-eyebrow mb-3">Why Big Sky</p>
          <h2 className="bse-display text-4xl sm:text-5xl">Built for Difficult Ground</h2>
          <div className="mt-12 grid gap-px border border-[var(--bse-border)] bg-[var(--bse-border)] sm:grid-cols-2">
            {strengths.map((s) => (
              <div key={s.n} className="bg-[var(--bse-card)] p-8">
                <p className="font-mono text-sm text-[var(--bse-accent)]">{s.n}</p>
                <h3 className="bse-display mt-3 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--bse-muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="work" className="border-t border-[var(--bse-border)] scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="bse-eyebrow mb-3">Success in Action</p>
          <h2 className="bse-display text-4xl sm:text-5xl">From the Field</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <figure key={g.src} className="group border border-[var(--bse-border)] bg-[var(--bse-card)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={g.src}
                    alt={`${g.label} — Big Sky Exploration drilling operations`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="border-t border-[var(--bse-border)] px-4 py-3 font-mono text-xs uppercase tracking-widest text-[var(--bse-muted)]">
                  {g.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial pull quote */}
      <section className="border-t border-[var(--bse-border)] bg-[var(--bse-card)]">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="bse-eyebrow mb-6">What Clients Say</p>
          <blockquote className="text-2xl leading-snug sm:text-3xl">
            “BSE provides a high quality, very cost-effective, and efficient core drilling service. I
            highly recommend them and consider them to be our first choice core driller.”
          </blockquote>
          <p className="mt-6 text-sm text-[var(--bse-muted)]">
            Steven A. Osterberg, Ph.D., P.G. — Vice President, Exploration, Timberline Resources Corporation
          </p>
          <Link
            href="/bse/testimonials"
            className="mt-8 inline-block border border-[var(--bse-border-strong)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--bse-accent)] hover:text-[var(--bse-accent)]"
          >
            Read the Full Letters
          </Link>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-[var(--bse-border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="bse-display text-4xl sm:text-5xl">
              Have a Drill Program <span className="text-[var(--bse-accent)]">Coming Up?</span>
            </h2>
            <p className="mt-3 max-w-xl text-[var(--bse-muted)]">
              Get in touch to learn how we will approach your project goals and reliably fulfill your contract.
            </p>
          </div>
          <Link
            href="/bse/contact"
            className="shrink-0 bg-[var(--bse-accent)] px-8 py-4 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
