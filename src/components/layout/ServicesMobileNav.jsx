import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { STRINGS, langPath } from "@/i18n";
import { SERVICE_NAV_ITEMS, isDedicatedService, isServiceNavItemActive, isServicesSection, serviceNavPath } from "@/data/serviceNavigation";
import { cn } from "@/lib/utils";

/**
 * Mobile treatment of the Services item: the label stays a real link to
 * the index and a separate disclosure button reveals the seven services
 * (open by default when the visitor is already inside the section).
 */
export default function ServicesMobileNav({ lang = "es", linkClassName = "" }) {
  const s = STRINGS[lang];
  const t = s.serviceNav;
  const { pathname } = useLocation();
  const base = langPath(lang, "/services");
  const sectionActive = isServicesSection(pathname, lang);
  const [open, setOpen] = useState(sectionActive);
  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between gap-4">
        <Link to={base} aria-current={sectionActive ? "page" : undefined} className={cn(linkClassName, "border-b-0", sectionActive && "text-accent")}>{s.nav.services}</Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-services-list"
          aria-label={open ? t.close : t.open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-border text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent"
        >
          {open ? <Minus aria-hidden="true" className="h-4 w-4" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>
      <ul id="mobile-services-list" hidden={!open} className="pb-5">
        {SERVICE_NAV_ITEMS.map((item) => {
          const active = isServiceNavItemActive(item, pathname, lang);
          return (
            <li key={item.id}>
              <Link to={serviceNavPath(item, lang)} aria-current={active ? "page" : undefined} className={cn("flex items-center gap-3 py-2.5 text-[15px] font-medium outline-none focus-visible:text-accent", active ? "text-accent" : "text-foreground/85")}>
                <span aria-hidden="true" className={cn("h-1.5 w-1.5 shrink-0 rounded-full", active ? "bg-accent" : isDedicatedService(item) ? "bg-accent/55" : "bg-border")} />
                {t.items[item.id].label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link to={base} className="mt-2 inline-flex items-center gap-1.5 py-1 text-[13px] font-medium text-accent outline-none focus-visible:underline">
            {t.all}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
