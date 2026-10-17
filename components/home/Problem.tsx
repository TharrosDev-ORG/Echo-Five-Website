import { why } from "@/lib/content/approach";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Mark from "@/components/ui/Mark";

/** Why rollouts stall: a night band with the argument, the pull line, and three failure points. */
export default function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="tone-night grain band relative">
      <div className="wrap">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 min-[1200px]:col-span-5">
            <Index n="02">{why.index}</Index>
            <Lines
              as="h2"
              id="problem-heading"
              className="serif mt-8 text-h2 max-w-[14ch]"
              lines={["Why Microsoft 365", "rollouts stall"]}
            />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-6 min-[1200px]:col-start-7">
            <p className="text-lead text-fg-2" data-reveal="">
              {why.body}
            </p>
            <p className="serif mt-10 text-h3 text-fg" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
              The technology was never the hard part. <Mark>Getting thousands of people to work differently is.</Mark>
            </p>
          </div>
        </div>

        <ol className="mt-20 grid border-t border-rule min-[900px]:mt-28 min-[900px]:grid-cols-3">
          {why.failures.map((f, i) => (
            <li
              key={f.n}
              className="border-b border-rule py-10 min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:px-8 min-[900px]:first:pl-0 min-[900px]:last:border-r-0 min-[900px]:last:pr-0"
              data-reveal=""
              style={{ "--d": i * 120 } as React.CSSProperties}
            >
              <p className="label text-accent" aria-hidden="true">
                {f.n}
              </p>
              <h3 className="serif mt-6 text-h4 text-fg min-[900px]:text-[1.625rem] min-[900px]:leading-[1.15]">
                {f.title}
              </h3>
              <p className="mt-4 text-fg-2">{f.body}</p>
            </li>
          ))}
        </ol>

        <p className="label mt-14 text-fg-2" data-reveal="">
          <span className="text-accent">→</span> {why.close}
        </p>
      </div>
    </section>
  );
}
