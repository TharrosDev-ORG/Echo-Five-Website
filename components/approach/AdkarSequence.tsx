"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { adkar, approachPage } from "@/lib/content/approach";
import { cx } from "@/lib/cx";

const copy = approachPage.method;
const stages = adkar.stages;
const total = stages.length;
const pad = (n: number) => String(n).padStart(2, "0");

const noopSubscribe = () => () => {};

/** True once running in a browser that can track scroll position; false on the server. */
function useCanTrack() {
  return useSyncExternalStore(
    noopSubscribe,
    () => "IntersectionObserver" in window,
    () => false,
  );
}

type State = "done" | "active" | "next";

/**
 * Where stage `i` stands when the reader is on stage `current`. With no
 * current stage (server render, no JS) every bar shows complete: four ink
 * bars and the last in accent, which is the Echofive mark.
 */
function stateOf(i: number, current: number | null): State {
  if (current === null) return i === total - 1 ? "active" : "done";
  if (i < current) return "done";
  return i === current ? "active" : "next";
}

/** Five small rising bars, filled up to stage `i`: the logo mark as a progress meter. */
function MiniBars({ i }: { i: number }) {
  return (
    <span aria-hidden="true" className="inline-flex h-4 items-end gap-[3px]">
      {stages.map((_, j) => (
        <span
          key={j}
          style={{ height: `${40 + j * 15}%` }}
          className={cx("w-[4px] rounded-[1px]", j < i ? "bg-fg" : j === i ? "bg-accent" : "bg-rule-strong")}
        />
      ))}
    </span>
  );
}

/**
 * Exhibit 02 on /approach: the five Prosci ADKAR stages experienced in
 * order. The stages are an ordered list that reads completely on its own.
 * From 900px a sticky display beside the list (decorative, hidden from
 * assistive tech) shows the bars filling in as each stage's text scrolls
 * past the middle of the screen; by the last stage the bars form the
 * Echofive mark. No scroll is hijacked; reduced motion only drops the
 * colour transitions.
 */
export default function AdkarSequence() {
  const canTrack = useCanTrack();
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-stage]");
    if (!items || !("IntersectionObserver" in window)) return;
    // A thin band across the middle of the viewport: the stage whose row
    // crosses it is the current one. Rows are contiguous, so one always does
    // while the list is on screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.stage));
        }
      },
      { rootMargin: "-49% 0px -50% 0px", threshold: 0 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = canTrack ? active : null;
  const ease = "duration-700 ease-[var(--ease-out-expo)] motion-reduce:transition-none";

  return (
    <div className="min-[900px]:grid min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] min-[900px]:gap-x-[clamp(2.5rem,1rem+4vw,7rem)]">
      {/* Stage display: sticky beside the list from 900px. */}
      <div
        aria-hidden="true"
        className="sticky top-[max(6.5rem,calc(50svh-17rem))] hidden h-[min(34rem,calc(100svh-8rem))] flex-col self-start pt-10 min-[900px]:flex"
      >
        <div className="label flex items-baseline justify-between text-fg-3">
          <span>{copy.model}</span>
          <span className="tabular text-fg">
            {current === null ? (
              `${pad(total)} ${copy.stage.toLowerCase()}s`
            ) : (
              <>
                {copy.stage} {pad(current + 1)} <span className="text-fg-3">/ {pad(total)}</span>
              </>
            )}
          </span>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 items-end gap-1.5 border-b border-fg">
          {stages.map((s, i) => {
            const state = stateOf(i, current);
            return (
              <div
                key={i}
                style={{ height: `${34 + i * 16}%` }}
                className={cx(
                  "relative flex-1 rounded-t-[0.375rem] transition-[background-color,box-shadow]",
                  ease,
                  state === "done" && "bg-fg",
                  state === "active" && "bg-accent",
                  state === "next" && "shadow-[inset_0_0_0_1px_var(--rule-strong)]",
                )}
              >
                <span
                  className={cx(
                    "serif absolute left-[14%] top-3 text-[clamp(2.25rem,0.9rem+2.6vw,4.5rem)] leading-none transition-colors",
                    ease,
                    state === "done" && "text-bg",
                    state === "active" && "text-accent-ink",
                    state === "next" && "text-fg-3",
                  )}
                >
                  {s.key}
                </span>
              </div>
            );
          })}
        </div>

        {/* The current stage's name, cross-faded. */}
        <div className="mt-6 grid">
          {current === null ? (
            <p className="serif text-h3 text-fg">{copy.complete}</p>
          ) : (
            stages.map((s, i) => (
              <p
                key={s.name}
                className={cx(
                  "serif col-start-1 row-start-1 text-h2 text-fg transition-[opacity,transform]",
                  ease,
                  i === current ? "opacity-100" : "opacity-0",
                  i < current && "-translate-y-3",
                  i > current && "translate-y-3",
                )}
              >
                {s.name}
              </p>
            ))
          )}
        </div>
        <div className="relative mt-5 h-px bg-rule">
          <span
            className={cx("absolute inset-y-[-0.5px] left-0 w-full origin-left bg-accent transition-transform", ease)}
            style={{ transform: `scaleX(${current === null ? 1 : (current + 1) / total})` }}
          />
        </div>
      </div>

      {/* The stages: the content itself, complete without JS. */}
      <ol ref={list} aria-label={adkar.stagesLabel} className="border-b border-rule">
        {stages.map((s, i) => {
          const on = current === i;
          return (
            <li
              key={s.name}
              data-stage={i}
              className="border-t border-rule py-10 first:border-t-0 first:pt-6 min-[900px]:flex min-[900px]:min-h-[62svh] min-[900px]:flex-col min-[900px]:justify-center min-[900px]:py-16"
            >
              <p className="label flex items-center gap-3 text-fg-3" aria-hidden="true">
                <MiniBars i={i} />
                <span className="tabular">
                  <span className={cx("transition-colors", ease, on || current === null ? "text-accent" : "text-fg-3")}>
                    {pad(i + 1)}
                  </span>{" "}
                  / {pad(total)}
                </span>
              </p>
              <h3
                className={cx(
                  "serif mt-6 text-[clamp(2.5rem,1.5rem+3.6vw,5.25rem)] leading-[0.98] tracking-[-0.03em] transition-colors",
                  ease,
                  current === null || on ? "text-fg" : "min-[900px]:text-fg-3 text-fg",
                )}
              >
                <span className="text-accent">{s.name.charAt(0)}</span>
                {s.name.slice(1)}
              </h3>
              <p className="serif mt-5 max-w-[26ch] text-h3 text-fg-2">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
