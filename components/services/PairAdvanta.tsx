import { services } from "@/lib/content/services";
import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import { DocCover } from "@/components/exhibits/DocStack";

const copy = services.pairWithAdvanta;
const name = advanta.name;

/** Three of the free samples, one for strategy, communications, and training. */
const picks = ["Set the strategy", "Plan communications", "Build the training"]
  .map((phase) => advanta.freeSamples.find((d) => d.phase === phase))
  .filter((d): d is (typeof advanta.freeSamples)[number] => Boolean(d));

const lay = [
  { r: -5, y: 9 },
  { r: 0, y: 0 },
  { r: 5, y: 9 },
];

/** Night band: the firm's own toolkit, offered alongside the services. */
export default function PairAdvanta() {
  return (
    <section aria-labelledby="pair-heading" className="tone-night grain band overflow-hidden">
      <div className="wrap">
        <div className="grid items-center gap-16 min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[1200px]:gap-20">
          <div>
            <Index n="04">{copy.index}</Index>
            <p className="label mt-8 text-fg-3" data-reveal="fade">
              <span className="font-medium text-fg">{name}</span> · {advanta.byline}
            </p>
            <Lines
              as="h2"
              id="pair-heading"
              className="serif mt-4 text-h2"
              lines={[copy.heading]}
            />
            <p className="mt-8 max-w-[34rem] text-lead text-fg-2" data-reveal="">
              {copy.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-3" data-reveal="" style={{ "--d": 100 } as React.CSSProperties}>
              <Button href="/advanta365">{copy.cta}</Button>
              <Button href={advanta.urls.samples} variant="secondary">
                {advanta.cta.samples}
              </Button>
            </div>
          </div>

          <div aria-hidden="true" className="relative mx-auto flex w-full max-w-[38rem] justify-center px-2 py-6 min-[640px]:gap-5">
            {picks.map((doc, i) => (
              <div
                key={doc.title}
                className={i > 0 ? "w-[46%] shrink-0 -ml-[19%] min-[640px]:ml-0 min-[640px]:w-auto min-[640px]:flex-1" : "w-[46%] shrink-0 min-[640px]:w-auto min-[640px]:flex-1"}
                data-reveal=""
                style={{ "--d": 150 + i * 110 } as React.CSSProperties}
              >
                <div style={{ transform: `translateY(${lay[i].y}%) rotate(${lay[i].r}deg)` }}>
                  <DocCover doc={doc} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
