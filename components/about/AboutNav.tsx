import { aboutNav, aboutNavLabel } from "@/lib/content/about";
import Arrow from "@/components/ui/Arrow";

/**
 * The page's contents, set beside the About hero like the contents of a
 * briefing: ruled rows that jump to each section.
 */
export default function AboutNav() {
  return (
    <nav aria-labelledby="about-contents">
      <p id="about-contents" className="label mb-4 text-fg-3">
        {aboutNavLabel}
      </p>
      <ol className="border-t border-fg">
        {aboutNav.map((item) => (
          <li key={item.href} className="border-b border-rule">
            <a
              href={item.href}
              className="group relative flex min-h-11 items-center justify-between gap-4 py-4 text-fg"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
              <span className="flex items-baseline gap-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                <span aria-hidden="true" className="label text-accent">
                  {item.n}
                </span>
                <span className="serif text-h4">{item.label}</span>
              </span>
              <Arrow dir="down" className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
