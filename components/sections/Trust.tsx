import { clients } from "@/lib/content";
import SkewMarquee from "@/components/fx/SkewMarquee";

/**
 * Trust strip: three derived counts over a giant outlined roster marquee that
 * leans with scroll velocity. Counts are computed from the roster so they never
 * drift from the data; the marquee is decorative (the real roster is §04).
 */
export default function Trust() {
  const all = clients.groups.flatMap((g) => g.orgs);
  const govCount = clients.groups[0].orgs.length;
  const totalCount = all.length;

  const stats = [
    { value: "20+", label: "Years in practice" },
    { value: `${govCount}`, label: "Federal departments" },
    { value: `${totalCount}+`, label: "Organizations served" },
  ];

  // A curated slice keeps the giant marquee legible; duplicate for the -50% loop.
  const marks = all.map((o) => o.short);
  const ticker = [...marks, ...marks];

  return (
    <section className="rule-top rule-bottom band-2 overflow-hidden" aria-label="Trusted organizations">
      <div className="u-container pt-14">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6" data-reveal-group>
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {stats.map((s) => (
              <div key={s.label} data-reveal>
                <div
                  className="font-display"
                  style={{ fontWeight: 740, fontSize: "clamp(1.8rem,4vw,2.8rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </div>
                <div className="t-coord mt-2" style={{ letterSpacing: "0.12em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p data-reveal className="t-coord" style={{ letterSpacing: "0.14em" }}>
            Selected clients, two decades
          </p>
        </div>
      </div>

      <SkewMarquee className="mt-10 pb-12" duration="90s">
        {ticker.map((short, i) => (
          <span
            key={`${short}-${i}`}
            className="marquee-giant"
            aria-hidden={i >= marks.length ? "true" : undefined}
          >
            {i % 4 === 1 ? <span className="mg-solid">{short}</span> : short}
            <span className="mg-sep">/</span>
          </span>
        ))}
      </SkewMarquee>
    </section>
  );
}
