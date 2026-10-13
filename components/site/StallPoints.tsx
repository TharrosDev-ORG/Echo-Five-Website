import { why } from "@/lib/content";
import { cx } from "@/lib/cx";
import Reveal from "@/components/ui/Reveal";

/**
 * The three reasons rollouts stall, shared by Home and Approach so both pages
 * use one card and one closing-line treatment. `stack` lists the cards in a
 * column (numeral beside the text from sm); `columns` sets them side by side
 * from md (numeral above the text).
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
    <ol className={cx("grid gap-4 sm:gap-5", columns && "md:grid-cols-3 md:gap-6", className)}>
      {why.failures.map((failure, i) => (
        <Reveal as="li" index={i} key={failure.n}>
          <div className={cx("card h-full", !columns && "sm:flex-row sm:gap-6")}>
            <span
              aria-hidden="true"
              className={cx(
                "font-display text-h2 leading-none text-accent tabular-nums",
                !columns && "sm:w-12 sm:shrink-0",
              )}
            >
              {failure.n.padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-h3 text-fg">{failure.title}</h3>
              <p className="text-fg-2">{failure.body}</p>
            </div>
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
      <span aria-hidden="true" className="mb-6 block h-1 w-12 rounded-full bg-accent" />
      <p className="max-w-[30ch] font-display text-h2 text-fg">{why.close}</p>
    </Reveal>
  );
}
