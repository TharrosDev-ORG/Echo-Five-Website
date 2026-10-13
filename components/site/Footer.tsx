import Link from "next/link";
import { footer, nav } from "@/lib/content";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer on-night">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="wordmark" aria-label={`${site.name}, home`}>
              <span className="wordmark-mark" aria-hidden="true" style={{ background: "var(--color-night-2)" }}>
                E<span>5</span>
              </span>
              <span>
                Echo<span className="accent">five</span>
              </span>
            </Link>
            <p className="t-small" style={{ marginTop: "1.25rem", maxWidth: "36ch" }}>
              {site.tagline} Microsoft 365 change management for Canadian public sector and
              enterprise.
            </p>
            <p className="t-small" style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span className="status-dot" aria-hidden="true" />
              Taking on new engagements
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="t-label" style={{ marginBottom: "1rem" }}>
              Site
            </p>
            <ul className="grid gap-2.5">
              <li>
                <Link href="/" className="footer-link">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="t-label" style={{ marginBottom: "1rem" }}>
              Contact
            </p>
            <ul className="grid gap-2.5">
              <li>
                <a href={`mailto:${site.email}`} className="footer-link">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.advantaUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
                  Advanta365
                </a>
              </li>
              <li className="t-small">{site.region}</li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <p style={{ maxWidth: "70ch" }}>{footer.disclaimer}</p>
          <p>
            © {year} {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
