# Engineering Audit — mrtorino.io

Audit date: 2026-06-18. Repo: `~/projects/mrtorino-io/mrtorino-io` (Next.js 16.2.3, React 19.2.4, Tailwind v4).
Method: evidence-based. Every claim is backed by a captured command output or a `file:line` reference. Unverifiable items are marked **UNVERIFIED**.

This is an audit + test-setup pass. No product copy or design was changed. Files created/modified: test files, test config, `package.json` scripts, this `AUDIT.md`. One-line bug fixes found during the audit are noted but **not applied** (pending review).

---

## Phase 1 — Build & type health

### `npm run build` → **PASS with 1 warning** (exit 0)
```
✓ Compiled successfully in 10.5s
  Finished TypeScript in 5.9s
⚠ Using edge runtime on a page currently disables static generation for that page
✓ Generating static pages using 1 worker (19/19) in 638ms
```
- The single warning is the edge-runtime notice. Source of edge runtime:
  - `src/app/opengraph-image.tsx:2` → `export const runtime = "edge";`
  - `src/app/products/[slug]/opengraph-image.tsx:3` → `export const runtime = "edge";`
- Effect: those two OG-image routes are server-rendered on demand (`ƒ`) instead of statically generated. Not an error; expected for dynamic OG images. Route table confirms `/opengraph-image` and `/products/-/opengraph-image` are `ƒ (Dynamic)`.

### `npx tsc --noEmit` → **CLEAN** (exit 0)
No output, exit code 0. Full type check independent of Next's build passes.

### `npm run lint` (`eslint`) → **PASS with 2 warnings** (exit 0)
```
src/components/ProductCard.tsx
  40:13  warning  Using `<img>` could result in slower LCP ... @next/next/no-img-element
  67:11  warning  Using `<img>` could result in slower LCP ... @next/next/no-img-element
✖ 2 problems (0 errors, 2 warnings)
```
- Both warnings are the product-logo `<img>` tags in `ProductCard.tsx` (compact variant line 40, featured variant line 67). They render `/logos/${slug}.svg`. Using `<img>` instead of `next/image` is a deliberate-looking choice for small static SVGs; low impact. Note for fix list, not broken.

### `npm audit` → **10 vulnerabilities** (1 low, 6 moderate, 3 high)
Raw: `metadata: {"low":1,"moderate":6,"high":3,"total":10}`. (The brief expected 8; the count has grown to 10 since then.)

Reachability traced via `npm why`. **Key finding: 8 of 10 are pulled in by the `shadcn` CLI or eslint and are NOT reachable from the deployed app.** Only `next` and `postcss` touch the real build/runtime.

| Package | Severity | Pulled in by (`npm why`) | Runtime-reachable in app? |
|---|---|---|---|
| `next` | high | root dependency | **YES (runtime)** — see note below |
| `postcss` | moderate | `next` + `@tailwindcss/postcss` | Build-time only |
| `@babel/core` | low | `shadcn` → `@babel/preset-typescript` | No (CLI dev tool) |
| `hono` | high | `shadcn` → `@modelcontextprotocol/sdk` → `@hono/node-server` | No (CLI dev tool) |
| `fast-uri` | high | `shadcn` → `@modelcontextprotocol/sdk` → `ajv` | No (CLI dev tool) |
| `qs` | moderate | `shadcn` → `@modelcontextprotocol/sdk` → `express` → `body-parser` | No (CLI dev tool) |
| `ip-address` | moderate | `shadcn` → `@modelcontextprotocol/sdk` → `express-rate-limit` | No (CLI dev tool) |
| `express-rate-limit` | moderate | `shadcn` → `@modelcontextprotocol/sdk` | No (CLI dev tool) |
| `js-yaml` | moderate | `eslint` → `@eslint/eslintrc` | No (dev tool) |
| `brace-expansion` | moderate | `@ts-morph/common` + `@typescript-eslint/typescript-estree` | No (dev tool) |

