import Link from "next/link";
import { cx } from "@/lib/cx";
import { site } from "@/lib/site";

/** Bar widths, top to bottom: an echo fading out. */
const WIDTHS = [24, 19, 14, 9, 4];
const YS = [6, 11, 16, 21, 26];

/** The Echofive mark: five horizontal bars of decreasing length, in the surface's accent fill. */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className="text-accent-fill"
    >
      {WIDTHS.map((w, i) => (
        <rect key={w} x="4" y={YS[i]} width={w} height="3" rx="1.5" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Mark plus "Echofive" wordmark, linking home. Colors follow the surface it sits on. */
export default function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      onClick={onClick}
      className={cx(
        "inline-flex min-h-11 items-center gap-2.5 rounded-control font-display text-[1.3125rem] font-bold tracking-[-0.03em] text-fg no-underline",
        className,
      )}
    >
      <LogoMark />
      {site.shortName}
    </Link>
  );
}
