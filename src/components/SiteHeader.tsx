"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#library" },
];

type SiteHeaderProps = {
  // Primary nav action; defaults to the studio's flagship-product link.
  cta?: { label: string; href: string };
};

export default function SiteHeader({
  cta = { label: "Explore", href: "/products/tradeschool-ai" },
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/85 border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 bg-[#f5f5f5] text-[#0a0a0a] flex items-center justify-center font-bold text-sm flex-shrink-0">
              M
            </div>
            <div>
              <div className="font-semibold tracking-tight text-sm leading-none">mrtorino.io</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#6b6b6b] mt-0.5">Software Studio</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.14em] text-[#6b6b6b]">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-[#f5f5f5] ${
                  pathname === item.href ? "text-[#f5f5f5]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="mailto:hello@mrtorino.io"
              className="hidden sm:inline-flex items-center h-8 px-4 border border-[#1f1f1f] text-[#6b6b6b] text-xs uppercase tracking-[0.1em] hover:border-[#f5f5f5] hover:text-[#f5f5f5] transition-all"
            >
              Share an idea
            </Link>
            <Link
              href={cta.href}
              className="inline-flex items-center h-8 px-4 bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium uppercase tracking-[0.1em] hover:bg-white transition-colors"
            >
              {cta.label}
            </Link>
            <button
              className="md:hidden h-8 w-8 border border-[#1f1f1f] text-[#f5f5f5] flex items-center justify-center"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[80] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[260px] bg-[#0a0a0a] border-l border-[#1f1f1f] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#6b6b6b]">Navigation</div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 border border-[#1f1f1f] flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border px-4 py-3 text-sm transition-colors ${
                    pathname === item.href
                      ? "border-[#f5f5f5] bg-[#111111] text-[#f5f5f5]"
                      : "border-[#1f1f1f] bg-[#111111] text-[#6b6b6b] hover:text-[#f5f5f5]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