Evidence the `shadcn`-chain packages are not in the app:
- `grep -rn "shadcn" src/` → **NONE** — shadcn is never imported in `src/`.
- `shadcn` is declared in `dependencies` (not `devDependencies`) — `package.json`. It is a scaffolding CLI; misclassification is the reason its whole transitive tree (hono/express/babel/etc.) shows up in `npm audit`. Moving it to `devDependencies` would not change `npm audit` totals (audit scans both) but is correct hygiene; it would keep these out of a production `npm ci --omit=dev` install.

`next` reachability note:
- The `next` advisory bundle is mostly Middleware/Proxy, Cache-Components, CSP-nonce, and i18n issues. This app has **no `middleware.ts`** (verified: no middleware file present) and uses none of those features, so most are not reachable.
- The one plausibly-relevant item is the Image Optimization API DoS (GHSA-h64f-5h5j-jqjh): `next/image` is used in `src/components/ScreenshotGallery.tsx` and `src/app/products/[slug]/page.tsx`. On Vercel, image optimization is served by Vercel's infra. Exposure is **UNVERIFIED** here (depends on deploy config); fix is the standard `next` patch.
- Fix path: `npm audit fix --force` installs `next@16.2.9` (a minor bump, "outside stated range" only because package.json pins `16.2.3`). Recommended but should be tested, not auto-applied during this audit.

**Phase 1 verdict:** Build, types, and lint are healthy (only 2 cosmetic `<img>` lint warnings). The audit headline number (10) is dominated by dev/CLI-only chains; real runtime exposure is limited to `next` (patch available) and build-time `postcss`.

---

## Phase 2 — Data layer integrity (`src/data/products.ts`)

### Slug uniqueness → **PASS**
`total products: 12 | unique slugs: 12 | dupes: NONE` (evaluated via `tsx` import of the real module).

### Required-field completeness → **PASS**
Every product has all required fields (`slug,name,shortName,tag,glowColor,headline,subheadline,description,stats,bullets,pricing,status,features,story,logo`). No `MISSING FIELD` rows emitted.

### Route resolution → **PASS** (all 12 incl. hidden)
`curl` against the running dev server (`:3001`) — every product returns `200`, bogus slug returns `404`:
```
200  /products/tradeschool-ai      200  /products/backtrader
200  /products/weatherdashboard    200  /products/tradetracker
200  /products/claudeomatic        200  /products/tradecreator
200  /products/btcpredictor        200  /products/weatherscout   (hidden)
200  /products/kashitrader         200  /products/daytrader      (hidden)
200  /products/contentforge        200  /products/valuefinder    (hidden)
homepage: 200   bogus slug: 404
```
Hidden products still resolve because `generateStaticParams` maps over `products` (the full list), not `visibleProducts` — `src/app/products/[slug]/page.tsx:18-20`. This is intentional per project memory (hidden = kept out of listings/sitemap, but direct URL works).

### Homepage slicing → **PASS** (9 visible / 3 featured / 6 library)
```
visibleProducts:  9 -> tradeschool-ai,weatherdashboard,claudeomatic,btcpredictor,kashitrader,contentforge,backtrader,tradetracker,tradecreator
featuredProducts: 3 -> tradeschool-ai,weatherdashboard,claudeomatic
libraryProducts:  6 -> btcpredictor,kashitrader,contentforge,backtrader,tradetracker,tradecreator
hidden:           weatherscout,daytrader,valuefinder
```
Matches `products.ts:433-435` (`visibleProducts = filter(!hidden)`, `featured = slice(0,3)`, `library = slice(3)`).

### Tailwind v4 class generation → **PASS, no silent purge**
Grepped the **production** build CSS (`.next/static/chunks/0iujstonx_vq..css`):
- Live `buttonClass` colors all present — `bg-orange-500`, `bg-cyan-500`, `bg-violet-500`, `bg-amber-500`, `bg-green-500`, `bg-pink-500`, `bg-yellow-500`, `bg-teal-500`, `bg-rose-500`, `bg-sky-500`, `bg-indigo-500`, `bg-emerald-500` → all **FOUND**. Hidden products' colors (e.g. `bg-emerald-500`) are generated too.
- `-webkit-text-stroke`, `.text-outline`, `.font-display`, `.product-card` → all **FOUND**.
- The dead `border` field strings (`border-orange-500/30` etc.) are **also generated** (2 matches in prod CSS) even though never applied — Tailwind v4 scans `products.ts` as source and treats the string literals as class candidates. Not broken; minor CSS bloat.

