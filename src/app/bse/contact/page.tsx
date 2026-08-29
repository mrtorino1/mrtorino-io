import type { Metadata } from "next";
import { Figure, SheetHeader } from "../sheet";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Big Sky Exploration, LLC with your project. Email bse.b.sieben@gmail.com or call 602-329-6330.",
};

export default function BseContactPage() {
  return (
    <>
      {/* Sheet 01 — title + Fig. 1. contact.jpg is portrait: aspect-matched panel */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5">
          <SheetHeader n={1} title="Contact" meta="Fig. 1" />
          <div className="grid items-stretch gap-10 md:grid-cols-[3fr_2fr]">
            <div className="flex flex-col justify-center pt-12 md:py-20">
              <h1 className="bse-display text-6xl sm:text-7xl lg:text-8xl">Contact Us With Your Project</h1>
            </div>
            <Figure
              fig={1}
              src="/bse/contact.jpg"
              alt="Recovered core visible inside the tube at the rig, driller in high-vis and hardhat behind"
              caption="Core in the tube at the rig"
              label="Expand image: core in the tube at the rig"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              aspectClass="aspect-[3/4] md:aspect-auto md:min-h-[26rem] md:flex-1"
              className="border-t-0 md:border-r-0"
            />
          </div>
        </div>
      </section>

      {/* Sheet 02 — form + contact details */}
      <section>
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <SheetHeader n={2} title="Project details" meta="AZ ROC 354039" />
          <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_320px]">
            <div className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-8 sm:p-10">
              <ContactForm />
            </div>
            <aside className="space-y-8">
              <div>
                <p className="bse-mono mb-2 text-[var(--bse-muted)]">Email</p>
                <a href="mailto:bse.b.sieben@gmail.com" className="break-all hover:text-[var(--bse-accent)]">
                  bse.b.sieben@gmail.com
                </a>
              </div>
              <div>
                <p className="bse-mono mb-2 text-[var(--bse-muted)]">Phone</p>
                <a href="tel:+16023296330" className="hover:text-[var(--bse-accent)]">
                  602-329-6330
                </a>
              </div>
              <div>
                <p className="bse-mono mb-2 text-[var(--bse-muted)]">License</p>
                <p className="text-[var(--bse-muted)]">AZ ROC 354039 · Licensed &amp; insured</p>
              </div>
              <div className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-6 text-sm leading-relaxed text-[var(--bse-muted)]">
                Tell us about your target, ground conditions, and program length — we will get back to
                you with how we would approach the project.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
