import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import "./bse.css";
import { BseNav } from "./nav";
import { BseLogo } from "./logo";
import { DepthRule } from "./depth-rule";
import { BSE_DESCRIPTION, BSE_INDEXABLE, BSE_TITLE, BSE_URL } from "./seo";

// Client-site display font, loaded here (not in the root layout) so the BSE
// staging site shares no branding with mrtorino.io and can be extracted whole.
const barlowCondensed = Barlow_Condensed({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-bse-display",
});

const heroImage = {
  url: "/bse/hero.jpg",
  alt: "Diamond core drill rig operating on a Big Sky Exploration project site",
};

export const metadata: Metadata = {
  title: {
    default: BSE_TITLE,
    template: "%s | Big Sky Exploration",
  },
  description: BSE_DESCRIPTION,
  keywords: [
    "diamond core drilling",
    "surface core drilling",
    "core recovery",
    "mineral exploration drilling",
    "PQ HQ NQ core",
    "drilling contractor Nevada",
    "drilling contractor Arizona",
    "Big Sky Exploration",
  ],
  // Override the parent-site canonical/OG so link previews carry BSE branding.
  alternates: { canonical: BSE_URL },
  openGraph: {
    type: "website",
    url: BSE_URL,
    siteName: "Big Sky Exploration",
    title: BSE_TITLE,
    description: BSE_DESCRIPTION,
    images: [heroImage],
  },
  twitter: {
    card: "summary_large_image",
    title: BSE_TITLE,
    description: BSE_DESCRIPTION,
    images: [heroImage],
  },
  robots: BSE_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
};

const footerLinks = [
  { href: "/bse", label: "Home" },
  { href: "/bse/about", label: "About" },
  { href: "/bse/testimonials", label: "Testimonials" },
  { href: "/bse/contact", label: "Contact" },
  { href: "/bse/careers", label: "Now Hiring" },
];

function TitleCell({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-[var(--bse-border-strong)] px-4 py-3 ${className}`}>
      <p className="bse-mono text-[var(--bse-muted)]">{label}</p>
      <div className="mt-1 text-sm">{children}</div>
    </div>
  );
}

export default function BseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${barlowCondensed.variable} bse flex min-h-screen flex-col md:pl-14`}>
      <DepthRule />
      <BseNav />
      <main className="flex-1">{children}</main>
      {/* Title block — engineering drawing footer */}
      <footer className="bse-sheet-rule">
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-12">
          <BseLogo role="img" aria-label="Big Sky Exploration" className="h-20 w-auto max-w-full text-[var(--bse-text)]" />
          <p className="mt-3 text-sm text-[var(--bse-muted)]">
            Where Integrity, Ingenuity, and Quality Result In Success
          </p>
          <div className="mt-8 grid border border-[var(--bse-text)] sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.4fr_0.7fr]">
            <TitleCell label="Project" className="border-b sm:border-r lg:border-b-0">
              Big Sky Exploration, LLC
            </TitleCell>
            <TitleCell label="License" className="border-b lg:border-b-0 lg:border-r">
              AZ ROC 354039 · Licensed &amp; Insured
            </TitleCell>
            <TitleCell label="Contact" className="border-b sm:border-b-0 sm:border-r">
              <a href="tel:+16023296330" className="hover:text-[var(--bse-accent)]">
                602-329-6330
              </a>
              {" · "}
              <a href="mailto:bse.b.sieben@gmail.com" className="break-all hover:text-[var(--bse-accent)]">
                bse.b.sieben@gmail.com
              </a>
            </TitleCell>
            <TitleCell label="Sheet">
              <span className="font-mono">1 OF 1</span>
            </TitleCell>
          </div>
          {/* TODO: confirm founding year with client, then switch to
              "© [year]–2026" and add "Serving the mining exploration industry
              since [year]" — do not guess a year in visible copy. */}
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-xs text-[var(--bse-muted)]">
            <p>© 2026 Big Sky Exploration, LLC. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[var(--bse-accent)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
