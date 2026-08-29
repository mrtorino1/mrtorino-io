"use client";

import Image from "next/image";
import { useState } from "react";
import type { DesignVersion } from "@/data/designs";

type Shot = "desktop" | "mobile";

/**
 * One design version as a dense table-like row: screenshot frame on the left
 * (desktop by default, mobile on toggle), mono metadata on the right.
 */
export function VersionCard({ version, current }: { version: DesignVersion; current: boolean }) {
  const [shot, setShot] = useState<Shot>("desktop");
  const src = version.screenshots[shot];

  return (
    <article className="grid border-t border-[#1f1f1f] md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      {/* Screenshot frame — fixed height, top-anchored so the first screen shows */}
      <div className="border-b border-[#1f1f1f] md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-3 border-b border-[#1f1f1f] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b6b6b]">
          <div className="flex gap-1">
            {(["desktop", "mobile"] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={shot === s}
                onClick={() => setShot(s)}
                className={`whitespace-nowrap px-2 py-0.5 transition-colors ${
                  shot === s ? "bg-[#f5f5f5] text-[#0a0a0a]" : "hover:text-[#f5f5f5]"
                }`}
              >
                {s === "desktop" ? "Desktop" : "Mobile"}
              </button>
            ))}
          </div>
          <a href={src} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap hover:text-[#f5f5f5]">
            Open full PNG ↗
          </a>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${version.version} ${shot} screenshot at full size`}
          className="block h-[340px] overflow-hidden bg-[#111111]"
        >
          <div
            className={`relative h-full ${shot === "mobile" ? "mx-auto w-[200px] border-x border-[#1f1f1f]" : "w-full"}`}
          >
            <Image
              key={src}
              src={src}
              alt={`${version.label} — ${shot} screenshot`}
              fill
              unoptimized
              sizes={shot === "mobile" ? "200px" : "(max-width: 768px) 100vw, 60vw"}
              className="object-cover object-top"
            />
          </div>
        </a>
      </div>

      {/* Metadata */}
      <dl className="grid grid-cols-[92px_1fr] text-sm">
        <Row label="Version">
          <span className="font-mono">{version.version}</span>
          {current && (
            <span className="ml-2 inline-block bg-[#f97316] px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]">
              current
            </span>
          )}
        </Row>
        <Row label="Label">{version.label}</Row>
        <Row label="Date">
          <span className="font-mono">{version.date}</span>
        </Row>
        <Row label="Commit">
          <span className="font-mono">{version.commit ?? "—"}</span>
        </Row>
        <Row label="Notes" last>
          <span className="text-[#a3a3a3]">{version.notes}</span>
        </Row>
      </dl>
    </article>
  );
}

function Row({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  const border = last ? "" : "border-b border-[#1f1f1f]";
  return (
    <>
      <dt className={`px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b6b6b] ${border}`}>
        {label}
      </dt>
      <dd className={`px-3 py-2 leading-snug ${border}`}>{children}</dd>
    </>
  );
}
