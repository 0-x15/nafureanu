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

/* Misaligned, slightly rotated system fragments */
const FRAGMENTS = [
  { cx: 74, cy: 52, w: 108, rot: -3, accent: "#3157F6" },
  { cx: 322, cy: 66, w: 116, rot: 2, accent: null },
  { cx: 62, cy: 186, w: 104, rot: 1.5, accent: null },
  { cx: 336, cy: 200, w: 108, rot: -2, accent: null },
  { cx: 96, cy: 322, w: 118, rot: 2.5, accent: null },
  { cx: 306, cy: 334, w: 112, rot: -1.5, accent: "#17B4CD" },
];
const H = 52;

/* Interrupted connectors toward the muted central block */
const LINKS = [
  { from: [86, 84], to: [168, 178], amber: true },
  { from: [300, 98], to: [232, 178], amber: false },
  { from: [118, 186], to: [140, 198], amber: false },
  { from: [282, 202], to: [262, 204], amber: false },
  { from: [88, 292], to: [180, 246], amber: true },
  { from: [298, 302], to: [224, 242], amber: false },
];

/**
 * "El problema" visual — an abstract operational-tension
 * composition: six scattered, slightly misaligned system fragments
 * around a muted generic-CRM block, joined only by thin interrupted
 * dashed lines. Conceptual, not a dashboard.
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

        {/* Composition */}
        <svg
          viewBox="0 0 400 380"
          className="block w-full"
          role="img"
          aria-label={t.kicker}
        >
          <defs>
            <filter
              id="crm-tension-shadow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feDropShadow
                dx="0"
                dy="5"
                stdDeviation="6"
                floodColor="#0C1220"
                floodOpacity="0.09"
              />
            </filter>
            <radialGradient id="crm-tension-cyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#17B4CD" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#17B4CD" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle atmosphere */}
          <circle cx="348" cy="58" r="86" fill="url(#crm-tension-cyan)" />

          {/* Layered ghost planes — architectural depth */}
          <rect
            x="252"
            y="8"
            width="128"
            height="164"
            rx="14"
            fill="#F6F8FD"
            opacity="0.65"
            transform="rotate(5 316 90)"
          />
          <rect
            x="18"
            y="214"
            width="128"
            height="148"
            rx="14"
            fill="#F3FAFB"
            opacity="0.55"
            transform="rotate(-4 82 288)"
          />

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
                r={l.amber ? 2.8 : 2.3}
                fill={l.amber ? "#D97706" : "#9A94A6"}
              />
            </g>
          ))}

          {/* Muted central block — data inside, dashed generic shell */}
          <g opacity="0.92">
            <rect
              x="152"
              y="186"
              width="96"
              height="44"
              rx="10"
              fill="#F5F3ED"
              stroke="#D8D3C6"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="200"
              y="212"
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              letterSpacing="1"
              fill="#8A8FA0"
              fontFamily="JetBrains Mono, ui-monospace, monospace"
            >
              {t.center}
            </text>
          </g>

          {/* Scattered operational fragments */}
          {FRAGMENTS.map((f, i) => {
            const x = f.cx - f.w / 2;
            const y = f.cy - H / 2;
            return (
              <g key={t.nodes[i]} transform={`rotate(${f.rot} ${f.cx} ${f.cy})`}>
                <rect
                  x={x}
                  y={y}
                  width={f.w}
                  height={H}
                  rx="7"
                  fill="#FFFFFF"
                  stroke="#DCD7CB"
                  strokeWidth="1"
                  filter="url(#crm-tension-shadow)"
                />
                <text
                  x={x + 10}
                  y={y + 17}
                  fontSize="8"
                  fontWeight="600"
                  letterSpacing="1"
                  fill="#4A5164"
                  fontFamily="JetBrains Mono, ui-monospace, monospace"
                >
                  {t.nodes[i]}
                </text>
                <rect
                  x={x + 10}
                  y={y + 26}
                  width={f.w * 0.56}
                  height="3"
                  rx="1.5"
                  fill={f.accent || "#EAE6DA"}
                />
                <rect
                  x={x + 10}
                  y={y + 33}
                  width={f.w * 0.38}
                  height="3"
                  rx="1.5"
                  fill="#EAE6DA"
                />
              </g>
            );
          })}
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