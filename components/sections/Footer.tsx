import { footer, nav } from "@/lib/content";
import { site } from "@/lib/site";
import LocalTime from "@/components/fx/LocalTime";
import ToTop from "@/components/fx/ToTop";

const ArrowUp = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 15V3m0 0L4 8m5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * The deep-ink close: link columns, live signal row, then the oversized
 * stroked wordmark as the final beat of the page.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--color-ink)", color: "var(--color-paper)" }}>
      <div className="u-container" style={{ paddingBlock: "clamp(4rem,7vw,6rem) clamp(1.5rem,3vw,2.5rem)" }}>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p
              className="font-display"
              style={{ fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: "16ch" }}
            >
              {site.tagline}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="status-dot" aria-hidden="true" />
              <span className="font-mono" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", color: "color-mix(in oklch, var(--color-paper) 70%, transparent)" }}>
                Taking on new engagements · <LocalTime />
              </span>
            </div>
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
            <div className="mt-8">
              <ToTop className="footer-top-btn" aria-label="Back to top">
                <ArrowUp />
              </ToTop>
            </div>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          style={{ borderTop: "1px solid color-mix(in oklch, var(--color-paper) 16%, transparent)", paddingTop: "2rem" }}
        >
          <p className="t-body" style={{ fontSize: "0.82rem", maxWidth: "62ch", color: "color-mix(in oklch, var(--color-paper) 55%, transparent)" }}>
            {footer.disclaimer}
          </p>
          <p className="font-mono" style={{ fontSize: "0.74rem", whiteSpace: "nowrap", color: "color-mix(in oklch, var(--color-paper) 55%, transparent)" }}>
            © {year} {site.legalName}
          </p>
        </div>

        <div style={{ marginTop: "clamp(2rem,4vw,3.5rem)" }}>
          <ToTop className="footer-mega" aria-label="Echofive — back to top">
            Echofive
          </ToTop>
        </div>
      </div>
    </footer>
  );
}
