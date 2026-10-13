import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import Container from "@/components/ui/Container";
import SignalRail from "@/components/ui/SignalRail";
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
  /**
   * `display` is a larger headline. `mega` is the home opener: a `text-mega`
   * headline across the full container, the lead beside the actions from lg,
   * and `children` pinned to the bottom of a screen-high hero.
   */
  size?: "page" | "display" | "mega";
  /** Extra content under the actions (e.g. a price callout or badges). With `mega`, full width at the hero's foot. */
  children?: ReactNode;
  /**
   * Draw the signal rail in the left gutter (default). Pass `false` where a
   * diagram in the hero carries the line instead (the home adoption curve).
   */
  rail?: boolean;
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
  rail = true,
  className,
}: Props) {
  const mega = size === "mega";
  const lede = lead ? <p className="mt-6 max-w-[60ch] text-lead text-fg-2">{lead}</p> : null;
  const buttons = actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null;

  if (mega) {
    return (
      <header
        data-hero=""
        data-hero-tone={tone}
        className={cx(
          toneClass[tone],
          tone === "light" && "border-b border-edge",
          // The node sits at the desktop top padding (4rem) plus 0.75rem, on the eyebrow.
          "relative isolate overflow-hidden [--rail-node-y:4.75rem]",
          className,
        )}
      >
        {rail ? <SignalRail /> : null}
        {/* A query container, so the headline can size itself to the column (see .hero-mega). */}
        <Container className="@container flex flex-col pt-12 pb-12 md:pt-16 md:pb-14 lg:min-h-[calc(100svh-var(--header-h))] lg:pt-16 lg:pb-10">
          {eyebrow ? <p className="mb-5 max-w-[48rem] text-small font-medium text-fg-2">{eyebrow}</p> : null}
          <h1 className="hero-mega max-w-none text-mega text-fg">{title}</h1>
          {lead || actions ? (
            <div className="lg:mt-10 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
              {lead ? (
                <p className="mt-6 max-w-[60ch] text-lead text-fg-2 lg:col-span-6 lg:mt-0 xl:col-span-7">{lead}</p>
              ) : null}
              {actions ? (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-6 lg:mt-0 lg:justify-end xl:col-span-5">
                  {actions}
                </div>
              ) : null}
            </div>
          ) : null}
          {children ? (
            <div className="mt-12 lg:mt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-end lg:pt-10">{children}</div>
          ) : null}
        </Container>
      </header>
    );
  }

  return (
    <header
      data-hero=""
      data-hero-tone={tone}
      className={cx(
        toneClass[tone],
        tone === "light" && "border-b border-edge",
        // `relative isolate` makes this the rail's containing block and keeps its z-index inside the hero.
        // The node sits at the desktop top padding (6rem) plus 0.75rem, on the title's first lines.
        "relative isolate overflow-hidden [--rail-node-y:6.75rem]",
        className,
      )}
    >
      {rail ? <SignalRail /> : null}
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
              size === "display" ? "max-w-[18ch] text-display" : "max-w-[16ch] text-h1",
            )}
          >
            {title}
          </h1>
          {lede}
          {buttons}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {visual ? <div className="min-w-0">{visual}</div> : null}
      </Container>
    </header>
  );
}
