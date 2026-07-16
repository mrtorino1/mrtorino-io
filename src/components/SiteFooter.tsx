import Link from "next/link";
import { visibleProducts } from "@/data/products";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#1f1f1f] mt-10 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-display uppercase text-2xl leading-none">mrtorino.io<span className="text-orange-500">.</span></div>
            <div className="text-xs text-[#6b6b6b] mt-2">Trading software, AI systems, education platforms.</div>
          </div>
          <div className="flex flex-wrap gap-5">
            {visibleProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="text-xs text-[#6b6b6b] hover:text-[#f5f5f5] transition-colors"
              >
                {p.shortName}
              </Link>
            ))}
          </div>
          <div>
            <div className="text-xs text-[#6b6b6b]/70 mt-4">Designed, built, and shipped by one person. Medford, OR.</div>
            <div className="text-xs text-[#6b6b6b]/70">
              © {new Date().getFullYear()} mrtorino.io
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
