/** Small inline icons. Decorative: every use sits next to visible text. */
type P = { size?: number };

export const ArrowRight = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowOut = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M4 10 10 4m0 0H5m5 0v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Check = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3 8.5 3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Play = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 3.5v9l7.5-4.5L5 3.5Z" fill="currentColor" />
  </svg>
);

export const Menu = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Close = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/** Icons for the hero facts panel, in the same order as `hero.facts`. */
export const FactIcons = [
  // Years: calendar
  ({ size = 18 }: P) => (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2.5" y="3.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 7.5h13M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // Clearance: shield
  ({ size = 18 }: P) => (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2 3.5 4v4.5c0 3.5 2.4 6.2 5.5 7.5 3.1-1.3 5.5-4 5.5-7.5V4L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m6.5 9 1.8 1.8L11.8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Prosci: steps
  ({ size = 18 }: P) => (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2.5 15.5h4v-4h4v-4h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.5" cy="3.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  // Microsoft certified: badge
  ({ size = 18 }: P) => (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.5 10.8-1 5.2L9 14.3l3.5 1.7-1-5.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
];
