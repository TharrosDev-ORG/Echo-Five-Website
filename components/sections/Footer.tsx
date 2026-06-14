import { footer, nav } from "@/lib/content";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rule-top" style={{ background: "var(--color-ink)", color: "var(--color-paper)" }}>
      <div className="u-container" style={{ paddingBlock: "clamp(4rem,8vw,7rem)" }}>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <a
              href="#top"
              className="font-display"
              style={{ fontWeight: 760, fontSize: "clamp(2.5rem,7vw,5rem)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
            >
              Echo<span style={{ color: "var(--color-cobalt)" }}>five</span>
            </a>
            <p className="t-body" style={{ marginTop: "1.5rem", maxWidth: "32ch", color: "color-mix(in oklch, var(--color-paper) 70%, transparent)" }}>
              {site.tagline}
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <div className="t-coord" style={{ color: "color-mix(in oklch, var(--color-paper) 55%, transparent)", marginBottom: "1.25rem" }}>
              Navigate
            </div>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="footer-link" data-cursor>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <div className="t-coord" style={{ color: "color-mix(in oklch, var(--color-paper) 55%, transparent)", marginBottom: "1.25rem" }}>
              Contact
            </div>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${site.email}`} className="footer-link" data-cursor>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.advantaUrl} target="_blank" rel="noopener noreferrer" className="footer-link" data-cursor>
                  Advanta365
                </a>
              </li>
              <li style={{ color: "color-mix(in oklch, var(--color-paper) 60%, transparent)" }}>{site.region}</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          style={{ borderTop: "1px solid color-mix(in oklch, var(--color-paper) 16%, transparent)", paddingTop: "2rem" }}
        >
          <p className="t-body" style={{ fontSize: "0.82rem", maxWidth: "62ch", color: "color-mix(in oklch, var(--color-paper) 55%, transparent)" }}>
            {footer.disclaimer}
          </p>
          <p className="font-mono" style={{ fontSize: "0.74rem", whiteSpace: "nowrap", color: "color-mix(in oklch, var(--color-paper) 55%, transparent)" }}>
            © {year} {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
