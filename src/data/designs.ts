// Design archive registry ("the flip book") — one entry per design project,
// one version per visual iteration. Rendered by /designs (internal, noindexed).
//
// Screenshots are produced by scripts/archive-design.mjs:
//   node scripts/archive-design.mjs <url> <slug> <version>
// which writes public/designs/<slug>/<version>-desktop.png and -mobile.png.
// Add the version here afterwards with its date, commit SHA and a notes line.

export type DesignVersion = {
  version: string;
  label: string;
  /** Design date (ISO where known); capture date belongs in notes if different. */
  date: string;
  /** Short SHA of the repo state the version was built from, when applicable. */
  commit?: string;
  screenshots: { desktop: string; mobile: string };
  notes: string;
};

export type DesignProject = {
  project: string;
  slug: string;
  client?: string;
  versions: DesignVersion[];
};

export const designs: DesignProject[] = [
  {
    project: "Big Sky Exploration",
    slug: "bse",
    client: "Big Sky Exploration, LLC — surface diamond core drilling",
    versions: [
      {
        version: "v1",
        label: "Original Wix site",
        date: "2023",
        screenshots: {
          desktop: "/designs/bse/v1-desktop.png",
          mobile: "/designs/bse/v1-mobile.png",
        },
        notes:
          "Self-built Wix site (footer: ©2023, 'proudly created with Wix'); /blank-N page slugs; gmail contact address. Still live at big-sky-exploration.com — captured from there 2026-08-29.",
      },
      {
        version: "v2",
        label: "First build — split hero",
        date: "2026-07-16",
        commit: "e76d7fa",
        screenshots: {
          desktop: "/designs/bse/v2-desktop.png",
          mobile: "/designs/bse/v2-mobile.png",
        },
        notes:
          "First Next.js build: split hero with orange mono eyebrows, two-tone wordmark, numbered value-prop boxes, invented section headings ('Built for difficult ground'). Not screenshotted at the time — rendered 2026-08-29 from a checkout of e76d7fa, the last commit before the de-template pass.",
      },
      {
        version: "v3",
        label: "De-templated + brand logo",
        date: "2026-07-17",
        commit: "2d8699a",
        screenshots: {
          desktop: "/designs/bse/v3-desktop.png",
          mobile: "/designs/bse/v3-mobile.png",
        },
        notes:
          "De-template pass (plain trade headings, no eyebrows, asymmetric gallery, aspect-matched portrait panels) plus the client's official single-color logo at 2× size; orange accent with a sky-blue secondary. Last /bse change 31fbd3b; captured from production 2026-08-29 at HEAD 2d8699a.",
      },
      {
        version: "v4",
        label: "Drill-log / catalog system",
        date: "2026-08-29",
        commit: "69264aa",
        screenshots: {
          desktop: "/designs/bse/v4-desktop.png",
          mobile: "/designs/bse/v4-mobile.png",
        },
        notes:
          "Drill-log / equipment-catalog system: sheet-rule section headers, figure-numbered photos with caption bars, nameplate data plate, title-block footer, scroll-linked depth rule on md+ (static under reduced motion, hidden on mobile), grounded hero with a larger Barlow Condensed H1. Single orange accent — sky blue removed. Copy unchanged. Captured from production 2026-08-29.",
      },
    ],
  },
  {
    project: "Service Contractors LLC demo",
    slug: "mining",
    client: "Fictional demo — websites for mining & drilling contractors",
    versions: [
      {
        version: "v1",
        label: "Demo landing page",
        date: "2026-07-17",
        commit: "2d8699a",
        screenshots: {
          desktop: "/designs/mining/v1-desktop.png",
          mobile: "/designs/mining/v1-mobile.png",
        },
        notes:
          "Single-page /mining pitch built around a fictional contractor; de-templated visual system with license-safe BLM/NPS field photography. Captured from production 2026-08-29.",
      },
    ],
  },
];

/** Versions sorted newest-first (registry order is oldest-first). */
export function versionsNewestFirst(p: DesignProject): DesignVersion[] {
  return [...p.versions].reverse();
}
