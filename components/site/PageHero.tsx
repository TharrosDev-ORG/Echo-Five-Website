import type { ReactNode } from "react";
import Lines from "@/components/ui/Lines";
import Index from "@/components/ui/Index";

type Props = {
  index: string;
  /** One entry per visual line of the h1. */
  heading: readonly ReactNode[];
  lead?: string;
  /** Optional content under the lead: actions, a jump nav, facts. */
  children?: ReactNode;
  /** Optional figure on the right from 1200px (below the text on smaller screens). */
  aside?: ReactNode;
};

/**
 * The opening of every inner page: mono index, a giant serif h1 set line by
 * line, and the lead. Leaves room under the fixed header.
 */
export default function PageHero({ index, heading, lead, children, aside }: Props) {
  return (
    <section className="tone-paper relative pb-16 pt-36 min-[900px]:pb-24 min-[900px]:pt-48">
      <div className="wrap">
        <Index className="mb-8 min-[900px]:mb-12" n="">
          {index}
        </Index>
        <div
          className={
            aside
              ? "grid gap-14 min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] min-[1200px]:items-end"
              : undefined
          }
        >
          <div>
            <Lines as="h1" lines={[...heading]} className="serif text-h1 max-w-[18ch]" />
            {lead && (
              <p
                className="mt-10 max-w-[40rem] text-lead text-fg-2"
                data-reveal=""
                style={{ "--d": 250 } as React.CSSProperties}
              >
                {lead}
              </p>
            )}
            {children && (
              <div data-reveal="" style={{ "--d": 380 } as React.CSSProperties} className="mt-10">
                {children}
              </div>
            )}
          </div>
          {aside && (
            <div data-reveal="" style={{ "--d": 300 } as React.CSSProperties}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
