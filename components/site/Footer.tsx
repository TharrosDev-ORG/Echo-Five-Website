import { footer } from "@/lib/content";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-bg-deep" role="contentinfo">
      <div className="u-container flex flex-col gap-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <p className="t-coord flex items-center gap-3 text-ink">
            <span className="status-dot" aria-hidden="true" />
            {site.callsign}
          </p>
          <p className="t-coord text-ink-muted">{site.region}</p>
          <a href={`mailto:${site.email}`} className="t-coord text-signal underline-offset-4 hover:underline">
            {site.email}
          </a>
        </div>
        <p className="max-w-3xl font-mono text-[0.72rem] leading-relaxed text-ink-muted">
          {footer.disclaimer}
        </p>
        <p className="t-coord text-ink-muted">
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </div>
    </footer>
  );
}
