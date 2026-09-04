import type { MetadataRoute } from "next";
import { visibleProducts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mrtorino.io";
  const productUrls = visibleProducts.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  // /designs (internal design archive) is deliberately absent — noindexed, direct URL only.
  // /bse redirects to bigskyexploration.com, which carries its own sitemap.
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/mining`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...productUrls,
  ];
}
