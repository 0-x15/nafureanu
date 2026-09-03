import { cn } from "@/lib/utils";

const T = {
  es: {
    kicker: "Operación fragmentada",
    center: "CRM GENÉRICO",
    nodes: ["LEADS", "INMUEBLES", "AGENDA", "PORTALES", "DOCUMENTOS", "WHATSAPP"],
    annotation: "Datos dentro · Operación fuera",
  },
  en: {
    kicker: "Fragmented operation",
    center: "GENERIC CRM",
    nodes: ["LEADS", "PROPERTIES", "CALENDAR", "PORTALS", "DOCUMENTS", "WHATSAPP"],
    annotation: "Data inside · Operations outside",
  },
};

/* Chip positions — three above the block, three below */
const CHIPS = [
  { x: 84, y: 14 },
  { x: 240, y: 14 },
  { x: 396, y: 14 },
  { x: 84, y: 256 },
  { x: 240, y: 256 },
  { x: 396, y: 256 },
];

/*
 * Interrupted connectors — dashed lines that stop short of the
 * central block. Two carry a small amber friction dot (the manual
 * handoff); the rest simply never reach the system.
 */
const LINKS = [
  { from: [84, 46], to: [160, 128], amber: false },
  { from: [240, 46], to: [240, 104], amber: true },
  { from: [396, 46], to: [320, 128], amber: false },
  { from: [84, 256], to: [160, 172], amber: false },
  { from: [240, 256], to: [240, 196], amber: false },
  { from: [396, 256], to: [320, 172], amber: true },
];

/**
 * The "El problema" visual — one clean architectural diagram: a
 * generic CRM block holding data while the surrounding operation
 * (leads, properties, calendar, portals, documents, WhatsApp)
 * stays disconnected, joined only by dashed, interrupted lines.
 */
export default function CrmProblemVisual({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div className={cn("relative", className)}>
      <div className="w-full overflow-hidden rounded-xl border border-[#E5E1D6] bg-white/85 shadow-[0_30px_60px_-24px_rgba(12,18,32,0.22)] backdrop-blur-[2px]">
        {/* Kicker inside the visual */}
        <div className="flex items-center gap-2.5 border-b border-[#EFEBE0] px-5 py-3.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#3157F6]"
          />
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[#8A8FA0]">
            {t.kicker}
          </p>
        </div>

        {/* Diagram */}
        <svg
          viewBox="0 0 480 300"
          className="block w-full"
          role="img"
          aria-label={t.kicker}
        >
          <defs>
            <filter
              id="crm-problem-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="7"
                floodColor="#0C1220"
                floodOpacity="0.1"
              />
            </filter>
            <radialGradient id="crm-problem-cyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#17B4CD" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#17B4CD" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Very subtle cyan reflection */}
          <circle cx="424" cy="64" r="96" fill="url(#crm-problem-cyan)" />

          {/* Operational chips */}
          {t.nodes.map((node, i) => {
            const { x, y } = CHIPS[i];
            return (
              <g key={node}>
                <rect
                  x={x - 56}
                  y={y}
                  width="112"
                  height="30"
                  rx="6"
                  fill="#FCFBF8"
                  stroke="#DCD7CB"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={y + 19}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="500"
                  letterSpacing="1.1"
                  fill="#4A5164"
                  fontFamily="JetBrains Mono, ui-monospace, monospace"
                >
                  {node}
                </text>
              </g>
            );
          })}

          {/* Interrupted dashed connectors */}
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
              />
              <circle
                cx={l.to[0]}
                cy={l.to[1]}
                r={l.amber ? 3 : 2.5}
                fill={l.amber ? "#D97706" : "#9A94A6"}
              />
            </g>
          ))}

          {/* Central generic-CRM block — data inside */}
          <g>
            <rect
              x="168"
              y="120"
              width="144"
              height="60"
              rx="8"
              fill="#FFFFFF"
              stroke="#D8D3C6"
              strokeWidth="1"
              filter="url(#crm-problem-shadow)"
            />
            <text
              x="240"
              y="141"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              letterSpacing="0.8"
              fill="#171C29"
              fontFamily="JetBrains Mono, ui-monospace, monospace"
            >
              {t.center}
            </text>
            <rect x="186" y="152" width="84" height="4" rx="2" fill="#3157F6" />
            <rect x="186" y="160" width="58" height="4" rx="2" fill="#EAE6DA" />
            <rect x="186" y="168" width="70" height="4" rx="2" fill="#EAE6DA" />
          </g>

          {/* Subtle cyan presence in the WhatsApp chip */}
          <circle cx="440" cy="271" r="2" fill="#17B4CD" />
        </svg>

        {/* Bottom annotation */}
        <div className="flex items-center gap-2.5 border-t border-[#EFEBE0] px-5 py-3.5">
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[#9A94A6]"
          />
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#9A94A6]">
            {t.annotation}
          </p>
        </div>
      </div>
    </div>
  );
}