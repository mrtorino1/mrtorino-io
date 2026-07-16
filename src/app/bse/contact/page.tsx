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
      <section className="relative flex min-h-[40vh] items-end overflow-hidden">
        <Image
          src="/bse/contact.jpg"
          alt="Drill site at dusk on a Big Sky Exploration project"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32">
          <p className="bse-eyebrow mb-4">Contact</p>
          <h1 className="bse-display text-5xl sm:text-7xl">Contact Us With Your Project</h1>
        </div>
        <LightboxTrigger
          images={[{ src: "/bse/contact.jpg", alt: "Drill site at dusk on a Big Sky Exploration project" }]}
          label="Expand image: drill site at dusk"
          className="absolute bottom-4 right-4 z-10 rounded-sm bg-black/60 p-2 text-[var(--bse-text)] transition-colors hover:text-[var(--bse-accent)]"
        >
          <ExpandIcon className="h-5 w-5" />
        </LightboxTrigger>
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
