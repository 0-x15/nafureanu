import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { STRINGS, langPath } from "@/i18n";
import { SERVICE_NAV, isServiceNavItemActive, serviceNavPath } from "@/data/serviceNavigation";
import { cn } from "@/lib/utils";
import { CurrentMark, FOCUS, MONO, pad } from "./mobileMenuBits";

/**
 * The second view of the mobile menu: the technical index of the seven
 * services — numbered across the two groups of the service navigation,
 * a title and one short line each — with the way back at the top and
 * the Services index at the bottom. Destinations come from the shared
 * service navigation; the service of the current page carries the mark.
 */
export default function ServicesMobileNav({ lang = "es", onBack = () => {} }) {
  const s = STRINGS[lang];
  const t = s.serviceNav;
  const { pathname } = useLocation();
  const base = langPath(lang, "/services");
  const count = SERVICE_NAV.groups.reduce((n, g) => n + g.items.length, 0);
  let index = 0;
  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-foreground/12 pb-2">
        <button
          type="button"
          onClick={onBack}
          className={cn("group -ml-2 inline-flex min-h-[44px] items-center gap-2 px-2 text-[14px] font-medium text-foreground transition-colors hover:text-accent", FOCUS)}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-[2px]" />
          {s.nav.menu.back}
        </button>
        <p className={cn(MONO, "text-muted-foreground")}>01 — {pad(count)}</p>
      </div>
      <h2 id="mm-services-title" className="mt-6 font-heading text-[clamp(1.9rem,8vw,2.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground">
        {s.nav.services}
      </h2>
      <nav aria-labelledby="mm-services-title" className="mt-2">
        {SERVICE_NAV.groups.map((g) => (
          <div key={g.id} className="mt-5">
            <p className={cn(MONO, "text-muted-foreground")}>{t.groups[g.id]}</p>
            <ol className="mt-1">
              {g.items.map((item) => {
                index += 1;
                const copy = t.items[item.id];
                const active = isServiceNavItemActive(item, pathname, lang);
                return (
                  <li key={item.id} className="border-b border-foreground/10">
                    <Link
                      to={serviceNavPath(item, lang)}
                      aria-current={active ? "page" : undefined}
                      className={cn("group relative grid grid-cols-[1.75rem_1fr_auto] items-start gap-x-3 py-3.5", FOCUS)}
                    >
                      <span className={cn(MONO, "pt-[5px]", active ? "text-accent" : "text-muted-foreground")}>{pad(index)}</span>
                      <span className="min-w-0">
                        <span className={cn("block font-heading text-[17px] font-bold leading-tight tracking-[-0.02em]", active ? "text-accent" : "text-foreground")}>{copy.label}</span>
                        <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground">{copy.short}</span>
                      </span>
                      <ArrowRight aria-hidden="true" className={cn("mt-[3px] h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px]", active ? "text-accent" : "text-foreground/35")} />
                      {active && <CurrentMark />}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </nav>
      <Link
        to={base}
        aria-current={pathname === base ? "page" : undefined}
        className={cn("group relative mt-6 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-accent transition-colors hover:text-accent-deep", FOCUS)}
      >
        {t.all}
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" />
        {pathname === base && <CurrentMark />}
      </Link>
    </>
  );
}
