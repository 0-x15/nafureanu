import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { H2, Index, MONO } from "./studioBits";

const INK = "#2563EB";
const DIM = "rgba(27,31,42,0.5)";
const FAINT = "rgba(27,31,42,0.16)";

/**
 * The system cross-section: one technical drawing on graphite. Each
 * review principle lights the layer it concerns and its consequence.
 */
function SystemSection({ d, active, reduced }) {
  const show = (id) => active === id;
  const t = { duration: reduced ? 0 : 0.5 };
  const label = (x, y, text, opts = {}) => <text x={x} y={y} fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize={opts.size || 9} letterSpacing="1.2" fill={opts.fill || DIM} textAnchor={opts.anchor || "start"} style={{ textTransform: "uppercase" }}>{text}</text>;
  const L = d.layers;
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label={d.label} className="h-auto w-full">
      {/* documentation margin */}
      <motion.g animate={{ opacity: show("documented") ? 1 : 0.35 }} transition={t}>
        <rect x="24" y="52" width="86" height="300" fill="none" stroke={show("documented") ? INK : FAINT} strokeDasharray="3 4" />
        {label(30, 44, L.knowledge, { fill: show("documented") ? INK : DIM })}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x="34" y={70 + i * 26} width={i % 3 === 0 ? 56 : 40} height="3" fill={show("documented") ? INK : FAINT} />)}
        {show("documented") && label(30, 372, d.marks.decisions, { fill: INK })}
      </motion.g>
      {/* system boundary */}
      <rect x="130" y="52" width="360" height="300" fill="none" stroke={DIM} />
      {label(136, 44, d.label, { fill: DIM })}
      {/* layers */}
      {[["interface", 52, 60, L.interface], ["logic", 112, 96, L.logic], ["data", 208, 64, L.data]].map(([id, y, h, name]) => (
        <g key={id}>
          <line x1="130" y1={y + h} x2="490" y2={y + h} stroke={FAINT} />
          {label(138, y + 14, name, { fill: show("testable") && id === "logic" ? INK : DIM })}
        </g>
      ))}
      {/* modules (understandable) */}
      <motion.g animate={{ opacity: show("understandable") ? 1 : 0.22 }} transition={t}>
        {[220, 310, 400].map((x) => <line key={x} x1={x} y1="52" x2={x} y2="272" stroke={show("understandable") ? INK : FAINT} />)}
        {["A", "B", "C", "D"].map((m, i) => <g key={m}>{label(148 + i * 90, 106, m, { fill: show("understandable") ? "#1B1F2A" : DIM, size: 11 })}</g>)}
        {show("understandable") && label(138, 290, d.marks.modules, { fill: INK })}
      </motion.g>
      {/* tests (testable) */}
      <motion.g animate={{ opacity: show("testable") ? 1 : 0 }} transition={t}>
        <rect x="131" y="113" width="358" height="94" fill="rgba(37,99,235,0.07)" />
        {[0, 1, 2, 3].map((i) => <text key={i} x={190 + i * 90} y="184" fontFamily="JetBrains Mono, monospace" fontSize="14" fill={INK} textAnchor="middle">✓</text>)}
        {label(138, 200, d.marks.tests, { fill: INK })}
      </motion.g>
      {/* change (maintainable) */}
      <motion.g animate={{ opacity: show("maintainable") ? 1 : 0 }} transition={t}>
        <rect x="221" y="53" width="88" height="218" fill="rgba(37,99,235,0.08)" stroke={INK} />
        <path d="M265 20 v26" stroke={INK} strokeWidth="1.2" /><path d="M259 40 l6 8 6-8" fill="none" stroke={INK} strokeWidth="1.2" />
        {label(272, 24, d.marks.change, { fill: INK })}
      </motion.g>
      {/* integrations + boundary (evolvable) */}
      <motion.g animate={{ opacity: show("evolvable") ? 1 : 0.35 }} transition={t}>
        <rect x="520" y="52" width="96" height="220" fill="none" stroke={show("evolvable") ? INK : FAINT} strokeDasharray={show("evolvable") ? "0" : "3 4"} />
        {label(526, 44, L.integrations, { fill: show("evolvable") ? INK : DIM })}
        {[90, 150, 210].map((y) => <g key={y}><line x1="490" y1={y} x2="520" y2={y} stroke={show("evolvable") ? INK : FAINT} /><rect x="486" y={y - 4} width="8" height="8" fill="#FFFFFF" stroke={show("evolvable") ? INK : FAINT} /></g>)}
        {show("evolvable") && label(526, 290, d.marks.boundary, { fill: INK })}
      </motion.g>
      {/* operation (operable) */}
      <motion.g animate={{ opacity: show("operable") ? 1 : 0.35 }} transition={t}>
        <line x1="130" y1="300" x2="490" y2="300" stroke={show("operable") ? INK : FAINT} />
        {label(138, 314, L.operation, { fill: show("operable") ? INK : DIM })}
        {[0, 1, 2].map((i) => <rect key={i} x={150 + i * 112} y="322" width="96" height="20" fill={show("operable") ? "rgba(37,99,235,0.1)" : "none"} stroke={show("operable") ? INK : FAINT} />)}
        {show("operable") && label(138, 372, d.marks.deploy, { fill: INK })}
      </motion.g>
      {/* baseline coordinates */}
      {label(130, 404, "x 130 · y 052", { fill: FAINT })}
      {label(616, 404, "640 × 420", { fill: FAINT, anchor: "end" })}
    </svg>
  );
}

