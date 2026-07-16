import type { Metadata } from "next";
import Image from "next/image";
import { ExpandIcon, LightboxTrigger } from "../lightbox";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Big Sky Exploration, LLC with your project. Email bse.b.sieben@gmail.com or call 602-329-6330.",
};

export default function BseContactPage() {
  return (
    <>
      {/* contact.jpg is portrait (3024x4032 after EXIF rotation) — aspect-matched
          panel beside the title instead of a cropping full-width banner */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[3fr_2fr] md:py-20">
          <div>
            <p className="bse-eyebrow mb-4">Contact</p>
            <h1 className="bse-display text-5xl sm:text-7xl">Contact Us With Your Project</h1>
          </div>
          <LightboxTrigger
            images={[{ src: "/bse/contact.jpg", alt: "Drill site at dusk on a Big Sky Exploration project" }]}
            label="Expand image: drill site at dusk"
            className="group relative block aspect-[3/4] w-full overflow-hidden border border-[var(--bse-border)]"
          >
            <Image
              src="/bse/contact.jpg"
              alt="Drill site at dusk on a Big Sky Exploration project"
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

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_320px]">
          <div className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-8 sm:p-10">
            <ContactForm />
          </div>
          <aside className="space-y-8">
            <div>
              <p className="bse-eyebrow mb-3">Email</p>
              <a href="mailto:bse.b.sieben@gmail.com" className="break-all hover:text-[var(--bse-accent)]">
                bse.b.sieben@gmail.com
              </a>
            </div>
            <div>
              <p className="bse-eyebrow mb-3">Phone</p>
              <a href="tel:+16023296330" className="hover:text-[var(--bse-accent)]">
                602-329-6330
              </a>
            </div>
            <div>
              <p className="bse-eyebrow mb-3">License</p>
              <p className="text-[var(--bse-muted)]">AZ ROC 354039</p>
            </div>
            <div className="border border-[var(--bse-border)] bg-[var(--bse-card)] p-6 text-sm leading-relaxed text-[var(--bse-muted)]">
              Tell us about your target, ground conditions, and program length — we will get back to
              you with how we would approach the project.
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
