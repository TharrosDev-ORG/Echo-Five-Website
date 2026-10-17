import { services } from "@/lib/content/services";
import Arrow from "@/components/ui/Arrow";

/**
 * In-page links to the six services, set under the page hero. Plain anchors
 * (`#strategy` and so on), so they work without JavaScript; the home page
 * links to the same ids.
 */
export default function JumpNav() {
  return (
    <nav aria-labelledby="jump-label" className="mt-6 min-[900px]:mt-10">
      <p id="jump-label" className="label text-fg-3">
        {services.jumpLabel}
      </p>
      <ol className="mt-4 grid border-t border-fg min-[640px]:grid-cols-2 min-[640px]:gap-x-8 min-[1200px]:grid-cols-3 min-[1200px]:gap-x-10">
        {services.items.map((s) => (
          <li key={s.slug} className="border-b border-rule">
            <a
              href={`#${s.slug}`}
              className="group label flex min-h-14 items-center gap-4 py-3 text-fg transition-colors duration-300 hover:text-accent"
            >
              <span aria-hidden="true" className="w-6 shrink-0 text-accent">
                {s.n}
              </span>
              <span className="link-quiet min-w-0 flex-1">{s.title}</span>
              <Arrow dir="down" className="text-fg-3 group-hover:text-accent" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
