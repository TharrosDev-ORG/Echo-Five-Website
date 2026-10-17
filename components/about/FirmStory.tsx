import { firm } from "@/lib/content/about";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";

/**
 * The firm as an editorial spread: the statement on the left, the story on
 * the right with a serif initial, and a fact sheet that restates it for
 * scanning.
 */
export default function FirmStory() {
  const [first, ...rest] = firm.body;

  return (
    <section id="firm" aria-labelledby="firm-heading" className="tone-mist band">
      <div className="wrap">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="01">{firm.index}</Index>
            <Lines as="h2" id="firm-heading" className="serif mt-8 text-h2" lines={firm.heading} />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p
              className="text-lead text-fg"
              data-reveal=""
            >
              {first}
            </p>
            {rest.map((p, i) => (
              <p
                key={p}
                className="mt-6 text-fg-2"
                data-reveal=""
                style={{ "--d": 100 + i * 80 } as React.CSSProperties}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <dl
          aria-label={firm.factsLabel}
          className="mt-20 grid border-t border-fg min-[640px]:grid-cols-2 min-[900px]:mt-28 min-[1200px]:grid-cols-3"
        >
          {firm.facts.map((f, i) => (
            <div
              key={f.term}
              className="border-b border-rule py-7 min-[640px]:pr-10"
              data-reveal=""
              style={{ "--d": i * 70 } as React.CSSProperties}
            >
              <dt className="label text-fg-3">
                <span aria-hidden="true" className="text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {f.term}
              </dt>
              <dd className="serif mt-4 text-[1.5rem] leading-[1.2] tracking-[-0.01em] text-fg min-[900px]:text-[1.75rem]">
                {f.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
