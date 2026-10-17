import Link from "next/link";
import { footer, nav, navCta } from "@/lib/content/shared";
import { advanta } from "@/lib/content/advanta";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";
import Arrow from "@/components/ui/Arrow";

/** Site footer: a night band with a giant wordmark, the page index, and the legal lines. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="tone-night grain relative overflow-hidden pb-28 pt-20 min-[900px]:pb-10 min-[900px]:pt-28">
      <div className="wrap">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 min-[900px]:col-span-5">
            <p className="serif max-w-[22ch] text-h3 text-fg">{footer.statement}</p>
            <p className="mt-6 max-w-[40ch] text-small text-fg-2">{footer.blurb}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center gap-2 text-lead text-fg"
            >
              <span className="link">{site.email}</span>
              <Arrow dir="up-right" />
            </a>
          </div>

          <nav aria-label="Footer" className="col-span-6 min-[900px]:col-span-2 min-[900px]:col-start-7">
            <h2 className="label mb-5 text-fg-3">{footer.columns.firm}</h2>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                <Link href="/" className="link-quiet text-fg-2 hover:text-fg">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-quiet text-fg-2 hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={navCta.href} className="link-quiet text-fg-2 hover:text-fg">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-6 min-[900px]:col-span-3 min-[900px]:col-start-10">
            <h2 className="label mb-5 text-fg-3">{footer.columns.product}</h2>
            <p className="text-[0.9375rem] font-medium text-fg">{advanta.name}</p>
            <p className="mt-2 text-[0.9375rem] text-fg-2">{footer.productBlurb}</p>
            <a
              href={advanta.urls.home}
              rel="noopener"
              className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] text-fg"
            >
              <span className="link">{footer.productLink}</span>
              <Arrow dir="up-right" />
            </a>
          </div>
        </div>

        {/* Giant wordmark, set to the width of the container. */}
        <div aria-hidden="true" className="mt-24 flex items-end gap-[2vw] select-none">
          <LogoMark className="h-[13.5vw] max-h-[13rem] w-auto flex-none text-fg" />
          <span className="serif block text-[clamp(4.5rem,21.5vw,21rem)] leading-[0.74] tracking-[-0.045em] text-fg">
            Echofive
          </span>
        </div>

        <div className="mt-10 grid gap-6 border-t border-rule pt-8 text-[0.8125rem] leading-relaxed text-fg-3 min-[900px]:grid-cols-[1fr_auto] min-[900px]:items-start">
          <div className="space-y-2">
            <p>
              © {year} {site.legalName} {site.region}.
            </p>
            <p className="max-w-[90ch]">{footer.trademarks}</p>
            <p className="max-w-[90ch]">{footer.disclaimer}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-quiet text-fg-2 hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#top" className="link-quiet inline-flex items-center gap-1 text-fg-2 hover:text-fg">
                {footer.backToTop}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
