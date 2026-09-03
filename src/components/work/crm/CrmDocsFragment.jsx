import { cn } from "@/lib/utils";

const T = {
  es: {
    label: "Documentación",
    docs: [
      { name: "Contrato de arrendamiento", state: "Revisión", tone: "review" },
      { name: "Ficha energética", state: "Aprobado", tone: "approved" },
      { name: "Verificación de identidad", state: "Pendiente", tone: "pending" },
    ],
    checklist: "Checklist · Expediente",
    progress: "2/3",
  },
  en: {
    label: "Documentation",
    docs: [
      { name: "Lease agreement", state: "Review", tone: "review" },
      { name: "Energy certificate", state: "Approved", tone: "approved" },
      { name: "Identity verification", state: "Pending", tone: "pending" },
    ],
    checklist: "Checklist · File",
    progress: "2/3",
  },
};

const TONES = {
  pending: "bg-[#F1EFE9] text-[#8A8FA0]",
  review: "bg-[#FBF3E2] text-[#B45309]",
  approved: "bg-[#EDF2FF] text-[#3157F6]",
};

/**
 * SMALL hero surface — the documentation workflow: document states
 * (pending / review / approved) and the file checklist they feed.
 * Fictional demo data only.
 */
export default function CrmDocsFragment({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div
      className={cn(
        "w-56 overflow-hidden rounded-xl border border-[#E5E1D6] bg-white/95 text-left shadow-[0_22px_44px_-16px_rgba(12,18,32,0.3)] backdrop-blur-sm",
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
        <ul>
          {t.docs.map((d) => (
            <li
              key={d.name}
              className="flex items-center gap-2 border-t border-[#F2EFE7] py-1.5 first:border-t-0"
            >
              <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-[#171C29]">
                {d.name}
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide",
                  TONES[d.tone]
                )}
              >
                {d.state}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center gap-2 border-t border-[#EFEBE0] pt-3">
          <span className="flex-1 text-[9px] font-medium text-[#4A5164]">
            {t.checklist}
          </span>
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3157F6]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#3157F6]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#E3DFD2]" />
          </span>
          <span className="font-mono text-[9px] text-[#9A94A6]">
            {t.progress}
          </span>
        </div>
      </div>
    </div>
  );
}