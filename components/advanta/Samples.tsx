import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Arrow from "@/components/ui/Arrow";
import { DocCover } from "@/components/exhibits/DocStack";

const meta = advanta.page.sampleMeta;

/**
 * The six free samples as document covers on a shelf. The cover shows the
 * title, format, and phase, so below it sits only the link and what the
 * cover does not say (the detail, when there is one). One link per card: it
 * stretches over the whole card, so the cover is a target too. Covers share
 * one width and ratio, so the links line up across each row.
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

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 min-[640px]:grid-cols-3 min-[900px]:mt-24 min-[900px]:gap-x-8 min-[1200px]:grid-cols-6 min-[1200px]:gap-x-6">
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

              {/* The cover is decorative; this is its text for screen readers. */}
              <h3 className="sr-only">{doc.title}</h3>
              <div className="mt-5">
                <a
                  href={advanta.urls.samples}
                  rel="noopener"
                  className="label inline-flex items-center gap-1.5 rounded-[3px] bg-mark px-2 py-1 text-mark-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[0.5rem] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
                >
                  <span className="sr-only">{doc.title}: </span>
                  {advanta.page.sampleLinkLabel}
                  <span className="sr-only"> {advanta.page.sampleLinkSr}</span>
                  <Arrow dir="up-right" />
                </a>
              </div>
              <dl className="mt-3 text-[0.875rem] leading-snug">
                <div className="sr-only">
                  <dt>{meta.format}</dt>
                  <dd>{doc.format}</dd>
                  <dt>{meta.phase}</dt>
                  <dd>{doc.phase}</dd>
                </div>
                {doc.detail && (
                  <div>
                    <dt className="sr-only">{meta.detail}</dt>
                    <dd className="text-fg-2">{doc.detail.replace(/-/g, "-\u2060")}</dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
