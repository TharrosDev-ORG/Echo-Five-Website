import { cx } from "@/lib/cx";

const SHEET_W = 196;
const SHEET_H = 236;

/** Back to front, so the front sheet is painted last. */
const SHEETS = [
  { label: "PDF", x: 164, y: 26 },
  { label: "XLSX", x: 120, y: 56 },
  { label: "PPTX", x: 76, y: 86 },
  { label: "DOCX", x: 32, y: 116 },
];

/** Placeholder text lines, in the surface's text color at low opacity. */
function Lines({ x, y, rows }: { x: number; y: number; rows: number[] }) {
  return (
    <>
      {rows.map((w, i) => (
        <rect key={i} x={x} y={y + i * 16} width={w} height="5" className="fill-fg" fillOpacity="0.2" />
      ))}
    </>
  );
}

/**
 * Decorative stack of toolkit documents with DOCX, PPTX, XLSX, and PDF tabs,
 * drawn as line art: sheets in the raised surface color (black on dark, white
 * on light) outlined in the accent fill, with text marks in the surface's
 * text color. All colors come from surface tokens.
 */
export default function ToolkitStack({ className }: { className?: string }) {
  const front = SHEETS[SHEETS.length - 1];
  return (
    <svg
      viewBox="0 0 392 372"
      className={cx("block h-auto w-full text-accent-fill", className)}
      aria-hidden="true"
      focusable="false"
    >
      {SHEETS.map((s) => (
        <g key={s.label}>
          <rect
            x={s.x + 14}
            y={s.y - 22}
            width="64"
            height="30"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
            className="fill-raised"
          />
          <text
            x={s.x + 46}
            y={s.y - 7}
            dy="0.35em"
            textAnchor="middle"
            className="fill-fg font-sans text-[12px] font-bold tracking-[0.08em]"
          >
            {s.label}
          </text>
          <rect
            x={s.x}
            y={s.y}
            width={SHEET_W}
            height={SHEET_H}
            rx="8"
            stroke="currentColor"
            strokeWidth="1.5"
            className="fill-raised"
          />
          {s === front ? null : <Lines x={s.x + 22} y={s.y + 26} rows={[110, 150, 132, 150, 96]} />}
        </g>
      ))}

      {/* Front document: a heading, text, and a short checklist. */}
      <g>
        <rect x={front.x + 22} y={front.y + 26} width="118" height="10" className="fill-fg" />
        <Lines x={front.x + 22} y={front.y + 54} rows={[152, 140, 120]} />
        {[0, 1, 2].map((i) => {
          const cy = front.y + 128 + i * 28;
          return (
            <g key={i}>
              <rect x={front.x + 22} y={cy - 9} width="18" height="18" rx="2" fill="currentColor" />
              <path
                d={`M${front.x + 26.5} ${cy} l3.2 3.2 l6 -6.4`}
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-on-accent"
              />
              <rect
                x={front.x + 50}
                y={cy - 2.5}
                width={[112, 94, 104][i]}
                height="5"
                className="fill-fg"
                fillOpacity="0.28"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
