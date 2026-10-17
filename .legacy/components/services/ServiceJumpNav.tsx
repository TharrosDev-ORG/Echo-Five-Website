import { services } from "@/lib/content";

/**
 * In-page links to each service section: a plain numbered list. From lg it
 * holds still beside the six sections while they scroll past.
 */
export default function ServiceJumpNav() {
  return (
    <nav
      aria-labelledby="service-jump-label"
      className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
    >
      <p id="service-jump-label" className="text-label font-semibold text-fg-2">
        {services.jumpLabel}
      </p>
      <ol className="mt-3 border-t border-edge">
        {services.items.map((item) => (
          <li key={item.slug} className="border-b border-edge">
            <a
              href={`#${item.slug}`}
              className="group flex min-h-12 items-baseline gap-4 py-3 font-medium text-fg no-underline transition-colors duration-200 hover:text-accent"
            >
              <span aria-hidden="true" className="w-6 shrink-0 text-label tabular-nums text-fg-3">
                {item.n}
              </span>
              <span className="min-w-0 flex-1">{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
