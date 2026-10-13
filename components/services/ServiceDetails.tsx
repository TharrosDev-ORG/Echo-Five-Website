import { services } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The six services in full. Each row is an anchor target for the jump links.
 * From xl the title sits on the left and the description on the right.
 */
export default function ServiceDetails() {
  return (
    <ol className="border-t border-edge">
      {services.items.map((item) => (
        <li key={item.slug} id={item.slug} className="border-b border-edge">
          <Reveal
            as="article"
            className="grid gap-6 py-10 md:py-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-x-12"
          >
            <SectionHeading
              as="h3"
              size="h2"
              index={item.n}
              eyebrow={item.tag}
              title={item.title}
              stroke={false}
            />
            <p className="max-w-[52ch] text-lead text-fg-2 xl:pt-9">{item.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
