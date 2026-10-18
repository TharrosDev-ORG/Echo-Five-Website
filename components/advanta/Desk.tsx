import { advanta } from "@/lib/content/advanta";
import { cx } from "@/lib/cx";
import { DocCover } from "@/components/exhibits/DocStack";

const byPhase = (phase: string) => advanta.freeSamples.find((d) => d.phase === phase)!;

/** Finished covers laid over the blank page, back to front. */
const sheets = [
  { doc: byPhase("Set the strategy"), x: 33, y: 5, w: 41, r: 4 },
  { doc: byPhase("Engage leaders"), x: 7, y: 39, w: 39, r: -5 },
  { doc: byPhase("Plan communications"), x: 51, y: 41, w: 41, r: 7 },
];

/**
 * The hero figure: a blank page on the desk, buried under finished
 * documents as it comes into view. Decorative; the page text carries
 * every fact shown here.
 */
export default function Desk({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "blueprint relative aspect-[1/1.12] w-full min-[640px]:aspect-[1/1.02] select-none overflow-hidden rounded-[0.75rem] bg-surface ring-1 ring-rule",
        className,
      )}
      data-observe=""
    >
      {/* The blank page */}
      <div
        className="absolute left-[6%] top-[5%] w-[44%] -rotate-[5deg]"
        data-reveal="fade"
        style={{ "--d": 100 } as React.CSSProperties}
      >
        <div className="flex aspect-[3/4] w-full flex-col rounded-[0.5rem] bg-paper p-[8%] text-[#5b6173] shadow-[0_1px_0_rgb(11_13_18/0.05),0_18px_40px_-26px_rgb(11_13_18/0.3)] ring-1 ring-ink/8">
          <span className="label text-[0.625rem]">{advanta.page.deskLabel}</span>
          <span className="mt-[18%] block h-[1.6em] w-[2px] bg-accent" />
          <span className="mt-auto space-y-[9%]">
            {[100, 100, 100, 100, 70].map((w, i) => (
              <span key={i} className="block border-b border-dashed border-[#dadde4]" style={{ width: `${w}%` }} />
            ))}
          </span>
        </div>
      </div>

      {sheets.map((s, i) => (
        <div
          key={s.doc.title}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.w}%`,
            transform: `rotate(${s.r}deg)`,
            zIndex: i + 1,
          }}
        >
          <div data-reveal="" style={{ "--d": 450 + i * 160 } as React.CSSProperties}>
            <DocCover doc={s.doc} />
          </div>
        </div>
      ))}

      {/* Drafting annotations */}
      <span className="label absolute bottom-4 left-5 z-10 text-fg-3">
        {advanta.formats.join(" · ")}
      </span>
      <span className="label absolute right-5 top-4 z-10 hidden text-fg-3 min-[480px]:block">
        {advanta.counts[1].value} templates
      </span>
    </div>
  );
}
