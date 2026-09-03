import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { CAPABILITIES } from "@/data/capabilities";
import { STRINGS, langPath } from "@/i18n";
import LanguageSwitch from "@/components/LanguageSwitch";

const linkClass =
  "text-muted-foreground transition-colors hover:text-foreground";

const labelClass =
  "text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground";

/**
 * Global footer — the final layer of the corporate system: a crawlable
 * company statement, a site-architecture map with real internal links,
 * and a thin legal/utility bar. Service links currently point at the
 * existing /services anchors (h2 ids) and can be redirected to future
 * dedicated service pages by changing the SERVICE_HREF map below.
 */
const SERVICE_HREF = {
  "custom-software": "/services#custom-software",
  "ai-automation": "/services#ai-automation",
  "business-systems": "/services#business-systems",
  "odoo-engineering": "/services#odoo-engineering",
  "integrations-apis": "/services#integrations-apis",
  "web-digital": "/services#web-digital",
  "web3-payments": "/services#web3-payments",
};

export default function Footer({ lang = "es" }) {
  const s = STRINGS[lang];
  const f = s.footer;
  const year = new Date().getFullYear();

  const navLinks = [
    { to: "/", label: f.home },
    { to: "/services", label: s.nav.services },
    { to: "/work", label: s.nav.work },
    { to: "/about", label: s.nav.about },
    { to: "/contact", label: f.contact },
  ];

  const workLinks = [
    { to: "/work", label: s.nav.work },
    { to: "/work/sophia", label: "SophIA" },
    { to: "/work/fivo", label: "Fivo" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        {/* Level 1 — company statement */}
        <div className="grid gap-10 border-b border-border pb-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Link
              to={langPath(lang, "/")}
              className="inline-flex items-center gap-2.5 font-heading text-[28px] font-bold tracking-[-0.02em] text-foreground md:text-4xl"
            >
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-accent"
              />
              Nafureanu
            </Link>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {SITE.description[lang]}
            </p>
            <p className="mt-5 font-heading text-sm font-bold tracking-[-0.01em] text-foreground">
              {SITE.tagline[lang]}
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="max-w-xs text-sm font-medium leading-relaxed text-foreground">
              {f.ctaQuestion}
            </p>
            <Link
              to={langPath(lang, "/contact")}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-[#1E44D6]"
            >
              {s.nav.start}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Level 2 — site architecture */}
        <div className="grid gap-10 pt-12 sm:grid-cols-2 md:grid-cols-12">
          <nav aria-label={f.nav} className="md:col-span-2">
            <p className={labelClass}>{f.nav}</p>
            <ul className="mt-5 space-y-2.5 text-[13px]">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link className={linkClass} to={langPath(lang, l.to)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={f.services} className="md:col-span-4">
            <p className={labelClass}>{f.services}</p>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-[13px] sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <li key={c.id}>
                  <Link
                    className={linkClass}
                    to={langPath(lang, SERVICE_HREF[c.id] || "/services")}
                  >
                    {c.copy[lang].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={f.work} className="md:col-span-3">
            <p className={labelClass}>{f.work}</p>
            <ul className="mt-5 space-y-2.5 text-[13px]">
              {workLinks.map((l) => (
                <li key={l.to}>
                  <Link className={linkClass} to={langPath(lang, l.to)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className={labelClass}>{f.contact}</p>
            <address className="mt-5 text-[13px] not-italic">
              <a
                href={`mailto:${SITE.email}`}
                className={linkClass}
              >
                {SITE.email}
              </a>
            </address>
            <ul className="mt-2.5 text-[13px]">
              <li>
                <Link className={linkClass} to={langPath(lang, "/contact")}>
                  {s.nav.start}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Level 3 — legal / utility bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
          <span>
            © {year} Nafureanu — {f.rights}
          </span>
          <span>{SITE.tagline[lang]}</span>
          <LanguageSwitch lang={lang} />
        </div>
      </div>
    </footer>
  );
}