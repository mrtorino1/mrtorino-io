import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard, { accentSolid, accentGlow, accentVars } from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";

const product = featuredProducts[0]; // tradeschool-ai, glowColor rgba(249,115,22,0.18)

describe("ProductCard accent helpers", () => {
  it("accentSolid forces alpha to 1", () => {
    expect(accentSolid("rgba(249,115,22,0.18)")).toBe("rgba(249,115,22,1)");
  });

  it("accentGlow forces alpha to 0.2 (the 20% hover glow)", () => {
    expect(accentGlow("rgba(249,115,22,0.18)")).toBe("rgba(249,115,22,0.2)");
  });

  it("accentVars emits --accent (solid) and --accent-glow (0.2) from glowColor", () => {
    const vars = accentVars(product) as Record<string, string>;
    expect(vars["--accent"]).toBe("rgba(249,115,22,1)");
    expect(vars["--accent-glow"]).toBe("rgba(249,115,22,0.2)");
  });
});

describe("ProductCard rendering", () => {
  it("renders name + tag and links to the product route", () => {
    const { container } = render(<ProductCard product={product} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.tag)).toBeInTheDocument();
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe(`/products/${product.slug}`);
  });

  it("sets the per-product accent CSS custom properties on the card root", () => {
    const { container } = render(<ProductCard product={product} />);
    const root = container.querySelector("a")!;
    expect(root.style.getPropertyValue("--accent")).toBe("rgba(249,115,22,1)");
    expect(root.style.getPropertyValue("--accent-glow")).toBe("rgba(249,115,22,0.2)");
    expect(root.className).toContain("product-card");
  });

  it("colors the tag label with the solid accent", () => {
    render(<ProductCard product={product} />);
    const tag = screen.getByText(product.tag);
    // jsdom normalizes the inline color to rgb(...) (alpha 1 dropped)
    expect(tag.style.color).toBe("rgb(249, 115, 22)");
  });

  it("compact variant still links and shows the description", () => {
    const { container } = render(<ProductCard product={product} variant="compact" />);
    expect(container.querySelector("a")?.getAttribute("href")).toBe(`/products/${product.slug}`);
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });
});
