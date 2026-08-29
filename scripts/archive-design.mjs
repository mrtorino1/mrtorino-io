// Design archive ("flip book") capture — the one command that records a
// design version. Writes a full-page desktop (1440x900 viewport) and mobile
// (390x844 viewport) PNG pair into public/designs/<slug>/, named so
// src/data/designs.ts can reference them directly:
//
//   public/designs/<slug>/<version>-desktop.png
//   public/designs/<slug>/<version>-mobile.png
//
// Usage:
//   node scripts/archive-design.mjs <url> <slug> <version> [--viewport-only]
//
// Examples:
//   node scripts/archive-design.mjs https://www.mrtorino.io/bse bse v3
//   node scripts/archive-design.mjs http://localhost:3001/mining mining v2
//   node scripts/archive-design.mjs https://www.big-sky-exploration.com bse v1
//
// Then add (or update) the version entry in src/data/designs.ts with the
// label, date, commit SHA (`git rev-parse --short HEAD`) and a notes line —
// the /designs page renders straight from that registry.
//
// Flags:
//   --viewport-only   capture only the first screen instead of the full page
//
// The page is scrolled through in steps before capture so lazy-loaded
// images and scroll-triggered content (Wix, next/image lazy loading) are in
// the DOM; animations are forced to their reduced-motion end state.

import { chromium, devices } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const flags = new Set(process.argv.slice(2).filter((a) => a.startsWith("--")));
const [url, slug, version] = args;

if (!url || !slug || !version) {
  console.error("Usage: node scripts/archive-design.mjs <url> <slug> <version> [--viewport-only]");
  process.exit(1);
}

const fullPage = !flags.has("--viewport-only");
const OUT_DIR = join(ROOT, "public", "designs", slug);

const SIZES = [
  { name: "desktop", viewport: { width: 1440, height: 900 } },
  // Mobile carries a real phone UA so sites that sniff the user agent (Wix)
  // serve their mobile layout instead of a squeezed desktop one.
  {
    name: "mobile",
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent: devices["iPhone 13"].userAgent,
  },
];

async function settle(page) {
  // Step through the page so lazy content loads, then return to the top.
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    let last = -1;
    // Re-read scrollHeight each step — it grows as lazy sections mount.
    while (y < document.documentElement.scrollHeight && y !== last) {
      last = y;
      window.scrollTo(0, y);
      await sleep(120);
      y += step;
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await sleep(300);
    window.scrollTo(0, 0);
    await sleep(300);
  });
  // Let any remaining image requests finish.
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
}

async function capture(browser, size) {
  const context = await browser.newContext({
    viewport: size.viewport,
    isMobile: size.isMobile ?? false,
    hasTouch: size.hasTouch ?? false,
    ...(size.userAgent ? { userAgent: size.userAgent } : {}),
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "load", timeout: 90_000 });
    await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
    await settle(page);

    const dest = join(OUT_DIR, `${version}-${size.name}.png`);
    let lastErr;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await page.screenshot({ path: dest, fullPage, animations: "disabled" });
        console.log(`  ✓ ${size.name.padEnd(8)} ${size.viewport.width}px → public/designs/${slug}/${version}-${size.name}.png`);
        return;
      } catch (err) {
        lastErr = err;
        await page.waitForTimeout(600);
      }
    }
    throw lastErr;
  } finally {
    await context.close();
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Archiving ${url} as ${slug}/${version} (${fullPage ? "full page" : "viewport only"})`);
  const browser = await chromium.launch({ headless: true, args: ["--disable-dev-shm-usage"] });
  try {
    for (const size of SIZES) await capture(browser, size);
  } finally {
    await browser.close();
  }
  console.log("Done. Now add the version to src/data/designs.ts.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
