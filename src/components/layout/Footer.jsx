import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { CAPABILITIES } from "@/data/capabilities";
import { STRINGS, langPath } from "@/i18n";
import LanguageSwitch from "@/components/LanguageSwitch";
import { LogoLockup } from "@/components/brand/Logo";

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
  /* /work keeps its light #F2F5FA environment through the footer */
  const { pathname } = useLocation();
  const isWorkIndex = pathname === "/work" || pathname === "/en/work";

  const navLinks = [
    { to: "/", label: f.home },
    { to: "/services", label: s.nav.services },
    { to: "/work", label: s.nav.work },
    { to: "/about", label: s.nav.about },
    { to: "/contact", label: f.contact },
  ];

  const workLinks = [
    { to: "/work", label: s.nav.work },
    {
      to: `/work/${lang === "en" ? "real-estate-crm" : "crm-inmobiliario"}`,
      label: f.crm,
    },
    { to: "/work/fivo", label: "Fivo" },
  ];

  return (
    <footer
      className={
        isWorkIndex ? "border-t border-border bg-[#F2F5FA]" : "border-t border-border"
      }
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        {/* Level 1 — brand masthead: the company signature at the end of every page */}
        <div className="border-b border-border pb-14 md:pb-16">
          <Link
            to={langPath(lang, "/")}
            className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
            aria-label={`Nafureanu — ${f.home}`}
          >
            <LogoLockup size="clamp(40px, 6vw, 88px)" />
          </Link>

          <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end md:gap-10">
            <p className="max-w-[16ch] font-heading text-[30px] font-bold leading-[1.02] tracking-[-0.03em] text-foreground [text-wrap:balance] md:col-span-7 md:text-[clamp(32px,3.4vw,52px)]">
              {SITE.tagline[lang]}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-5 md:text-[15px]">
              {SITE.description[lang]}
            </p>
          </div>

          {/* the question and the action share one baseline */}
          <div className="mt-12 border-t border-foreground/15 pt-6 md:mt-14 md:grid md:grid-cols-12 md:items-baseline md:gap-10">
            <p className="max-w-md font-heading text-lg font-medium leading-snug tracking-[-0.01em] text-foreground md:col-span-7 md:text-2xl">
              {f.ctaQuestion}
            </p>
            <div className="mt-5 md:col-span-5 md:mt-0 md:text-right">
              <Link
                to={langPath(lang, "/contact")}
                className="group relative inline-flex items-center gap-2 pb-2 font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:text-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:text-[13px]"
              >
                {s.nav.start}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px]" />
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-foreground/25" />
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </Link>
            </div>
          </div>
        </div>

        {/* Level 2 — site architecture */}
        <div className="grid gap-10 pt-12 sm:grid-cols-2 md:grid-cols-12 md:pt-14">
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