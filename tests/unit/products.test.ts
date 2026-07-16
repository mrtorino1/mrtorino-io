import { describe, it, expect } from "vitest";
import {
  products,
  productMap,
  visibleProducts,
  featuredProducts,
  libraryProducts,
  type Product,
} from "@/data/products";

const REQUIRED_FIELDS: (keyof Product)[] = [
  "slug", "name", "shortName", "tag", "glowColor", "headline", "subheadline",
  "description", "stats", "bullets", "pricing", "status", "features", "story", "logo",
];

describe("products.ts data invariants", () => {
  it("has 12 products", () => {
    expect(products).toHaveLength(12);
  });

  it("every slug is unique", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every product has all required fields populated", () => {
    for (const p of products) {
      for (const field of REQUIRED_FIELDS) {
        expect(p[field], `${p.slug}.${String(field)}`).toBeDefined();
      }
      // arrays should be non-empty
      expect(p.stats.length, `${p.slug}.stats`).toBeGreaterThan(0);
      expect(p.bullets.length, `${p.slug}.bullets`).toBeGreaterThan(0);
      expect(p.features.length, `${p.slug}.features`).toBeGreaterThan(0);
      expect(p.story.length, `${p.slug}.story`).toBeGreaterThan(0);
    }
  });

  it("pricing and status use only allowed enum values", () => {
    for (const p of products) {
      expect(["free", "paid", "freemium"]).toContain(p.pricing);
      expect(["live", "beta", "coming-soon"]).toContain(p.status);
    }
  });

  it("glowColor is an rgba() string ending in an alpha value (accentSolid/accentGlow depend on this)", () => {
    for (const p of products) {
      expect(p.glowColor, p.slug).toMatch(/^rgba\([^)]*[\d.]+\)$/);
    }
  });

  it("productMap resolves every slug to its product", () => {
    for (const p of products) {
      expect(productMap[p.slug]).toBe(p);
    }
    expect(Object.keys(productMap)).toHaveLength(products.length);
  });
});

describe("hidden-flag filtering and homepage slicing", () => {
  it("exactly 3 products are hidden", () => {
    expect(products.filter((p) => p.hidden).map((p) => p.slug)).toEqual([
      "weatherscout", "daytrader", "valuefinder",
    ]);
  });

  it("visibleProducts excludes all hidden products (9 visible)", () => {
    expect(visibleProducts).toHaveLength(9);
    expect(visibleProducts.some((p) => p.hidden)).toBe(false);
  });

  it("featuredProducts is the first 3 visible", () => {
    expect(featuredProducts).toHaveLength(3);
    expect(featuredProducts.map((p) => p.slug)).toEqual([
      "tradeschool-ai", "weatherdashboard", "claudeomatic",
    ]);
    expect(featuredProducts).toEqual(visibleProducts.slice(0, 3));
  });

  it("libraryProducts is the remaining 6 visible (featured + library partitions visible with no overlap)", () => {
    expect(libraryProducts).toHaveLength(6);
    expect(libraryProducts).toEqual(visibleProducts.slice(3));
    const featuredSlugs = new Set(featuredProducts.map((p) => p.slug));
    expect(libraryProducts.some((p) => featuredSlugs.has(p.slug))).toBe(false);
    expect(featuredProducts.length + libraryProducts.length).toBe(visibleProducts.length);
  });
});
