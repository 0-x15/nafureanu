import { cn } from "@/lib/utils";

const T = {
  es: {
    brand: "CRM inmobiliario",
    nav: ["Operaciones", "Propiedades", "Clientes", "Matching", "Automatización"],
    rows: [
      ["Ático · Ruzafa", "€ 319.000"],
      ["Piso · Malasaña", "€ 265.000"],
    ],
    match: "Matching automático",
  },
  en: {
    brand: "Real-estate CRM",
    nav: ["Operations", "Properties", "Clients", "Matching", "Automation"],
    rows: [
      ["Penthouse · Ruzafa", "€ 319,000"],
      ["Apartment · Malasaña", "€ 265,000"],
    ],
    match: "Automatic matching",
  },
};

// TODO: replace demo CRM visual with approved sanitized project screenshot.
/** Generic demo CRM surface for the project card — labels only, no
 *  client interface. Swap the whole composition for an image later. */
export default function CrmCardVisual({ lang = "es" }) {
  const t = T[lang];
  return (
    <div className="w-full max-w-[430px] overflow-hidden rounded-lg border border-[#E5E1D6] bg-white text-left shadow-[0_24px_48px_-24px_rgba(12,18,32,0.3)]">
      <div className="flex items-center gap-2.5 border-b border-[#EFEBE0] bg-[#F9F7F2] px-3.5 py-2">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#E3DFD2]" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#E3DFD2]" />
        <span className="ml-1 rounded bg-white px-2 py-0.5 text-[9px] text-[#9A94A6]">
          {t.brand}
        </span>
      </div>
      <div className="flex">
        <aside className="w-28 shrink-0 space-y-1 border-r border-[#EFEBE0] p-3">
          {t.nav.map((item, i) => (
            <span
              key={item}
              className={cn(
                "block rounded px-2 py-1 text-[9px]",
                i === 3
                  ? "bg-[#EDF2FF] font-semibold text-[#3157F6]"
                  : "text-[#8A8FA0]"
              )}
            >
              {item}
            </span>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-3">
          {t.rows.map(([name, price]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-md border border-[#EFEBE0] px-2.5 py-2"
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-5 w-5 rounded bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]"
                />
                <span className="text-[10px] font-medium text-[#171C29]">{name}</span>
              </span>
              <span className="text-[10px] font-semibold text-[#171C29]">{price}</span>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-between rounded-md bg-[#EDF2FF] px-2.5 py-2">
            <span className="text-[9px] font-semibold text-[#3157F6]">{t.match}</span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3157F6]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}