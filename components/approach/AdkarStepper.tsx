"use client";

import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { process as adkar } from "@/lib/content";
import { cx } from "@/lib/cx";
import AdkarPath from "@/components/illustrations/AdkarPath";
import Reveal from "@/components/ui/Reveal";
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
    <div className={styles.stepper} data-enhanced={enhanced ? "" : undefined}>
      {/*
        The path's nodes sit at 10%, 30% ... 90% of its width: the centres of
        five equal columns, so each node sits over its tab. The path is the
        signal line; it draws up to the selected stage.
      */}
      <div className="hidden w-full sm:block">
        <Reveal>
          <AdkarPath letters={false} active={enhanced ? active : undefined} />
        </Reveal>
      </div>

      <div
        role={enhanced ? "tablist" : undefined}
        aria-label={enhanced ? adkar.stagesLabel : undefined}
        className={cx(styles.tablist, "grid w-full grid-cols-5 sm:mt-1")}
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
                "flex min-h-11 cursor-pointer items-center justify-center border-b-2 px-1 py-2 font-semibold",
                "transition-colors duration-200",
                selected
                  ? "border-accent-fill text-fg"
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
        className={cx("mt-10 w-full lg:mt-14", !enhanced && "divide-y divide-edge")}
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
              "grid items-start gap-x-10 gap-y-3 sm:grid-cols-[6rem_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-12",
              !enhanced && "py-6 first:pt-0 last:pb-0",
            )}
          >
            {/* The giant letter is decoration; the stage name below is the real heading. */}
            <span
              aria-hidden="true"
              className="font-display leading-none text-accent text-display lg:text-mega"
            >
              {stage.key}
            </span>
            <div className="min-w-0 lg:pt-4">
              <h3 className="text-h2 text-fg">{stage.name}</h3>
              <p className="mt-3 max-w-[52ch] text-lead text-fg-2">{stage.body}</p>
            </div>
          </Panel>
        ))}
      </Panels>
    </div>
  );
}
