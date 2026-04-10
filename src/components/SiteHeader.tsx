"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { products } from "@/data/products";

const navLinks = [
  { label: "Home", href: "/" },
  ...products.slice(0, 3).map((p) => ({ label: p.shortName, href: `/products/${p.slug}` })),
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070B10]/80 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-xl bg-white text-[#070B10] flex items-center justify-center font-bold text-sm flex-shrink-0">
              M
            </div>
            <div>
              <div className="font-semibold tracking-tight text-sm leading-none">mrtorino.io</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/35 mt-0.5">Software Studio</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/55">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-white ${
                  pathname === item.href ? "text-white" : ""
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
              className="hidden sm:inline-flex items-center h-8 px-4 rounded-xl border border-white/12 bg-white/[0.04] text-white/65 text-sm hover:bg-white/[0.08] hover:text-white transition-all"
            >
              Share an idea
            </Link>
            <Link
              href="/products/tradeschool-ai"
              className="inline-flex items-center h-8 px-4 rounded-xl bg-white text-[#070B10] text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Explore
            </Link>
            <button
              className="md:hidden h-8 w-8 rounded-xl border border-white/12 bg-white/[0.04] text-white flex items-center justify-center"
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
          <div className="absolute right-0 top-0 h-full w-[260px] bg-[#0D121A] border-l border-white/10 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="font-semibold text-sm">Navigation</div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center"
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
                  className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                    pathname === item.href
                      ? "border-white/20 bg-white/[0.07] text-white"
                      : "border-white/[0.08] bg-white/[0.03] text-white/65 hover:text-white"
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
