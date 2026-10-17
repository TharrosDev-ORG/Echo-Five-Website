import { approachPage } from "@/lib/content/approach";
import Arrow from "@/components/ui/Arrow";

/**
 * The page's contents, set beside the hero the way a briefing opens with its
 * sections: ruled rows of jump links. Plain anchors, so they work without JS.
 */
export default function Contents() {
  return (
    <nav aria-labelledby="approach-contents-label">
      <p id="approach-contents-label" className="label text-fg-3">
        {approachPage.contentsLabel}
      </p>
      <ol className="mt-4 border-t border-fg">
        {approachPage.contents.map((item) => (
          <li key={item.href} className="border-b border-rule">
            <a
              href={item.href}
              className="group relative flex min-h-11 items-center gap-5 py-4 text-[0.9375rem] font-medium text-fg min-[1200px]:py-5"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <span className="label w-6 text-accent" aria-hidden="true">
                {item.n}
              </span>
              <span className="flex-1 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 motion-reduce:transition-none">
                {item.label}
              </span>
              <Arrow dir="down" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
