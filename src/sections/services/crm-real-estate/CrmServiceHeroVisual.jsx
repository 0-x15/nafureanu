import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* Node positions in a 100 × 80 field around the property record. */
const POS = {
  demand: { x: 14, y: 11 },
  portals: { x: 56, y: 5 },
  documents: { x: 88, y: 16 },
  operation: { x: 90, y: 54 },
  visit: { x: 66, y: 74 },
  matching: { x: 24, y: 74 },
  client: { x: 8, y: 42 },
};
const CENTER = { x: 50, y: 40 };

function PropertyCard({ c, className = "" }) {
  return (
    <div className={cn("rounded-xl border border-[#DCE2EE] bg-white p-4 shadow-[0_28px_60px_-30px_rgba(12,18,32,0.35)]", className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">{c.label}</span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {c.status}
        </span>
      </div>
      <p className="mt-2 font-heading text-[15px] font-bold tracking-[-0.01em] text-foreground">{c.title}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {c.meta.map((m) => (
          <span key={m} className="rounded border border-[#E3E7F0] bg-[#F7F9FC] px-1.5 py-0.5 text-[10px] text-[#4A5164]">{m}</span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-[#EEF1F6] pt-2.5">
        <span aria-hidden="true" className="h-1 w-6 rounded-full bg-accent/60" />
        <span aria-hidden="true" className="h-1 w-3 rounded-full bg-[#C9D3EC]" />
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{c.published}</span>
      </div>
    </div>
  );
}

/**
 * The service hero visual: one property record at the centre of an
 * operation — demand, client, matching, visit, operation, documents and
 * portals connected to it. One node is active at a time and the cycle
 * only runs while the visual is on screen; reduced motion holds a
 * single state. Phones get the record and the nodes as a plain grid.
 */
export default function CrmServiceHeroVisual({ h }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [active, setActive] = useState(2);

  useEffect(() => {
    if (reduce || !inView) return undefined;
    const id = window.setInterval(() => setActive((i) => (i + 1) % h.nodes.length), 2400);
    return () => window.clearInterval(id);
  }, [reduce, inView, h.nodes.length]);

  return (
    <div ref={ref} role="img" aria-label={h.visualLabel}>
      {/* Desktop — the connected operation */}
      <div className="relative hidden aspect-[5/4] w-full lg:block">
        <div aria-hidden="true" className="absolute inset-[4%] rounded-[24px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(49,87,246,0.09),transparent)]" />
        <svg aria-hidden="true" viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          {h.nodes.map((n, i) => {
            const p = POS[n.id];
            const on = i === active;
            return (
              <g key={n.id}>
                <line x1={CENTER.x} y1={CENTER.y} x2={p.x} y2={p.y} vectorEffect="non-scaling-stroke" className="stroke-accent" strokeWidth={on ? 1.5 : 1} style={{ opacity: on ? 0.9 : 0.22, transition: "opacity 0.5s" }} />
                {on && !reduce && inView && (
                  <motion.line x1={CENTER.x} y1={CENTER.y} x2={p.x} y2={p.y} vectorEffect="non-scaling-stroke" className="stroke-white" strokeWidth="1.5" strokeDasharray="3 9" initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -24 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />
                )}
              </g>
            );
          })}
        </svg>

        <div className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2">
          <PropertyCard c={h.center} />
        </div>

        {h.nodes.map((n, i) => {
          const p = POS[n.id];
          const on = i === active;
          return (
            <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${(p.y / 80) * 100}%` }}>
              <div className={cn("rounded-md border bg-white px-2.5 py-1.5 transition-[border-color,box-shadow,transform] duration-500", on ? "border-accent shadow-[0_18px_40px_-20px_rgba(49,87,246,0.5)] -translate-y-0.5" : "border-[#DCE2EE] shadow-[0_10px_24px_-18px_rgba(12,18,32,0.3)]")}>
                <p className={cn("flex items-center gap-2 whitespace-nowrap font-heading text-[12px] font-bold tracking-[-0.01em] transition-colors duration-500", on ? "text-accent-deep" : "text-foreground")}>
                  <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full transition-colors duration-500", on ? "bg-accent" : "bg-[#C9D3EC]")} />
                  {n.label}
                </p>
                {on && <p className="mt-0.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.12em] text-accent">{n.detail}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground lg:block">{h.note}</p>

      {/* Phones and tablets — the record and its connections as a plain grid */}
      <div className="lg:hidden">
        <PropertyCard c={h.center} />
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {h.nodes.map((n, i) => (
            <li key={n.id} className={cn("rounded-lg border bg-white px-3 py-2", i === 2 ? "border-accent" : "border-[#DCE2EE]")}>
              <p className="font-heading text-[12.5px] font-bold text-foreground">{n.label}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{n.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{h.note}</p>
      </div>
    </div>
  );
}
