import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ minHeight: "50vh", display: "grid", alignContent: "center" }}>
        <p className="t-muted">Error 404: page not found</p>
        <h1 className="t-h1" style={{ marginTop: "1rem", maxWidth: "18ch" }}>
          This page does not exist.
        </h1>
        <p className="t-lead" style={{ marginTop: "1.5rem", maxWidth: "52ch" }}>
          It may have moved when the site was reorganized. Everything is a click away from the
          home page.
        </p>
        <div className="flex flex-wrap gap-3" style={{ marginTop: "2rem" }}>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
