import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Letters of recommendation from Big Sky Exploration clients, including Timberline Resources Corporation and GPE Consulting Services.",
};

export default function BseTestimonialsPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-end overflow-hidden">
        <Image
          src="/bse/lf90-2.jpg"
          alt="LF 90 diamond core drill rig set up on a project site"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32">
          <p className="bse-eyebrow mb-4">What They’re Saying About Us</p>
          <h1 className="bse-display text-6xl sm:text-7xl">Testimonials</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-12 px-5 py-20">
        {/* Timberline Resources */}
        <article className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-8 sm:p-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--bse-border)] pb-6">
            <h2 className="bse-display text-3xl">Timberline Resources Corporation</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--bse-muted)]">August 5, 2022</p>
          </div>
          <div className="mt-7 space-y-5 leading-relaxed text-[var(--bse-muted)]">
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
          <div className="border-b border-[var(--bse-border)] pb-6">
            <h2 className="bse-display text-3xl">GPE Consulting Services</h2>
          </div>
          <div className="mt-7 space-y-5 leading-relaxed text-[var(--bse-muted)]">
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

        <div className="text-center">
          <p className="text-[var(--bse-muted)]">Ready to see these results on your project?</p>
          <Link
            href="/bse/contact"
            className="mt-5 inline-block bg-[var(--bse-accent)] px-7 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
          >
            Request a Bid
          </Link>
        </div>
      </section>
    </>
  );
}
