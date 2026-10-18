import type { ReactNode } from "react";
import Link from "next/link";
import { nav, navCta } from "@/lib/content/shared";
import Mark from "@/components/ui/Mark";
import Arrow from "@/components/ui/Arrow";

type Props = {
  /** Accent part of the caption, e.g. "Exhibit 404". */
  code: string;
  caption: string;
  captionNote: string;
  heading: { before: string; mark: string; after: string };
  body: string;
  /** The giant figure under the caption. Decorative. */
  figure: ReactNode;
  /** Primary and secondary actions. */
  actions: ReactNode;
  /** Extra line under the actions (an email, a reference). */
  footnote?: ReactNode;
  moreLabel?: string;
};

/**
 * The 404 and error moments, set like an exhibit: a mono caption row over a
 * rule, a giant serif figure, the heading, and a way back. Static on purpose:
 * no scroll-in effects, so it renders fully even when the app has failed.
 */
export default function StatusPage({
  code,
  caption,
  captionNote,
  heading,
  body,
  figure,
  actions,
  footnote,
  moreLabel,
}: Props) {
  return (
    <section
      aria-labelledby="status-heading"
      className="tone-paper relative overflow-hidden pb-24 pt-32 min-[900px]:pb-32 min-[900px]:pt-44"
    >
      <div className="wrap">
        <div className="label flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-fg pt-3">
          <p>
            <span className="text-accent">{code}</span>
            <span className="text-fg-3"> · </span>
            <span className="text-fg">{caption}</span>
          </p>
          <p className="flex items-center gap-3 text-fg-3">
            <span>{captionNote}</span>
            <BrokenSignal className="h-3.5 w-3.5" />
          </p>
        </div>

        <div aria-hidden="true" className="mt-8 min-[900px]:mt-10">
          {figure}
        </div>

        <div className="mt-10 grid gap-10 border-t border-rule pt-10 min-[900px]:mt-14 min-[900px]:grid-cols-12 min-[900px]:gap-x-[clamp(1rem,0.5rem+1.6vw,2.5rem)] min-[900px]:pt-12">
          <h1
            id="status-heading"
            tabIndex={-1}
            className="serif text-h2 text-fg outline-none min-[900px]:col-span-6"
          >
            {heading.before} <Mark sweep={false}>{heading.mark}</Mark> {heading.after}
          </h1>
          <div className="min-[900px]:col-span-5 min-[900px]:col-start-8">
            <p className="text-lead text-fg-2">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            {footnote && <div className="mt-6">{footnote}</div>}
          </div>
        </div>

        {moreLabel && (
          <nav aria-label={moreLabel} className="mt-16 min-[900px]:mt-24">
            <p className="label text-fg-3">{moreLabel}</p>
            <ul className="mt-4 grid pt-px gap-x-[clamp(1rem,0.5rem+1.6vw,2.5rem)] min-[640px]:grid-cols-2 min-[1200px]:grid-cols-5">
              {[...nav, { label: "Contact", href: navCta.href }].map((item) => (
                <li key={item.href} className="-mt-px border-y border-rule">
                  <Link
                    href={item.href}
                    className="group flex min-h-14 items-center justify-between gap-4 py-3 pr-2 text-body text-fg transition-transform duration-500 ease-[var(--ease-out-expo)] hover:translate-x-2 hover:text-accent motion-reduce:transition-none motion-reduce:hover:translate-x-0"
                  >
                    <span>{item.label}</span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}

/** The five-bar mark with its last bar missing: the signal, dropped. */
export function BrokenSignal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="15" width="3" height="6" rx="1" className="fill-fg" />
      <rect x="5.75" y="12" width="3" height="9" rx="1" className="fill-fg" />
      <rect x="10.5" y="9" width="3" height="12" rx="1" className="fill-fg" />
      <rect x="15.25" y="6" width="3" height="15" rx="1" className="fill-fg" />
      <rect
        x="20.5"
        y="3.5"
        width="2"
        height="17"
        rx="0.75"
        fill="none"
        className="stroke-accent"
        strokeWidth="1"
        strokeDasharray="1.5 1.5"
      />
    </svg>
  );
}
