import { langPath } from "@/i18n";
import { SERVICES, servicePath } from "./services";

/**
 * Commercial service navigation — the single source of truth for the
 * desktop dropdown and the mobile accordion. It is deliberately separate
 * from SERVICES (which only lists services that have a dedicated page):
 * an item points either at a dedicated service (`service`) or, until its
 * page exists, at a section of the Services index (`anchor`). Upgrading a
 * service later means replacing `anchor` with `service` on one entry.
 * Labels and microcopy live in i18n under `serviceNav.items[id]`.
 */
/**
 * @typedef {{ id: string, service?: string, anchor?: string }} ServiceNavItem
 * @type {{ groups: { id: string, items: ServiceNavItem[] }[], specialities: ServiceNavItem[] }}
 */
export const SERVICE_NAV = {
  groups: [
    {
      id: "systems",
      items: [
        { id: "crm-real-estate", service: "crm-real-estate" },
        { id: "business-systems", service: "business-systems" },
        { id: "custom-software", service: "custom-software" },
      ],
    },
    {
      id: "product",
      items: [
        { id: "ai-automation", service: "ai-automation" },
        { id: "saas", service: "saas" },
        { id: "integrations-apis", service: "integrations-apis" },
        { id: "web-digital", service: "web-digital" },
      ],
    },
  ],
  // The footer line of the menu: the four areas Nafureanu wants to be known
  // for, each pointing at its dedicated service page.
  specialities: [
    { id: "software", service: "custom-software" },
    { id: "ai", service: "ai-automation" },
    { id: "web", service: "web-digital" },
    { id: "crm", service: "business-systems" },
  ],
};

export const SERVICE_NAV_ITEMS = SERVICE_NAV.groups.flatMap((g) => g.items);

/** True when the item has its own dedicated service page. */
export const isDedicatedService = (item) => Boolean(item.service && SERVICES.some((s) => s.id === item.service));

/** Localized destination: the dedicated page when it exists, else the Services index section. */
export function serviceNavPath(item, lang) {
  const service = item.service ? SERVICES.find((s) => s.id === item.service) : null;
  if (service) return servicePath(service, lang);
  return langPath(lang, `/services#${item.anchor}`);
}

/** The Services section is active on /services and on every dedicated service route. */
export function isServicesSection(pathname, lang) {
  const base = langPath(lang, "/services");
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** A dedicated service item is active only on its own route. */
export const isServiceNavItemActive = (item, pathname, lang) => isDedicatedService(item) && serviceNavPath(item, lang) === pathname;
