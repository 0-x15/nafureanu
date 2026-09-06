import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { PROJECTS, projectSlug } from "@/data/projects";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { FLOWS, T } from "./systemsFieldData";

const EASE = [0.22, 1, 0.36, 1];
const DEPTH = [
  { line: 0.5, stroke: 1, labels: 0.7 },
  { line: 0.72, stroke: 1.25, labels: 0.85 },
  { line: 1, stroke: 1.5, labels: 1 },
];
const MONO = "font-mono text-[12px] uppercase tracking-[0.16em]";
const SMALL = "font-mono text-[11px] uppercase tracking-[0.14em]";

function projectPath(id, lang) {
  const project = PROJECTS.find((p) => p.slug === id);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : id}`);
}

/* ── nodes ─────────────────────────────────────────────────────────── */

function InputNode({ x, y, kind, active }) {
  const cls = active ? "fill-accent stroke-accent" : "fill-white stroke-accent";
  if (kind === "doc") {
    return (
      <g transform={`translate(${x - 9} ${y - 12})`}>
        <rect width="18" height="24" rx="2.5" className={cn("stroke-[1.25]", active ? "fill-accent/10 stroke-accent" : "fill-white stroke-accent/70")} />
        {[7, 11, 15].map((ly, i) => (
          <line key={ly} x1="4" x2={i === 2 ? 10 : 14} y1={ly} y2={ly} className="stroke-accent/60" strokeWidth="1.2" strokeLinecap="round" />
        ))}
      </g>
    );
  }
  if (kind === "square") {
    return <rect x={x - 5} y={y - 5} width="10" height="10" rx="1.5" className={cn("stroke-[1.25] transition-colors duration-300", cls)} />;
  }
  return <circle cx={x} cy={y} r="5.5" className={cn("stroke-[1.25] transition-colors duration-300", cls)} />;
}

function OutputNode({ x, y, active }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" className={cn("fill-none stroke-accent transition-opacity duration-300", active ? "opacity-40" : "opacity-15")} strokeWidth="1" />
      <circle cx={x} cy={y} r="4.5" className={cn("stroke-accent stroke-[1.25] transition-colors duration-300", active ? "fill-accent" : "fill-white")} />
    </g>
  );
}

/** The engineered-logic chip: a small labelled block with three logic bars. */
function LogicChip({ x, y, w, label, active }) {
  const h = 30;
  return (
    <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
      <rect width={w} height={h} rx="6" className={cn("stroke-[1.25] transition-colors duration-300", active ? "fill-[#EDF2FF] stroke-accent" : "fill-white stroke-[#C9D3EC]")} />
      <g transform="translate(10 10)">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={i * 4.5} y={i === 1 ? 0 : 3} width="2.2" height={i === 1 ? 10 : 7} rx="1" className={cn("transition-colors duration-300", active ? "fill-accent" : "fill-accent/45")} />
        ))}
      </g>
      <text x={w / 2 + 9} y={h / 2 + 4.2} textAnchor="middle" className={cn(MONO, "transition-colors duration-300", active ? "fill-accent-deep" : "fill-[#4A5164]")}>
        {label}
      </text>
    </g>
  );
}

/* ── product-like fragments (abstract, no real data) ───────────────── */

function EventChip({ x, y, label, show, reduce }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.g
          key="ev"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, delay: reduce ? 0 : 0.3, ease: EASE }}
        >
          <rect x={x} y={y} width={label.length * 7.4 + 28} height="20" rx="10" className="fill-accent" />
          <path d={`M${x + 9} ${y + 10.2} l2.6 2.6 5-5.2`} className="fill-none stroke-white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x={x + 21} y={y + 14} className="font-mono text-[10.5px] uppercase tracking-[0.14em] fill-white">{label}</text>
        </motion.g>
      )}
    </AnimatePresence>
  );
}

function CrmFragment({ x, y, t, active, reduce }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="164" height="52" rx="6" className={cn("stroke-1 transition-colors duration-300", active ? "fill-white stroke-accent/50" : "fill-white/85 stroke-[#DCE2EE]")} />
      <rect x="12" y="11" width="10" height="10" rx="2" className="fill-accent/25" />
      <text x="30" y="20.5" className={cn(SMALL, "fill-[#4A5164]")}>{t.fragment[0]}</text>
      <circle cx="17" cy="37" r="4" className="fill-white stroke-accent" strokeWidth="1.2" />
      <text x="30" y="41" className={cn(SMALL, "fill-[#4A5164]")}>{t.fragment[1]}</text>
      <path d="M17 21.5 V32.5" className={cn("stroke-accent transition-opacity duration-300", active ? "opacity-90" : "opacity-35")} strokeWidth="1.2" strokeDasharray="2 2" />
      <EventChip x={164 + 10} y={16} label={t.event} show={active} reduce={reduce} />
    </g>
  );
}

function FivoFragment({ x, y, t, active, reduce }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="160" height="24" rx="12" className={cn("stroke-1 transition-colors duration-300", active ? "fill-white stroke-accent/50" : "fill-white/85 stroke-[#DCE2EE]")} />
      <text x="12" y="16" className={cn(SMALL, "fill-accent-deep")}>{t.fragment[0]}</text>
      {[58, 67, 76].map((cx, i) => (
        <circle key={cx} cx={cx} cy="12" r="1.8" className={cn("transition-opacity duration-300", active ? "fill-accent" : "fill-accent/45")} style={{ opacity: active ? 1 : 0.5 + i * 0.15 }} />
      ))}
      <path d="M84 12 H96 M93 9 l3 3 -3 3" className="fill-none stroke-accent/70" strokeWidth="1.1" strokeLinecap="round" />
      <text x="102" y="16" className={cn(SMALL, "fill-[#4A5164]")}>{t.fragment[1]}</text>
      <EventChip x={0} y={32} label={t.event} show={active} reduce={reduce} />
    </g>
  );
}

function LifeAdminFragment({ x, y, t, active, reduce }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="146" height="24" rx="5" className={cn("stroke-1 transition-colors duration-300", active ? "fill-white stroke-accent/50" : "fill-white/85 stroke-[#DCE2EE]")} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="10" y={7 + i * 4} width={i === 1 ? 14 : 10} height="1.8" rx="0.9" className={cn("transition-colors duration-300", active ? "fill-accent" : "fill-accent/50")} />
      ))}
      <text x="32" y="16" className={cn(SMALL, "fill-[#4A5164]")}>{t.fragment[1]}</text>
      <EventChip x={0} y={32} label={t.event} show={active} reduce={reduce} />
    </g>
  );
}

function WebFragment({ x, y, t, active, reduce }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="64" height="40" rx="3.5" className={cn("stroke-1 transition-colors duration-300", active ? "fill-white stroke-accent/50" : "fill-white/85 stroke-[#DCE2EE]")} />
      <line x1="0" x2="64" y1="9" y2="9" className="stroke-[#E3E7F0]" strokeWidth="1" />
      <rect x="7" y="15" width="30" height="4" rx="2" className={cn("transition-colors duration-300", active ? "fill-accent/70" : "fill-accent/35")} />
      <rect x="7" y="23" width="20" height="3" rx="1.5" className="fill-[#C9D3EC]" />
      <rect x="7" y="29" width="26" height="3" rx="1.5" className="fill-[#C9D3EC]" />
      <rect x="50" y="18" width="16" height="27" rx="3" className={cn("stroke-1 transition-colors duration-300", active ? "fill-white stroke-accent" : "fill-white stroke-[#C9D3EC]")} />
      <rect x="54" y="24" width="8" height="2.5" rx="1.2" className={cn(active ? "fill-accent/70" : "fill-accent/35")} />
      <rect x="54" y="29" width="6" height="2" rx="1" className="fill-[#C9D3EC]" />
      <EventChip x={76} y={2} label={t.event} show={active} reduce={reduce} />
    </g>
  );
}

const FRAGMENTS = { "crm-inmobiliario": CrmFragment, fivo: FivoFragment, "life-admin": LifeAdminFragment, "web-projects": WebFragment };

/* ── signals ───────────────────────────────────────────────────────── */

/** One fast pulse through the path when the flow becomes active. */
function Pulse({ pathId, fire, dur = 1.4 }) {
  const ref = useRef(null);
  const halo = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!fire || !ref.current) return undefined;
    setOn(true);
    ref.current.beginElement();
    halo.current?.beginElement();
    const id = window.setTimeout(() => setOn(false), dur * 1000 + 150);
    return () => window.clearTimeout(id);
  }, [fire, dur]);
  const motion = (r) => (
    <animateMotion ref={r} dur={`${dur}s`} begin="indefinite" fill="freeze" rotate="none" calcMode="spline" keySplines="0.45 0 0.25 1" keyTimes="0;1" keyPoints="0;1">
      <mpath href={`#${pathId}`} />
    </animateMotion>
  );
  return (
    <g style={{ opacity: on ? 1 : 0, transition: "opacity 0.25s" }}>
      <circle r="7" className="fill-accent" opacity="0.16">{motion(halo)}</circle>
      <circle r="2.8" className="fill-accent">{motion(ref)}</circle>
    </g>
  );
}

