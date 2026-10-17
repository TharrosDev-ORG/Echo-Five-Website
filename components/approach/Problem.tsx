import { why, adoptionGap, approachPage } from "@/lib/content/approach";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Mark from "@/components/ui/Mark";
import Arrow from "@/components/ui/Arrow";
import Exhibit from "@/components/ui/Exhibit";
import AdoptionGap from "@/components/exhibits/AdoptionGap";

const copy = approachPage.problem;

/**
 * Why rollouts stall, on night: the argument, Exhibit 01 drawing the
 * adoption gap, the conclusion under the highlighter, and the three places
 * a rollout breaks as ruled rows. Ends by pointing down to the method.
 */
export default function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="tone-night grain band relative">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="01">{why.index}</Index>
            <Lines
              as="h2"
              id="problem-heading"
              className="serif mt-8 text-h2"
              lines={[...copy.headingLines]}
            />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="max-w-[34rem] text-lead text-fg-2" data-reveal="">
              {copy.lead}
            </p>
          </div>
        </div>

        <Exhibit n="01" title={adoptionGap.title} note={adoptionGap.note} className="mt-20 min-[900px]:mt-28">
          <div className="pt-10">
            <AdoptionGap />
          </div>
        </Exhibit>

        <p
          className="serif mt-20 max-w-[26ch] text-[clamp(1.75rem,1.15rem+2.2vw,3.25rem)] leading-[1.2] tracking-[-0.02em] text-fg min-[900px]:mt-32"
          data-reveal=""
        >
          {copy.pullBefore} <Mark>{copy.pullMark}</Mark>
        </p>

        <div className="mt-20 min-[900px]:mt-28">
          <p className="label text-fg-3" data-reveal="fade">
            {copy.failuresLabel}
          </p>
          <ol className="mt-5 border-t border-fg">
            {why.failures.map((f, i) => (
              <li
                key={f.n}
                className="grid gap-x-8 gap-y-3 border-b border-rule py-8 min-[900px]:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:items-baseline min-[900px]:py-11"
                data-reveal=""
                style={{ "--d": i * 110 } as React.CSSProperties}
              >
                <p className="label text-accent" aria-hidden="true">
                  {f.n}
                </p>
                <h3 className="serif max-w-[24ch] text-h3 text-fg">{f.title}</h3>
                <p className="max-w-[34rem] text-fg-2">{f.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <a
          href={copy.closeHref}
          className="group mt-12 inline-flex min-h-11 items-center gap-3 text-fg min-[900px]:mt-16"
          data-reveal=""
        >
          <span className="label text-fg-2 transition-colors group-hover:text-fg">{why.close}</span>
          <Arrow dir="down" className="text-accent" />
        </a>
      </div>
    </section>
  );
}
