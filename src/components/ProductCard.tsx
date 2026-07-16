import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";

const pricingLabel: Record<string, string> = {
  free: "Free",
  paid: "Paid",
  freemium: "Free + Paid",
};

/* products.ts glowColor is an rgba() string with a low alpha — derive the
   solid accent and the 20%-opacity glow from it without touching the data */
export const accentSolid = (rgba: string) => rgba.replace(/[\d.]+\)$/, "1)");
export const accentGlow = (rgba: string) => rgba.replace(/[\d.]+\)$/, "0.2)");

export function accentVars(product: Product) {
  return {
    "--accent": accentSolid(product.glowColor),
    "--accent-glow": accentGlow(product.glowColor),
  } as React.CSSProperties;
}

type ProductCardProps = {
  product: Product;
  variant?: "featured" | "compact";
};

export default function ProductCard({ product, variant = "featured" }: ProductCardProps) {
  const accent = accentSolid(product.glowColor);

  if (variant === "compact") {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="product-card group block p-5"
        style={accentVars(product)}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <img src={`/logos/${product.slug}.svg`} alt={product.name} className="w-10 h-10" />
            <div>
              <div className="font-semibold text-sm">{product.name}</div>
              <div className="text-[10px] uppercase tracking-[0.24em] mt-1" style={{ color: accent }}>{product.tag}</div>
            </div>
          </div>
          <span className="border border-[#1f1f1f] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#6b6b6b]">
            {product.status}
          </span>
        </div>
        <p className="text-xs text-[#6b6b6b] leading-relaxed">{product.description}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-[#6b6b6b] group-hover:text-[#f5f5f5] transition-colors">
          <span className="uppercase tracking-[0.14em]">View details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block p-6"
      style={accentVars(product)}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <img src={`/logos/${product.slug}.svg`} alt={product.name} className="w-10 h-10" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em]" style={{ color: accent }}>{product.tag}</div>
            <h3 className="text-xl font-semibold tracking-tight mt-2">{product.name}</h3>
          </div>
        </div>
        <span className="border border-[#1f1f1f] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#6b6b6b]">
          {product.status}
        </span>
      </div>

      <p className="text-sm text-[#6b6b6b] leading-relaxed min-h-[60px]">{product.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.stats.map((s) => (
          <span key={s} className="border border-[#1f1f1f] bg-[#0a0a0a] px-2.5 py-1 text-[10px] text-[#6b6b6b]">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="group-hover:underline" style={{ color: accent }}>Explore {product.shortName} →</span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#6b6b6b]">{pricingLabel[product.pricing]}</span>
      </div>
    </Link>
  );
}
