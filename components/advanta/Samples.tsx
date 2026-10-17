import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Arrow from "@/components/ui/Arrow";
import { DocCover } from "@/components/exhibits/DocStack";

const meta = advanta.page.sampleMeta;

/**
 * The six free samples as document covers on a shelf. One link per card:
 * the title's link stretches over the whole card, so the cover is a target
 * too without a second link.
 */
export default function Samples() {
  return (
    <section aria-labelledby="advanta-samples-heading" className="tone-mist band">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="05">{advanta.page.samplesIndex}</Index>
            <Lines
              as="h2"
              id="advanta-samples-heading"
              className="serif mt-8 max-w-[14ch] text-h2"
              lines={[advanta.freeSamplesHeading]}
            />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="text-lead text-fg-2" data-reveal="">
              {advanta.freeSamplesIntro}
            </p>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 min-[900px]:mt-24 min-[900px]:grid-cols-3 min-[900px]:gap-x-8 min-[1200px]:grid-cols-6 min-[1200px]:gap-x-6">
          {advanta.freeSamples.map((doc, i) => (
            <li
              key={doc.title}
              className="group relative flex flex-col"
              data-reveal=""
              style={{ "--d": i * 80 } as React.CSSProperties}
            >
              <div
                aria-hidden="true"
                className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-focus-within:-translate-y-2 motion-reduce:transition-none"
              >
                <DocCover doc={doc} />
              </div>

              <div className="mt-5 flex flex-1 flex-col border-t border-fg pt-4">
                <h3 className="text-[0.9375rem] font-medium leading-snug text-fg min-[900px]:text-[1.0625rem]">
                  <a
                    href={advanta.urls.samples}
                    rel="noopener"
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[0.5rem] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px]">
                      {doc.title}
                    </span>
                    <span className="sr-only">. {advanta.page.sampleLinkSr}</span>
                  </a>
                </h3>
                <dl className="mt-3 grid gap-1 text-[0.875rem] leading-snug">
                  <dt className="sr-only">{meta.format}</dt>
                  <dd className="label text-fg">{doc.format}</dd>
                  <dt className="sr-only">{meta.phase}</dt>
                  <dd className="text-fg-2">{doc.phase}</dd>
                  {doc.detail && (
                    <>
                      <dt className="sr-only">{meta.detail}</dt>
                      <dd className="text-fg-3">{doc.detail.replace(/-/g, "-\u2060")}</dd>
                    </>
                  )}
                </dl>
                <span aria-hidden="true" className="mt-auto pt-4 text-fg-3 transition-colors group-hover:text-accent">
                  <Arrow dir="up-right" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
