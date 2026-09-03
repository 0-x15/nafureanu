import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * The matching workspace — a sanitized CRM surface demonstrating the
 * bidirectional matching engine: a source record on the left, the
 * structured comparison in the centre and the compatible results on the
 * right. Two tabs switch the direction (demand → properties, property →
 * interested clients). Entering the viewport or switching direction
 * replays the process: source → signal → criteria → results. All copy
 * and demo data come from i18n; nothing here is a real record.
 */

const EASE = [0.22, 1, 0.36, 1];
const STEP_MS = 360;
const AUTO_SWITCH_MS = 9000;

/* ── quiet atoms ─────────────────────────────────────────────── */

function Label({ className = "", children }) {
  return (
    <p className={cn("font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground", className)}>
      {children}
    </p>
  );
}

function Pill({ tone = "muted", className = "", children }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm border px-1.5 py-[3px] font-mono text-[8.5px] uppercase leading-none tracking-[0.1em]",
        tone === "accent"
          ? "border-accent/40 bg-[#EDF2FF] text-accent"
          : "border-border bg-white text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

function CheckMark({ done }) {
  return (
    <span
      className={cn(
        "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
        done ? "border-accent bg-accent" : "border-foreground/20 bg-white"
      )}
    >
      {done && <Check className="h-2 w-2 text-white" strokeWidth={3} />}
    </span>
  );
}

/** Source → engine → results connector: vertical on phones, horizontal on lg. */
function Connector({ on, pulse }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-6 w-px items-center justify-self-center lg:mt-14 lg:h-px lg:w-10"
    >
      <span
        className={cn(
          "block h-6 w-px transition-colors duration-500 lg:h-px lg:w-10",
          on ? "bg-accent/60" : "bg-border"
        )}
      />
      {pulse && (
        <motion.span
          className="absolute h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(49,87,246,0.55)] max-lg:left-1/2 max-lg:-ml-[3px] lg:top-1/2 lg:-mt-[3px]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
        />
      )}
    </span>
  );
}

/* ── the three areas ─────────────────────────────────────────── */

