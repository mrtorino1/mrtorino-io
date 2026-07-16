"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Shot = { src: string; alt: string; label: string; desc: string; full?: boolean };

export default function ScreenshotGallery({ shots, accent = "text-white/55" }: { shots: Shot[]; accent?: string }) {
  const [active, setActive] = useState<Shot | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [active, close]);

  const fullShots = shots.filter(s => s.full);
  const halfShots = shots.filter(s => !s.full);

  return (
    <>
      <div className="space-y-6">
        {fullShots.map(shot => (
          <div key={shot.src}>
            <div className="relative overflow-hidden border border-[#1f1f1f] shadow-xl cursor-zoom-in group" onClick={() => setActive(shot)}>
              <Image src={shot.src} alt={shot.alt} width={1280} height={800} className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.01]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 rounded-full px-4 py-2 text-xs text-white/90 backdrop-blur-sm">Click to expand</div>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-4">
              <div className={`text-[10px] uppercase tracking-[0.24em] mt-1 w-28 flex-shrink-0 ${accent}`}>{shot.label}</div>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{shot.desc}</p>
            </div>
          </div>
        ))}
        {halfShots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {halfShots.map(shot => (
              <div key={shot.src}>
                <div className="relative overflow-hidden border border-[#1f1f1f] shadow-xl cursor-zoom-in group" onClick={() => setActive(shot)}>
                  <Image src={shot.src} alt={shot.alt} width={1280} height={800} className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 rounded-full px-4 py-2 text-xs text-white/90 backdrop-blur-sm">Click to expand</div>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <div className={`text-[10px] uppercase tracking-[0.24em] mt-1 w-24 flex-shrink-0 ${accent}`}>{shot.label}</div>
                  <p className="text-xs text-[#6b6b6b] leading-relaxed">{shot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {active && (
        <div className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center p-4 cursor-zoom-out" onClick={close}>
          <button onClick={close} className="absolute top-5 right-6 text-white/40 hover:text-white text-4xl font-thin leading-none z-10 transition-colors">&times;</button>
          <div className="relative max-w-[94vw] max-h-[90vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl cursor-default" onClick={e => e.stopPropagation()}>
            <Image src={active.src} alt={active.alt} width={1920} height={1200} className="w-auto h-auto max-w-[94vw] max-h-[88vh] object-contain" priority />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
              <div className="text-xs text-white/55">{active.alt}</div>
            </div>
          </div>
          <div className="absolute bottom-4 text-xs text-white/25">Esc or click outside to close</div>
        </div>
      )}
    </>
  );
}
