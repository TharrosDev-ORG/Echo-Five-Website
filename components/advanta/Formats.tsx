import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";

/** Which of the free samples come in each format, derived from the samples list. */
const samplesIn = (format: string) => advanta.freeSamples.filter((s) => s.format === format);

/**
 * The four file formats, each drawn as a file with a folded corner, listing
 * the free samples that come in it.
 */
export default function Formats() {
  return (
    <section aria-labelledby="advanta-formats-heading" className="tone-paper band-tight">
      <div className="wrap grid-12 gap-y-12 min-[1200px]:items-end">
        <div className="col-span-12 min-[1200px]:col-span-4">
          <Index n="04">{advanta.page.formatsIndex}</Index>
          <Lines
            as="h2"
            id="advanta-formats-heading"
            className="serif mt-8 max-w-[12ch] text-h2"
            lines={[advanta.formatsHeading]}
          />
          <p className="mt-8 max-w-[26rem] text-fg-2" data-reveal="">
            {advanta.page.formatsLead}
          </p>
        </div>

        <ul className="col-span-12 grid gap-3 min-[640px]:grid-cols-2 min-[640px]:gap-4 min-[900px]:grid-cols-4 min-[1200px]:col-span-8">
          {advanta.formats.map((f, i) => {
            const samples = samplesIn(f);
            return (
              <li key={f} className="flex" data-reveal="" style={{ "--d": i * 90 } as React.CSSProperties}>
                <div className="relative flex w-full flex-col gap-x-5 overflow-hidden max-[639px]:flex-row rounded-[0.5rem] bg-surface p-5 [clip-path:polygon(0_0,calc(100%-2.25rem)_0,100%_2.25rem,100%_100%,0_100%)] min-[900px]:p-6">
                  {/* Folded corner */}
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-0 h-9 w-9 rounded-bl-[0.375rem] bg-surface-2 shadow-[-1px_1px_0_var(--rule)]"
                  />
                  <div className="flex flex-col max-[639px]:w-[7.5rem] max-[639px]:shrink-0">
                    <span className="serif tabular text-[clamp(2rem,1.5rem+1.4vw,3rem)] leading-none tracking-[-0.03em] text-fg">
                      {f}
                    </span>
                    <span className="label mt-3 text-fg-3">{advanta.page.formatKinds[f]}</span>
                  </div>

                  {samples.length > 0 && (
                    <div className="mt-8 border-t border-rule-strong pt-4 max-[639px]:mt-0 max-[639px]:flex-1 max-[639px]:border-l max-[639px]:border-t-0 max-[639px]:pl-5 max-[639px]:pt-0">
                      <p className="label text-fg-3">{advanta.page.formatSamplesLabel}</p>
                      <ul className="mt-2 grid gap-1.5 text-[0.875rem] leading-snug text-fg">
                        {samples.map((s) => (
                          <li key={s.title}>{s.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
