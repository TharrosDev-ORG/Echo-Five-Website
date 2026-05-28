"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Color of the emanating rings. */
  tone?: "signal" | "ink";
  className?: string;
};

/**
 * The Echofive mark made motion: concentric rings emanating from a focal
 * point, like a signal propagating through an organization. Used as a
 * structural watermark, never as foreground content (aria-hidden).
 */
export default function EchoSignal({ tone = "signal", className }: Props) {
  const reduce = useReducedMotion();
  const stroke =
    tone === "signal" ? "var(--color-signal)" : "var(--color-ink)";

  // Static structural rings, always present.
  const staticRings = [60, 130, 205, 285, 370];
  // Pinging rings that animate outward when motion is allowed.
  const pings = [0, 1, 2, 3];

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke={stroke}>
        {staticRings.map((r, i) => (
          <circle
            key={`s-${r}`}
            cx="300"
            cy="300"
            r={r}
            strokeWidth={i === 0 ? 1.5 : 1}
            opacity={0.16 - i * 0.022}
          />
        ))}

        {/* Focal dot */}
        <circle cx="300" cy="300" r="5" fill={stroke} stroke="none" opacity="0.9" />

        {/* Cross hairs through the focal point */}
        <line x1="300" y1="40" x2="300" y2="560" strokeWidth="1" opacity="0.07" />
        <line x1="40" y1="300" x2="560" y2="300" strokeWidth="1" opacity="0.07" />

        {!reduce &&
          pings.map((p) => (
            <motion.circle
              key={`p-${p}`}
              cx="300"
              cy="300"
              r="40"
              strokeWidth="1.5"
              initial={{ scale: 0.12, opacity: 0.5 }}
              animate={{ scale: 4.2, opacity: 0 }}
              transition={{
                duration: 6,
                ease: [0.16, 1, 0.3, 1],
                repeat: Infinity,
                delay: p * 1.5,
              }}
              style={{ transformOrigin: "300px 300px" }}
            />
          ))}
      </g>
    </svg>
  );
}
