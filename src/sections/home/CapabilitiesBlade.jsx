import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CAPABILITIES } from "@/data/capabilities";
import { STRINGS, langPath } from "@/i18n";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

/**
 * System map: a central hub connected to the seven capability nodes.
 * The active node pulses and lights its data path.
 */
function SystemHub({ active, onSelect, lang }) {
  const size = 460;
  const c = size / 2;
  const R = 176;
  const nodes = CAPABILITIES.map((cap, i) => {
    const a = ((2 * Math.PI * i) / CAPABILITIES.length) - Math.PI / 2 + 0.14;
    return { i, x: c + R * Math.cos(a), y: c + R * Math.sin(a), title: cap.copy[lang].title };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto w-full max-w-md"
      role="img"
      aria-label="Capabilities system map"
    >
      {nodes.map((n) => (
        <line
          key={`link-${n.i}`}
          x1={c}
          y1={c}
          x2={n.x}
          y2={n.y}
          stroke={n.i === active ? "#3D7BFF" : "#1E2530"}
          strokeWidth={n.i === active ? 1.4 : 1}
          strokeOpacity={n.i === active ? 0.85 : 1}
        />
      ))}
      {nodes.map((n) => (
        <g key={`node-${n.i}`} data-cursor="node" onClick={() => onSelect(n.i)} className="cursor-pointer">
          {n.i === active && (
            <circle cx={n.x} cy={n.y} r="16" fill="none" stroke="#3D7BFF" strokeWidth="1">
              <animate attributeName="r" values="11;26" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
            </circle>
          )}
          <rect
            x={n.x - 7}
            y={n.y - 7}
            width="14"
            height="14"
            fill={n.i === active ? "#3D7BFF" : "#0D1117"}
            stroke={n.i === active ? "#5CDBEA" : "#2A3550"}
            strokeWidth="1"
          />
          <text
            x={n.x}
            y={n.y - 15}
            textAnchor="middle"
            fontSize="9"
            fill={n.i === active ? "#F0EFEA" : "#8A93A6"}
            style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1px" }}
          >
            {n.title.toUpperCase()}
          </text>
        </g>
      ))}
      {/* Center hub */}
      <circle cx={c} cy={c} r="52" fill="none" stroke="#3D7BFF" strokeOpacity="0.35">
        <animate attributeName="r" values="44;58" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.35;0" dur="3s" repeatCount="indefinite" />
      </circle>
      <rect x={c - 62} y={c - 18} width={124} height={36} fill="#0D1117" stroke="#2A3550" />
      <rect x={c - 62} y={c - 18} width={5} height={36} fill="#3D7BFF" />
      <text
        x={c}
        y={c + 4}
        textAnchor="middle"
        fontSize="11"
        letterSpacing="3"
        fill="#F0EFEA"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        SYSTEM
      </text>
    </svg>
  );
}

/** Detail of the active capability — crossfades when the active node changes. */
function ActivePanel({ active, lang }) {
  const s = STRINGS[lang].capabilities;
  const cap = CAPABILITIES[active];
  const c = cap.copy[lang];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cap.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">
          <span className="text-[#3D7BFF]">{cap.num}</span> / {s.total}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-bold tracking-[-0.02em] text-[#F0EFEA] md:text-3xl">
          {c.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#A6AEBD]">{c.short}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {cap.tech.slice(0, 4).map((t) => (
            <li
              key={t}
              className="border border-[#2A3550] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A93A6]"
            >
              {t}
            </li>
          ))}
        </ul>
        <Link
          to={langPath(lang, "/services")}
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#F0EFEA] transition-colors hover:text-[#3D7BFF]"
        >
          {s.explore} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

/** One capability row — activates its hub node when it crosses the viewport. */
function ModuleRow({ cap, index, active, onActive, lang }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const c = cap.copy[lang];

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => onActive(index)}
      onFocus={() => onActive(index)}
      className={cn(
        "border-t border-[#1E2530] py-7 transition-colors duration-500",
        active ? "bg-[#0D1117]/60" : "bg-transparent"
      )}
    >
      <div className="flex items-baseline gap-5">
        <span
          className={cn(
            "font-mono text-[11px] transition-colors duration-500",
            active ? "text-[#3D7BFF]" : "text-[#55607A]"
          )}
        >
          {cap.num}
        </span>
        <h3
          className={cn(
            "font-heading text-2xl font-bold tracking-[-0.02em] transition-all duration-500 md:text-3xl",
            active ? "translate-x-1 text-[#F0EFEA]" : "text-[#55607A]"
          )}
        >
          {c.title}
        </h3>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#A6AEBD]">{c.short}</p>
    </div>
  );
}

/**
 * Capabilities as a living system: scrolling (or hovering) the seven
 * discipline rows activates the corresponding node of the system map
 * and crossfades its detail panel.
 */
export default function CapabilitiesBlade({ lang = "es" }) {
  const [active, setActive] = useState(0);
  const s = STRINGS[lang].capabilities;

  return (
    <section className="px-5 py-24 md:px-10 md:py-40" aria-labelledby="capabilities-title">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A93A6]">
            <span className="text-[#3D7BFF]">{s.kicker.split(" — ")[0]}</span> —{" "}
            {s.kicker.split(" — ")[1]}
          </p>
          <h2
            id="capabilities-title"
            className="mt-6 font-heading text-4xl font-bold tracking-[-0.02em] text-[#F0EFEA] md:text-6xl"
          >
            {s.title}
          </h2>
        </div>
        <Link
          to={langPath(lang, "/services")}
          className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-[#8A93A6] transition-colors hover:text-[#3D7BFF] md:inline-flex"
        >
          {s.all}
        </Link>
      </div>

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SystemHub active={active} onSelect={setActive} lang={lang} />
            <div className="mt-8 border-t border-[#1E2530] pt-8">
              <ActivePanel active={active} lang={lang} />
            </div>
          </div>
        </div>
        <div className="md:col-span-7 md:pl-6">
          {CAPABILITIES.map((cap, i) => (
            <ModuleRow key={cap.id} cap={cap} index={i} active={active === i} onActive={setActive} lang={lang} />
          ))}
          <div className="border-t border-[#1E2530]" />
        </div>
      </div>
    </section>
  );
}