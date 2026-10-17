"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";

type Item = { id: string; title: string };

/**
 * "On this page": a numbered list of the statement's sections. On wide
 * screens it sits beside the text and marks the section being read. It is a
 * plain list of anchor links, so it works the same without JavaScript.
 */
export default function Toc({ items, label }: { items: readonly Item[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The first section (in document order) inside the reading band wins.
        const first = items.find((item) => visible.has(item.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label}>
      <p className="label border-t border-fg pt-3 text-fg">{label}</p>
      <ol className="mt-4">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="border-b border-rule">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cx(
                  "group relative flex min-h-11 items-baseline gap-4 py-2.5 text-small transition-colors duration-300",
                  isActive ? "text-fg" : "text-fg-2 hover:text-fg",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    "label w-6 flex-none transition-colors duration-300",
                    isActive ? "text-accent" : "text-fg-3 group-hover:text-accent",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cx(
                    "absolute inset-x-0 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
