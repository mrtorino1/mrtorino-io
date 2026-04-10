type ScreenMockProps = {
  title: string;
  bars?: string[];
  accentColor?: string;
};

export default function ScreenMock({ title, bars, accentColor = "rgba(255,255,255,0.12)" }: ScreenMockProps) {
  const defaultBars = ["48px", "78px", "60px", "112px", "86px"];
  const b = bars ?? defaultBars;

  return (
    <div className="rounded-[22px] border border-white/[0.09] bg-[#0D131C] shadow-2xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-white/[0.025]">
        <div className="flex items-center gap-1.5">
          {[0.18, 0.1, 0.1].map((o, i) => (
            <div key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: `rgba(255,255,255,${o})` }} />
          ))}
        </div>
        <div className="text-[9px] tracking-[0.22em] uppercase text-white/28">{title}</div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid grid-cols-12 gap-3 min-h-[200px]">
          {/* Sidebar */}
          <div className="col-span-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 space-y-2.5">
            <div className="h-6 rounded-lg bg-white/[0.06]" />
            <div className="space-y-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-8 rounded-lg bg-white/[0.04]" />
              ))}
            </div>
            <div
              className="h-20 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${accentColor}, rgba(255,255,255,0.02))` }}
            />
          </div>

          {/* Main area */}
          <div className="col-span-9 space-y-2.5">
            <div className="grid grid-cols-3 gap-2.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl border border-white/[0.07] bg-white/[0.04]"
                  style={i === 0 ? { borderColor: accentColor.replace("0.12", "0.28") } : {}}
                />
              ))}
            </div>
            {/* Chart */}
            <div className="h-28 rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#171F2A] to-[#101722] p-3 flex items-end gap-1.5">
              {b.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg border border-white/[0.09]"
                  style={{
                    height: h,
                    background: i % 2 === 0 ? accentColor : "rgba(255,255,255,0.07)",
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[0, 1].map((i) => (
                <div key={i} className="h-10 rounded-xl border border-white/[0.07] bg-white/[0.04]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
