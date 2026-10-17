import Link from "next/link";
import { services } from "@/lib/content/services";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import Arrow from "@/components/ui/Arrow";

/**
 * The six services as an index: big serif rows that open a blue rule and
 * slide their arrow on hover. Each row links to its section on /services.
 */
export default function ServicesIndex() {
  return (
    <section aria-labelledby="services-heading" className="tone-paper band">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="03">{services.index}</Index>
            <Lines as="h2" id="services-heading" className="serif mt-8 text-h2" lines={[services.heading]} />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="text-lead text-fg-2" data-reveal="">
              {services.intro}
            </p>
          </div>
        </div>

        <ul className="mt-16 border-t border-fg min-[900px]:mt-24">
          {services.items.map((s, i) => (
            <li key={s.slug} className="border-b border-rule" data-reveal="" style={{ "--d": i * 60 } as React.CSSProperties}>
              <Link
                href={`/services#${s.slug}`}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-7 min-[900px]:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1fr)_3rem] min-[900px]:gap-x-8 min-[900px]:py-10"
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                <span className="label text-fg-3" aria-hidden="true">
                  {s.n}
                </span>
                <span className="serif text-h3 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  {s.title}
                </span>
                <span className="col-start-2 mt-3 text-fg-2 min-[900px]:col-start-3 min-[900px]:mt-0">
                  {s.short}
                </span>
                <span className="col-start-3 row-start-1 flex justify-end text-fg min-[900px]:col-start-4">
                  <Arrow className="h-6 w-6" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <ul className="label flex flex-wrap gap-x-5 gap-y-2 text-fg-3" aria-label={services.platformsLabel}>
            {services.platforms.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Button href="/services" variant="secondary">
            {services.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
