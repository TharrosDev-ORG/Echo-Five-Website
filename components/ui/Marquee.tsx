import { useId, type CSSProperties } from "react";
import { Pause, Play } from "@/components/ui/icons";

type Item = { label: string; /** Full name, used as tooltip and screen-reader text. */ title?: string };

type Props = {
  items: readonly Item[];
  /** Accessible name for the list, e.g. "Selected clients". */
  label: string;
  /** Seconds per loop. */
  duration?: number;
  /** Visible toggle labels and the toggle's accessible name. */
  labels: { pause: string; play: string; toggle: string };
};

/**
 * Slow, looping row of names. Pauses on hover, on focus, and with the
 * built-in toggle (a CSS-only checkbox, so it works without JS). Under
 * reduced motion it becomes a static, wrapped list.
 */
export default function Marquee({ items, label, duration = 60, labels }: Props) {
  const toggleId = useId();

  const list = (copy: boolean) => (
    <ul
      className={copy ? "marquee-list marquee-copy" : "marquee-list"}
      aria-hidden={copy || undefined}
      aria-label={copy ? undefined : label}
    >
      {items.map((item) => (
        <li
          key={item.label}
          title={item.title && item.title !== item.label ? item.title : undefined}
          className="flex min-h-12 items-center gap-[var(--marquee-gap)] font-display text-h2 font-semibold whitespace-nowrap text-fg before:size-1.5 before:shrink-0 before:rounded-full before:bg-accent-fill before:content-['']"
        >
          {item.title && item.title !== item.label ? (
            <>
              <span aria-hidden="true">{item.label}</span>
              <span className="sr-only">{item.title}</span>
            </>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col gap-4">
      <input type="checkbox" id={toggleId} className="marquee-toggle peer sr-only" aria-label={labels.toggle} />
      <div className="marquee" style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
        <div className="marquee-track">
          {list(false)}
          {list(true)}
        </div>
      </div>
      <label
        htmlFor={toggleId}
        className="marquee-toggle-label inline-flex min-h-11 cursor-pointer items-center gap-2 self-center rounded-control px-3 text-small font-medium text-fg-2 hover:text-fg"
      >
        <span className="when-playing inline-flex items-center gap-2">
          <Pause size={16} /> {labels.pause}
        </span>
        <span className="when-paused items-center gap-2">
          <Play size={14} /> {labels.play}
        </span>
      </label>
    </div>
  );
}
