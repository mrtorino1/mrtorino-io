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
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#faf9f7]/85 border-b border-[#e7e4de]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 bg-[#111111] text-[#faf9f7] flex items-center justify-center font-bold text-sm flex-shrink-0">
              M
            </div>
            <div>
              <div className="font-semibold tracking-tight text-sm leading-none">mrtorino.io</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#75706b] mt-0.5">Software Studio</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.14em] text-[#75706b]">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-[#111111] ${
                  pathname === item.href ? "text-[#111111]" : ""
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
              className="hidden sm:inline-flex items-center h-8 px-4 border border-[#e7e4de] text-[#75706b] text-xs uppercase tracking-[0.1em] hover:border-[#111111] hover:text-[#111111] transition-all"
            >
              Share an idea
            </Link>
            <Link
              href="/products/tradeschool-ai"
              className="inline-flex items-center h-8 px-4 bg-[#111111] text-[#faf9f7] text-xs font-medium uppercase tracking-[0.1em] hover:bg-black transition-colors"
            >
              Explore
            </Link>
            <button
              className="md:hidden h-8 w-8 border border-[#e7e4de] text-[#111111] flex items-center justify-center"
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[260px] bg-[#faf9f7] border-l border-[#e7e4de] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#75706b]">Navigation</div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 border border-[#e7e4de] flex items-center justify-center"
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
                      ? "border-[#111111] bg-[#ffffff] text-[#111111]"
                      : "border-[#e7e4de] bg-[#ffffff] text-[#75706b] hover:text-[#111111]"
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
