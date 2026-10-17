import { adoptionGap as copy } from "@/lib/content/approach";
import { cx } from "@/lib/cx";

/*
 * Exhibit 01: the adoption gap. Lines are an SVG (scaled to the box); every
 * label is HTML positioned in percentages, so text stays a readable size at
 * any width. Coordinates use a 1200 x 520 frame; `pct` converts them.
 */

const W = 1200;
const H = 520;
const BASE = 440;
const GOLIVE = 480;

const common = "M60 410 C 200 405, 330 300, 480 250";
const withPath = "M480 250 C 560 222, 620 165, 700 145 S 960 105, 1160 92";
const withoutPath = "M480 250 C 540 232, 600 330, 700 352 S 960 378, 1160 382";
const gapArea =
  "M480 250 C 560 222, 620 165, 700 145 S 960 105, 1160 92 L 1160 382 C 960 378, 800 374, 700 352 C 600 330, 540 232, 480 250 Z";

const ticks = [
  { x: 60, label: copy.axis[0] },
  { x: GOLIVE, label: copy.axis[1] },
  { x: 700, label: copy.axis[2] },
  { x: 930, label: copy.axis[3] },
  { x: 1160, label: copy.axis[4] },
];

const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

export default function AdoptionGap({ className }: { className?: string }) {
  return (
    <div className={cx("relative", className)} role="img" aria-label={copy.alt}>
      <div className="relative aspect-[1200/520] w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          {/* Grid */}
          {[140, 240, 340].map((y) => (
            <line key={y} x1="60" x2="1160" y1={y} y2={y} stroke="var(--rule)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <line x1="60" x2="1160" y1={BASE} y2={BASE} stroke="var(--fg)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {ticks.map((t) => (
            <line key={t.x} x1={t.x} x2={t.x} y1={BASE} y2={BASE + 8} stroke="var(--fg)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}

          {/* Go-live marker */}
          <line
            x1={GOLIVE}
            x2={GOLIVE}
            y1="24"
            y2={BASE}
            stroke="var(--fg)"
            strokeWidth="1"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
            data-fade=""
            style={{ "--d": 500 } as React.CSSProperties}
          />

          {/* The gap */}
          <path d={gapArea} fill="var(--mark)" fillOpacity="0.4" data-fade="" style={{ "--d": 2300 } as React.CSSProperties} />

          {/* Lines */}
          <path d={common} fill="none" stroke="var(--fg)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} data-draw="" style={{ "--d": 300 } as React.CSSProperties} />
          <path d={withoutPath} fill="none" stroke="var(--fg-3)" strokeWidth="2" strokeDasharray="0" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} data-draw="" style={{ "--d": 1500 } as React.CSSProperties} />
          <path d={withPath} fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} data-draw="" style={{ "--d": 1500 } as React.CSSProperties} />
        </svg>

        {/* End points */}
        <span aria-hidden="true" data-fade="" style={{ ...pct(1160, 92), "--d": 3200 } as React.CSSProperties} className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-bg" />
        <span aria-hidden="true" data-fade="" style={{ ...pct(1160, 382), "--d": 3200 } as React.CSSProperties} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg-3 ring-4 ring-bg" />
        <span aria-hidden="true" data-fade="" style={{ ...pct(GOLIVE, 250), "--d": 1400 } as React.CSSProperties} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg ring-4 ring-bg" />

        {/* Labels */}
        <div aria-hidden="true" className="label text-fg-3">
          <span className="absolute -translate-y-full whitespace-nowrap pb-1 max-[640px]:hidden" style={pct(60, 24)}>
            {copy.yLabel}
          </span>
          <span
            className="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap bg-bg px-2 text-fg"
            style={pct(GOLIVE, 24)}
            data-fade=""
          >
            {copy.golive}
          </span>
          <span
            className="absolute -translate-x-full -translate-y-[160%] whitespace-nowrap pr-1 font-medium text-accent max-[640px]:hidden"
            style={{ ...pct(1160, 92), "--d": 3000 } as React.CSSProperties}
            data-fade=""
          >
            {copy.with}
          </span>
          <span
            className="absolute -translate-x-full translate-y-[60%] whitespace-nowrap pr-1 max-[640px]:hidden"
            style={{ ...pct(1160, 382), "--d": 3000 } as React.CSSProperties}
            data-fade=""
          >
            {copy.without}
          </span>
          <span
            className="serif absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(0.95rem,0.6rem+1.1vw,1.6rem)] italic text-fg"
            style={{ ...pct(905, 238), "--d": 2600 } as React.CSSProperties}
            data-fade=""
          >
            {copy.gap}
          </span>
        </div>

        {/* Axis */}
        <div aria-hidden="true" className="label text-fg-3">
          {ticks.map((t, i) => (
            <span
              key={t.label}
              className={cx(
                "absolute translate-y-3 whitespace-nowrap",
                i === 0 ? "" : i === ticks.length - 1 ? "-translate-x-full" : "-translate-x-1/2",
                (i === 2 || i === 3) && "max-[640px]:hidden",
                i === 1 && "text-fg",
              )}
              style={pct(t.x, BASE)}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Legend for small screens, where the line labels are hidden. */}
      <ul aria-hidden="true" className="label mt-12 flex flex-wrap gap-x-6 gap-y-2 text-fg-2 min-[641px]:hidden">
        <li className="flex items-center gap-2">
          <span className="h-[3px] w-6 rounded-full bg-accent" />
          {copy.with}
        </li>
        <li className="flex items-center gap-2">
          <span className="h-[2px] w-6 rounded-full bg-fg-3" />
          {copy.without}
        </li>
      </ul>
    </div>
  );
}
