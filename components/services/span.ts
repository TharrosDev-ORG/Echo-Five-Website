import { services } from "@/lib/content/services";

/**
 * Where each service sits across a rollout, for Exhibit 01 and the small
 * track beside each service. Illustrative positions on a three-phase track
 * (0 to 3): before migration, migration, after go-live. Go-live sits at 2.
 * `tail` extends a second, highlighted segment (embedded change agents).
 */
export type Span = { start: number; end: number; tail?: number };

export const PHASES = 3;
export const GO_LIVE = 2;

export const spans: Record<string, Span> = {
  strategy: { start: 0, end: 1 },
  communications: { start: 0.3, end: 2.55 },
  training: { start: 1.2, end: 2.7 },
  "technical-writing": { start: 1.35, end: 3 },
  "ai-coaching": { start: 2.1, end: 3 },
  migration: { start: 1, end: 2, tail: 3 },
};

/** A track position as a CSS percentage. */
export const pct = (u: number) => `${(u / PHASES) * 100}%`;

/** Plain-language span, e.g. "Migration to after go-live". */
export function spanText(slug: string) {
  const s = spans[slug];
  const phases = services.rollout.phases;
  const first = Math.floor(s.start);
  const last = Math.min(PHASES, Math.ceil(s.tail ?? s.end)) - 1;
  if (first === last) return phases[first];
  return `${phases[first]} to ${phases[last].charAt(0).toLowerCase()}${phases[last].slice(1)}`;
}
