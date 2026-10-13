import { services } from "@/lib/content";
import { cx } from "@/lib/cx";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";

/**
 * The six services in full. Each row is an anchor target for the jump links.
 * From lg a narrow rail (number, icon, tag) sits beside the text, and the
 * rows step left and right by two columns to keep the alternating rhythm.
 */
export default function ServiceDetails() {
  return (
    <ol className="mt-10 divide-y divide-edge border-y border-edge md:mt-14">
      {services.items.map((item, i) => {
        const shifted = i % 2 === 1;
        return (
          <li key={item.slug} id={item.slug}>
            <Reveal
              as="article"
              className="grid gap-5 py-10 md:py-12 lg:grid-cols-12 lg:items-start lg:gap-x-12"
            >
              <div
                className={cx(
                  "flex items-center gap-3 lg:col-span-3 lg:flex-col lg:items-start lg:gap-4",
                  shifted && "lg:col-start-3",
                )}
              >
                {/* Decoration only: the ordered list already conveys the sequence. */}
                <span
                  aria-hidden="true"
                  className="hidden font-display text-h1 leading-none text-accent tabular-nums lg:block"
                >
                  {item.n}
                </span>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-control bg-accent/12 text-accent">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <Badge tone="accent">{item.tag}</Badge>
                </div>
              </div>

              <div className="min-w-0 lg:col-span-7">
                <h3 className="text-h2 text-fg">{item.title}</h3>
                <p className="mt-4 max-w-[60ch] text-lead text-fg-2">{item.body}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
