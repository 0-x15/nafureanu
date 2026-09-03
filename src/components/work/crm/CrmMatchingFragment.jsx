import { cn } from "@/lib/utils";

const T = {
  es: {
    label: "Matching automático",
    demand: "Demanda · 3 hab · Zona Norte",
    matches: "Coincidencias",
    rows: [
      { name: "Piso · Zona Norte", score: "92" },
      { name: "Ático · Centro", score: "87" },
      { name: "Chalet · Zona Sur", score: "81" },
    ],
  },
  en: {
    label: "Automatic matching",
    demand: "Demand · 3 bed · North district",
    matches: "Matches",
    rows: [
      { name: "Apartment · North district", score: "92" },
      { name: "Penthouse · City centre", score: "87" },
      { name: "Villa · South district", score: "81" },
    ],
  },
};

/**
 * Hero overlay — a small matching product fragment: one demand, its
 * automatic compatibility matches. Fictional demo data.
 */
export default function CrmMatchingFragment({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div
      className={cn(
        "w-64 overflow-hidden rounded-xl border border-[#E5E1D6] bg-white/95 text-left shadow-[0_26px_50px_-18px_rgba(12,18,32,0.32)] backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#EFEBE0] px-4 py-2.5">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#3157F6]"
        />
        <p className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#4A5164]">
          {t.label}
        </p>
      </div>

      <div className="px-4 py-3">
        <p className="font-mono text-[9px] text-[#9A94A6]">{t.demand}</p>
        <p className="mt-3 text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#8A8FA0]">
          {t.matches}
        </p>
        <ul className="mt-1.5">
          {t.rows.map((r) => (
            <li
              key={r.name}
              className="flex items-center gap-2 border-t border-[#F2EFE7] py-1.5 first:border-t-0"
            >
              <span
                aria-hidden="true"
                className="h-4 w-5 shrink-0 rounded bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]"
              />
              <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-[#171C29]">
                {r.name}
              </span>
              <span className="shrink-0 font-mono text-[10px] font-semibold text-[#3157F6]">
                {r.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}