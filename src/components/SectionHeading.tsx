type SectionHeadingProps = {
  eyebrow?: string;
  accentColor?: string;
  title: string;
};

export default function SectionHeading({ eyebrow, accentColor, title }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-[#75706b] mb-3">
          <span className="h-2 w-2 flex-shrink-0" style={{ background: accentColor ?? "#111111" }} />
          {eyebrow}
        </div>
      )}
      <div className="flex items-center gap-6">
        <h2 className="font-display uppercase text-4xl sm:text-5xl leading-none whitespace-nowrap">{title}</h2>
        <div className="flex-1 flex items-center">
          <div className="h-[3px] w-12 flex-shrink-0" style={{ background: accentColor ?? "#111111" }} />
          <div className="h-px flex-1 bg-[#e7e4de]" />
        </div>
      </div>
    </div>
  );
}
