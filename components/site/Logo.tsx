import Link from "next/link";
import { cx } from "@/lib/cx";
import { site } from "@/lib/site";

const BARS = [6, 9, 12, 15, 18];

/** The Echofive mark: five rising bars, the last in citron. */
export function LogoMark({ tone = "light", size = 32 }: { tone?: "light" | "dark"; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect
        width="32"
        height="32"
        rx="8"
        fill={tone === "dark" ? "#173832" : "#0F2B26"}
        stroke={tone === "dark" ? "rgb(246 248 247 / 0.16)" : "none"}
      />
      {BARS.map((h, i) => (
        <rect
          key={h}
          x={6.3 + i * 4.2}
          y={25 - h}
          width="3"
          height={h}
          rx="1.5"
          fill={i === BARS.length - 1 ? "#D9F26B" : "#F6F8F7"}
        />
      ))}
    </svg>
  );
}

/** Mark plus "Echofive" wordmark, linking home. */
export default function Logo({
  tone = "light",
  className,
  onClick,
}: {
  tone?: "light" | "dark";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      onClick={onClick}
      className={cx(
        "inline-flex min-h-11 items-center gap-2.5 rounded-control font-display text-[1.3125rem] font-semibold tracking-[-0.03em] no-underline",
        tone === "dark" ? "text-on-dark" : "text-ink",
        className,
      )}
    >
      <LogoMark tone={tone} />
      {site.shortName}
    </Link>
  );
}
