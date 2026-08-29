import type { Metadata } from "next";
import { Figure, SheetHeader } from "../sheet";
import { CareersForm } from "./careers-form";

export const metadata: Metadata = {
  title: "Now Hiring",
  description:
    "Big Sky Exploration is hiring experienced surface diamond core drillers and core assistants. Top wages, footage bonus, paid travel, and health benefits.",
};

const openings = [
  "Experienced Surface Diamond Core Driller",
  "Experienced Surface Diamond Core Assistants",
];

const benefits = [
  "Top Wages",
  "Footage Bonus",
  "Travel To and From Worksite",
  "Paid Travel on Crew Rotation Breaks",
  "Health Benefits, Vision, and Dental (contingent on 90-day employment)",
];

export default function BseCareersPage() {
  return (
    <>
      {/* Sheet 01 — title + Fig. 1. lf90-lf230.jpg (900x723, client photo,
          also gallery Fig. 4 on the homepage). The former work-gloves-and-cash stock
          image was removed: not a BSE photo, licensing unverified. */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5">
          <SheetHeader n={1} title="Now hiring" meta="Fig. 1" />
          <div className="grid items-stretch gap-10 md:grid-cols-[3fr_2fr]">
            <div className="flex flex-col justify-center pt-12 md:py-20">
              <h1 className="bse-display text-6xl sm:text-7xl lg:text-8xl">We’re a Team. Come join us.</h1>
            </div>
            <Figure
              fig={1}
              src="/bse/lf90-lf230.jpg"
              alt="Two core rigs working neighboring pads on a juniper-covered hillside"
              caption="LF 90 and LF 230, dual set‑up"
              label="Expand image: LF 90 and LF 230, dual set-up"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              aspectClass="aspect-[5/4] md:aspect-auto md:min-h-[20rem] md:flex-1"
              className="border-t-0 md:border-r-0"
            />
          </div>
        </div>
      </section>

      {/* Sheet 02 — openings, benefits, Fig. 2; Sheet 03 — application form */}
      <section>
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <div className="grid gap-14 lg:grid-cols-[320px_1fr]">
            <aside>
              <SheetHeader n={2} title="Open positions" meta="Fig. 2" />
              <div className="mt-8 space-y-10">
                <div>
                  <p className="bse-mono mb-4 text-[var(--bse-muted)]">Open positions</p>
                  <ul className="space-y-3">
                    {openings.map((o) => (
                      <li key={o} className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-4 font-semibold">
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="bse-mono mb-4 text-[var(--bse-muted)]">Offering qualified drillers</p>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--bse-muted)]">
                    {benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <Figure
                  fig={2}
                  src="/bse/lf90-sunrise.jpg"
                  alt="Sunrise over the mountains behind a trailer of drill rod at the site"
                  caption="LF 90 at first light"
                  label="Expand image: sunrise over the drill site"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  aspectClass="aspect-[4/3] lg:aspect-[2/3]"
                />
              </div>
            </aside>

            <div>
              <SheetHeader n={3} title="Apply now" meta="Every application reviewed" />
              <h2 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Apply now</h2>
              <p className="mt-3 max-w-xl text-sm text-[var(--bse-muted)]">
                Tell us a little about yourself and how to reach you. We review every application.
              </p>
              <div className="mt-8 border border-[var(--bse-border)] bg-[var(--bse-card)] p-8 sm:p-10">
                <CareersForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
