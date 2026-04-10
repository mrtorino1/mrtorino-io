import Link from "next/link";
import { products } from "@/data/products";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-semibold text-sm">mrtorino.io</div>
            <div className="text-xs text-white/38 mt-1.5">Trading software, AI systems, education platforms.</div>
          </div>
          <div className="flex flex-wrap gap-5">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="text-xs text-white/42 hover:text-white/80 transition-colors"
              >
                {p.shortName}
              </Link>
            ))}
          </div>
          <div className="text-xs text-white/28">
            © {new Date().getFullYear()} mrtorino.io
          </div>
        </div>
      </div>
    </footer>
  );
}
