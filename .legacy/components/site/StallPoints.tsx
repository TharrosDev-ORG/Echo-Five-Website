import { why } from "@/lib/content";
import { cx } from "@/lib/cx";
import Reveal from "@/components/ui/Reveal";

/**
 * The three reasons rollouts stall, shared by Home and Approach: large
 * numbered statements, each under an edge line, with no card around them.
 * `stack` lists them in a column (number beside the text from sm, title at
 * h2 size); `columns` sets them side by side from md (number above, title at
 * h3 size so three fit across).
 */
export function StallReasonList({
  layout = "stack",
  className,
}: {
  layout?: "stack" | "columns";
  className?: string;
}) {
  const columns = layout === "columns";
  return (
    <ol className={cx("grid", columns ? "gap-10 md:grid-cols-3 md:gap-8" : "gap-10 md:gap-12", className)}>
      {why.failures.map((failure, i) => (
        <Reveal
          as="li"
          index={i}
          key={failure.n}
          className={cx(
            "border-t border-edge pt-6",
            !columns && "sm:grid sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-6 md:grid-cols-[5.5rem_minmax(0,1fr)]",
          )}
        >
          <span aria-hidden="true" className="block font-display text-h2 text-accent tabular-nums">
            {failure.n.padStart(2, "0")}
          </span>
          <div className={cx("flex flex-col gap-3", columns ? "mt-5" : "mt-3 sm:mt-0")}>
            <h3 className={cx("text-fg", columns ? "text-h3" : "text-h2")}>{failure.title}</h3>
            <p className="max-w-[52ch] text-fg-2">{failure.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/** The line that says where Echofive comes in, under a short accent rule. */
export function StallClose({ className }: { className?: string }) {
  return (
    <Reveal className={className}>
      <span aria-hidden="true" className="mb-6 block h-0.5 w-12 bg-accent-fill" />
      <p className="max-w-[30ch] font-display text-h2 text-fg">{why.close}</p>
    </Reveal>
  );
}
