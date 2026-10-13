import { cx } from "@/lib/cx";

type Props = {
  value: string;
  label: string;
  /** Optional second line under the label. */
  detail?: string;
  /**
   * `mega` for giant numerals, `lg` for headline numbers (59, 130), `md` for
   * short phrases ("Secret Level II").
   */
  size?: "md" | "lg" | "mega";
  /** Color the value with the surface accent (blue text, white on a blue ground). */
  accent?: boolean;
  className?: string;
};

/** A figure and its label, read in that order ("59 Playbooks"). */
export default function Stat({ value, label, detail, size = "lg", accent = false, className }: Props) {
  return (
    <div className={cx("flex flex-col", size === "mega" ? "gap-2" : "gap-1.5", className)}>
      <p
        className={cx(
          "font-display",
          size === "mega"
            ? "stat-mega text-mega tabular-nums"
            : cx(
                "font-semibold leading-none",
                size === "lg"
                  ? "text-[clamp(2.5rem,1.9rem+2.4vw,3.5rem)] tracking-[-0.04em]"
                  : "text-h3",
              ),
          accent ? "text-accent" : "text-fg",
        )}
      >
        {value}
      </p>
      <p className="text-small font-medium text-fg">{label}</p>
      {detail ? <p className="text-small text-fg-2">{detail}</p> : null}
    </div>
  );
}
