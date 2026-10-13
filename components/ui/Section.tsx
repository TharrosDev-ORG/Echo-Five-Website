import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import Container from "@/components/ui/Container";

export type Tone = "light" | "alt" | "dark";

type Props = {
  id?: string;
  /** `light` paper, `alt` paper-2 band, `dark` spruce. Colors inside adapt automatically. */
  tone?: Tone;
  /** Vertical padding preset. */
  spacing?: "sm" | "md" | "lg" | "none";
  /** Dot grid and citron glow; intended for dark sections. */
  texture?: boolean;
  /** Skip the inner Container (for full-bleed content such as the marquee). */
  bleed?: boolean;
  /** Id of the section's heading, for the region's accessible name. */
  labelledBy?: string;
  "aria-label"?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

const spacingClass = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

export const toneClass: Record<Tone, string> = {
  light: "surface-light",
  alt: "surface-alt",
  dark: "surface-dark",
};

/** A full-width band of the page with a tone and consistent vertical rhythm. */
export default function Section({
  id,
  tone = "light",
  spacing = "md",
  texture = false,
  bleed = false,
  labelledBy,
  className,
  containerClassName,
  children,
  ...aria
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      {...aria}
      className={cx(toneClass[tone], texture && "texture", spacingClass[spacing], className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
