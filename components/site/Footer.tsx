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
            <Link href="/" className="wordmark">
              Echofive<span className="wordmark-sub">Solutions</span>
            </Link>
            <p className="t-small" style={{ marginTop: "var(--s-3)", maxWidth: "40ch" }}>
              Microsoft 365 change management for Canadian public sector and enterprise
              organizations. {site.region}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer-heading">Pages</h2>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer-heading">Contact</h2>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.advantaUrl} target="_blank" rel="noopener noreferrer">
                  Advanta365
                </a>
              </li>
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
