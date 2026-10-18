import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import DocStack from "@/components/exhibits/DocStack";

/** Introduces Advanta365, the firm's product, with its counts and the free samples fanned out. */
export default function AdvantaBand() {
  return (
    <section aria-labelledby="advanta-heading" className="tone-mist band overflow-hidden">
      <div className="wrap">
        <div className="grid gap-16 min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-[1200px]:items-center">
          <div>
            <Index n="06">{advanta.band.index}</Index>
            <p className="label mt-8 text-fg-3" data-reveal="fade">
              <span className="font-medium text-fg">{advanta.name}</span> · {advanta.byline}
            </p>
            <Lines as="h2" id="advanta-heading" className="serif mt-4 text-h2" lines={advanta.band.heading} />
            <p className="mt-8 max-w-[34rem] text-lead text-fg-2" data-reveal="">
              {advanta.band.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-3" data-reveal="" style={{ "--d": 100 } as React.CSSProperties}>
              <Button href="/advanta365">{advanta.cta.explore}</Button>
              <Button href={advanta.urls.samples} variant="secondary">
                {advanta.cta.samples}
              </Button>
            </div>
          </div>
          <DocStack className="mx-auto max-w-[44rem]" />
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t border-fg min-[900px]:mt-28 min-[900px]:grid-cols-4">
          {advanta.counts.map((c, i) => (
            <div
              key={c.label}
              className="flex flex-col-reverse justify-end gap-2 border-b border-rule py-8 pr-4 min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:px-8 min-[900px]:first:pl-0 min-[900px]:last:border-r-0"
              data-reveal=""
              style={{ "--d": i * 90 } as React.CSSProperties}
            >
              <dt className="text-[0.9375rem] text-fg-2">{c.label}</dt>
              <dd className="serif tabular text-[clamp(3rem,2.2rem+3vw,5.5rem)] leading-none tracking-[-0.03em]">
                {c.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
