import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import CrmCentralModule from "./CrmCentralModule";
import { VISUALS } from "./CrmCentralVisuals";

/* The operational relationships between domains. A pair gets a visible
   bridge when the two modules sit next to each other on the panel; every
   pair is highlighted on hover/focus whether or not a bridge is drawn. */
const RELATIONS = [
  ["demand", "properties"],
  ["properties", "visits"],
  ["visits", "operations"],
  ["clients", "demand"],
  ["clients", "communication"],
  ["prospects", "properties"],
  ["leads", "clients"],
  ["leads", "demand"],
  ["documents", "properties"],
  ["documents", "operations"],
  ["calendar", "visits"],
  ["calendar", "leads"],
  ["calendar", "operations"],
];

const partnersOf = (id) =>
  RELATIONS.filter((pair) => pair.includes(id)).map(([a, b]) => (a === id ? b : a));

/* Desktop composition (12 columns, 4 rows of balanced height):
     row 1 — intake: Leads · Clientes · Demandas · Prospectos
     row 2 — Comunicación beside the wide property record (Inmuebles)
     row 3 — Agenda · Visitas · Documentación, all touching the record
     row 4 — Operaciones as the full-width closing band
   Tablet simplifies to two full-width bands (Inmuebles, Operaciones)
   over half-width modules in numeric order; phones stack everything. */
const LAYOUT = {
  properties: "md:col-span-4 lg:col-span-8 lg:col-start-5 lg:row-start-2",
  clients: "md:col-span-2 lg:col-span-3 lg:col-start-4 lg:row-start-1",
  demand: "md:col-span-2 lg:col-span-3 lg:col-start-7 lg:row-start-1",
  prospects: "md:col-span-2 lg:col-span-3 lg:col-start-10 lg:row-start-1",
  leads: "md:col-span-2 lg:col-span-3 lg:col-start-1 lg:row-start-1",
  visits: "md:col-span-2 lg:col-span-4 lg:col-start-5 lg:row-start-3",
  operations: "md:col-span-4 lg:col-span-12 lg:col-start-1 lg:row-start-4",
  documents: "md:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-3",
  communication: "md:col-span-2 lg:col-span-4 lg:col-start-1 lg:row-start-2",
  calendar: "md:col-span-2 lg:col-span-4 lg:col-start-1 lg:row-start-3",
};

const MAX_GAP = 48; // px — wider than any grid gutter
const MIN_OVERLAP = 32; // px of shared edge needed for a bridge

/** A short bridge across the gutter between two adjacent modules. */
function bridge(A, B) {
  const horizontal = (L, R) => {
    if (L.right > R.left || R.left - L.right > MAX_GAP) return null;
    const top = Math.max(L.top, R.top);
    const bottom = Math.min(L.bottom, R.bottom);
    if (bottom - top < MIN_OVERLAP) return null;
    const y = (top + bottom) / 2;
    return { x1: L.right, y1: y, x2: R.left, y2: y };
  };
  const vertical = (T, Bt) => {
    if (T.bottom > Bt.top || Bt.top - T.bottom > MAX_GAP) return null;
    const left = Math.max(T.left, Bt.left);
    const right = Math.min(T.right, Bt.right);
    if (right - left < MIN_OVERLAP) return null;
    const x = (left + right) / 2;
    return { x1: x, y1: T.bottom, x2: x, y2: Bt.top };
  };
  return horizontal(A, B) || horizontal(B, A) || vertical(A, B) || vertical(B, A);
}

/**
 * Qué centraliza — the ten domains of the operation as ONE connected
 * system panel: varied module sizes, enterprise microvisuals, subtle
 * bridges across the gutters between related modules, and hover/focus
 * that lights up a module together with everything it is connected to.
 */
export default function CrmCentralizes({ c }) {
  const z = c.centralizes;
  const [active, setActive] = useState(null);
  const [bridges, setBridges] = useState([]);
  const panelRef = useRef(null);
  const moduleRefs = useRef({});

  const measure = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (!window.matchMedia("(min-width: 768px)").matches) {
      setBridges([]);
      return;
    }
    const base = panel.getBoundingClientRect();
    const rectOf = (id) => {
      const el = moduleRefs.current[id];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const dx = base.left + panel.clientLeft;
      const dy = base.top + panel.clientTop;
      return { left: r.left - dx, right: r.right - dx, top: r.top - dy, bottom: r.bottom - dy };
    };
    const next = [];
    for (const [a, b] of RELATIONS) {
      const A = rectOf(a);
      const B = rectOf(b);
      if (!A || !B) continue;
      const line = bridge(A, B);
      if (line) next.push({ key: `${a}-${b}`, a, b, ...line });
    }
    setBridges(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const panel = panelRef.current;
    if (!panel || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => measure());
    observer.observe(panel);
    return () => observer.disconnect();
  }, [measure]);

  const related = active ? new Set(partnersOf(active)) : null;
  const stateOf = (id) => {
    if (!active) return "idle";
    if (id === active) return "active";
    return related.has(id) ? "related" : "muted";
  };

  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {z.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {z.title}
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {z.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <div
            ref={panelRef}
            className="relative rounded-xl border border-border bg-[#FCFBF8] p-3 shadow-[0_1px_2px_rgba(12,18,32,0.04),0_36px_80px_-48px_rgba(12,18,32,0.28)] md:p-4"
          >
            {/* Bridges — thin traces across the gutters between related modules */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full md:block"
            >
              {bridges.map((line) => {
                const lit = active !== null && (line.a === active || line.b === active);
                return (
                  <g
                    key={line.key}
                    className={cn(
                      "transition-opacity duration-300",
                      lit ? "opacity-100" : active ? "opacity-30" : "opacity-70"
                    )}
                  >
                    <line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      strokeWidth={lit ? 1.5 : 1}
                      className={cn("transition-colors duration-300", lit ? "stroke-accent" : "stroke-accent/45")}
                    />
                    <circle cx={line.x1} cy={line.y1} r="2" className="fill-accent" />
                    <circle cx={line.x2} cy={line.y2} r="2" className="fill-accent" />
                  </g>
                );
              })}
            </svg>

            {/* The ten domains */}
            <div className="grid grid-cols-1 gap-3 md:grid-flow-dense md:grid-cols-4 lg:grid-cols-12 lg:gap-4">
              {z.items.map((item) => {
                const Visual = VISUALS[item.id];
                return (
                  <CrmCentralModule
                    key={item.id}
                    ref={(el) => {
                      moduleRefs.current[item.id] = el;
                    }}
                    item={item}
                    state={stateOf(item.id)}
                    onEngage={() => setActive(item.id)}
                    onRelease={() => setActive(null)}
                    className={LAYOUT[item.id]}
                  >
                    {Visual ? <Visual item={item} /> : null}
                  </CrmCentralModule>
                );
              })}
            </div>

            {/* Conceptual conclusion */}
            <p className="mt-4 flex items-start gap-3 border-t border-border px-1 pt-5 md:mt-5 md:px-2 md:pt-6">
              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />
              <span className="max-w-3xl font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-lg">
                {z.closing}
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
