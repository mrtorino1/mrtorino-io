"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

export function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

function LightboxOverlay({
  images,
  index,
  setIndex,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const many = images.length > 1;
  const img = images[index];

  // Focus the close button on open, restore focus and body scroll on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (many && e.key === "ArrowRight") setIndex((index + 1) % images.length);
      else if (many && e.key === "ArrowLeft") setIndex((index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.caption ?? img.alt}
      className="fixed inset-0 z-[100] bg-black/90"
      onClick={onClose}
    >
      {/* Image area — inset so the surrounding backdrop stays clickable */}
      <div
        className="bse-lightbox-img absolute inset-x-4 bottom-16 top-14 sm:inset-x-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <button
        ref={closeRef}
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
        className="absolute right-4 top-3 z-10 p-2 text-[var(--bse-text)] transition-colors hover:text-[var(--bse-accent)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {many && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-3 text-[var(--bse-text)] transition-colors hover:text-[var(--bse-accent)]"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-3 text-[var(--bse-text)] transition-colors hover:text-[var(--bse-accent)]"
          >
            <Chevron dir="right" />
          </button>
        </>
      )}

      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-5 py-4 font-mono text-xs uppercase tracking-widest text-[var(--bse-muted)]"
        onClick={(e) => e.stopPropagation()}
      >
        <span>{img.caption ?? ""}</span>
        {many && (
          <span aria-live="polite">
            {index + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Button wrapping a thumbnail. Opens the overlay on the given image set —
 * pass one image for single mode (no arrows/counter) or the full set plus a
 * startIndex for gallery navigation.
 */
export function LightboxTrigger({
  images,
  startIndex = 0,
  label,
  className,
  children,
}: {
  images: LightboxImage[];
  startIndex?: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(startIndex);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        className={className}
        onClick={() => {
          setIndex(startIndex);
          setOpen(true);
        }}
      >
        {children}
      </button>
      {open && (
        <LightboxOverlay
          images={images}
          index={index}
          setIndex={setIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
