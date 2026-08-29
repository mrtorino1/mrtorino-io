import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { designs, versionsNewestFirst } from "@/data/designs";
import { VersionCard } from "./version-card";

// Internal design archive — a working tool, not marketing. Reached by direct
// URL only: noindexed here, excluded from sitemap.ts, unlinked from the nav.
export const metadata: Metadata = {
  title: "Design archive",
  description: "Version-by-version screenshots of every design project.",
  robots: { index: false, follow: false },
};

export default function DesignsPage() {
  const versionCount = designs.reduce((n, p) => n + p.versions.length, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#1f1f1f] pb-4">
          <h1 className="text-xl font-semibold tracking-tight">Design archive</h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b6b6b]">
            {designs.length} projects · {versionCount} versions · internal
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-[#a3a3a3]">
          Every visual iteration of each client build, newest first. Capture a new version with{" "}
          <code className="font-mono text-[#f5f5f5]">node scripts/archive-design.mjs &lt;url&gt; &lt;slug&gt; &lt;version&gt;</code>{" "}
          and register it in <code className="font-mono text-[#f5f5f5]">src/data/designs.ts</code>.
        </p>

        {designs.map((p) => {
          const versions = versionsNewestFirst(p);
          return (
            <section key={p.slug} className="mt-12" aria-labelledby={`project-${p.slug}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-3">
                <h2 id={`project-${p.slug}`} className="text-lg font-semibold">
                  {p.project}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b6b6b]">
                  /{p.slug} · {versions.length} {versions.length === 1 ? "version" : "versions"}
                </p>
              </div>
              {p.client && <p className="pb-3 text-sm text-[#a3a3a3]">{p.client}</p>}
              <div className="border-b border-[#1f1f1f]">
                {versions.map((v, i) => (
                  <VersionCard key={v.version} version={v} current={i === 0} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </div>
  );
}
