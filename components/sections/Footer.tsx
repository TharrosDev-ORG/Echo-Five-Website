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
    <footer className="border-t border-[color:var(--color-rule)] pt-12 pb-10">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 md:items-end justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-[color:var(--color-ink-muted)] leading-[1.6]">
              Change management and Microsoft 365 adoption for the public sector.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[color:var(--color-ink-muted)]">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-[color:var(--color-ink)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-[color:var(--color-rule)] flex flex-col md:flex-row gap-2 justify-between text-xs text-[color:var(--color-ink-muted)]">
          <p>© {year} Echo-Five Consulting · Ottawa, ON</p>
          <p className="font-serif italic">echo-five.ca</p>
        </div>
      </div>
    </footer>
  );
}
