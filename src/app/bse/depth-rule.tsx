"use client";

import { useEffect, useRef, useState } from "react";

// Depth scale: 1 m of "hole" per PX_PER_M of page. Major (labelled) ticks
// every 50 m, minor every 10 m; the bottom of the document is TD.
const PX_PER_M = 8;
const MINOR_M = 10;
const MAJOR_M = 50;

type Tick = { m: number; major: boolean; td?: boolean };

function buildTicks(depthM: number): Tick[] {
  const ticks: Tick[] = [];
  for (let m = 0; m < depthM - MINOR_M / 2; m += MINOR_M) {
    ticks.push({ m, major: m % MAJOR_M === 0 });
  }
  ticks.push({ m: depthM, major: true, td: true });
  return ticks;
}

/**
 * Fixed left-margin depth ruler (md+ only; hidden entirely below md).
 * Scroll-linked: the track is translated by -scrollY on a rAF-throttled
 * scroll listener so tick labels track the page like a log strip. With
 * prefers-reduced-motion the ruler is static — the first stretch of the
 * scale, no live ticking.
 */
export function DepthRule() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [ticks, setTicks] = useState<Tick[]>([]);
  const [reduced, setReduced] = useState(false);

  // Measure the document once mounted and whenever it resizes.
  useEffect(() => {
    const measure = () => {
      const h = document.documentElement.scrollHeight;
      setTicks(buildTicks(Math.round(h / PX_PER_M)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (reduced) {
      track.style.transform = "";
      return;
    }
    let raf = 0;
    const apply = () => {
      raf = 0;
      track.style.transform = `translate3d(0, ${-window.scrollY}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      className="bse-depth-rule bse-mono hidden md:block"
      aria-hidden="true"
      data-bse-depth-rule
      data-mode={reduced ? "static" : "live"}
    >
      <div ref={trackRef} className="bse-depth-track">
        {ticks.map((t) => {
          const top = t.m * PX_PER_M;
          return (
            <span key={t.m} className="contents">
              <span
                className="bse-depth-tick"
                style={{ top }}
                data-major={t.major ? "" : undefined}
                data-td={t.td ? "" : undefined}
              />
              {t.major && (
                <span
                  className="bse-depth-label"
                  style={{ top }}
                  data-td={t.td ? "" : undefined}
                  data-first={t.m === 0 ? "" : undefined}
                >
                  {t.td ? "TD" : `${t.m} m`}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
