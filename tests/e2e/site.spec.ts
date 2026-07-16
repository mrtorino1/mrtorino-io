import { test, expect } from "@playwright/test";
// Pure data module (no React/Next imports) — safe to import via relative path.
import { visibleProducts } from "../../src/data/products";

test.describe("homepage", () => {
  test("loads with the dark theme applied", async ({ page }) => {
    await page.goto("/");
    // body background is the dark palette bg (#0a0a0a === rgb(10, 10, 10))
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(10, 10, 10)");
    // hero headline (Bebas display) is present
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/real/i);
  });

  test("primary nav exposes Home + Products (per-product links removed)", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("header nav");
    await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Products" })).toBeVisible();
    // The redesign removed individual product links from the header nav.
    await expect(nav.getByRole("link", { name: "TradeSchool" })).toHaveCount(0);
  });
});

test.describe("product routes", () => {
  test("every visible product is linked from the homepage and its page returns 200", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    for (const product of visibleProducts) {
      const href = `/products/${product.slug}`;
      // linked from the homepage
      await expect(page.locator(`a[href="${href}"]`).first()).toHaveCount(1);
      // and the route resolves
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test("a product page renders its headline and back-to-home link", async ({ page }) => {
    await page.goto(`/products/${visibleProducts[0].slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
  });
});

test.describe("access request form", () => {
  test("renders the form on a freemium product page", async ({ page }) => {
    // btcpredictor is freemium → the access form section renders
    await page.goto("/products/btcpredictor");
    const form = page.locator("form");
    await expect(form).toBeVisible();
    await expect(page.getByPlaceholder("Your name")).toBeVisible();
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
    await expect(form.getByRole("button", { name: /request access/i })).toBeVisible();
  });

  test("shows the confirmation state when the API returns success (network intercepted)", async ({ page }) => {
    await page.route("**/api/request-access", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }),
    );
    await page.goto("/products/btcpredictor");
    await page.getByPlaceholder("Your name").fill("Ada Lovelace");
    await page.getByPlaceholder("you@example.com").fill("ada@example.com");
    await page.getByRole("button", { name: /request access/i }).click();
    await expect(page.getByText("Request received.")).toBeVisible();
  });

  test("surfaces the server validation message on a 400 (network intercepted)", async ({ page }) => {
    await page.route("**/api/request-access", (route) =>
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "Please include a valid email address." }),
      }),
    );
    await page.goto("/products/btcpredictor");
    // Client validation passes (well-formed email) so the request reaches the mocked 400.
    await page.getByPlaceholder("Your name").fill("Ada Lovelace");
    await page.getByPlaceholder("you@example.com").fill("ada@example.com");
    await page.getByRole("button", { name: /request access/i }).click();
    await expect(page.getByText("Please include a valid email address.")).toBeVisible();
  });
});
