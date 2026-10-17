import { clients, clientCount } from "@/lib/content/shared";
import { clientsSection as copy } from "@/lib/content/about";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import { cx } from "@/lib/cx";

/**
 * The full client roster as a typographic index: each sector a ruled group,
 * each client its short form in the serif over the full name. The count is
 * computed from the list, so it cannot drift. `#clients` is linked from home.
 */
export default function ClientIndex() {
  return (
    <section id="clients" aria-labelledby="clients-heading" className="tone-paper band">
      <div className="wrap">
        <div className="grid-12 gap-y-12 min-[1200px]:items-end">
          <div className="col-span-12 min-[1200px]:col-span-7">
            <Index n="04">{copy.index}</Index>
            <Lines as="h2" id="clients-heading" className="serif mt-8 text-h2" lines={[copy.heading]} />
            <p className="mt-8 max-w-[36rem] text-lead text-fg-2" data-reveal="">
              {clients.intro}
            </p>
          </div>
          <div className="col-span-12 min-[1200px]:col-span-4 min-[1200px]:col-start-9" data-reveal="">
            <p className="flex flex-col gap-5 border-t border-rule pt-6 min-[1200px]:items-end min-[1200px]:border-t-0 min-[1200px]:pt-0 min-[1200px]:text-right">
              <span
                aria-hidden="true"
                className="serif pr-[0.06em] text-[clamp(7rem,4.5rem+9vw,13rem)] leading-[0.8] tracking-[-0.05em] text-fg"
              >
                {clientCount}
              </span>
              <span className="label max-w-[18rem] text-fg-3">
                <span className="sr-only">{clientCount} </span>
                {copy.countLabel}. {copy.countNote}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-20 min-[900px]:mt-28">
          {clients.groups.map((group, gi) => (
            <div
              key={group.label}
              className={cx("grid-12 gap-y-6 border-t border-fg pt-6", gi > 0 && "mt-16 min-[900px]:mt-20")}
            >
              <div className="col-span-12 min-[900px]:col-span-3">
                <h3 className="text-h4 font-medium text-fg">{group.label}</h3>
                <p className="label mt-2 text-fg-3">
                  {group.orgs.length} {copy.groupSuffix}
                </p>
              </div>
              <ul className="col-span-12 grid grid-cols-2 gap-x-5 min-[640px]:gap-x-8 min-[900px]:col-span-9 min-[1200px]:grid-cols-3">
                {group.orgs.map((o, i) => (
                  <li
                    key={o.short}
                    className="flex flex-col gap-2 border-b border-rule py-5 min-[640px]:min-h-[6.5rem] min-[640px]:justify-between"
                    data-reveal=""
                    style={{ "--d": i * 40 } as React.CSSProperties}
                  >
                    <span className="serif text-[1.625rem] leading-none tracking-[-0.02em] text-fg min-[640px]:text-[2rem] min-[900px]:text-[2.375rem]">
                      {o.short}
                    </span>
                    {o.short !== o.name ? (
                      <span className="text-small text-fg-3">{o.name}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
