import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExpandIcon, LightboxTrigger } from "../lightbox";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Letters of recommendation from Big Sky Exploration clients, including Timberline Resources Corporation and GPE Consulting Services.",
};

export default function BseTestimonialsPage() {
  return (
    <>
      {/* lf90-2.jpg is portrait (3024x4032 after EXIF rotation) — aspect-matched
          panel beside the title instead of a cropping full-width banner */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[3fr_2fr] md:py-20">
          <div>
            <h1 className="text-4xl font-semibold sm:text-5xl">Testimonials</h1>
            <p className="mt-4 max-w-md text-[var(--bse-muted)]">
              Two letters of recommendation from recent core programs, reproduced in full.
            </p>
          </div>
          <LightboxTrigger
            images={[
              {
                src: "/bse/lf90-2.jpg",
                alt: "Core rig on a ridgetop pad with the valley floor stretching out behind it",
                caption: "LF 90 set up on a ridgetop pad",
              },
            ]}
            label="Expand image: LF 90 on a ridgetop pad"
            className="group relative block aspect-[3/4] w-full overflow-hidden border border-[var(--bse-border)] transition-colors hover:border-[var(--bse-border-strong)]"
          >
            <Image
              src="/bse/lf90-2.jpg"
              alt="Core rig on a ridgetop pad with the valley floor stretching out behind it"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <span className="absolute bottom-2 right-2 rounded-sm bg-black/60 p-1.5 text-[var(--bse-text)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              <ExpandIcon className="h-4 w-4" />
            </span>
          </LightboxTrigger>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-12 px-5 py-20">
        {/* Timberline Resources */}
        <article className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-8 sm:p-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--bse-border)] pb-6">
            <h2 className="text-2xl font-semibold">Timberline Resources Corporation</h2>
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
            <h2 className="text-2xl font-semibold">GPE Consulting Services</h2>
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

        <div>
          <p className="max-w-2xl text-[var(--bse-muted)]">
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
      </section>
    </>
  );
}
