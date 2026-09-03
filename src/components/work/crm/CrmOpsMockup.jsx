import { cn } from "@/lib/utils";

const T = {
  es: {
    brand: "CRM Inmobiliario",
    nav: ["Inicio", "Inmuebles", "Clientes", "Operaciones"],
    search: "Buscar inmueble, cliente o referencia",
    tabs: ["Cruces", "Visitas", "Operación", "Alertas", "WhatsApp"],
    results: "128 resultados",
    filterTitle: "Filtros",
    filters: ["Zona", "Tipo", "Precio", "Habitaciones"],
    properties: [
      {
        title: "Piso · Zona Norte",
        ref: "REF-1042",
        meta: "3 hab · 2 baños · 92 m²",
        price: "€ 248.000",
        status: "Nuevo",
      },
      {
        title: "Ático · Centro urbano",
        ref: "REF-2210",
        meta: "2 hab · 1 baño · 74 m²",
        price: "€ 195.000",
        status: "Reservado",
      },
      {
        title: "Chalet · Zona Sur",
        ref: "REF-3078",
        meta: "4 hab · 3 baños · 180 m²",
        price: "€ 410.000",
        status: "Activo",
      },
    ],
  },
  en: {
    brand: "Real Estate CRM",
    nav: ["Home", "Properties", "Clients", "Operations"],
    search: "Search property, client or reference",
    tabs: ["Matches", "Visits", "Operation", "Alerts", "WhatsApp"],
    results: "128 results",
    filterTitle: "Filters",
    filters: ["Area", "Type", "Price", "Bedrooms"],
    properties: [
      {
        title: "Apartment · North district",
        ref: "REF-1042",
        meta: "3 bed · 2 bath · 92 m²",
        price: "€ 248,000",
        status: "New",
      },
      {
        title: "Penthouse · City centre",
        ref: "REF-2210",
        meta: "2 bed · 1 bath · 74 m²",
        price: "€ 195,000",
        status: "Reserved",
      },
      {
        title: "Villa · South district",
        ref: "REF-3078",
        meta: "4 bed · 3 bath · 180 m²",
        price: "€ 410,000",
        status: "Active",
      },
    ],
  },
};

/**
 * Sanitized operational CRM surface — inspired by a real working
 * layout (blue navigation, filter rail, property records, operation
 * tabs) but fully fictional: neutral branding, invented generic
 * references, no private names, towns or client data.
 */
export default function CrmOpsMockup({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-[#E5E1D6] bg-white text-left shadow-[0_36px_70px_-24px_rgba(12,18,32,0.28)]",
        className
      )}
    >
      {/* Blue top navigation */}
      <div className="flex h-11 items-center gap-5 bg-gradient-to-r from-[#2348E8] via-[#3157F6] to-[#3D63F9] px-4">
        <p className="font-heading text-[13px] font-bold tracking-tight text-white">
          {t.brand}
        </p>
        <nav aria-hidden="true" className="hidden gap-4 md:flex">
          {t.nav.map((item) => (
            <span
              key={item}
              className="text-[10px] font-medium text-white/65 first:text-white"
            >
              {item}
            </span>
          ))}
        </nav>
        <span className="ml-auto hidden items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 text-[9px] text-white/80 sm:flex">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/70" />
          {t.search}
        </span>
        <span
          aria-hidden="true"
          className="h-5 w-5 shrink-0 rounded-full bg-white/25"
        />
      </div>

      {/* Operational tabs */}
      <div className="flex items-center gap-5 overflow-x-auto border-b border-[#EAE6DC] px-4 py-2.5">
        {t.tabs.map((tab, i) => (
          <span
            key={tab}
            className={cn(
              "relative shrink-0 text-[10px] font-medium tracking-wide",
              i === 0 ? "text-[#3157F6]" : "text-[#8A8FA0]"
            )}
          >
            {tab}
            {i === 0 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-[11px] left-0 h-[2px] w-full rounded-full bg-[#3157F6]"
              />
            )}
          </span>
        ))}
      </div>

      {/* Body — filter rail + property records */}
      <div className="flex">
        <div className="hidden w-36 shrink-0 border-r border-[#EAE6DC] bg-[#F9F7F2] p-4 sm:block">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9A94A6]">
            {t.filterTitle}
          </p>
          <div className="mt-4 space-y-4">
            {t.filters.map((f, i) => (
              <div key={f}>
                <p className="text-[10px] font-medium text-[#171C29]">{f}</p>
                <span
                  aria-hidden="true"
                  className="mt-1.5 block h-1 rounded-full bg-[#E3DFD2]"
                  style={{ width: `${76 - i * 12}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium text-[#9A94A6]">{t.results}</p>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#3157F6]"
            />
          </div>

          <ul className="mt-2">
            {t.properties.map((p) => (
              <li
                key={p.ref}
                className="flex items-center gap-3 border-t border-[#EFEBE0] py-2.5 first:border-t-0"
              >
                <span
                  aria-hidden="true"
                  className="h-9 w-11 shrink-0 rounded-md bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[11px] font-semibold text-[#171C29]">
                      {p.title}
                    </span>
                    <span className="shrink-0 font-heading text-[11px] font-bold text-[#171C29]">
                      {p.price}
                    </span>
                  </span>
                  <span className="mt-0.5 flex items-baseline justify-between gap-3">
                    <span className="truncate font-mono text-[9px] text-[#9A94A6]">
                      {p.ref} · {p.meta}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide",
                        p.status === "Nuevo" || p.status === "New"
                          ? "bg-[#EDF2FF] text-[#3157F6]"
                          : p.status === "Activo" || p.status === "Active"
                            ? "bg-[#EDF2FF] text-[#3157F6]"
                            : "bg-[#F1EFE9] text-[#8A8FA0]"
                      )}
                    >
                      {p.status}
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}