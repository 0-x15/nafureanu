import { cn } from "@/lib/utils";

const T = {
  es: {
    center: "CRM genérico",
    nodes: ["Leads", "Inmuebles", "Agenda", "Portales", "Documentos", "WhatsApp"],
    annotation: "Datos dentro · operación fuera",
  },
  en: {
    center: "Generic CRM",
    nodes: ["Leads", "Properties", "Calendar", "Portals", "Documents", "WhatsApp"],
    annotation: "Data inside · operations outside",
  },
};

/*
 * SEGMENTED SYSTEM — each operational piece is a staggered rail of
 * modular slices: intelligent segments of the same business, none of
 * them integrated. Every rail trails an interrupted technical lead
 * that stops short of the muted "CRM genérico" block.
 */
const RAILS = [
  { ml: "0%", slices: [[46, "cobalt"], [26], [58], [18]] },
  { ml: "10%", slices: [[30], [50, "cobalt"], [22], [42]] },
  { ml: "4%", slices: [[56], [20], [44, "cobalt"]] },
  { ml: "14%", slices: [[24], [40], [34, "cobalt"], [16]] },
  { ml: "7%", slices: [[50, "cobalt"], [28], [62]] },
  { ml: "16%", slices: [[34, "cyan"], [44], [26]] },
];

const TONES = {
  cobalt: "bg-[#3157F6]",
  cyan: "bg-[#17B4CD]",
};

/**
 * "El problema" supporting visual — a premium segmented composition:
 * the six operational segments of a real-estate agency as modular
 * sliced rails, staggered and drifting apart, each connected to
 * nothing. Abstract, corporate, conceptual — not a dashboard.
 */
export default function CrmProblemVisual({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div className={cn("relative", className)}>
      <div className="relative h-[380px] md:h-[400px]">
        {/* Atmosphere */}
        <div
          aria-hidden="true"
          className="absolute -right-6 -top-6 h-44 w-44 rounded-full bg-[#3157F6]/[0.06] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-4 -left-6 h-44 w-44 rounded-full bg-[#17B4CD]/[0.05] blur-3xl"
        />

        {/* The segmented operational system */}
        <div className="absolute inset-0 flex h-full flex-col justify-center gap-[26px] md:gap-[30px]">
          {RAILS.map((rail, i) => (
            <div
              key={t.nodes[i]}
              className="flex items-center gap-3"
              style={{ marginLeft: rail.ml }}
            >
              <span className="w-16 shrink-0 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-[#4A5164]">
                {t.nodes[i]}
              </span>
              <span className="flex items-center gap-1.5">
                {rail.slices.map(([w, tone], j) => (
                  <span
                    key={j}
                    aria-hidden="true"
                    className={cn(
                      "h-3.5 shadow-[0_6px_14px_-8px_rgba(12,18,32,0.3)]",
                      tone ? TONES[tone] : "bg-[#E9E4D8]"
                    )}
                    style={{ width: w }}
                  />
                ))}
              </span>
              {/* Interrupted technical lead — the workflow never connects */}
              <span aria-hidden="true" className="flex items-center">
                <span className="h-px w-7 border-t border-dashed border-[#C2BCAC]" />
                <span className="ml-px h-1 w-1 rounded-full bg-[#9A94A6]" />
              </span>
            </div>
          ))}
        </div>

        {/* The muted block nothing reaches */}
        <div className="absolute right-[2%] top-1/2 w-[17%] -translate-y-1/2 -rotate-1 rounded-lg border border-dashed border-[#D8D3C6] bg-[#F5F3ED]/90 px-3 py-3">
          <p className="text-center font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#8A8FA0]">
            {t.center}
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-2 block h-1 w-1/2 rounded-full bg-[#E3DFD2]"
          />
        </div>
      </div>

      {/* Minimal annotation */}
      <div className="mt-7 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="h-1 w-1 shrink-0 rounded-full bg-[#9A94A6]"
        />
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9A94A6]">
          {t.annotation}
        </p>
      </div>
    </div>
  );
}