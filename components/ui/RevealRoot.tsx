"use client";

import { type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Single client scope that drives scroll reveals for the sections it wraps,
 * letting those sections stay server components. The hero manages its own
 * load-triggered intro and lives outside this wrapper.
 */
export default function RevealRoot({ children }: { children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref}>{children}</div>;
}
