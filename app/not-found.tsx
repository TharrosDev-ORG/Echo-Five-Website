import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "flex", alignItems: "center" }}>
      <div className="u-container">
        <p className="t-coord" style={{ marginBottom: "1.5rem", color: "var(--color-cobalt)" }}>
          Error 404
        </p>
        <h1 className="t-display" style={{ maxWidth: "16ch" }}>
          This page took a detour.
        </h1>
        <p className="t-lead measure-wide" style={{ marginTop: "clamp(1.5rem,3vw,2.25rem)" }}>
          The page you are looking for does not exist or has moved. Let us get you back to
          where the work happens.
        </p>
        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
