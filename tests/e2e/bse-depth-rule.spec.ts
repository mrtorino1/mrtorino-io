import { test, expect } from "@playwright/test";

const rule = "[data-bse-depth-rule]";

test.describe("bse depth rule", () => {
  test("is scroll-linked on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/bse");
    const el = page.locator(rule);
    await expect(el).toBeVisible();
    await expect(el).toHaveAttribute("data-mode", "live");
    await expect(el).toContainText("0 m");
    await expect(el).toContainText("TD");

    const track = el.locator(".bse-depth-track");
    const before = await track.evaluate((n) => getComputedStyle(n).transform);
    await page.mouse.wheel(0, 1200);
    await expect
      .poll(async () => track.evaluate((n) => getComputedStyle(n).transform))
      .not.toBe(before);
  });

  test("is hidden below md", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/bse");
    await expect(page.locator(rule)).toBeHidden();
    // and the page itself does not overflow horizontally
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBe(0);
  });

  test("is static with prefers-reduced-motion", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/bse");
    const el = page.locator(rule);
    await expect(el).toHaveAttribute("data-mode", "static");
    const track = el.locator(".bse-depth-track");
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(300);
    expect(await track.evaluate((n) => getComputedStyle(n).transform)).toBe("none");
    await context.close();
  });
});