/* ── one flow ──────────────────────────────────────────────────────── */

function Flow({ flow, t, lang, active, dim, focused, reduce, pulse, onEnter, onLeave, onFocus, onBlur }) {
  const navigate = useNavigate();
  const d = DEPTH[flow.depth];
  const Fragment = FRAGMENTS[flow.id];
  const pathId = `sf-path-${flow.id}`;
  const to = projectPath(flow.id, lang);
  const lineOpacity = active ? 1 : dim ? d.line * 0.45 : d.line;
  const labelOpacity = active ? 1 : dim ? d.labels * 0.5 : d.labels;
  const { input, logic, output } = flow;

  return (
    <a
      href={to}
      onClick={(e) => { e.preventDefault(); navigate(to); }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={`${flow.n} · ${t.name}: ${t.stages.join(" → ")}. ${T[lang].view}`}
      className="cursor-pointer outline-none"
      style={{ transition: "opacity 0.35s" }}
    >
      {/* hit area along the whole flow */}
      <path d={`${flow.enter} ${flow.path} ${flow.exit}`} fill="none" stroke="rgba(0,0,0,0)" strokeWidth="34" pointerEvents="stroke" />

      {/* traces entering and leaving the map */}
      <path d={flow.enter} fill="none" className="stroke-accent" strokeWidth={d.stroke * 0.8} strokeDasharray="1.5 5" strokeLinecap="round" style={{ opacity: lineOpacity * 0.6, transition: "opacity 0.35s" }} />
      <path d={flow.exit} fill="none" className="stroke-accent" strokeWidth={d.stroke * 0.8} strokeDasharray="1.5 5" strokeLinecap="round" style={{ opacity: lineOpacity * 0.6, transition: "opacity 0.35s" }} />

      {/* the flow itself */}
      <path id={pathId} d={flow.path} fill="none" className="stroke-accent" strokeWidth={active ? d.stroke + 0.5 : d.stroke} strokeLinecap="round" style={{ opacity: lineOpacity, transition: "opacity 0.35s, stroke-width 0.35s" }} />

      {!reduce && <Pulse pathId={pathId} fire={pulse} dur={active ? 1.1 : 1.6} />}

      <g style={{ opacity: labelOpacity, transition: "opacity 0.35s" }}>
        {/* input */}
        <text x={input.x - 14} y={input.y - 17} className="font-mono text-[10.5px] tracking-[0.16em] fill-accent">{flow.n}</text>
        <text x={input.x + 10} y={input.y - 17} className={cn(MONO, "fill-[#4A5164]")}>{t.stages[0]}</text>
        <InputNode x={input.x} y={input.y} kind={input.kind} active={active} />
        {/* logic */}
        <LogicChip x={logic.x} y={logic.y} w={logic.w} label={t.stages[1]} active={active} />
        {/* output */}
        <text x={output.x + 16} y={output.y - 14} className={cn(MONO, "fill-[#4A5164]")}>{t.stages[2]}</text>
        <OutputNode x={output.x} y={output.y} active={active} />
        {/* product fragment */}
        <g style={{ opacity: active ? 1 : 0.82, transition: "opacity 0.35s" }}>
          <Fragment x={flow.fragment.x} y={flow.fragment.y} t={t} active={active} reduce={reduce} />
        </g>
      </g>

      {focused && (
        <rect x={logic.x - logic.w / 2 - 6} y={logic.y - 21} width={logic.w + 12} height="42" rx="10" className="fill-none stroke-accent" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
    </a>
  );
}

/* ── atmosphere behind the map ─────────────────────────────────────── */

export function FieldAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-y-0 right-0 hidden w-[70%] lg:block bg-[radial-gradient(circle,rgba(49,87,246,0.24)_0.8px,transparent_1.1px)] bg-[size:28px_28px] opacity-60 [mask-image:radial-gradient(75%_75%_at_58%_52%,#000_20%,transparent_100%)]" />
      <span className="absolute right-[18%] top-[34%] h-[38%] w-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.11),transparent)]" />
      <span className="absolute bottom-[8%] right-[6%] h-px w-[34%] bg-gradient-to-r from-transparent via-[rgba(23,180,205,0.4)] to-transparent" />
      <svg className="absolute inset-0 hidden h-full w-full opacity-70 blur-[1.4px] lg:block" viewBox="0 0 1440 640" preserveAspectRatio="none" fill="none">
        <path d="M560 640 C700 540 760 420 980 380 C1140 352 1240 300 1440 296" stroke="rgba(49,87,246,0.16)" strokeWidth="1.2" />
        <path d="M700 0 C720 120 860 150 1000 168 C1200 192 1300 260 1440 240" stroke="rgba(49,87,246,0.12)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

/* ── the map ───────────────────────────────────────────────────────── */

/**
 * The desktop systems field: four independent input → logic → output
 * flows at three depths, each with a small product-like fragment and a
 * cobalt signal that travels now and then. Hover or focus makes a flow
 * definite, quietens the others and fires its micro-event; each flow is
 * a real link to its project page. Reduced motion renders every path
 * in its completed state with no travelling signals.
 */
export default function SystemsField({ lang = "es", className = "" }) {
  const t = T[lang];
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const live = useInView(ref, { margin: "-10% 0px" });
  const [active, setActive] = useState(null);
  const [focused, setFocused] = useState(null);
  /* Signals: one pulse at a time, on a quiet irregular schedule, only
     while the field is on screen. A pulse is a number so the same flow
     can fire again; hovering a flow fires its own pulse immediately. */
  const [pulses, setPulses] = useState({});
  useEffect(() => {
    if (!live || reduce) return undefined;
    let timer = 0;
    let i = 0;
    const order = ["crm-inmobiliario", "web-projects", "fivo", "life-admin"];
    const next = () => {
      const id = order[i % order.length];
      i += 1;
      setPulses((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
      timer = window.setTimeout(next, 2600 + Math.round(Math.random() * 1800));
    };
    timer = window.setTimeout(next, 900);
    return () => window.clearTimeout(timer);
  }, [live, reduce]);
  useEffect(() => {
    if (active && !reduce) setPulses((p) => ({ ...p, [active]: (p[active] || 0) + 1 }));
  }, [active, reduce]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 620"
      role="group"
      aria-label={t.title}
      className={cn("block h-auto w-full overflow-visible", className)}
    >
      <title>{t.title}</title>
      {FLOWS.map((flow) => (
        <Flow
          key={flow.id}
          flow={flow}
          t={t.flows[flow.id]}
          lang={lang}
          active={active === flow.id}
          dim={active !== null && active !== flow.id}
          focused={focused === flow.id}
          reduce={!!reduce}
          pulse={pulses[flow.id] || 0}
          onEnter={() => setActive(flow.id)}
          onLeave={() => setActive((a) => (a === flow.id && focused !== flow.id ? null : a))}
          onFocus={() => { setFocused(flow.id); setActive(flow.id); }}
          onBlur={() => { setFocused(null); setActive((a) => (a === flow.id ? null : a)); }}
        />
      ))}
    </svg>
  );
}
