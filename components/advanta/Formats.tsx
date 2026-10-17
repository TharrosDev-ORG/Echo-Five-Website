import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";

/** The four file formats, each drawn as a file with a folded corner. */
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

        <ul className="col-span-12 grid grid-cols-2 gap-3 min-[640px]:grid-cols-4 min-[640px]:gap-4 min-[1200px]:col-span-8">
          {advanta.formats.map((f, i) => (
            <li key={f} data-reveal="" style={{ "--d": i * 90 } as React.CSSProperties}>
              <div className="relative flex aspect-[4/3] flex-col min-[640px]:aspect-[4/5] justify-between overflow-hidden rounded-[0.5rem] bg-surface p-5 [clip-path:polygon(0_0,calc(100%-2.25rem)_0,100%_2.25rem,100%_100%,0_100%)] min-[900px]:p-6">
                {/* Folded corner */}
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-9 w-9 rounded-bl-[0.375rem] bg-surface-2 shadow-[-1px_1px_0_var(--rule)]"
                />
                <span className="serif tabular text-[clamp(2.25rem,1.5rem+1.9vw,3.5rem)] leading-none tracking-[-0.03em] text-fg">
                  {f}
                </span>
                <span className="label text-fg-3">{advanta.page.formatKinds[f]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
