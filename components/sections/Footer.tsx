import { Logo } from "@/components/Logo";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-2 border-ink pt-12 pb-10">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 md:items-end">
          <div className="md:col-span-6">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-muted leading-[1.6]">
              Change management and Microsoft 365 adoption for the public sector.
            </p>
          </div>
          <nav className="md:col-span-6 flex flex-wrap gap-x-8 gap-y-2 text-sm uppercase tracking-[0.08em] text-ink-muted md:justify-end">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-keyline flex flex-col md:flex-row gap-2 justify-between text-xs text-ink-muted">
          <p>© {year} Echo-Five Consulting · Founded by Mark Abdelnour · Ottawa, ON</p>
          <p className="font-display font-bold uppercase tracking-[0.04em]">echo-five.ca</p>
        </div>
      </div>
    </footer>
  );
}
