const T = {
  es: {
    brand: "CRM inmobiliario",
    rows: [
      ["Ático · Ruzafa", "€ 319.000"],
      ["Piso · Malasaña", "€ 265.000"],
    ],
    match: "Matching automático",
  },
  en: {
    brand: "Real-estate CRM",
    rows: [
      ["Penthouse · Ruzafa", "€ 319,000"],
      ["Apartment · Malasaña", "€ 265,000"],
    ],
    match: "Automatic matching",
  },
};

// TODO: replace demo CRM visual with approved sanitized project screenshot.
/** Generic demo CRM fragment for the project card — labels only, no
 *  client interface. Swap the whole composition for an image later. */
export default function CrmCardVisual({ lang = "es" }) {
  const t = T[lang];
  return (
    <div className="w-full max-w-[230px] overflow-hidden rounded-lg border border-[#E5E1D6] bg-white text-left shadow-[0_12px_28px_-14px_rgba(12,18,32,0.25)]">
      <div className="flex items-center gap-2 border-b border-[#EFEBE0] bg-[#F9F7F2] px-3 py-1.5">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#E3DFD2]" />
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#E3DFD2]" />
        <span className="rounded bg-white px-1.5 py-0.5 text-[8px] text-[#9A94A6]">
          {t.brand}
        </span>
      </div>
      <div className="space-y-1.5 p-2.5">
        {t.rows.map(([name, price]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-md border border-[#EFEBE0] px-2 py-1.5"
          >
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 rounded bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]"
              />
              <span className="text-[9px] font-medium text-[#171C29]">{name}</span>
            </span>
            <span className="text-[9px] font-semibold text-[#171C29]">{price}</span>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-md bg-[#EDF2FF] px-2 py-1.5">
          <span className="text-[8px] font-semibold text-[#3157F6]">{t.match}</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 animate-pulse rounded-full bg-[#3157F6]"
          />
        </div>
      </div>
    </div>
  );
}