"use client";

import { useEffect } from "react";
import { mailtoBook, site } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ minHeight: "100svh", display: "flex", alignItems: "center" }}>
      <div className="u-container">
        <p className="t-coord" style={{ marginBottom: "1.5rem", color: "var(--color-cobalt)" }}>
          Something went wrong
        </p>
        <h1 className="t-h2" style={{ maxWidth: "20ch" }}>
          We hit an unexpected snag.
        </h1>
        <p className="t-lead measure-wide" style={{ marginTop: "clamp(1.5rem,3vw,2.25rem)" }}>
          Please try again. If it keeps happening, reach us directly and we will sort it out.
        </p>
        <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <a href={mailtoBook} className="btn btn-ghost">
            Email {site.shortName}
          </a>
        </div>
      </div>
    </main>
  );
}
