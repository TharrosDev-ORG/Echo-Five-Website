import { cx } from "@/lib/cx";

/**
 * The Echofive mark: five bars rising, like a signal coming back stronger.
 * The last bar carries the action blue (or the highlighter on night).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cx("h-6 w-6", className)} aria-hidden="true">
      <rect x="1" y="15" width="3" height="6" rx="1" fill="currentColor" />
      <rect x="5.75" y="12" width="3" height="9" rx="1" fill="currentColor" />
      <rect x="10.5" y="9" width="3" height="12" rx="1" fill="currentColor" />
      <rect x="15.25" y="6" width="3" height="15" rx="1" fill="currentColor" />
      <rect x="20" y="3" width="3" height="18" rx="1" fill="var(--accent)" />
    </svg>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.1875rem] font-semibold leading-none tracking-[-0.025em]">
        Echofive
      </span>
    </span>
  );
}
