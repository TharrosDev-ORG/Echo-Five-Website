import { nav, footer } from "@/lib/content";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep text-muted-on-dark">
      <div className="u-container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-2.5 text-paper">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <g fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="12" r="7" opacity="0.55" />
                  <circle cx="12" cy="12" r="11" opacity="0.28" />
                  <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
                </g>
              </svg>
              <span className="font-mono text-[0.92rem] font-medium tracking-[0.16em]">
                {site.callsign}
              </span>
            </div>
            <p className="t-body mt-5 max-w-[34ch] text-muted-on-dark">{site.tagline}</p>
          </div>

          <nav className="lg:col-span-4" aria-label="Footer">
            <ul className="grid grid-cols-2 gap-y-2 font-mono text-[0.8rem] tracking-[0.04em]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-signal">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <a
              href={`mailto:${site.email}`}
              className="break-words font-mono text-[0.8rem] tracking-[0.04em] text-paper transition-colors hover:text-signal"
            >
              {site.email}
            </a>
            <p className="mt-3 font-mono text-[0.78rem] tracking-[0.04em]">{site.region}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-dark pt-6 text-[0.74rem] leading-relaxed md:flex-row md:items-start md:justify-between">
          <p className="font-mono tracking-[0.04em]">
            &copy; {year} {site.legalName}
          </p>
          <p className="max-w-[60ch] opacity-80">{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
