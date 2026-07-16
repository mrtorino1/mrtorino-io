import type { Metadata } from "next";
import Image from "next/image";
import { ExpandIcon, LightboxTrigger } from "../lightbox";
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
      <section className="relative flex min-h-[45vh] items-end overflow-hidden">
        <Image
          src="/bse/hiring.jpg"
          alt="Worn leather work gloves beside a stack of hundred-dollar bills"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/60 to-[#161616]/20" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32">
          <p className="mb-4 text-sm text-[var(--bse-muted)]">Now hiring</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">We’re a Team. Come join us.</h1>
        </div>
        <LightboxTrigger
          images={[
            {
              src: "/bse/hiring.jpg",
              alt: "Worn leather work gloves beside a stack of hundred-dollar bills",
            },
          ]}
          label="Expand image: work gloves and pay"
          className="absolute bottom-4 right-4 z-10 rounded-sm bg-black/60 p-2 text-[var(--bse-text)] transition-colors hover:text-[var(--bse-accent)]"
        >
          <ExpandIcon className="h-5 w-5" />
        </LightboxTrigger>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-14 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-10">
            <div>
              <p className="mb-4 text-sm font-semibold">Open positions</p>
              <ul className="space-y-3">
                {openings.map((o) => (
                  <li key={o} className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-4 font-semibold">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold">Offering qualified drillers</p>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--bse-muted)]">
                {benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <LightboxTrigger
              images={[
                {
                  src: "/bse/lf90-sunrise.jpg",
                  alt: "Sunrise over the mountains behind a trailer of drill rod at the site",
                  caption: "LF 90 at first light",
                },
              ]}
              label="Expand image: sunrise over the drill site"
              className="group relative hidden aspect-[2/3] w-full overflow-hidden border border-[var(--bse-border)] transition-colors hover:border-[var(--bse-border-strong)] lg:block"
            >
              <Image
                src="/bse/lf90-sunrise.jpg"
                alt="Sunrise over the mountains behind a trailer of drill rod at the site"
                fill
                sizes="320px"
                className="object-cover"
              />
              <span className="absolute bottom-2 right-2 rounded-sm bg-black/60 p-1.5 text-[var(--bse-text)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <ExpandIcon className="h-4 w-4" />
              </span>
            </LightboxTrigger>
          </aside>

          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Apply now</h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--bse-muted)]">
              Tell us a little about yourself and how to reach you. We review every application.
            </p>
            <div className="mt-8 border border-[var(--bse-border)] bg-[var(--bse-card)] p-8 sm:p-10">
              <CareersForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