function SourcePanel({ source, phase }) {
  return (
    <div className="rounded-md border border-border bg-[#F8FAFD] p-4">
      <div className="flex items-center justify-between gap-3">
        <Label>{source.label}</Label>
        <Pill>{source.kind}</Pill>
      </div>
      <dl className="mt-3 divide-y divide-border">
        {source.fields.map(([key, value], i) => (
          <motion.div
            key={key}
            animate={{ opacity: phase >= 0 ? 1 : 0 }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
            className="flex items-center justify-between gap-3 py-1.5"
          >
            <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              {key}
            </dt>
            <dd className="text-[11.5px] font-medium text-foreground">{value}</dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}

function Engine({ m, mode, phase, reduce }) {
  const [from, to] = mode.direction;
  return (
    <div className="rounded-md border border-accent/30 bg-white p-4 shadow-[0_16px_36px_-24px_rgba(49,87,246,0.4)]">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-accent">{m.engine}</Label>
        <span className="relative flex h-2 w-2">
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full bg-accent"
              animate={{ scale: [1, 2.3], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <span className="relative h-2 w-2 rounded-full bg-accent" />
        </span>
      </div>
      {/* The direction of the search — flips with the mode */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={mode.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-1.5 flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted-foreground"
        >
          {from}
          <ArrowRight className="h-2.5 w-2.5 text-accent" />
          {to}
        </motion.p>
      </AnimatePresence>
      <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
        {mode.criteria.map((criterion, i) => {
          const done = phase >= 2 + i;
          return (
            <motion.li
              key={`${mode.id}-${criterion}`}
              animate={{ opacity: done ? 1 : 0.35 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-center justify-between gap-3 text-[11px]"
            >
              <span className="text-foreground/80">{criterion}</span>
              <CheckMark done={done} />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function Results({ m, mode, phase, firstResultPhase, selected, onSelect }) {
  const current = mode.results[selected] || mode.results[0];
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Label>{mode.resultsLabel}</Label>
        <span className="font-mono text-[9px] text-muted-foreground">{mode.results.length}</span>
      </div>
      <ul className="mt-2 space-y-2">
        {mode.results.map((result, i) => {
          const shown = phase >= firstResultPhase + i;
          const isSelected = i === selected;
          return (
            <motion.li
              key={result.title + i}
              animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(i)}
                className={cn(
                  "w-full rounded-md border bg-white p-3 text-left transition-[border-color,box-shadow] duration-300",
                  isSelected
                    ? "border-accent/60 shadow-[0_14px_30px_-22px_rgba(49,87,246,0.45)]"
                    : "border-border hover:border-accent/30"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-foreground">{result.title}</p>
                    <p className="mt-1 text-[10.5px] text-muted-foreground">
                      {result.meta.join(" · ")}
                    </p>
                  </div>
                  <Pill tone="accent">{m.compatible}</Pill>
                </div>
                {isSelected && (
                  <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-2 text-[10px] font-medium text-accent">
                    {mode.actions.map((action) => (
                      <span key={action} className="inline-flex items-center gap-1">
                        {action}
                        <ArrowRight className="h-2.5 w-2.5" />
                      </span>
                    ))}
                  </p>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>

      {/* Why the selected result is compatible — inside the workspace */}
      <motion.div
        animate={{ opacity: phase >= firstResultPhase ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="mt-3 rounded-md border border-border bg-[#F8FAFD] p-3"
      >
        <Label>{m.criteriaTitle}</Label>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {current.criteria.map((criterion) => (
            <li
              key={criterion}
              className="rounded-sm border border-accent/30 bg-[#EDF2FF] px-1.5 py-0.5 font-mono text-[9px] text-accent"
            >
              {criterion}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ── the workspace ───────────────────────────────────────────── */

export default function MatchingDemo({ m }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const tabRefs = useRef([]);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const [modeIdx, setModeIdx] = useState(0);
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState(Infinity);
  const [engaged, setEngaged] = useState(false);
  const userChose = useRef(false);

  const mode = m.modes[modeIdx];
  const firstResultPhase = 2 + mode.criteria.length;
  const finalPhase = firstResultPhase + mode.results.length;

  /* Execution: replays when the workspace enters the viewport or the
     direction changes. Reduced motion shows the final state directly. */
  useEffect(() => {
    if (reduce || !inView) {
      setPhase(finalPhase);
      return undefined;
    }
    setPhase(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setPhase(i);
      if (i >= finalPhase) window.clearInterval(id);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [modeIdx, inView, reduce, finalPhase]);

  /* Slow automatic switch between the two directions, only while the
     workspace is in view and untouched. A manual choice ends it. */
  useEffect(() => {
    if (reduce || !inView || engaged || userChose.current) return undefined;
    const id = window.setTimeout(() => {
      setSelected(0);
      setModeIdx((i) => (i + 1) % m.modes.length);
    }, AUTO_SWITCH_MS);
    return () => window.clearTimeout(id);
  }, [modeIdx, inView, engaged, reduce, m.modes.length]);

  const choose = (i) => {
    userChose.current = true;
    setSelected(0);
    setModeIdx(i);
  };

  const onTabKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      (modeIdx + (e.key === "ArrowRight" ? 1 : -1) + m.modes.length) % m.modes.length;
    choose(next);
    tabRefs.current[next]?.focus();
  };

  const pulse = !reduce && inView;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false);
      }}
      className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_1px_2px_rgba(12,18,32,0.04),0_36px_80px_-48px_rgba(49,87,246,0.22)]"
    >
      {/* Top bar — workspace identity, direction tabs, the relation */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border px-4 py-3 md:px-5">
        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
          {m.workspace}
        </p>
        <div
          role="tablist"
          aria-label={m.workspace}
          onKeyDown={onTabKeyDown}
          className="flex rounded-md border border-border bg-[#F8FAFD] p-0.5"
        >
          {m.modes.map((entry, i) => {
            const isActive = i === modeIdx;
            return (
              <button
                key={entry.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`crm-match-tab-${entry.id}`}
                aria-selected={isActive}
                aria-controls={`crm-match-panel-${entry.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => choose(i)}
                className={cn(
                  "rounded-[5px] px-3 py-1.5 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  isActive
                    ? "border border-border bg-white text-foreground shadow-[0_1px_2px_rgba(12,18,32,0.06)]"
                    : "border border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {entry.tab}
              </button>
            );
          })}
        </div>
        <p className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground md:block">
          {m.relation}
        </p>
      </div>

      {/* Workspace body — source → matching → results */}
      <div
        role="tabpanel"
        id={`crm-match-panel-${mode.id}`}
        aria-labelledby={`crm-match-tab-${mode.id}`}
        className="grid gap-4 p-4 md:p-5 lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,4fr)_auto_minmax(0,7fr)] lg:items-start lg:gap-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <SourcePanel source={mode.source} phase={phase} />
          </motion.div>
        </AnimatePresence>

        <Connector on={phase >= 1} pulse={pulse} />

        <Engine m={m} mode={mode} phase={phase} reduce={reduce} />

        <Connector on={phase >= firstResultPhase} pulse={pulse} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <Results
              m={m}
              mode={mode}
              phase={phase}
              firstResultPhase={firstResultPhase}
              selected={selected}
              onSelect={setSelected}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
