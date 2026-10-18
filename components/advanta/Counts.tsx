import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";

/**
 * The toolkit's counts as giant numerals on night. Each numeral sits over
 * its label and a one-line note on what the number covers.
 */
export default function Counts() {
  return (
    <section aria-labelledby="advanta-counts-heading" className="tone-night grain band">
      <div className="wrap">
        <Index n="01">{advanta.page.countsIndex}</Index>
        <Lines
          as="h2"
          id="advanta-counts-heading"
          className="serif mt-8 max-w-[18ch] text-h2"
          lines={[advanta.page.countsHeading]}
        />

        <dl className="mt-16 grid grid-cols-2 border-t border-rule min-[1200px]:mt-24 min-[1200px]:grid-cols-4">
          {advanta.counts.map((c, i) => (
            <div
              key={c.label}
              className="flex flex-col-reverse justify-end gap-6 border-b border-rule py-8 odd:border-r odd:pr-4 even:pl-4 min-[640px]:gap-8 min-[640px]:py-10 min-[640px]:odd:pr-8 min-[640px]:even:pl-8 min-[1200px]:border-b-0 min-[1200px]:border-r min-[1200px]:px-8 min-[1200px]:py-12 min-[1200px]:first:pl-0 min-[1200px]:last:border-r-0"
              data-reveal=""
              style={{ "--d": i * 110 } as React.CSSProperties}
            >
              <dt>
                <span className="block font-medium leading-snug text-fg">{c.label}</span>
                <span className="mt-1.5 block max-w-[24ch] text-[0.875rem] leading-normal text-fg-3 min-[640px]:text-[0.9375rem]">
                  {advanta.page.countNotes[i]}
                </span>
              </dt>
              <dd className="serif tabular text-[clamp(4.25rem,2.4rem+7.6vw,11rem)] leading-[0.82] tracking-[-0.045em] text-fg">
                {c.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
