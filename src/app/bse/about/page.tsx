import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Big Sky Exploration was established out of a pure passion for diamond core drilling. Flexibility and adaptability to hole conditions maximize core recovery.",
};

const capabilities = [
  {
    title: "Custom Drill Bits",
    body: "We have the ability to reach out to manufacturers to customize drill bits for the ground you are drilling.",
  },
  {
    title: "Project-Specific Mud Mixes",
    body: "We design mud mixes for each specific project, adapting to hole conditions as they change.",
  },
  {
    title: "Roads & Drill Pads",
    body: "Our small fleet of heavy equipment and operators allows us to easily build roads and form drill pads.",
  },
  {
    title: "Sumpless Drill Pads",
    body: "Environmental needs are attainable with our sumpless drill pad option, and full reclamation when the program wraps.",
  },
];

export default function BseAboutPage() {
  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden">
        <Image
          src="/bse/about.jpg"
          alt="Big Sky Exploration crew and drill rig on site"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32">
          <p className="bse-eyebrow mb-4">About Big Sky Exploration</p>
          <h1 className="bse-display text-6xl sm:text-7xl">Core Values</h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="bse-display text-4xl sm:text-5xl">
              Specializing in <span className="text-[var(--bse-accent)]">Core Recovery</span>
            </h2>
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
            <Link
              href="/bse/contact"
              className="mt-9 inline-block bg-[var(--bse-accent)] px-7 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
            >
              Get In Touch
            </Link>
          </div>
          <div className="relative min-h-[320px] border border-[var(--bse-border)] lg:min-h-0">
            <Image
              src="/bse/dolomite-2.jpg"
              alt="Recovered core samples from a sanded dolomite formation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--bse-border)]">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="bse-eyebrow mb-3">Capabilities</p>
          <h2 className="bse-display text-4xl sm:text-5xl">More Than a Drill Crew</h2>
          <div className="mt-12 grid gap-px border border-[var(--bse-border)] bg-[var(--bse-border)] sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-[var(--bse-card)] p-8">
                <h3 className="bse-display text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--bse-muted)]">{c.body}</p>
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
