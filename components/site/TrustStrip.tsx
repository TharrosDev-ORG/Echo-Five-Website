import StatCounter from "@/components/site/StatCounter";
import { clients } from "@/lib/content";

const orgs = clients.groups.flatMap((g) => g.orgs);
const orgCount = orgs.length;

export default function TrustStrip() {
  // Duplicated track for a seamless -50% marquee loop.
  const track = [...orgs, ...orgs];

  return (
    <section aria-label="Trusted across government and enterprise" className="rule-top bg-bg-raised">
      <div className="u-container pad-block-lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <p className="t-coord text-ink-muted">{clients.kicker}</p>
            <div
              className="marquee relative mt-7 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
              }}
            >
              <ul className="marquee-track items-center gap-10" aria-hidden="true">
                {track.map((o, i) => (
                  <li
                    key={`${o.short}-${i}`}
                    className="whitespace-nowrap font-mono text-sm tracking-[0.04em] text-ink-soft"
                  >
                    {o.short}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            <StatCounter value={20} suffix="+" label="Years" />
            <StatCounter value={orgCount} suffix="+" label="Organizations" />
            <StatCounter value={clients.groups.length} label="Sectors" />
          </div>
        </div>
      </div>
    </section>
  );
}
