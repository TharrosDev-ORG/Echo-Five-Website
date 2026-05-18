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
    <footer className="border-t border-[color:var(--color-rule)] py-12">
      <div className="container-tight flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <Logo />
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
        <p className="text-xs text-[color:var(--color-ink-muted)]">
          © {year} Echo-Five Consulting · Ottawa
        </p>
      </div>
    </footer>
  );
}
