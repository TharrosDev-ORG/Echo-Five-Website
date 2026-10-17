import { advanta } from "@/lib/content/advanta";
import { cx } from "@/lib/cx";

type Sample = (typeof advanta.freeSamples)[number];

/** Small drawn content for each format, so the covers read as real files. */
function Glyph({ format }: { format: string }) {
  if (format === "XLSX") {
    return (
      <div className="grid grid-cols-4 gap-[3px]">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={cx("h-2 rounded-[1px]", i % 4 === 0 ? "bg-[#c9cfdb]" : "bg-[#e3e7ef]")} />
        ))}
      </div>
    );
  }
  if (format === "PPTX") {
    return (
      <div className="flex items-end gap-1.5">
        <span className="h-6 w-full rounded-[2px] bg-[#e3e7ef]" />
        <span className="h-9 w-full rounded-[2px] bg-[#c9cfdb]" />
        <span className="h-12 w-full rounded-[2px] bg-[#86c1ff]" />
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <span className="block h-1.5 w-full rounded-full bg-[#e3e7ef]" />
      <span className="block h-1.5 w-[86%] rounded-full bg-[#e3e7ef]" />
      <span className="block h-1.5 w-[92%] rounded-full bg-[#e3e7ef]" />
      <span className="block h-1.5 w-[64%] rounded-full bg-[#e3e7ef]" />
    </div>
  );
}

/** One document cover: a white sheet with its format, title, and phase. */
export function DocCover({ doc, className, style }: { doc: Sample; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cx(
        "@container flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-[0.5rem] bg-white p-[8%] text-[#0b0d12] shadow-[0_1px_0_rgb(11_13_18/0.06),0_24px_48px_-24px_rgb(11_13_18/0.35)] ring-1 ring-[#0b0d12]/8",
        className,
      )}
      style={style}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="label rounded-[3px] border border-[#0b0d12] px-1.5 py-0.5 text-[0.6875rem] font-medium">
          {doc.format}
        </span>
        <span className="label text-[clamp(0.5rem,5.5cqw,0.6875rem)] text-[#5b6173]">Advanta365</span>
      </div>
      <div>
        <p className="serif text-[clamp(0.625rem,10.5cqw,1.375rem)] leading-[1.12] tracking-[-0.01em]">{doc.title}</p>
        <p className="label mt-2 truncate text-[clamp(0.5rem,5.5cqw,0.6875rem)] text-[#5b6173]">{doc.phase}</p>
      </div>
      <Glyph format={doc.format} />
    </div>
  );
}

/**
 * The six free samples, fanned like documents on a desk. Purely decorative:
 * the samples are listed in text wherever this appears.
 */
export default function DocStack({ className }: { className?: string }) {
  const docs = advanta.freeSamples;
  const fan = [
    { r: -10, x: 2, y: 9 },
    { r: -6, x: 15, y: 3 },
    { r: -2, x: 28, y: 0 },
    { r: 2, x: 41, y: 1 },
    { r: 6, x: 54, y: 5 },
    { r: 10, x: 66, y: 11 },
  ];
  return (
    <div aria-hidden="true" className={cx("group relative aspect-[16/11] w-full select-none", className)} data-observe="">
      {docs.map((doc, i) => (
        <div
          key={doc.title}
          className="absolute top-[10%] w-[32%] transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] motion-reduce:transition-none"
          style={{
            left: `${fan[i].x}%`,
            transform: `translateY(${fan[i].y}%) rotate(${fan[i].r}deg)`,
            zIndex: i,
          }}
        >
          <div data-reveal="" style={{ "--d": 150 + i * 90 } as React.CSSProperties}>
            <DocCover
              doc={doc}
              className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-[6%]"
              style={{ transitionDelay: `${i * 40}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
