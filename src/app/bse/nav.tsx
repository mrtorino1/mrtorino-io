"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/bse", label: "Home" },
  { href: "/bse/about", label: "About" },
  { href: "/bse/testimonials", label: "Testimonials" },
  { href: "/bse/contact", label: "Contact" },
];

// Simple mountain-ridge mark: two overlapping peaks, stroke only.
function RidgeMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M2 19L8.5 8l4.5 7.5" />
      <path d="M10 19l6-10 6 10" />
    </svg>
  );
}

export function BseNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--bse-border)] bg-[var(--bse-bg)]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/bse" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <RidgeMark />
          <span className="bse-display text-2xl leading-none">Big Sky Exploration</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-[var(--bse-accent)] ${
                pathname === l.href ? "text-[var(--bse-accent)]" : "text-[var(--bse-text)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a href="tel:+16023296330" className="text-sm text-[var(--bse-text)]">
            602-329-6330
          </a>
          <Link
            href="/bse/careers"
            className="bg-[var(--bse-accent)] px-4 py-2 text-sm font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
          >
            Now Hiring
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-[var(--bse-text)] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-[var(--bse-text)] ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-[var(--bse-text)] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--bse-border)] px-5 pb-5 md:hidden">
          <a href="tel:+16023296330" className="block border-b border-[var(--bse-border)] py-3 text-lg">
            602-329-6330
          </a>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block py-3 text-lg ${pathname === l.href ? "text-[var(--bse-accent)]" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/bse/careers"
            className="mt-2 block bg-[var(--bse-accent)] px-4 py-3 text-center font-semibold text-[var(--bse-on-accent)]"
            onClick={() => setOpen(false)}
          >
            Now Hiring
          </Link>
        </div>
      )}
    </header>
  );
}
