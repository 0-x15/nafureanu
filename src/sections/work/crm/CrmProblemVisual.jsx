import { cn } from "@/lib/utils";

const T = {
  es: {
    center: "CRM genérico",
    nodes: ["Leads", "Inmuebles", "Agenda", "Portales", "Documentos", "WhatsApp"],
    annotation: "Datos dentro · Operación fuera",
  },
  en: {
    center: "Generic CRM",
    nodes: ["Leads", "Properties", "Calendar", "Portals", "Documents", "WhatsApp"],
    annotation: "Data inside · Operations outside",
  },
};

/* Fragments alternating along the broken central spine */
const NODES = [
  { pos: "left-[3%] top-[2%] w-[35%]", rot: "-rotate-1", bar: "#3157F6" },
  { pos: "left-[62%] top-[13%] w-[35%]", rot: "rotate-[1.5deg]", bar: null },
  { pos: "left-[3%] top-[35%] w-[35%]", rot: "rotate-[1.5deg]", bar: null },
  { pos: "left-[62%] top-[46%] w-[35%]", rot: "-rotate-1", bar: null },
  { pos: "left-[3%] top-[68%] w-[35%]", rot: "-rotate-[1.5deg]", bar: null },
  { pos: "left-[62%] top-[79%] w-[35%]", rot: "rotate-1", bar: "#17B4CD" },
];

/* Interrupted stubs toward the spine — the workflow never connects */
const LINKS = [
  { from: [38, 8], to: [46, 8], amber: true },
  { from: [62, 19], to: [54, 19], amber: false },
  { from: [36, 36], to: [46, 32], amber: false },
  { from: [62, 53], to: [54, 53], amber: false },
  { from: [38, 74], to: [46, 76], amber: true },
  { from: [62, 85], to: [54, 87], amber: false },
];

/**
 * "El problema" supporting visual — a broken-pipeline composition:
 * one central vertical spine, severed where the muted "CRM genérico"
 * block sits, with the six operational fragments alternating left
 * and right, attached by nothing but short interrupted stubs.
 * Conceptual and corporate, not a dashboard.
 */
export default function CrmProblemVisual({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div className={cn("relative", className)}>
      <div className="relative h-[440px] md:h-[460px]">
        {/* Atmosphere */}
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-8 h-52 w-52 rounded-full bg-[#17B4CD]/[0.06] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-6 -left-8 h-52 w-52 rounded-full bg-[#3157F6]/[0.07] blur-3xl"
        />

        {/* Spine + interrupted stubs */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {/* The severed spine */}
          <line
            x1="50"
            y1="2"
            x2="50"
            y2="37"
            stroke="#A9A4B5"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="98"
            stroke="#A9A4B5"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />

          {/* Stubs that never reach the spine */}
          {LINKS.map((l) => (
            <g key={`${l.from[0]}-${l.from[1]}`}>
              <line
                x1={l.from[0]}
                y1={l.from[1]}
                x2={l.to[0]}
                y2={l.to[1]}
                stroke="#A9A4B5"
                strokeWidth="1"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={l.to[0]}
                cy={l.to[1]}
                r="0.8"
                fill={l.amber ? "#D97706" : "#9A94A6"}
              />
            </g>
          ))}
        </svg>

        {/* Muted central block — where the pipeline breaks */}
        <div className="absolute left-[39.5%] top-[40%] w-[21%] -rotate-1 rounded-lg border border-dashed border-[#D8D3C6] bg-[#F5F3ED]/90 px-3 py-2.5">
          <p className="text-center font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#8A8FA0]">
            {t.center}
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-1.5 block h-1 w-1/2 rounded-full bg-[#E3DFD2]"
          />
        </div>

        {/* Alternating operational fragments */}
        {NODES.map((n, i) => (
          <div
            key={t.nodes[i]}
            className={cn(
              "absolute rounded-lg border border-[#E2DDD0] bg-white/90 px-3 py-2.5 shadow-[0_10px_24px_-12px_rgba(12,18,32,0.16)] backdrop-blur-[2px]",
              n.pos,
              n.rot
            )}
          >
            <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#4A5164]">
              {t.nodes[i]}
            </p>
            <span
              aria-hidden="true"
              className="mt-1.5 block h-1 w-[72%] rounded-full"
              style={{ background: n.bar || "#EAE6DA" }}
            />
            <span
              aria-hidden="true"
              className="mt-1 block h-1 w-[45%] rounded-full bg-[#EAE6DA]"
            />
          </div>
        ))}
      </div>

      {/* Annotation */}
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