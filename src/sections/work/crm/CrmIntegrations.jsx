import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import CrmIntegrationItem from "./CrmIntegrationItem";

/**
 * Integrations — the CRM as the operational core of the agency's
 * ecosystem. One light switchboard surface: the core in the middle
 * with its activity, portals on the left, communication and operation
 * tools on the right, and measured connectors whose direction and
 * pulses mean something (CRM → portal, lead → CRM, CRM ↔ calendar…).
 * Hover/focus lights an integration, its connector and a matching
 * event inside the core. Phones stack core → groups, with the
 * direction chip inside each integration instead of connectors.
 */

const EASE = [0.22, 1, 0.36, 1];
const AMBIENT_PERIOD = 14; // s — one slow signal per ambient connector
const ACTIVITY_MS = 2600;

/** Signal travelling along a connector path (SMIL, skipped under reduced motion). */
function Pulse({ path, reverse, period, begin, window: [t0, t1] }) {
  const keyPoints = reverse ? "1;1;0;0" : "0;0;1;1";
  const keyTimes = `0;${t0};${t1};1`;
  const fade = 0.02;
  return (
    <circle r="2.6" fill="#3157F6" opacity="0">
      <animateMotion
        dur={`${period}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        calcMode="linear"
        path={path}
        keyPoints={keyPoints}
        keyTimes={keyTimes}
      />
      <animate
        attributeName="opacity"
        dur={`${period}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        values="0;0;1;1;0;0"
        keyTimes={`0;${t0};${t0 + fade};${t1 - fade};${t1};1`}
      />
    </circle>
  );
}

function Arrowhead({ x, y, dir }) {
  const s = 5;
  const points =
    dir === "right"
      ? `${x - s},${y - 3} ${x},${y} ${x - s},${y + 3}`
      : `${x + s},${y - 3} ${x},${y} ${x + s},${y + 3}`;
  return <polygon points={points} />;
}

function LiveDot({ reduce }) {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full bg-[#17B4CD]"
          animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative h-2 w-2 rounded-full bg-[#17B4CD]" />
    </span>
  );
}

const Core = ({ core, event, reduce, coreRef }) => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => setTick((t) => t + 1), ACTIVITY_MS);
    return () => window.clearInterval(id);
  }, [reduce]);
  const highlighted = tick % core.activity.length;

  return (
    <div
      ref={coreRef}
      className="w-full rounded-lg border border-accent/35 bg-white p-5 shadow-[0_1px_2px_rgba(12,18,32,0.04),0_30px_60px_-32px_rgba(49,87,246,0.5)]"
    >
      <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/85">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
        {core.title}
      </p>
      <p className="mt-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
        <LiveDot reduce={reduce} />
        {core.state}
      </p>

      {/* Activity — what the core is coordinating right now */}
      <div className="mt-4 rounded-md border border-accent/15 bg-[#F8FAFD] p-3">
        <AnimatePresence initial={false}>
          {event && (
            <motion.p
              key={event}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mb-2 flex items-center gap-2 rounded-sm border border-accent/50 bg-[#EDF2FF] px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {event}
            </motion.p>
          )}
        </AnimatePresence>
        <ul className="space-y-1.5">
          {core.activity.map((line, i) => (
            <motion.li
              key={line}
              animate={{ opacity: reduce ? 0.85 : highlighted === i ? 1 : 0.45 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-2 text-[11px] text-foreground/85"
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500",
                  !reduce && highlighted === i ? "bg-accent" : "bg-accent/35"
                )}
              />
              {line}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function CrmIntegrations({ c }) {
  const ig = c.integrations;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const [links, setLinks] = useState([]);
  const panelRef = useRef(null);
  const coreRef = useRef(null);
  const itemRefs = useRef({});

  const byGroup = (group) => ig.items.filter((item) => item.group === group);
  const activeItem = ig.items.find((item) => item.id === active) || null;

  /* Connectors are measured from the live layout: each integration links
     to the nearest side of the core through an elbow across the gutter,
     spread evenly along the core's edge. Desktop only. */
  const measure = useCallback(() => {
    const panel = panelRef.current;
    const core = coreRef.current;
    if (!panel || !core || !window.matchMedia("(min-width: 1024px)").matches) {
      setLinks([]);
      return;
    }
    const base = panel.getBoundingClientRect();
    const dx = base.left + panel.clientLeft;
    const dy = base.top + panel.clientTop;
    const rel = (r) => ({ left: r.left - dx, right: r.right - dx, top: r.top - dy, bottom: r.bottom - dy });
    const C = rel(core.getBoundingClientRect());
    const sides = { left: [], right: [] };
    ig.items.forEach((item) => {
      const el = itemRefs.current[item.id];
      if (!el) return;
      const R = rel(el.getBoundingClientRect());
      sides[R.right <= C.left ? "left" : "right"].push({ item, R });
    });
    const next = [];
    for (const side of ["left", "right"]) {
      const list = sides[side].sort((a, b) => a.R.top - b.R.top);
      list.forEach(({ item, R }, i) => {
        const y1 = (R.top + R.bottom) / 2;
        const y2 = C.top + ((C.bottom - C.top) * (i + 1)) / (list.length + 1);
        const x1 = side === "left" ? R.right : R.left;
        const x2 = side === "left" ? C.left : C.right;
        const xm = (x1 + x2) / 2;
        next.push({
          id: item.id,
          side,
          path: `M ${x1} ${y1} H ${xm} V ${y2} H ${x2}`,
          x1,
          y1,
          x2,
          y2,
          direction: item.direction,
          pulse: item.pulse,
          ambient: item.ambient,
        });
      });
    }
    setLinks(next);
  }, [ig.items]);

  useLayoutEffect(() => {
    measure();
    const panel = panelRef.current;
    if (!panel || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => measure());
    observer.observe(panel);
    return () => observer.disconnect();
  }, [measure]);

  const stateOf = (id) => {
    if (!active) return "idle";
    return id === active ? "active" : "muted";
  };

  const renderItem = (item) => (
    <CrmIntegrationItem
      key={item.id}
      ref={(el) => {
        itemRefs.current[item.id] = el;
      }}
      item={item}
      state={stateOf(item.id)}
      reduce={reduce}
      onEngage={() => setActive(item.id)}
      onRelease={() => setActive(null)}
    />
  );

  const GroupLabel = ({ children, className = "" }) => (
    <p className={cn("font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/55", className)}>
      {children}
    </p>
  );

  let ambientIndex = 0;

  return (
    <section className="relative overflow-hidden bg-[#F2F5FA] px-5 py-16 md:px-10 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[20%] top-[10%] h-[70%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.10),transparent)]" />
        <span className="absolute bottom-[-4%] right-[4%] h-[44%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.08),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {ig.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {ig.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {ig.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <div
            ref={panelRef}
            className="relative rounded-xl border border-white/90 bg-white/65 p-4 shadow-[0_1px_2px_rgba(12,18,32,0.04),0_48px_100px_-56px_rgba(49,87,246,0.38)] backdrop-blur-[24px] md:p-6"
          >
            {/* Connectors — direction, arrowheads and signals */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block"
            >
              {links.map((link) => {
                const lit = active === link.id;
                const dimmed = active !== null && !lit;
                const toolDir = link.side === "left" ? "left" : "right";
                const coreDir = link.side === "left" ? "right" : "left";
                const atTool = link.direction === "out" || link.direction === "both" || link.direction === "loop";
                const atCore = link.direction === "in" || link.direction === "both" || link.direction === "loop";
                const fill = lit ? "#3157F6" : "rgba(49,87,246,0.45)";
                const showAmbient = !reduce && link.ambient && !lit;
                const begin = showAmbient ? (ambientIndex++ * AMBIENT_PERIOD) / 4 : 0;
                return (
                  <g
                    key={link.id}
                    className="transition-opacity duration-300"
                    style={{ opacity: dimmed ? 0.45 : 1 }}
                  >
                    <path
                      d={link.path}
                      fill="none"
                      stroke={lit ? "#3157F6" : "rgba(49,87,246,0.3)"}
                      strokeWidth={lit ? 1.5 : 1}
                      strokeLinejoin="round"
                      className="transition-[stroke] duration-300"
                    />
                    <g fill={fill} className="transition-[fill] duration-300">
                      {atTool && <Arrowhead x={link.x1} y={link.y1} dir={toolDir} />}
                      {atCore && <Arrowhead x={link.x2} y={link.y2} dir={coreDir} />}
                    </g>
                    {showAmbient && (
                      <Pulse
                        path={link.path}
                        reverse={link.pulse === "out"}
                        period={AMBIENT_PERIOD}
                        begin={begin}
                        window={[0.72, 0.9]}
                      />
                    )}
                    {!reduce && lit && (
                      <Pulse
                        path={link.path}
                        reverse={link.pulse === "out"}
                        period={2.6}
                        begin={0}
                        window={[0.08, 0.78]}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,5fr)] lg:gap-10">
              {/* Portals */}
              <div className="order-2 space-y-4 lg:order-1">
                <GroupLabel>{ig.groups.portals}</GroupLabel>
                {byGroup("portals").map(renderItem)}
              </div>

              {/* The core */}
              <div className="order-1 flex items-center lg:order-2">
                <Core core={ig.core} event={activeItem?.coreEvent || null} reduce={reduce} coreRef={coreRef} />
              </div>

              {/* Communication + operation */}
              <div className="order-3 space-y-4">
                <GroupLabel>{ig.groups.communication}</GroupLabel>
                {byGroup("communication").map(renderItem)}
                <GroupLabel className="pt-2">{ig.groups.operation}</GroupLabel>
                {byGroup("operation").map(renderItem)}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 md:mt-10">
          <p className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />
            <span className="max-w-3xl">
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {ig.closingMeta}
              </span>
              <span className="mt-2 block font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-lg">
                {ig.closing}
              </span>
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
