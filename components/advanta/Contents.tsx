import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";

/**
 * "What's inside": the six parts of the toolkit as an editorial list. The
 * heading holds its place on wide screens while the rows scroll past.
 */
export default function Contents() {
  return (
    <section aria-labelledby="advanta-contents-heading" className="tone-paper band">
      <div className="wrap grid-12 gap-y-14">
        <div className="col-span-12 min-[1200px]:col-span-5">
          <div className="min-[1200px]:sticky min-[1200px]:top-32">
            <Index n="02">{advanta.page.contentsIndex}</Index>
            <Lines
              as="h2"
              id="advanta-contents-heading"
              className="serif mt-8 text-h2"
              lines={[advanta.contentsHeading]}
            />
            <p className="mt-8 max-w-[30rem] text-lead text-fg-2" data-reveal="">
              {advanta.page.contentsLead}
            </p>
          </div>
        </div>

        <ol className="col-span-12 border-t border-fg min-[1200px]:col-span-7 min-[1200px]:col-start-6">
          {advanta.contents.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-9 min-[900px]:grid-cols-[3.5rem_minmax(0,1.15fr)_minmax(0,1fr)] min-[900px]:gap-x-8 min-[900px]:py-11"
              data-reveal=""
              style={{ "--d": i * 60 } as React.CSSProperties}
            >
              <span className="label pt-2 text-accent" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="serif text-h3">{item.title.replace(/-/g, "-\u2060")}</h3>
              <p className="col-start-2 mt-3 text-fg-2 min-[900px]:col-start-3 min-[900px]:mt-1">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
