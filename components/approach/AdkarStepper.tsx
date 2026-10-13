"use client";

import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { process as adkar } from "@/lib/content";
import { cx } from "@/lib/cx";
import AdkarPath from "@/components/illustrations/AdkarPath";
import styles from "./AdkarStepper.module.css";

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true once the component runs on the client. */
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * The five ADKAR stages as an ARIA tabs widget (roving tabindex, Arrow, Home
 * and End keys, automatic activation). The server renders an ordered list of
 * all five stages, which is what visitors without JS see.
 */
export default function AdkarStepper() {
  const { stages } = adkar;
  const enhanced = useHydrated();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const tabId = (i: number) => `${base}-tab-${i}`;
  const panelId = (i: number) => `${base}-panel-${i}`;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = stages.length - 1;
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  // A list without JS; tab panels once hydrated.
  const Panels = enhanced ? "div" : "ol";
  const Panel = enhanced ? "div" : "li";

  return (
    <div className={cx("card card-panel", styles.stepper)} data-enhanced={enhanced ? "" : undefined}>
      {/*
        The path's nodes sit at 10%, 30% ... 90% of its width. Widening it by the
        tab gap (0.5rem) and pulling it left by half that puts each node over
        the centre of its tab.
      */}
      <div className="mx-auto hidden w-full max-w-3xl sm:block">
        <div className="-mx-1">
          <AdkarPath active={enhanced ? active : undefined} />
        </div>
      </div>

      <div
        role={enhanced ? "tablist" : undefined}
        aria-label={enhanced ? adkar.stagesLabel : undefined}
        className={cx(styles.tablist, "mx-auto grid w-full max-w-3xl grid-cols-5 gap-2 sm:mt-3")}
      >
        {stages.map((stage, i) => {
          // Styled as selected even before hydration so the layout does not shift.
          const selected = i === active;
          return (
            <button
              key={stage.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role={enhanced ? "tab" : undefined}
              id={tabId(i)}
              aria-selected={enhanced ? selected : undefined}
              aria-controls={enhanced ? panelId(i) : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cx(
                "flex min-h-11 cursor-pointer items-center justify-center rounded-control border px-1 py-2 font-semibold",
                "transition-colors duration-150",
                selected
                  ? "border-accent bg-accent text-on-accent"
                  : "border-edge text-fg-2 hover:border-edge-strong hover:text-fg",
              )}
            >
              {/* Narrow screens show the initial; the full name is always the accessible label. */}
              <span aria-hidden="true" className="font-display text-h3 md:hidden">
                {stage.key}
              </span>
              <span className="sr-only text-small md:not-sr-only">{stage.name}</span>
            </button>
          );
        })}
      </div>

      <Panels
        aria-label={enhanced ? undefined : adkar.stagesLabel}
        className={cx("mx-auto mt-8 w-full max-w-3xl", !enhanced && "divide-y divide-edge")}
      >
        {stages.map((stage, i) => (
          <Panel
            key={stage.name}
            id={panelId(i)}
            role={enhanced ? "tabpanel" : undefined}
            aria-labelledby={enhanced ? tabId(i) : undefined}
            tabIndex={enhanced ? 0 : undefined}
            hidden={enhanced ? i !== active : undefined}
            className={cx(
              styles.panel,
              "grid items-start gap-4 rounded-control sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6",
              !enhanced && "py-6 first:pt-0 last:pb-0",
            )}
          >
            <span
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-card bg-accent/12 font-display text-h2 text-accent"
            >
              {stage.key}
            </span>
            <div className="min-w-0">
              <h3 className="text-h3 text-fg">{stage.name}</h3>
              <p className="mt-2 max-w-[60ch] text-lead text-fg-2">{stage.body}</p>
            </div>
          </Panel>
        ))}
      </Panels>
    </div>
  );
}
