// Capture screenshots of the homepage and every product page (incl. hidden)
// against the running dev server, saving to public/screenshots/.
//
// Usage: node scripts/screenshot.mjs [baseUrl]
//   baseUrl defaults to http://localhost:3001

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir, readFile } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE_URL = process.argv[2] || "http://localhost:3001";
const OUT_DIR = join(ROOT, "public", "screenshots");

// Extract every product slug (including hidden ones) straight from the data
// file so this stays in sync with src/data/products.ts.
async function getSlugs() {
  const src = await readFile(join(ROOT, "src", "data", "products.ts"), "utf8");
  const slugs = [...src.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
  return [...new Set(slugs)];
}

async function shoot(context, path, file) {
  const page = await context.newPage();
  try {
    await shootOnPage(page, path, file);
  } finally {
    await page.close();
  }
}

async function shootOnPage(page, path, file) {
  const url = `${BASE_URL}${path}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  // Force layout/lazy content to render, then settle back at the top.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);

  const dest = join(OUT_DIR, file);
  // fullPage capture can transiently fail ("Unable to capture screenshot")
  // while the renderer is mid-layout — retry a few times.
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await page.screenshot({ path: dest, fullPage: true });
      console.log(`  ✓ ${path.padEnd(34)} → public/screenshots/${file}`);
      return;
    } catch (err) {
      lastErr = err;
      await page.waitForTimeout(500);
    }
  }
  throw lastErr;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const slugs = await getSlugs();
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Products (${slugs.length}): ${slugs.join(", ")}\n`);

  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-dev-shm-usage"],
  });

  // Desktop pass — 1440x900
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

  console.log("Desktop (1440x900):");
  await shoot(desktop, "/", "homepage.png");
  for (const slug of slugs) {
    await shoot(desktop, `/products/${slug}`, `${slug}.png`);
  }
  await desktop.close();

  // Mobile pass — 390x844 homepage
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  console.log("\nMobile (390x844):");
  await shoot(mobile, "/", "homepage-mobile.png");
  await mobile.close();

  await browser.close();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
