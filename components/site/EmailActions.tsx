"use client";

import { useState } from "react";
import { site, mailtoBook } from "@/lib/site";

/**
 * Contact address, presented on the amber close. The mailto stays the primary
 * action; the copy control is the fallback for anyone without a mail client
 * configured, so the conversion path never dead-ends.
 */
export default function EmailActions() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the visible address and mailto still work.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <a
        href={mailtoBook}
        className="font-mono text-[clamp(1rem,1.6vw,1.25rem)] tracking-tight text-ink-deep underline-offset-[5px] hover:underline"
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-deep/70 underline underline-offset-[5px] decoration-ink-deep/30 transition-colors hover:text-ink-deep hover:decoration-ink-deep"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
