import type { LegalDoc, LegalHeading } from "@/lib/content/legal";
import { legalUi } from "@/lib/content/legal";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import Exhibit from "@/components/ui/Exhibit";
import Mark from "@/components/ui/Mark";
import Rich from "@/components/legal/Rich";
import Toc from "@/components/legal/Toc";

type Props = {
  index: string;
  heading: LegalHeading;
  lead: string;
  doc: LegalDoc;
};

/**
 * The long-form statement layout shared by Privacy and Accessibility: the
 * page hero, an "at a glance" exhibit, numbered sections with serif heads,
 * and a table of contents that stays beside the text from 1200px.
 */
export default function LegalPage({ index, heading, lead, doc }: Props) {
  const { last } = heading;
  const lines = [
    ...heading.lines,
    <>
      {last.before && <>{last.before} </>}
      <Mark>{last.mark}</Mark>
      {last.after && <> {last.after}</>}
    </>,
  ];
  const toc = doc.sections.map(({ id, title }) => ({ id, title }));

  return (
    <>
      <PageHero index={index} heading={lines} lead={lead}>
        <p className="label text-fg-3">
          {legalUi.updatedLabel}{" "}
          <time dateTime={doc.updated.iso} className="text-fg">
            {doc.updated.label}
          </time>
        </p>
      </PageHero>

      <div className="tone-paper pb-[clamp(5rem,3rem+7vw,11rem)]">
        <div className="wrap">
          {/* Small screens: summary, contents, text. From 1200px the contents
              move to a sticky column on the left. */}
          <article className="grid gap-14 min-[1200px]:grid-cols-[minmax(0,15rem)_minmax(0,42rem)] min-[1200px]:gap-x-[clamp(4rem,8vw,9rem)] min-[1200px]:gap-y-0">
            <div className="order-1 min-w-0 min-[1200px]:col-start-2 min-[1200px]:row-start-1">
              <Exhibit n="01" title={doc.glance.title} note={doc.glance.note}>
                <dl className="border-t border-rule">
                  {doc.glance.rows.map((row) => (
                    <div
                      key={row.term}
                      className="grid gap-1 border-b border-rule py-4 min-[640px]:grid-cols-[11rem_minmax(0,1fr)] min-[640px]:gap-6"
                    >
                      <dt className="label pt-[0.2rem] text-fg-3">{row.term}</dt>
                      <dd className="text-body text-fg">
                        {row.value.includes("@") ? (
                          <a href={`mailto:${row.value}`} className="link">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Exhibit>
            </div>

            <aside className="order-2 min-[1200px]:col-start-1 min-[1200px]:row-span-2 min-[1200px]:row-start-1">
              <div className="min-[1200px]:sticky min-[1200px]:top-28">
                <Toc items={toc} label={legalUi.tocLabel} />
              </div>
            </aside>

            <div className="order-3 min-w-0 min-[1200px]:col-start-2 min-[1200px]:row-start-2">
              {doc.sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="mt-16 scroll-mt-28 border-t border-fg pt-6 first:mt-0 min-[900px]:mt-20 min-[1200px]:first:mt-20"
                >
                  <p aria-hidden="true" className="label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`${section.id}-heading`} className="serif mt-5 text-h3 text-fg">
                    {section.title}
                  </h2>
                  <div className="mt-6 space-y-5 text-body text-fg-2">
                    {section.blocks.map((block, j) =>
                      block.kind === "p" ? (
                        <p key={j}>
                          <Rich text={block.text} />
                        </p>
                      ) : (
                        <ul key={j} className="border-t border-rule">
                          {block.items.map((item, k) => (
                            <li
                              key={k}
                              className="relative border-b border-rule py-4 pl-7"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute left-0 top-[1.55rem] h-px w-3.5 bg-accent"
                              />
                              {typeof item === "object" && "term" in item ? (
                                <>
                                  <span className="font-medium text-fg">{item.term}</span>{" "}
                                  <Rich text={item.text} />
                                </>
                              ) : (
                                <Rich text={item} />
                              )}
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </section>
              ))}

              <p className="label mt-16 border-t border-rule pt-4 text-fg-3">
                {legalUi.updatedLabel}{" "}
                <time dateTime={doc.updated.iso}>{doc.updated.label}</time>
              </p>
            </div>
          </article>
        </div>
      </div>

      <Closing />
    </>
  );
}
