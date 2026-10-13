/** Small inline icons. Decorative: every use sits next to visible text. */
type P = { size?: number };

export const ArrowRight = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Play = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 3.5v9l7.5-4.5L5 3.5Z" fill="currentColor" />
  </svg>
);
