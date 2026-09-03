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

/* Free-floating operational fragments — staggered, slightly rotated */
const NODES = [
  { pos: "left-[1%] top-[0%] w-[28%]", rot: "-rotate-2", bar: "#3157F6", lift: true },
  { pos: "left-[62%] top-[3%] w-[30%]", rot: "rotate-[1.5deg]", bar: null, lift: false },
  { pos: "left-[0%] top-[27%] w-[26%]", rot: "rotate-1", bar: null, lift: false },
  { pos: "left-[66%] top-[31%] w-[29%]", rot: "-rotate-[1.5deg]", bar: null, lift: true },
  { pos: "left-[2%] top-[58%] w-[29%]", rot: "rotate-2", bar: null, lift: false },
  { pos: "left-[60%] top-[64%] w-[29%]", rot: "-rotate-1", bar: "#17B4CD", lift: false },
];

/* Interrupted connectors toward the muted central block */
const LINKS = [
  { from: [15, 13], to: [41, 32], amber: true },
  { from: [77, 16], to: [58, 31], amber: false },
  { from: [26, 33], to: [33, 38], amber: false },
  { from: [68, 42], to: [62, 47], amber: false },
  { from: [16, 57], to: [44, 50], amber: true },
  { from: [74, 63], to: [59, 49], amber: false },
];

/**
 * "El problema" supporting visual — a free-form operational-tension
 * field: six displaced mini-surfaces around a muted generic-CRM
 * block, joined only by thin interrupted dashed lines. No frame, no
 * dashboard — a scattered workflow that never connects.
 */
export default function CrmProblemVisual({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div className={cn("relative", className)}>
      <div className="relative h-[420px] md:h-[440px]">
        {/* Atmosphere */}
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-8 h-52 w-52 rounded-full bg-[#17B4CD]/[0.06] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-6 -left-8 h-52 w-52 rounded-full bg-[#3157F6]/[0.07] blur-3xl"
        />

        {/* Interrupted dashed connectors */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
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

        {/* Muted central block — the generic CRM nothing connects to */}
        <div className="absolute left-[34%] top-[34%] w-[30%] -rotate-1 rounded-lg border border-dashed border-[#D8D3C6] bg-[#F5F3ED]/90 px-3 py-2.5">
          <p className="text-center font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#8A8FA0]">
            {t.center}
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-1.5 block h-1 w-1/2 rounded-full bg-[#E3DFD2]"
          />
        </div>

        {/* Displaced operational fragments */}
        {NODES.map((n, i) => (
          <div
            key={t.nodes[i]}
            className={cn(
              "absolute rounded-lg border border-[#E2DDD0] bg-white/90 px-3 py-2.5 backdrop-blur-[2px]",
              n.pos,
              n.rot,
              n.lift
                ? "shadow-[0_18px_40px_-16px_rgba(12,18,32,0.24)]"
                : "shadow-[0_8px_20px_-10px_rgba(12,18,32,0.14)]"
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