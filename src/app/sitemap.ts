import type { MetadataRoute } from "next";
import { visibleProducts } from "@/data/products";
import { BSE_INDEXABLE } from "./bse/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mrtorino.io";
  const productUrls = visibleProducts.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  // /bse staging routes join the sitemap only once the client site goes public.
  const bseUrls = BSE_INDEXABLE
    ? ["", "/about", "/testimonials", "/contact", "/careers"].map((path) => ({
        url: `${base}/bse${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }))
    : [];
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...productUrls,
    ...bseUrls,
  ];
}
