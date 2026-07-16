import { test, expect } from "@playwright/test";

test.describe("bse lightbox", () => {
  test("gallery image opens a navigable dialog and Esc closes it", async ({ page }) => {
    await page.goto("/bse");

    await page.getByRole("button", { name: "Expand image: LF 90 at first light" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("1 / 8");

    // Arrow-key navigation advances the set
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText("2 / 8");
    await page.keyboard.press("ArrowLeft");
    await expect(dialog).toContainText("1 / 8");

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("backdrop click closes; single-image mode has no arrows", async ({ page }) => {
    await page.goto("/bse");
    await page.getByRole("button", { name: "Expand image: Site reclamation after program completion" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.click({ position: { x: 10, y: 300 } }); // backdrop, left of inset image area
    await expect(dialog).toHaveCount(0);

    // Single-image mode on /bse/about: dialog opens without prev/next controls
    await page.goto("/bse/about");
    await page.getByRole("button", { name: "Expand image: sanded dolomite core samples" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("button", { name: "Next image" })).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
