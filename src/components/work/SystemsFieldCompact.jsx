import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROJECTS, projectSlug } from "@/data/projects";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { FLOWS, ORDER, T } from "./systemsFieldData";

const EASE = [0.22, 1, 0.36, 1];
const CYCLE_MS = 4200;

function projectPath(id, lang) {
  const project = PROJECTS.find((p) => p.slug === id);
  return langPath(lang, `/work/${project ? projectSlug(project, lang) : id}`);
}

/** Tiny DOM fragments — the same abstract product moments as the desktop map. */
function Fragment({ id, t }) {
  const chip = "rounded-md border border-[#DCE2EE] bg-white px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#4A5164]";
  if (id === "crm-inmobiliario") {
    return (
      <div className="flex items-center gap-2">
        <span className={cn(chip, "flex items-center gap-1.5")}><span className="h-2 w-2 rounded-[2px] bg-accent/25" />{t.fragment[0]}</span>
        <span className="h-px w-4 bg-accent/50" />
        <span className={cn(chip, "flex items-center gap-1.5")}><span className="h-2 w-2 rounded-full border border-accent bg-white" />{t.fragment[1]}</span>
      </div>
    );
  }
  if (id === "fivo") {
    return (
      <div className={cn(chip, "flex items-center gap-2 rounded-full")}>
        <span className="text-accent-deep">{t.fragment[0]}</span>
        <span className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="h-1 w-1 rounded-full bg-accent/70" />)}</span>
        <ArrowRight aria-hidden="true" className="h-3 w-3 text-accent/70" />
        {t.fragment[1]}
      </div>
    );
  }
  if (id === "life-admin") {
    return (
      <div className={cn(chip, "flex items-center gap-2.5")}>
        <span className="flex flex-col gap-[3px]">{[10, 14, 10].map((w, i) => <span key={i} className="h-[2px] rounded-full bg-accent/70" style={{ width: w }} />)}</span>
        {t.fragment[1]}
      </div>
    );
  }
  return (
    <div className="flex items-end gap-1.5">
      <span className="h-9 w-14 rounded-[4px] border border-[#DCE2EE] bg-white p-1.5"><span className="block h-1 w-7 rounded-full bg-accent/50" /><span className="mt-1 block h-[3px] w-5 rounded-full bg-[#C9D3EC]" /></span>
      <span className="h-7 w-4 rounded-[3px] border border-accent/60 bg-white p-[3px]"><span className="block h-[3px] w-2 rounded-full bg-accent/50" /></span>
    </div>
  );
}

/**
 * The mobile interpretation: one compact system surface. A 01–04
 * selector picks a flow; the surface shows input → logic → output, its
 * product fragment and the completed event, and links to the project.
 * It cycles slowly on its own only until the visitor touches it, and
 * never under reduced motion.
 */
export default function SystemsFieldCompact({ lang = "es" }) {
  const t = T[lang];
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const id = ORDER[index];
  const flow = FLOWS.find((f) => f.id === id);
  const f = t.flows[id];

  useEffect(() => {
    if (touched || reduce || !inView) return undefined;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % ORDER.length), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [touched, reduce, inView]);

  const stop = () => setTouched(true);

  return (
    <div ref={ref} onPointerDown={stop} onFocusCapture={stop} className="rounded-xl border border-[#DCE2EE] bg-white/70 p-4 shadow-[0_24px_50px_-36px_rgba(49,87,246,0.35)]">
      <div role="tablist" aria-label={t.select} className="flex gap-1.5">
        {ORDER.map((fid, i) => {
          const fl = FLOWS.find((x) => x.id === fid);
          const on = i === index;
          return (
            <button
              key={fid}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`sf-panel-${fid}`}
              onClick={() => { stop(); setIndex(i); }}
              className={cn(
                "flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md border px-2 py-2 font-mono text-[10px] tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
                on ? "border-accent/50 bg-[#EDF2FF] text-accent-deep" : "border-transparent text-muted-foreground"
              )}
            >
              {fl.n}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={id}
          id={`sf-panel-${id}`}
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="mt-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{flow.n} · {f.name}</p>
          <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {f.stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
                    i === 1 ? "border border-accent/40 bg-[#EDF2FF] text-accent-deep" : "border border-[#DCE2EE] bg-white text-[#4A5164]"
                  )}
                >
                  {stage}
                </span>
                {i < 2 && <ArrowRight aria-hidden="true" className="h-3 w-3 text-accent/60" />}
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <Fragment id={id} t={f} />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white">
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true"><path d="M2.5 6.2l2.4 2.4 4.6-4.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {f.event}
            </span>
          </div>
          <Link to={projectPath(id, lang)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
            {t.view}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
