type ScreenMockProps = {
  title: string;
  bars?: string[];
  accentColor?: string;
};

export default function ScreenMock({ title, bars, accentColor = "rgba(245,245,245,0.12)" }: ScreenMockProps) {
  const defaultBars = ["48px", "78px", "60px", "112px", "86px"];
  const b = bars ?? defaultBars;

  return (
    <div className="border border-[#1f1f1f] bg-[#111111] shadow-xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f] bg-[#0a0a0a]">
        <div className="flex items-center gap-1.5">
          {[0.3, 0.16, 0.16].map((o, i) => (
            <div key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: `rgba(245,245,245,${o})` }} />
          ))}
        </div>
        <div className="text-[9px] tracking-[0.22em] uppercase text-[#6b6b6b]">{title}</div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid grid-cols-12 gap-3 min-h-[160px]">
          {/* Sidebar */}
          <div className="col-span-3 border border-[#1f1f1f] bg-[#0a0a0a] p-2.5 space-y-2.5">
            <div className="h-6 bg-[#f5f5f5]/[0.1]" />
            <div className="space-y-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-8 bg-[#f5f5f5]/[0.05]" />
              ))}
            </div>
            <div
              className="h-20"
              style={{ background: `linear-gradient(135deg, ${accentColor}, rgba(245,245,245,0.02))` }}
            />
          </div>

          {/* Main area */}
          <div className="col-span-9 space-y-2.5">
            <div className="grid grid-cols-3 gap-2.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-14 border border-[#1f1f1f] bg-[#0a0a0a]"
                  style={i === 0 ? { borderColor: accentColor.replace("0.12", "0.4") } : {}}
                />
              ))}
            </div>
            {/* Chart */}
            <div className="h-28 border border-[#1f1f1f] bg-[#0a0a0a] p-3 flex items-end gap-1.5">
              {b.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 border border-[#f5f5f5]/[0.08]"
                  style={{
                    height: h,
                    background: i % 2 === 0 ? accentColor : "rgba(245,245,245,0.06)",
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[0, 1].map((i) => (
                <div key={i} className="h-10 border border-[#1f1f1f] bg-[#0a0a0a]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
