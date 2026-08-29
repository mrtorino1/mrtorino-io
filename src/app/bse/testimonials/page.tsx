import type { Metadata } from "next";
import Link from "next/link";
import { Figure, SheetHeader } from "../sheet";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Letters of recommendation from Big Sky Exploration clients, including Timberline Resources Corporation and GPE Consulting Services.",
};

/** Mono FROM / DATE header row shared by both letter cards. */
function LetterHeader({ from, date }: { from: string; date?: string }) {
  return (
    <div className="bse-mono grid gap-y-1 border-b border-[var(--bse-border)] pb-4 text-[var(--bse-muted)] sm:grid-cols-[1fr_auto] sm:gap-x-8">
      <span>
        From <span className="text-[var(--bse-text)]">{from}</span>
      </span>
      <span>
        Date <span className="text-[var(--bse-text)]">{date ?? "—"}</span>
      </span>
    </div>
  );
}

export default function BseTestimonialsPage() {
  return (
    <>
      {/* Sheet 01 — title + Fig. 1. lf90-2.jpg is portrait: aspect-matched panel */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5">
          <SheetHeader n={1} title="Testimonials" meta="Fig. 1" />
          <div className="grid items-stretch gap-10 md:grid-cols-[3fr_2fr]">
            <div className="flex flex-col justify-center pt-12 md:py-20">
              <h1 className="bse-display text-6xl sm:text-7xl lg:text-8xl">Testimonials</h1>
              <p className="mt-6 max-w-md text-base text-[var(--bse-muted)]">
                Two letters of recommendation from recent core programs, reproduced in full.
              </p>
            </div>
            <Figure
              fig={1}
              src="/bse/lf90-2.jpg"
              alt="Core rig on a ridgetop pad with the valley floor stretching out behind it"
              caption="LF 90 set up on a ridgetop pad"
              label="Expand image: LF 90 on a ridgetop pad"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              aspectClass="aspect-[3/4] md:aspect-auto md:min-h-[26rem] md:flex-1"
              className="border-t-0 md:border-r-0"
            />
          </div>
        </div>
      </section>

      {/* Sheet 02 — the letters */}
      <section>
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <SheetHeader n={2} title="Letters of recommendation" meta="2 letters on file" />
          <div className="mx-auto mt-10 max-w-4xl space-y-12">
            {/* Timberline Resources */}
            <article className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-8 sm:p-12">
              <LetterHeader from="Timberline Resources Corporation" date="August 5, 2022" />
              <h2 className="mt-6 text-2xl font-semibold tracking-tight">Timberline Resources Corporation</h2>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--bse-muted)]">
                <p>
                  To Whom it may Concern — RE: Recommendation of Big Sky Exploration, LLC diamond drillers.
                </p>
                <p>
                  As Vice President, Exploration for Timberline Resources Corporation I am pleased to offer
                  this strong recommendation for the diamond drilling services of Big Sky Exploration, LLC
                  (BSE) as led by Mr. Ben Seiben.
                </p>
                <p>
                  Timberline Resources is in repeat contract engagement with BSE for several thousand meters
                  of core drilling on our northern Nevada exploration program. BSE’s drilling of PQ, HQ, and
                  occasionally NQ core has been beyond expectation in production with consistently excellent
                  recovery in difficult, broken, often highly altered rock all under sometimes difficult
                  site (including winter) conditions.
                </p>
                <p>
                  BSE operates efficiently with a safety-first approach. They run a well-organized and clean
                  operation and are resourceful problem-solvers. They willingly engage and implement modern
                  mud technologies and engineering leading to excellent production and recovery success for
                  Timberline. Their connections to suppliers are excellent; they have managed to avoid
                  shortages even through the current challenging supply chain environment.
                </p>
                <p>
                  I appreciate BSE’s particular attention to coordinate with our geologists to develop an
                  understanding of the rock character of our particular stratigraphy and structural zones.
                  They have also developed and maintain excellent relationships with our RC drillers
                  allowing a seamless, efficient coordination from RC pre-collar to core drilling.
                </p>
                <p className="text-[var(--bse-text)]">
                  In summary, BSE provides a high quality, very cost-effective, and efficient core drilling
                  service. I highly recommend them and consider them to be our first choice core driller as
                  our exploration programs advance.
                </p>
              </div>
              <footer className="mt-8 border-t border-[var(--bse-border)] pt-6">
                <p className="font-semibold">Steven A. Osterberg, Ph.D., P.G.</p>
                <p className="text-sm text-[var(--bse-muted)]">Vice President — Exploration</p>
                <a
                  href="https://www.timberline-resources.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-[var(--bse-accent)] hover:underline"
                >
                  www.timberline-resources.com
                </a>
              </footer>
            </article>

            {/* GPE Consulting Services */}
            <article className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-8 sm:p-12">
              <LetterHeader from="GPE Consulting Services" />
              <h2 className="mt-6 text-2xl font-semibold tracking-tight">GPE Consulting Services</h2>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--bse-muted)]">
                <p>Dear Ben,</p>
                <p>
                  I want to thank you and Adam for the excellent work you did for Golden Hill Mining at the
                  FAD property in Eureka Nevada. I was a hard sell for you at first but after looking at the
                  poor performance of other drill companies out at the property and talking to some of your
                  other clients I was persuaded to give you a try. I am glad I did.
                </p>
                <p>
                  In the short few months before the takeover of the property by i80 gold you drilled 4
                  holes for over eight thousand feet at an average direct drill cost of about $93 per foot.
                  More so, the recoveries achieved under some difficult conditions were excellent. Although
                  my tenure at FAD has been cut short I understand one of the holes you drilled through the
                  mineralized zone contained recoveries of better than 80% in soft friable massive sulfide
                  material. I am pleased by that.
                </p>
                <p className="text-[var(--bse-text)]">
                  These numbers are far far better than other drill companies I have used in the past and I
                  will certainly be requesting bids from you on my next drill campaign. Please use this as a
                  letter of recommendation for potential clients.
                </p>
                <p>Best of luck to you and Adam and stay in touch.</p>
              </div>
              <footer className="mt-8 border-t border-[var(--bse-border)] pt-6">
                <p className="font-semibold">Gary Edmondo</p>
                <p className="text-sm text-[var(--bse-muted)]">GPE Consulting Services</p>
                <a
                  href="mailto:gpegeo@charter.net"
                  className="mt-1 inline-block text-sm text-[var(--bse-accent)] hover:underline"
                >
                  gpegeo@charter.net
                </a>
              </footer>
            </article>

            {/* CTA — light title-block frame */}
            <div className="border border-[var(--bse-text)]">
              <div className="bse-mono flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-[var(--bse-text)] px-6 py-2 text-[var(--bse-muted)] sm:px-8">
                <span>Project inquiry</span>
                <span>602-329-6330</span>
              </div>
              <div className="px-6 py-8 sm:px-8">
                <p className="max-w-2xl text-[15px] text-[var(--bse-muted)]">
                  Call{" "}
                  <a href="tel:+16023296330" className="text-[var(--bse-text)] underline underline-offset-4">
                    602-329-6330
                  </a>{" "}
                  or send your project details through the contact form.
                </p>
                <Link
                  href="/bse/contact"
                  className="mt-6 inline-block bg-[var(--bse-accent)] px-7 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
                >
                  Request a bid
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
