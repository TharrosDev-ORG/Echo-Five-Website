import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
  /** `neutral` hairline pill, `accent` tinted pill, `solid` filled with the accent. */
  tone?: "neutral" | "accent" | "solid";
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

const toneClass = {
  neutral: "border-edge-strong bg-raised text-fg-2",
  accent: "border-accent/40 bg-accent/12 text-fg",
  solid: "border-transparent bg-accent-fill text-on-accent",
};

/** Small pill for tags and file formats (DOCX, PPTX). */
export default function Badge({ tone = "neutral", icon, className, children }: Props) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-label font-semibold whitespace-nowrap",
        toneClass[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