**Note (dead data):** `product.border` and `product.accent` fields are **never used** as classNames anywhere in `src/` (`grep` returns no usage). They are dead fields carried in the type. Removing them is safe cleanup (noted, not done).

### Logo files → **BROKEN: 6 of 12 missing**
`public/logos/` contains only 6 SVGs:
```
backtrader.svg  daytrader.svg  tradecreator.svg  tradetracker.svg  valuefinder.svg  weatherscout.svg
```
Missing (referenced by `ProductCard.tsx:40` and `:67` as `/logos/${slug}.svg`):
```
MISS tradeschool-ai.svg   MISS weatherdashboard.svg   MISS claudeomatic.svg
MISS btcpredictor.svg     MISS kashitrader.svg        MISS contentforge.svg
```
**Impact:** These 6 are exactly the **3 featured + first 3 library** products — i.e. the most prominent cards on the homepage render a broken `<img>` (browser default broken-image glyph / empty box). Verified the reference: `src/components/ProductCard.tsx:40,67`. The hidden products (weatherscout/daytrader/valuefinder) ironically all *have* logos. This is the most user-visible defect found.
**Proposed fix:** add the 6 missing SVGs to `public/logos/`, OR add an `onError` fallback / use the `product.tag` initial as a placeholder in `ProductCard`. (Not applied — asset creation + a multi-line component change.)

### Screenshot assets → **PASS**
All 14 screenshot paths referenced in the product page source exist under `public/screenshots/` (`tradeschool/*` ×11, `weatherdashboard/*` ×3). Only `tradeschool-ai` and `weatherdashboard` reference real screenshots; the other 10 product heroes use the `ScreenMock` placeholder component (no asset needed).

---

## Phase 3 — Runtime health

### Console errors (Playwright, headless, `:3001`)
Listened for `console.error/warning`, `pageerror`, `requestfailed` on 4 pages:

| Page | Errors/warnings |
|---|---|
| `/` | **6 errors** — all `404 Failed to load resource` |
| `/products/tradeschool-ai` | 0 |
| `/products/btcpredictor` | 0 |
| `/products/tradetracker` | 0 |

