import Image from "next/image";
import { ExpandIcon, LightboxTrigger, type LightboxImage } from "./lightbox";

/** Two-digit sheet number: 1 → "01". */
export const sheetNo = (n: number) => String(n).padStart(2, "0");

/**
 * Sheet-rule section header: 3px rule, then a mono label row —
 * "SHEET NN — TITLE" left, optional metadata right. Sheets number
 * sequentially per page starting at 01.
 */
export function SheetHeader({
  n,
  title,
  meta,
  className = "",
}: {
  n: number;
  title: string;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bse-sheet-rule ${className}`}>
      <div className="bse-mono flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3 text-[var(--bse-muted)]">
        <span>
          Sheet {sheetNo(n)} — {title}
        </span>
        {meta && <span>{meta}</span>}
      </div>
    </div>
  );
}

/** Figure caption bar: "FIG. N — DESCRIPTION" left, attribution right. */
export function FigCaption({
  fig,
  description,
  className = "",
}: {
  fig: number;
  description: string;
  className?: string;
}) {
  return (
    <figcaption
      className={`bse-mono flex items-baseline justify-between gap-4 border-t border-[var(--bse-border)] px-3 py-2 text-[var(--bse-muted)] ${className}`}
    >
      <span>
        Fig. {fig} — {description}
      </span>
      <span className="shrink-0">Photo: BSE</span>
    </figcaption>
  );
}

/**
 * A numbered photo: lightbox trigger + image + caption bar. `images` is the
 * lightbox set (defaults to this photo alone); `startIndex` selects it
 * within a shared gallery set.
 */
export function Figure({
  fig,
  src,
  alt,
  caption,
  label,
  images,
  startIndex = 0,
  aspectClass,
  sizes,
  priority,
  className = "",
  frameClassName = "",
}: {
  fig: number;
  src: string;
  alt: string;
  caption: string;
  /** Accessible name of the trigger button (kept stable for e2e selectors). */
  label: string;
  images?: LightboxImage[];
  startIndex?: number;
  aspectClass: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  frameClassName?: string;
}) {
  const set = images ?? [{ src, alt, caption, fig }];
  return (
    <figure className={`flex flex-col border border-[var(--bse-border)] bg-[var(--bse-card)] ${className}`}>
      <LightboxTrigger
        images={set}
        startIndex={startIndex}
        label={label}
        className={`group relative block w-full overflow-hidden ${aspectClass} ${frameClassName}`}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        <span className="absolute bottom-2 right-2 rounded-sm bg-black/60 p-1.5 text-[var(--bse-text)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <ExpandIcon className="h-4 w-4" />
        </span>
      </LightboxTrigger>
      <FigCaption fig={fig} description={caption} />
    </figure>
  );
}

// Data-plate figures come straight from the two client letters reproduced on
// /bse/testimonials (GPE Consulting: 4 holes, 8,000+ ft, >80% recovery in
// massive sulfide; Timberline: PQ/HQ/NQ core) — nothing invented.
const plateFields = [
  { label: "Footage", value: "8,000+ ft", detail: "4 holes · FAD property, Eureka NV" },
  { label: "Recovery", value: ">80%", detail: "Soft friable massive sulfide" },
  { label: "Core sizes", value: "PQ · HQ · NQ", detail: "Northern Nevada core program" },
];
const plateSource = "Per client letters — GPE Consulting Services · Timberline Resources Corporation";

/**
 * Equipment data plate: 2px border, plate fill, four corner rivets, internal
 * column dividers, mono values with small mono field labels.
 */
export function Nameplate({
  fields = plateFields,
  source = plateSource,
}: {
  fields?: { label: string; value: string; detail?: string }[];
  source?: string;
}) {
  return (
    <div className="bse-nameplate">
      <span className="bse-rivet left-1.5 top-1.5" aria-hidden="true" />
      <span className="bse-rivet right-1.5 top-1.5" aria-hidden="true" />
      <span className="bse-rivet bottom-1.5 left-1.5" aria-hidden="true" />
      <span className="bse-rivet bottom-1.5 right-1.5" aria-hidden="true" />
      <dl className="grid divide-y divide-[var(--bse-border-strong)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {fields.map((f) => (
          <div key={f.label} className="px-6 py-5 sm:px-8">
            <dt className="bse-mono text-[var(--bse-muted)]">{f.label}</dt>
            <dd className="mt-2 font-mono text-2xl tracking-tight text-[var(--bse-text)] sm:text-3xl">{f.value}</dd>
            {f.detail && <dd className="bse-mono mt-1.5 text-[var(--bse-muted)]">{f.detail}</dd>}
          </div>
        ))}
      </dl>
      {source && (
        <p className="bse-mono border-t border-[var(--bse-border-strong)] px-6 py-2 text-[var(--bse-muted)] sm:px-8">
          {source}
        </p>
      )}
    </div>
  );
}
