import { services } from "@/lib/content";
import { ArrowRight } from "@/components/ui/icons";

/** In-page links to each service section; sits in the hero's visual column. */
export default function ServiceJumpNav() {
  return (
    <nav aria-labelledby="service-jump-label" className="card card-panel">
      <p id="service-jump-label" className="text-small font-medium text-fg-2">
        {services.jumpLabel}
      </p>
      <ol className="mt-2 divide-y divide-edge">
        {services.items.map((item) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              className="group flex min-h-12 items-center gap-3 py-2.5 font-medium text-fg no-underline transition-colors duration-150 hover:text-accent"
            >
              <span aria-hidden="true" className="w-6 shrink-0 font-display text-small text-fg-3 tabular-nums">
                {item.n}
              </span>
              <span className="min-w-0 flex-1">{item.title}</span>
              <ArrowRight
                size={16}
                className="shrink-0 rotate-90 text-fg-3 transition-transform duration-150 group-hover:translate-y-0.5 group-hover:text-accent"
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