/**
 * Room 03 — the engineering review room. A pale technical ground, cobalt
 * lines, small graphite annotations. The principle selected lights the consequence in
 * the cross-section: not a paragraph that opens, a layer that appears.
 */
export default function EngineeringStandard({ a }) {
  const t = a.standard;
  const reduced = useReducedMotion();
  const [on, setOn] = useState("understandable");
  const p = t.principles.find((x) => x.id === on) || t.principles[0];
  return (
    <section id="studio-standard" aria-labelledby="studio-standard-title" className="scroll-mt-20 bg-[#F3F5F9] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Index meta={t.meta}>{t.index}</Index>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 id="studio-standard-title" className={cn(H2, "text-foreground")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.6] text-foreground/80">{t.intro}</p>
            <p className={cn(MONO, "mt-10 text-muted-foreground")}>{t.principlesLabel}</p>
            <ol className="mt-2 border-t border-foreground/15" role="group" aria-label={t.principlesLabel}>
              {t.principles.map((x) => {
                const active = on === x.id;
                return (
                  <li key={x.id} className="border-b border-foreground/12">
                    <button type="button" aria-pressed={active} onMouseEnter={() => setOn(x.id)} onFocus={() => setOn(x.id)} onClick={() => setOn(x.id)} className={cn("grid w-full grid-cols-[14px_1fr_auto] items-center gap-3 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", active ? "text-foreground" : "text-foreground/50 hover:text-foreground/85")}>
                      <span aria-hidden="true" className={cn("h-2 w-2 border transition-colors", active ? "border-accent bg-accent" : "border-foreground/35")} />
                      <span className="font-heading text-[16px] font-bold tracking-[-0.02em] md:text-[17px]">{x.label}</span>
                      <span className={cn(MONO, active ? "text-accent" : "text-muted-foreground")}>{x.layer}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-5 min-h-[44px] text-[14px] leading-[1.6] text-foreground/85" aria-live="polite">{p.text}</p>
          </div>
          <div className="lg:col-span-8">
            <motion.div initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9 }} className="border border-foreground/12 bg-white p-3 md:p-6">
              <SystemSection d={t.drawing} active={on} reduced={Boolean(reduced)} />
            </motion.div>
            <p className={cn(MONO, "mt-4 text-muted-foreground")}>{t.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
