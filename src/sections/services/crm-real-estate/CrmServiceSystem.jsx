import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Surface } from "./serviceBits";
import UiFragment from "./SystemFragments";

/**
 * The system map — the signature interaction. Fifteen subsystems in a
 * grid; selecting one draws its real connections to the others (SVG
 * lines measured from the tiles, desktop only) and opens what it does,
 * what it connects to, what work it removes and a fragment of its UI.
 * Keyboard: a tablist with arrow keys; connections are also listed as
 * text so nothing depends on the drawing.
 */
export default function CrmServiceSystem({ c }) {
  const s = c.system;
  const nodes = s.nodes;
  const [activeId, setActiveId] = useState(nodes[0].id);
  const active = nodes.find((n) => n.id === activeId) || nodes[0];
  const byTitle = useMemo(() => new Map(nodes.map((n) => [n.title.toLowerCase(), n.id])), [nodes]);
  const allId = nodes[nodes.length - 1].connects.length === 1 ? nodes[nodes.length - 1].connects[0] : null;
  const connectedIds = useMemo(() => {
    const ids = new Set();
    active.connects.forEach((t) => {
      const id = byTitle.get(t.toLowerCase());
      if (id) ids.add(id);
      else if (allId && t === allId) nodes.forEach((n) => { if (n.id !== active.id) ids.add(n.id); });
    });
    return ids;
  }, [active, byTitle, nodes, allId]);

  const gridRef = useRef(null);
  const tileRefs = useRef({});
  const [lines, setLines] = useState([]);
  const reduced = useReducedMotion();
  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid || window.innerWidth < 1024) { setLines([]); return; }
    const g = grid.getBoundingClientRect();
    const from = tileRefs.current[active.id]?.getBoundingClientRect();
    if (!from) return;
    const c0 = { x: from.left + from.width / 2 - g.left, y: from.top + from.height / 2 - g.top };
    const next = [];
    connectedIds.forEach((id) => {
      const r = tileRefs.current[id]?.getBoundingClientRect();
      if (!r) return;
      next.push({ id, x1: c0.x, y1: c0.y, x2: r.left + r.width / 2 - g.left, y2: r.top + r.height / 2 - g.top });
    });
    setLines(next);
  }, [active.id, connectedIds]);
  useLayoutEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => measure());
    if (gridRef.current) ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const onKey = (e, i) => {
    const cols = window.innerWidth >= 1024 ? 5 : window.innerWidth >= 640 ? 3 : 2;
    const map = { ArrowRight: i + 1, ArrowLeft: i - 1, ArrowDown: i + cols, ArrowUp: i - cols, Home: 0, End: nodes.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(nodes.length - 1, Math.max(0, map[e.key]));
    setActiveId(nodes[j].id);
    tileRefs.current[nodes[j].id]?.focus();
  };

  return (
    <Chapter id="crm-service-system" tone="blue">
      <ChapterHead id="crm-service-system" kicker={s.kicker} title={s.title} intro={s.intro} />
      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <p className={cn(MONO, "mb-3 text-muted-foreground")}>{s.hint}</p>
        <div ref={gridRef} className="relative">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block">
            {lines.map((l) => (
              <motion.line
                key={`${active.id}-${l.id}`}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </svg>
          <div role="tablist" aria-label={s.title} className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-6">
            {nodes.map((n, i) => {
              const on = n.id === active.id;
              const linked = connectedIds.has(n.id);
              return (
                <button
                  key={n.id}
                  ref={(el) => { tileRefs.current[n.id] = el; }}
                  type="button"
                  role="tab"
                  id={`crm-sys-tab-${n.id}`}
                  aria-selected={on}
                  aria-controls="crm-sys-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActiveId(n.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "group relative rounded-[8px] border bg-white px-3 py-3 text-left outline-none transition-[border-color,box-shadow,transform] duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    on ? "border-accent shadow-[0_14px_32px_-20px_rgba(37,99,235,0.6)]" : linked ? "border-accent/45" : "border-border hover:border-foreground/30"
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className={cn("text-[13px] font-semibold tracking-[-0.01em]", on ? "text-accent-deep" : "text-foreground")}>{n.title}</span>
                    <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full transition-colors", on ? "bg-accent" : linked ? "bg-accent/50" : "bg-border")} />
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">{n.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <motion.div
        key={active.id}
        id="crm-sys-panel"
        role="tabpanel"
        aria-labelledby={`crm-sys-tab-${active.id}`}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 grid gap-8 rounded-[12px] border border-border bg-white p-6 md:p-8 lg:grid-cols-12 lg:gap-10"
      >
        <div className="lg:col-span-7">
          <p className={MONO + " text-accent"}>{active.short}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">{active.title}</h3>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className={cn(MONO, "text-muted-foreground")}>{s.labels.purpose}</dt>
              <dd className="mt-1.5 text-[15px] leading-relaxed text-foreground/85">{active.purpose}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className={cn(MONO, "text-muted-foreground")}>{s.labels.workflows}</dt>
              <dd className="mt-1.5">
                <ul className="divide-y divide-border">{active.workflows.map((w) => <li key={w} className="flex gap-3 py-2 text-[14px] leading-snug text-foreground/85"><span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{w}</li>)}</ul>
              </dd>
            </div>
            <div>
              <dt className={cn(MONO, "text-muted-foreground")}>{s.labels.connects}</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {active.connects.map((t) => {
                  const id = byTitle.get(t.toLowerCase());
                  return id ? (
                    <button key={t} type="button" onClick={() => { setActiveId(id); tileRefs.current[id]?.focus(); }} className="rounded-full border border-accent/40 bg-[#EEF3FC] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-deep outline-none transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-accent">{t}</button>
                  ) : (
                    <span key={t} className="rounded-full border border-border bg-[#F6F8FB] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{t}</span>
                  );
                })}
              </dd>
            </div>
            <div>
              <dt className={cn(MONO, "text-muted-foreground")}>{s.labels.removes}</dt>
              <dd className="mt-1.5 text-[14px] leading-snug text-foreground/85">{active.removes}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-5">
          <Surface title={s.labels.ui} meta={active.title}>
            <UiFragment ui={active.ui} />
          </Surface>
        </div>
      </motion.div>
      <Closing>{s.closing}</Closing>
    </Chapter>
  );
}
