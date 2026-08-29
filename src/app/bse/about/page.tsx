import type { Metadata } from "next";
import Link from "next/link";
import { Figure, SheetHeader } from "../sheet";

export const metadata: Metadata = {
  title: "Core Values",
  description:
    "We established Big Sky Exploration out of a pure passion for diamond core drilling — flexibility and adaptability to hole conditions maximize core recovery.",
};

const capabilities = [
  {
    title: "Custom drill bits",
    body: "We have the ability to reach out to manufacturers to customize drill bits for the ground you are drilling.",
  },
  {
    title: "Project-specific mud mixes",
    body: "We design mud mixes for each specific project, adapting to hole conditions as they change.",
  },
  {
    title: "Roads & drill pads",
    body: "Our small fleet of heavy equipment and operators allows us to easily build roads and form drill pads.",
  },
  {
    title: "Sumpless drill pads",
    body: "Environmental needs are attainable with our sumpless drill pad option, and full reclamation when the program wraps.",
  },
];

export default function BseAboutPage() {
  return (
    <>
      {/* Sheet 01 — title + Fig. 1. about.jpg is portrait (3024x4032 after
          EXIF rotation): aspect-matched panel, flush to the sheet rule. */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5">
          <SheetHeader n={1} title="Core values" meta="Fig. 1" />
          <div className="grid items-stretch gap-10 md:grid-cols-[3fr_2fr]">
            <div className="flex flex-col justify-center pt-12 md:py-20">
              <h1 className="bse-display text-6xl sm:text-7xl lg:text-8xl">Core values</h1>
            </div>
            <Figure
              fig={1}
              src="/bse/about.jpg"
              alt="Core box with runs of recovered core and handwritten depth markers, set on the ground at the drill site"
              caption="Core box at the drill site"
              label="Expand image: core box at the drill site"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              aspectClass="aspect-[3/4] md:aspect-auto md:min-h-[26rem] md:flex-1"
              className="border-t-0 md:border-r-0"
            />
          </div>
        </div>
      </section>

      {/* Sheet 02 — story + Fig. 2 */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <SheetHeader n={2} title="Specializing in core recovery" meta="Fig. 2" />
          <div className="mt-8 grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Specializing in core recovery</h2>
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-[var(--bse-muted)]">
                <p>
                  We established Big Sky Exploration out of a pure passion for diamond core drilling. In
                  our many years of experience, we have determined that flexibility, mixed with
                  adaptability to hole conditions, maximizes core recovery. With our “old school”
                  approach that every drill hole can be completed, we take great pride in each and every
                  accomplishment.
                </p>
                <p>
                  Clients are surprised to learn that we have the ability to reach out to manufacturers
                  to customize drill bits. They are also pleased at the fact that we are able to design
                  mud mixes for each specific project. In addition, our small fleet of heavy equipment
                  and operators allows us to easily build roads and form drill pads. Environmental needs
                  are attainable as well with our sumpless drill pad option.
                </p>
              </div>
              <p className="mt-6 font-semibold">Ben Sieben, Owner</p>
              <p className="mt-2 text-sm text-[var(--bse-muted)]">
                Based in Arizona. Drilling projects throughout Nevada and the western United States.
              </p>
              <Link
                href="/bse/contact"
                className="mt-8 inline-block bg-[var(--bse-accent)] px-7 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
              >
                Get in touch
              </Link>
            </div>
            <Figure
              fig={2}
              src="/bse/dolomite-2.jpg"
              alt="Boxed runs of sanded dolomite core laid out for review"
              caption="Sanded dolomite core"
              label="Expand image: sanded dolomite core samples"
              sizes="(max-width: 1024px) 100vw, 50vw"
              aspectClass="aspect-[3/4] lg:aspect-auto lg:flex-1"
            />
          </div>
        </div>
      </section>

      {/* Sheet 03 — capabilities */}
      <section>
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <SheetHeader n={3} title="More than a drill crew" meta="4 capabilities" />
          <h2 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">More than a drill crew</h2>
          <div className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="border-b border-[var(--bse-border)] pb-8">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--bse-muted)]">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-[15px] text-[var(--bse-muted)]">
            Get in touch to learn more about how we will approach your project goals and reliably
            fulfill your contract.
          </p>
        </div>
      </section>
    </>
  );
}
