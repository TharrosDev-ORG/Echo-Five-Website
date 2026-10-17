import { services, type Service } from "@/lib/content/services";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import SpanTrack from "@/components/services/SpanTrack";

const total = String(services.items.length).padStart(2, "0");

/**
 * One service: a giant numeral that holds still (CSS sticky, from 1200px)
 * while the title, body, and deliverables scroll past it.
 */
function ServiceSection({ s }: { s: Service }) {
  const titleId = `${s.slug}-title`;
  return (
    <section id={s.slug} aria-labelledby={titleId} className="border-t border-fg">
      <div className="label flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3 text-fg-3">
        <p>
          <span className="text-accent">{s.n}</span> / {total}
        </p>
        <p className="text-fg">{s.tag}</p>
      </div>

      <div className="grid-12 gap-y-8 pb-20 pt-8 min-[900px]:pb-28 min-[900px]:pt-12">
        <div className="col-span-12 min-[1200px]:col-span-5">
          <div className="min-[1200px]:sticky min-[1200px]:top-28">
            <p
              aria-hidden="true"
              className="serif tabular text-[clamp(6rem,2.5rem+11vw,14.5rem)] leading-[0.8] tracking-[-0.055em] text-fg"
              data-reveal="fade"
            >
              {s.n}
            </p>
            <SpanTrack slug={s.slug} className="mt-12 hidden max-w-[26rem] min-[1200px]:block" />
          </div>
        </div>

        <div className="col-span-12 min-[1200px]:col-span-6 min-[1200px]:col-start-7">
          <Lines as="h2" id={titleId} className="serif max-w-[18ch] text-h2" lines={[s.title]} />
          <p className="mt-8 max-w-[38rem] text-lead text-fg-2" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
            {s.body}
          </p>

          <SpanTrack slug={s.slug} className="mt-10 max-w-[26rem] min-[1200px]:hidden" />

          <h3 className="label mt-14 text-fg-3 min-[900px]:mt-16">{services.deliverablesLabel}</h3>
          <ol className="mt-4 border-t border-fg">
            {s.deliverables.map((d, i) => (
              <li
                key={d}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline border-b border-rule py-5 min-[900px]:py-6"
                data-reveal=""
                style={{ "--d": 160 + i * 90 } as React.CSSProperties}
              >
                <span aria-hidden="true" className="label text-fg-3">
                  {s.n}.{i + 1}
                </span>
                <span className="serif text-h4 text-fg min-[900px]:text-[1.625rem] min-[900px]:leading-[1.2]">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** The six services in full, each its own section with an anchor id (its slug). */
export default function ServiceSequence() {
  return (
    <div className="tone-paper pt-[clamp(5rem,3rem+7vw,11rem)]">
      <div className="wrap">
        <Index n="02" className="mb-10 min-[900px]:mb-14">
          {services.sequenceIndex}
        </Index>
        {services.items.map((s) => (
          <ServiceSection key={s.slug} s={s} />
        ))}
      </div>
    </div>
  );
}
