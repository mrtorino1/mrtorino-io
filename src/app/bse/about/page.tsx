import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExpandIcon, LightboxTrigger } from "../lightbox";

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
      {/* about.jpg is portrait (3024x4032 after EXIF rotation) — aspect-matched
          panel beside the title instead of a cropping full-width banner */}
      <section className="border-b border-[var(--bse-border)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[3fr_2fr] md:py-20">
          <div>
            <h1 className="text-4xl font-semibold sm:text-5xl">Core values</h1>
          </div>
          <LightboxTrigger
            images={[
              {
                src: "/bse/about.jpg",
                alt: "Core box with runs of recovered core and handwritten depth markers, set on the ground at the drill site",
              },
            ]}
            label="Expand image: core box at the drill site"
            className="group relative block aspect-[3/4] w-full overflow-hidden border border-[var(--bse-border)] transition-colors hover:border-[var(--bse-border-strong)]"
          >
            <Image
              src="/bse/about.jpg"
              alt="Core box with runs of recovered core and handwritten depth markers, set on the ground at the drill site"
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
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Specializing in core recovery</h2>
            <div className="mt-7 space-y-5 leading-relaxed text-[var(--bse-muted)]">
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
          <LightboxTrigger
            images={[
              {
                src: "/bse/dolomite-2.jpg",
                alt: "Boxed runs of sanded dolomite core laid out for review",
                caption: "Sanded dolomite core",
              },
            ]}
            label="Expand image: sanded dolomite core samples"
            className="group relative block aspect-[3/4] w-full overflow-hidden border border-[var(--bse-border)] transition-colors hover:border-[var(--bse-border-strong)] lg:aspect-auto lg:min-h-0"
          >
            <Image
              src="/bse/dolomite-2.jpg"
              alt="Boxed runs of sanded dolomite core laid out for review"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute bottom-2 right-2 rounded-sm bg-black/60 p-1.5 text-[var(--bse-text)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              <ExpandIcon className="h-4 w-4" />
            </span>
          </LightboxTrigger>
        </div>
      </section>

      <section className="border-t border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-2xl font-semibold sm:text-3xl">More than a drill crew</h2>
          <div className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="border-b border-[var(--bse-border)] pb-8">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--bse-muted)]">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-[var(--bse-muted)]">
            Get in touch to learn more about how we will approach your project goals and reliably
            fulfill your contract.
          </p>
        </div>
      </section>
    </>
  );
}
