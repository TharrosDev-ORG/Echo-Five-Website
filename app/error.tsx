"use client";

import { useEffect } from "react";
import { mailtoBook, site } from "@/lib/site";

export default function ErrorPage({
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
    <section className="section">
      <div className="container" style={{ minHeight: "50vh", display: "grid", alignContent: "center" }}>
        <p className="t-label label-row">Something went wrong</p>
        <h1 className="t-h1" style={{ marginTop: "1rem", maxWidth: "18ch" }}>
          We hit an unexpected snag.
        </h1>
        <p className="t-lead" style={{ marginTop: "1.5rem", maxWidth: "52ch" }}>
          Please try again. If it keeps happening, reach us directly and we will sort it out.
        </p>
        <div className="flex flex-wrap gap-3" style={{ marginTop: "2rem" }}>
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <a href={mailtoBook} className="btn btn-secondary">
            Email {site.shortName}
          </a>
        </div>
      </div>
    </section>
  );
}
