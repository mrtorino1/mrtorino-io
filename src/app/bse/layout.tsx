import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import "./bse.css";
import { BseNav } from "./nav";
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

export default function BseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${barlowCondensed.variable} bse flex min-h-screen flex-col`}>
      <BseNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[var(--bse-border)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
          <div>
            <p className="bse-display text-3xl">
              Big Sky <span className="text-[var(--bse-accent)]">Exploration</span>
            </p>
            <p className="mt-3 text-sm text-[var(--bse-muted)]">
              Where Integrity, Ingenuity, and Quality Result In Success
            </p>
            <p className="mt-3 font-mono text-xs tracking-widest text-[var(--bse-muted)]">AZ ROC 354039</p>
          </div>
          <div>
            <p className="bse-eyebrow mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/bse" className="hover:text-[var(--bse-accent)]">Home</Link></li>
              <li><Link href="/bse/about" className="hover:text-[var(--bse-accent)]">About</Link></li>
              <li><Link href="/bse/testimonials" className="hover:text-[var(--bse-accent)]">Testimonials</Link></li>
              <li><Link href="/bse/contact" className="hover:text-[var(--bse-accent)]">Contact</Link></li>
              <li><Link href="/bse/careers" className="hover:text-[var(--bse-accent)]">Now Hiring</Link></li>
            </ul>
          </div>
          <div>
            <p className="bse-eyebrow mb-4">Get In Touch</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:bse.b.sieben@gmail.com" className="hover:text-[var(--bse-accent)]">
                  bse.b.sieben@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+16023296330" className="hover:text-[var(--bse-accent)]">
                  602-329-6330
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--bse-border)]">
          <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-[var(--bse-muted)]">
            © {new Date().getFullYear()} Big Sky Exploration, LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
