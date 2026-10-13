import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import Container from "@/components/ui/Container";
import { toneClass } from "@/components/ui/Section";

type Props = {
  title: ReactNode;
  lead?: ReactNode;
  /** Small context line above the title. */
  eyebrow?: ReactNode;
  /** Buttons under the lead. Stacked full width on phones, in a row from `sm`. */
  actions?: ReactNode;
  /** Illustration or panel shown beside the text on wide screens, below it on phones. */
  visual?: ReactNode;
  /** `light` (default) for inner pages; `dark` for the home and Advanta365 heroes. */
  tone?: "light" | "dark";
  /** `display` is the larger home-page headline size. */
  size?: "page" | "display";
  /** Extra content under the actions (e.g. a price callout or badges). */
  children?: ReactNode;
  className?: string;
};

/**
 * Page opener holding the page's single h1. Marked `data-hero` so the mobile
 * CTA bar knows when the visitor has scrolled past it.
 */
export default function PageHero({
  title,
  lead,
  eyebrow,
  actions,
  visual,
  tone = "light",
  size = "page",
  children,
  className,
}: Props) {
  return (
    <header
      data-hero=""
      className={cx(
        toneClass[tone],
        tone === "light" && "border-b border-edge",
        "overflow-hidden",
        className,
      )}
    >
      <Container
        className={cx(
          "grid gap-12 py-14 md:py-20 lg:py-24",
          Boolean(visual) && "lg:items-center lg:gap-16",
          // The display headline needs the wider text column to keep each sentence on one line from lg.
          Boolean(visual) &&
            (size === "display"
              ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
              : "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"),
        )}
      >
        <div className="min-w-0">
          {eyebrow ? <p className="mb-5 text-small font-medium text-fg-2">{eyebrow}</p> : null}
          <h1
            className={cx(
              "text-fg",
              size === "display" ? "max-w-[18ch] text-display" : "max-w-[20ch] text-h1",
            )}
          >
            {title}
          </h1>
          {lead ? <p className="mt-6 max-w-[60ch] text-lead text-fg-2">{lead}</p> : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {visual ? <div className="min-w-0">{visual}</div> : null}
      </Container>
    </header>
  );
}
