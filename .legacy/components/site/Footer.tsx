import Link from "next/link";
import { advanta, footer, nav, navCta, ui } from "@/lib/content";
import { site } from "@/lib/site";
import Container from "@/components/ui/Container";
import { External } from "@/components/ui/icons";
import Logo from "@/components/site/Logo";

// 44px minimum target in both directions, so short labels like "Home" stay easy to tap.
const linkClass =
  "inline-flex min-h-11 min-w-11 items-center gap-1.5 text-[0.975rem] text-on-dark-2 no-underline transition-colors hover:text-on-dark hover:underline";

export default function Footer() {
  const year = new Date().getFullYear();
  const pages = [{ label: ui.homeLabel, href: "/" }, ...nav, { label: "Contact", href: navCta.href }];

  return (
    <footer className="site-footer surface-dark border-t border-edge" data-site-footer="">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-sm text-small text-fg-2">
              {footer.blurb} {site.region}.
            </p>
          </div>

          <nav id="footer-nav" aria-labelledby="footer-pages-heading">
            <h2 id="footer-pages-heading" className="font-sans text-small font-semibold text-fg">
              {footer.pagesHeading}
            </h2>
            <ul className="mt-3">
              {pages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-small font-semibold text-fg">{footer.contactHeading}</h2>
            <ul className="mt-3">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </li>
              <li className="mt-1 text-small text-fg-2">{site.region}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-small font-semibold text-fg">{footer.productHeading}</h2>
            <p className="mt-3 text-small text-fg-2">{footer.productBlurb}</p>
            <ul className="mt-2">
              <li>
                <Link href="/product" className={linkClass}>
                  {advanta.cta.explore}
                </Link>
              </li>
              <li>
                <a href={advanta.urls.home} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {footer.productLink}
                  <External size={14} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative: the real name is in the logo and copyright. Clipped to the container. */}
        <p aria-hidden="true" className="footer-wordmark mt-14 text-mega leading-[0.8] text-fg">
          {site.shortName}
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-edge pt-6 text-label text-fg-2 md:flex-row md:justify-between md:gap-10">
          <p className="max-w-3xl">
            {footer.trademarks} {advanta.disclaimer}
          </p>
          <p className="shrink-0">
            © {year} {site.legalName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
