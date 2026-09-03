import { cn } from "@/lib/utils";

const T = {
  es: {
    label: "Matching automático",
    auto: "Automático",
    demand: "Demanda",
    chips: ["3 hab", "Zona Norte", "Presupuesto"],
    matches: "Coincidencias",
    rows: [
      { name: "Piso · Zona Norte", score: "92", action: "Visita" },
      { name: "Ático · Centro", score: "87", action: "Seguimiento" },
      { name: "Chalet · Zona Sur", score: "81", action: "Visita" },
    ],
  },
  en: {
    label: "Automatic matching",
    auto: "Automatic",
    demand: "Demand",
    chips: ["3 bed", "North district", "Budget"],
    matches: "Matches",
    rows: [
      { name: "Apartment · North district", score: "92", action: "Visit" },
      { name: "Penthouse · City centre", score: "87", action: "Follow-up" },
      { name: "Villa · South district", score: "81", action: "Visit" },
    ],
  },
};

/**
 * LARGE hero surface — the matching engine: one demand with its
 * criteria, the compatible properties it finds and the actions each
 * match leads to. Fictional demo data only.
 */
export default function CrmMatchingSurface({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-[#E5E1D6] bg-white text-left shadow-[0_36px_70px_-24px_rgba(12,18,32,0.3)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#EFEBE0] bg-[#F9F7F2] px-4 py-2.5">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#3157F6]"
        />
        <p className="flex-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#4A5164]">
          {t.label}
        </p>
        <span className="rounded-full bg-[#EDF2FF] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-[#3157F6]">
          {t.auto}
        </span>
      </div>

      <div className="p-4">
        {/* Demand */}
        <p className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#8A8FA0]">
          {t.demand}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {t.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[#E3E8F2] bg-[#F6F8FC] px-2.5 py-1 font-mono text-[9px] text-[#4A5164]"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Matches */}
        <p className="mt-4 text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#8A8FA0]">
          {t.matches}
        </p>
        <ul className="mt-1.5">
          {t.rows.map((r) => (
            <li
              key={r.name}
              className="flex items-center gap-2.5 border-t border-[#F2EFE7] py-2.5 first:border-t-0"
            >
              <span
                aria-hidden="true"
                className="h-8 w-10 shrink-0 rounded-md bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[10px] font-semibold text-[#171C29]">
                  {r.name}
                </span>
                <span className="mt-1 block h-1 w-3/4 rounded-full bg-[#EAE6DA]" />
              </span>
              <span className="shrink-0 font-mono text-[11px] font-semibold text-[#3157F6]">
                {r.score}
              </span>
              <span className="shrink-0 rounded-md border border-[#C9D6F3] bg-[#EDF2FF] px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-[#3157F6]">
                {r.action}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}