- **No React hydration mismatch warnings. No framer-motion warnings** (framer-motion isn't used — see Phase 4).
- The 6 homepage 404s are the missing logos, confirmed by capturing exact URLs:
```
404 http://localhost:3001/logos/tradeschool-ai.svg
404 http://localhost:3001/logos/weatherdashboard.svg
404 http://localhost:3001/logos/claudeomatic.svg
404 http://localhost:3001/logos/btcpredictor.svg
404 http://localhost:3001/logos/kashitrader.svg
404 http://localhost:3001/logos/contentforge.svg
```
This is the runtime symptom of the Phase 2 missing-logo defect.

### Access-request form → **WORKS at HTTP level, but the backend is a NO-OP**
Submit path traced end to end:
1. `src/components/AccessRequestForm.tsx:10` — `fetch("/api/request-access", {method:"POST", ... body: {name,email,message,product,slug}})`. On `res.ok` it sets status `"sent"` and shows "Request received." (`:11`, `:19-20`).
2. `src/app/api/request-access/route.ts` — the **entire** handler:
```ts
export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message, product } = body;
  if (!name || !email || !product) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  console.log("ACCESS REQUEST:", { name, email, product, message, ts: new Date().toISOString() });  // line 6
  return NextResponse.json({ ok: true });
}
```
Verified live:
```
POST valid payload      → {"ok":true}        HTTP 200
POST missing fields     → {"error":"Missing fields"}  HTTP 400
```
**Behavior:** the route validates required fields and returns 200, but the only thing it does with a valid submission is `console.log` it server-side (`route.ts:6`). **No email is sent, no database write, no durable storage.** A user sees "Request received," but the owner only captures the lead if they happen to be tailing server logs — and on Vercel serverless, stdout logs are ephemeral/streamed, not a lead store. This is a "looks done, silently drops data" issue.
**Proposed fix:** wire `route.ts:6` to a real sink — email (Resend/SES), a DB/Notion row, or at minimum a durable log/webhook. (Not applied.)

### OG image routes → **ROOT works; ALL 12 per-product OG images return 500 (BROKEN)**
```
GET /opengraph-image                          → HTTP 200  image/png  88,621 bytes  ✅
GET /products/tradeschool-ai/opengraph-image  → HTTP 000 (connection reset)         ❌
GET /products/btcpredictor/opengraph-image    → HTTP 000 (connection reset)         ❌
```
`curl` reports `000` because the response is reset mid-stream. Dev-server log shows the real cause — a 500:
```
⨯ Error: failed to pipe response
  [cause]: Error: Expected <div> to have explicit "display: flex", "display: contents",
           or "display: none" if it has more than one child node.
 GET /products/tradeschool-ai/opengraph-image 500 in 438ms
```
**Root cause:** Satori (`next/og`) requires any `<div>` with more than one child to declare `display`. At `src/app/products/[slug]/opengraph-image.tsx:17`:
```tsx
<div style={{ fontSize: 13, color: accent, ... /* no display */ }}>{product.tag} · mrtorino.io</div>
```
`{product.tag}` and the adjacent text ` · mrtorino.io` are **two** child nodes, but the div has no `display:flex`. The root OG image (`src/app/opengraph-image.tsx`) avoids this (all its multi-child divs are flex / single-child), which is why it renders.
**Why the build didn't catch it:** these routes are `runtime = "edge"` and dynamic (`ƒ` in the route table), so they're rendered on request, never at `next build`. The build's "19/19 static pages" never exercises them.
**Impact:** Every product page's `openGraph`/`twitter` image (the link-preview card on social/chat) is broken — a real, fully-verified SEO/sharing regression affecting all 12 products.
**Proposed one-line fix:** make it a single text child — `{`${product.tag} · mrtorino.io`}` — or add `display:"flex"` to that div. (Not applied.)

---

## Phase 4 — Dead code & dependency reality

### Unused exports (`ts-prune`)
`ts-prune` flagged only Next framework-convention exports (route `default`s, `metadata`, `generateStaticParams`, `generateMetadata`, `runtime`, `alt`, `contentType`, `POST`). These are **false positives** — Next requires them by convention; `ts-prune` doesn't model that. No actionable dead exports in `src/components` or `src/data`.

### Dead component island — shadcn `ui/*` (confirmed unused)
`grep -rn "@/components/ui/" src` → **NONE**. None of these are imported anywhere:
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`

They only import `cn` from `src/lib/utils.ts`, which in turn is imported **only** by these three files (`grep` confirms no other `@/lib/utils` consumer). So the whole island — `ui/button`, `ui/card`, `ui/input`, `lib/utils` — is dead scaffolding from the shadcn init. The site's actual buttons/inputs are hand-written Tailwind in the page/components.

### Dependencies stranded by the dead island
These `dependencies` are imported **only** by the dead `ui/*` files (verified by grep excluding `ui/` and `lib/utils`):
- `class-variance-authority`, `tailwind-merge`, `clsx`, `radix-ui` → used only by the dead island (or not at all).

Because nothing live imports them, they are tree-shaken out of the app bundle, but they are misleading `package.json` entries. Removing the dead island would let all four be dropped.

### `framer-motion` → **DEAD DEPENDENCY**
- `package.json` declares `framer-motion: ^12.38.0` (in `dependencies`).
- `grep -rl "framer-motion" src` → **NOT imported anywhere.**
- The only animation in the app is the CSS `.fade-up` keyframe (`src/app/globals.css:64-71`). The earlier task descriptions referred to "framer-motion animations," but none exist in the code. framer-motion can be removed with zero UI change. (Answers the brief's "is framer-motion actually needed" → **No.**)

### Stray light-theme survivors → **NONE (verified)**
`grep` for `bg-white|text-black|#faf9f7|#ffffff|#e7e4de|#75706b|text-white` across `src` (excluding OG routes) returns matches, but **every one is intentional dark-theme usage**, not a survivor:
- `ScreenshotGallery.tsx:30,46,60,64,67` — `text-white/*` / `bg-black/70` inside the **lightbox modal** (white text on a `bg-black/92` overlay) — correct.
- `products.ts` `buttonClass` `text-white` — label color on saturated accent buttons (white on orange/violet/etc.) — correct.
- `SiteHeader.tsx:57`, `AccessRequestForm.tsx:28`, `page.tsx:53` — `hover:bg-white` is the hover state of the **light** primary buttons (`bg-[#f5f5f5]` → brighter on hover) — intended.
- `page.tsx:120` `text-white` on the orange flagship button — correct.

The dedicated light-palette hexes (`#faf9f7/#ffffff/#e7e4de/#75706b`) appear **nowhere** in non-OG `src` (confirmed in the prior redesign pass and re-confirmed here). The redesign migration is clean.
- OG routes (`opengraph-image.tsx`) use `#070B10` + white text — that's the OG card design, explicitly out of scope for the dark redesign.

---

## Phase 5 — Accessibility & the dark redesign

### axe-core (`@axe-core/playwright`, tags `wcag2a`+`wcag2aa`)
| Page | Violations |
|---|---|
| `/` | **1 type** — `color-contrast` [serious], **81 nodes** |
| `/products/tradeschool-ai` | **1 type** — `color-contrast` [serious], **63 nodes** |

No other violations — no missing `alt`, no missing button/link names, no landmark/heading-order failures. The single issue on both pages is the muted-text contrast below.

### Color contrast → **FAILS AA for muted text** (matches axe)
Computed WCAG ratios (relative-luminance formula) and corroborated by axe (axe reports 3.71):
```
3.72:1  #6b6b6b muted on #0a0a0a bg        AA-normal: FAIL   AA-large: PASS
3.54:1  #6b6b6b muted on #111111 surface   AA-normal: FAIL   AA-large: PASS
18.16:1 #f5f5f5 primary on #0a0a0a         AA-normal: PASS
4.89:1  #6b6b6b on #f5f5f5 inverted block  AA-normal: PASS
```
`--muted: #6b6b6b` (`globals.css:8`) is used for nearly all secondary text (eyebrows, descriptions, stat chips, nav). At normal/ small sizes on the dark surfaces it is **below 4.5:1** → real, axe-confirmed AA failure across 81/63 elements. Large-text (≥18.66px bold or ≥24px) usages pass (3:1).
**Proposed fix:** lighten `--muted` to ≈`#8b8b8b` (≈4.6:1 on `#0a0a0a`) or darken backgrounds; one-value change in `globals.css:8`. (Not applied.)

### Focus-visible on the square buttons → **HANDLED**
`src/app/globals.css:74-77`:
```css
*:focus-visible { outline: 2px solid rgba(245, 245, 245, 0.45); outline-offset: 2px; }
```
A global `:focus-visible` ring applies to all interactive elements, including the new square buttons/links (which carry no `outline-none` override). Keyboard focus is visible. **Caveat:** the ring color `rgba(245,245,245,0.45)` is faint on light inverted blocks (the `bg-[#f5f5f5]` CTA section) — visible but low-contrast there. **UNVERIFIED** whether that specific combination meets the 3:1 non-text-contrast guideline; not axe-flagged.

### Outlined hero text (`-webkit-text-stroke`) → readable, but no fallback
`src/app/globals.css:34-37`:
```css
.text-outline { color: transparent; -webkit-text-stroke: 1.5px var(--foreground); }
```
- **Screen readers:** unaffected — "real" is real DOM text, read normally. No a11y barrier.
- **Visual risk:** `color: transparent` with stroke means if `-webkit-text-stroke` is unsupported, the word renders invisible (no fallback fill). `-webkit-text-stroke` is supported in all current major browsers, so this is low-risk, but there is **no graceful degradation** (e.g. `@supports not (-webkit-text-stroke: 1px)` fallback). Noted, not broken.

### Reduced motion → **NOT respected** (minor)
- `grep "prefers-reduced-motion" src/app/globals.css` → **NONE**.
- The `.fade-up` entrance animation (`globals.css:69-71`) runs unconditionally; users with `prefers-reduced-motion: reduce` still get the 0.4s translate/opacity animation.
- framer-motion's reduced-motion handling is **N/A** — framer-motion isn't used (Phase 4). So the brief's "reduced-motion respected by framer-motion animations" has no subject; the only motion is CSS and it is not gated.
**Proposed fix:** add `@media (prefers-reduced-motion: reduce){ .fade-up{ animation: none } }`. (Not applied.)

---

## Phase 6 — Test suite

### Tooling installed (devDependencies)
- `vitest@^4`, `jsdom@^29`, `@testing-library/react@^16`, `@testing-library/dom`, `@testing-library/jest-dom`, `@vitejs/plugin-react-swc@^4` (SWC plugin chosen over `@vitejs/plugin-react` — the latter's Babel-8 RC peer conflicts with the Babel-7 chain pinned by `shadcn`; ERESOLVE captured).
- `@playwright/test@^1.61` (reuses the already-installed Chromium browser binary).

### Config / scripts added
- `vitest.config.ts` — jsdom env, `@`→`src` alias, `tests/setup.ts` (jest-dom matchers + `cleanup`), includes only `tests/unit` + `tests/component`, excludes `tests/e2e`.
- `playwright.config.ts` — `testDir: tests/e2e`, `baseURL http://localhost:3001`, `webServer` reuses an existing dev server or starts `next dev -p 3001`.
- `package.json` scripts: `"test": "npm run test:unit && npm run test:e2e"`, `"test:unit": "vitest run"`, `"test:e2e": "playwright test"`.

### Results (captured)
`npm run test:unit` → **21 passed (3 files)**:
```
Test Files  3 passed (3)
     Tests  21 passed (21)
```
`npm run test:e2e` → **5 passed**:
```
✓ homepage › loads with the dark theme applied
✓ homepage › primary nav exposes Home + Products (per-product links removed)
✓ product routes › every visible product is linked from the homepage and its page returns 200
✓ product routes › a product page renders its headline and back-to-home link
✓ access request form › renders the form on a freemium product page
5 passed (9.7s)
```
`npx tsc --noEmit` re-run with the new test files present → still **clean (exit 0)**.

(One initial component-test assertion failed because I wrongly expected jsdom to keep the `#f5f5f5` hex; jsdom normalizes inline `background` to `rgb()`. Fixed the assertion — code was correct.)

### What the suite covers
- **Unit (`tests/unit/products.test.ts`):** 12-product count, unique slugs, required-field completeness + non-empty arrays, pricing/status enums, `glowColor` rgba shape (the contract `accentSolid`/`accentGlow` regexes depend on), `productMap` completeness, exactly-3-hidden, `visibleProducts` excludes hidden (9), `featured` = first 3 visible, `library` = remaining 6, partition has no overlap.
- **Component (`tests/component/`):** `SectionHeading` (title heading, eyebrow presence/absence, accent wiring into swatch+rule, default `#f5f5f5`); `ProductCard` (`accentSolid`/`accentGlow`/`accentVars` helpers, name/tag render, href, `--accent`/`--accent-glow` custom props on root, tag color, compact variant).
- **E2e (`tests/e2e/site.spec.ts`):** homepage dark-theme `body` bg `rgb(10,10,10)`, nav shows Home+Products and no per-product links, every visible product linked from home + route 200s, product page headline + back link, freemium access form renders.

### SEO verification (evidence for Phase 7 "risky" section)
All checked against the rendered HTML — these are **working, not gaps**:
- `<title>` — homepage `mrtorino.io — Software Studio`; product `TradeSchool AI | mrtorino.io`. **No title doubling**; `title.template` applied correctly.
- `<link rel="canonical">` — present & correct on both (`https://www.mrtorino.io` / `.../products/tradeschool-ai`).
- JSON-LD — `application/ld+json` block(s) present on homepage and product page (`JsonLd.tsx` Organization + SoftwareApp).
- `sitemap.xml` — lists the **9 visible** products only; the 3 hidden (`weatherscout/daytrader/valuefinder`) are **excluded** (0 refs). Correct.
- `robots.txt` — `Allow: /` + sitemap reference. Fine.

---

## Phase 7 — Debrief

### 1. Executive summary
- **Solid foundation:** build passes, `tsc` clean, lint has only 2 cosmetic `<img>` warnings, data layer is internally consistent (unique slugs, correct 9/3/6 slicing, all 12 routes 200), and SEO basics (titles, canonicals, sitemap hidden-exclusion, JSON-LD) are correctly implemented. 26 new tests all pass.
- **Two real, user-visible bugs:** (a) **6 of 12 product logos are missing** → broken images on the most prominent homepage cards (6× 404 confirmed); (b) **all 12 per-product OG images return HTTP 500** → broken social/link previews (Satori multi-child-div error confirmed in logs).
- **One silent-data-loss risk:** the access-request form returns success but the API route only `console.log`s — **no email/DB/persistence**. Leads are effectively dropped.
- **Accessibility gap:** the `#6b6b6b` muted text fails WCAG AA contrast (3.72:1) on the dark background — axe flags 81 nodes (home) / 63 (product). Reduced-motion isn't honored.
- **Dependency cruft:** `framer-motion`, `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` and the `ui/*`+`lib/utils` island are all unused; `shadcn` is mis-placed in `dependencies` and drags in 8 of the 10 audit vulns. Plus an **environment risk: disk is 99% full**.

### 2. What works (verified)
| Claim | Evidence |
|---|---|
| Production build succeeds | `npm run build` exit 0, "19/19" static pages |
| Types clean (incl. with tests) | `npx tsc --noEmit` exit 0 (twice) |
| Lint passes | `eslint` exit 0, 0 errors / 2 warnings |
| All 12 product routes resolve, bogus → 404 | `curl` status table, Phase 2 |
| Slug uniqueness + 9/3/6 slicing | `tsx` eval, Phase 2; unit tests |
| Tailwind v4 generates all live accent classes (no purge) | prod CSS grep, Phase 2 |
| Hidden products excluded from sitemap | `sitemap.xml` grep, Phase 6 |
| Titles/canonicals/JSON-LD correct, no title doubling | rendered-HTML grep, Phase 6 |
| Root OG image renders | `curl` 200 image/png 88KB, Phase 3 |
| No hydration / no framer-motion console warnings | Playwright capture, Phase 3 |
| Keyboard focus ring present on buttons | `globals.css:74-77` |
| Dark-theme migration complete (no light survivors) | grep, Phase 4 |

### 3. What's broken (verified, with fix)
1. **6 missing product logos** → broken `<img>` on homepage.
   - Evidence: `ls public/logos/` (6 files), 6× `404 /logos/*.svg` (Playwright), refs at `ProductCard.tsx:40,67`.
   - Missing: `tradeschool-ai, weatherdashboard, claudeomatic, btcpredictor, kashitrader, contentforge` (all 3 featured + first 3 library).
   - Fix: add the 6 SVGs to `public/logos/`, or add an `onError`/initial-letter fallback in `ProductCard`.
2. **All 12 per-product OG images return 500** → broken link previews.
   - Evidence: `curl` `000` (reset); dev log `Expected <div> to have explicit "display:flex" … 500`.
   - Cause: `src/app/products/[slug]/opengraph-image.tsx:17` — `{product.tag} · mrtorino.io` is 2 children on a non-flex div.
   - Fix (one line): `{`${product.tag} · mrtorino.io`}` or add `display:"flex"`.
3. **Access-request form is a no-op backend** → leads dropped.
   - Evidence: `route.ts:6` is just `console.log`; live `curl` returns `{"ok":true}` with no side effect.
   - Fix: send email / write to DB or Notion / forward to a webhook in `route.ts`.

### 4. What's risky but not broken
- **Muted-text contrast fails AA** (`#6b6b6b`): 3.72:1 on bg, 3.54:1 on surface; axe 81/63 nodes (Phase 5). Large text passes. Fix: bump `--muted` to ≈`#8b8b8b`.
- **Purged-Tailwind-class risk:** currently fine — prod CSS contains every live `buttonClass` color *and* the dead `border-*-500/30` strings. Risk is latent: accent colors live as string data in `products.ts`; if that file ever moves outside Tailwind's content scan, buttons lose color silently. Keep `products.ts` within scanned sources.
- **Reduced motion ignored:** `.fade-up` has no `prefers-reduced-motion` guard (`globals.css`); framer-motion is N/A (unused).
- **Outlined hero text has no fallback:** `.text-outline` uses `color:transparent`; if `-webkit-text-stroke` is unsupported the word "real" vanishes (SR-readable regardless). Add an `@supports` fallback.
- **Security/deps:** 10 `npm audit` vulns, but 8 are `shadcn`-CLI/eslint-only and unreachable in the app (Phase 1). Real exposure: `next` (patch `16.2.9` available) + build-time `postcss`. `shadcn` should move to `devDependencies`.
- **Dead code:** `framer-motion` + `ui/button|card|input` + `lib/utils` + `radix-ui`/`cva`/`clsx`/`tailwind-merge` all unused; `product.border` / `product.accent` are dead fields.
- **`<img>` over `next/image`** for logos (2 lint warnings) — minor LCP/bandwidth.
- **Environment:** disk `/` at 99% (was 100% mid-audit; freed 3.1G of npm cache). Not a code issue but will break installs/builds; **flagged, not owned by this repo.**
- **SEO:** no gaps found — the items the brief flagged (title doubling, canonical, sitemap, robots, JSON-LD) are all implemented correctly. The only SEO regression is the broken OG images (item 3.2).

### 5. Test coverage — what's covered & gaps
**Covered:** products.ts invariants; `SectionHeading` + `ProductCard` rendering/accent wiring; e2e homepage dark theme, nav, all visible routes 200, product page, access-form render. (See Phase 6.)
**Obvious gaps (not yet covered):**
- No test asserting **logos load** (would have caught bug #1) — add an e2e check for zero 404s / `naturalWidth>0` on card images.
- No test for **OG image routes** (would have caught bug #2) — add e2e `request.get('/products/<slug>/opengraph-image')` expecting 200 `image/*`.
- No test for **form submission flow** (only render) — and currently nothing asserts the backend persists anything (it can't).
- No **contrast/axe** test in CI — could wire `@axe-core/playwright` as an e2e to guard regressions.
- No coverage of `SiteHeader` mobile drawer, `ScreenshotGallery` lightbox, `AccessRequestForm` states, sitemap/robots output.
- Component tests render RSCs in jsdom (no server-only behavior exercised); fine for these presentational components but not a substitute for e2e.

### 6. Prioritized fix list (impact ÷ effort)
| # | Fix | Impact | Effort | Notes |
|---|---|---|---|---|
| 1 | OG image multi-child div (`opengraph-image.tsx:17`) | High (all 12 previews) | 1 line | `{`${tag} · mrtorino.io`}` |
| 2 | Add 6 missing logos (or `onError` fallback) | High (homepage hero cards) | Low–Med | assets or small component change |
| 3 | Make access form persist (email/DB/webhook) | High (lead capture) | Med | `route.ts` |
| 4 | Bump `--muted` to ~`#8b8b8b` for AA contrast | Med (a11y, 81+ nodes) | 1 line | `globals.css:8` |
| 5 | `prefers-reduced-motion` guard for `.fade-up` | Low–Med (a11y) | 1 line | `globals.css` |
| 6 | `npm i next@16.2.9`; move `shadcn` to devDeps | Med (security/hygiene) | Low | test after |
| 7 | Remove dead deps (`framer-motion`, `radix-ui`, cva, clsx, tailwind-merge) + `ui/*`+`lib/utils` island + dead `border`/`accent` fields | Low (cleanliness/bundle) | Low–Med | verify nothing imports them |
| 8 | `<img>`→`next/image` for logos, or add e2e guarding 404s | Low | Low | also closes a test gap |

*(Per instructions, none of these were applied — awaiting review.)*
