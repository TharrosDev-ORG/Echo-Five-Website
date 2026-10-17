import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Plus } from "@/components/ui/icons";

/** Groups `AccordionItem`s between hairlines. */
export function Accordion({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("divide-y divide-edge border-y border-edge", className)}>{children}</div>;
}

type ItemProps = {
  title: ReactNode;
  defaultOpen?: boolean;
  /** Items sharing a `name` behave as an exclusive group in supporting browsers. */
  name?: string;
  children: ReactNode;
};

/** One disclosure, built on native <details>/<summary>, so it works without JS. */
export function AccordionItem({ title, defaultOpen, name, children }: ItemProps) {
  return (
    <details className="group" open={defaultOpen} name={name}>
      <summary className="flex min-h-14 list-none items-center justify-between gap-4 py-4 font-display text-h3 text-fg">
        <span>{title}</span>
        <Plus
          size={22}
          className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
        />
      </summary>
      <div className="flex flex-col gap-3 pb-6 text-fg-2">{children}</div>
    </details>
  );
}

export default Accordion;
