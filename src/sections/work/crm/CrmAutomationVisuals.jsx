import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check as CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Process visualisations for the automation engine — small fragments of
 * a business system executing work: signal → CRM logic → action →
 * result. Two motion layers: quiet ambient pulses while the lane is at
 * rest, and a step-by-step execution of the lane's own flow when it is
 * hovered or focused. Every visible word comes from the module's i18n
 * copy; the numbers are fictional demo data. Rendered aria-hidden.
 */

const EASE = [0.22, 1, 0.36, 1];

/**
 * Execution clock for a lane. At rest the flow sits in its final state
 * (so nothing is hidden behind interaction); when the lane becomes
 * active the flow replays once from step 0. With reduced motion the
 * final state is shown and nothing replays.
 */
function useSequence({ active, reduce, steps, stepMs = 420 }) {
  const [phase, setPhase] = useState(steps);
  useEffect(() => {
    if (!active || reduce) {
      setPhase(steps);
      return undefined;
    }
    setPhase(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setPhase(i);
      if (i >= steps) window.clearInterval(id);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [active, reduce, steps, stepMs]);
  return phase;
}

/* ── light atoms ──────────────────────────────────────────────── */

const TONES = {
  muted: "border-accent/30 bg-white text-foreground/80",
  accent: "border-accent/60 bg-[#EDF2FF] text-accent",
  cyan: "border-[#17B4CD]/60 bg-[#E6F7FA] text-[#0B7D91]",
  warn: "border-[#D9A441]/60 bg-[#FBF3E2] text-[#9A4A07]",
  attention: "border-[#E3735E]/60 bg-[#FCEDE9] text-[#A8351F]",
};

function Surface({ className = "", children }) {
  return (
    <div className={cn("rounded-md border border-accent/20 bg-white/85 p-3.5 shadow-[0_12px_30px_-22px_rgba(49,87,246,0.35)] backdrop-blur-sm md:p-4", className)}>
      {children}
    </div>
  );
}

function Label({ className = "", children }) {
  return (
    <p className={cn("font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/60", className)}>
      {children}
    </p>
  );
}

/** A labelled process node; `on` lets the execution light it up. */
function Node({ tone = "muted", on = true, className = "", children }) {
  return (
    <motion.span
      animate={{ opacity: on ? 1 : 0.35 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[9px] uppercase leading-none tracking-[0.1em]",
        TONES[tone],
        className
      )}
    >
      {children}
    </motion.span>
  );
}

/**
 * Connector between nodes: vertical on phones, horizontal from sm
 * (or always vertical with dir="vertical"). `pulse` runs the ambient
 * signal — a small cobalt light travelling along the line.
 */
function Arrow({ on = true, pulse = false, delay = 0, dir = "auto", className = "" }) {
  const vertical = dir === "vertical";
  const lineClass = vertical ? "h-4 w-px" : "h-4 w-px sm:h-px sm:w-6";
  const travel = vertical ? { top: ["0%", "100%"] } : { left: ["0%", "100%"] };
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        vertical ? "h-4 w-px" : "h-4 w-px sm:h-px sm:w-6",
        className
      )}
    >
      <span
        className={cn(
          "block transition-colors duration-300",
          lineClass,
          on ? "bg-[#3157F6]/80" : "bg-accent/25"
        )}
      />
      {pulse && (
        <motion.span
          className={cn(
            "absolute h-1.5 w-1.5 rounded-full bg-[#3157F6] shadow-[0_0_6px_rgba(49,87,246,0.55)]",
            vertical ? "left-1/2 -ml-[3px] -mt-[3px]" : "hidden top-1/2 -ml-[3px] -mt-[3px] sm:block"
          )}
          animate={{ ...travel, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 4.5,
            delay,
            ease: "easeInOut",
          }}
        />
      )}
    </span>
  );
}

/** Small checkbox with state; `on` dims it before its step arrives. */
function Check({ done, on = true }) {
  return (
    <motion.span
      animate={{ opacity: on ? 1 : 0.3 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
        done ? "border-[#3157F6] bg-[#3157F6]" : "border-accent/40 bg-white"
      )}
    >
      {done && <CheckIcon className="h-2 w-2 text-white" strokeWidth={3} />}
    </motion.span>
  );
}

/** Quietly breathing status dot (cyan = live). */
export function LiveDot({ reduce, className = "" }) {
  return (
    <span className={cn("relative flex h-2 w-2 shrink-0", className)}>
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

const flowClass = "flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center";

/* ── 01 Matching ─────────────────────────────────────────────── */

function MatchingVisual({ ui, active, reduce, lane }) {
  const phase = useSequence({ active, reduce, steps: 6 });
  const ambient = !active && !reduce;
  return (
    <Surface>
      <div className={flowClass}>
        <Node tone="cyan">{ui.trigger}</Node>
        <Arrow on={phase >= 1} pulse={ambient} delay={lane * 0.9} />
        <span className="flex flex-col gap-1.5">
          <Node tone="accent" on={phase >= 1}>
            <span className="h-1 w-1 rounded-full bg-accent" />
            {ui.engine}
          </Node>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-foreground/60">
            {ui.pair}
          </span>
        </span>
        <Arrow on={phase >= 2} />
        <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5">
          {ui.criteria.map((criterion, i) => (
            <li key={criterion} className="flex items-center gap-1.5 text-[10.5px] text-foreground/85">
              <Check done={phase >= 2 + i} />
              {criterion}
            </li>
          ))}
        </ul>
        <Arrow on={phase >= 6} />
        <Node tone="accent" on={phase >= 6}>
          {ui.result}
        </Node>
      </div>
    </Surface>
  );
}

/* ── 02 Lead follow-up ───────────────────────────────────────── */

function LeadsVisual({ ui, active, reduce, lane }) {
  const phase = useSequence({ active, reduce, steps: 3, stepMs: 520 });
  const ambient = !active && !reduce;
  return (
    <Surface>
      <div className={flowClass}>
        <Node tone="cyan">{ui.steps[0]}</Node>
        <Arrow on={phase >= 1} pulse={ambient} delay={lane * 0.9} />
        <Node on={phase >= 1}>{ui.steps[1]}</Node>
        <Arrow on={phase >= 2} />
        <span className="flex flex-col gap-1.5">
          <Node tone="accent" on={phase >= 2}>
            {ui.steps[2]}
          </Node>
          <span className="block h-1 w-full overflow-hidden rounded-full bg-accent/15">
            <motion.span
              className="block h-full rounded-full bg-[#3157F6]"
              animate={{ width: phase >= 2 ? "72%" : "0%" }}
              transition={{ duration: reduce ? 0 : 1.1, ease: "easeInOut" }}
            />
          </span>
        </span>
        <Arrow on={phase >= 3} />
        <Node tone="warn" on={phase >= 3}>
          {ui.steps[3]}
        </Node>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-accent/15 pt-2.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-foreground/60">
        <span>{ui.noContact}</span>
        <span className="text-accent/60">→</span>
        <span className={cn("transition-colors duration-300", phase >= 3 && "text-[#9A4A07]")}>
          ! {ui.alert}
        </span>
        <span className="text-accent/60">→</span>
        <span>{ui.queue}</span>
      </p>
    </Surface>
  );
}

/* ── 03 Smart checklists ─────────────────────────────────────── */

function ChecklistVisual({ ui, active, reduce, lane }) {
  const phase = useSequence({ active, reduce, steps: 3, stepMs: 520 });
  const ambient = !active && !reduce;
  return (
    <Surface className="grid gap-4 sm:grid-cols-[auto_auto_auto] sm:items-center sm:justify-start sm:gap-5">
      <div className="order-3 sm:order-1">
        <Label>{ui.file}</Label>
        <ul className="mt-2 space-y-1.5">
          {ui.items.map(([label, done], i) => {
            const auto = i === ui.autoIndex;
            const isDone = auto ? phase >= 3 : done;
            return (
              <li key={label} className="flex items-center gap-2 text-[11px]">
                <Check done={isDone} />
                <span className={isDone ? "text-foreground/90" : "text-foreground/55"}>{label}</span>
                {auto && (
                  <motion.span
                    animate={{ opacity: phase >= 3 ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-1 font-mono text-[8px] uppercase tracking-[0.12em] text-accent"
                  >
                    {ui.autoTag}
                  </motion.span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {/* The event flows INTO the file: line pointing left on sm+ */}
      <Arrow
        on={phase >= 2}
        pulse={ambient}
        delay={lane * 0.9}
        className="order-2 rotate-180"
      />
      <Node tone="cyan" on={phase >= 1} className="order-1 sm:order-3">
        {ui.event}
      </Node>
    </Surface>
  );
}

/* ── 04 Alerts & reminders ───────────────────────────────────── */

const STATE_GLYPH = {
  ok: "border-[#17B4CD]/60 bg-[#E6F7FA] text-[#0B7D91]",
  warn: "border-[#D9A441]/60 bg-[#FBF3E2] text-[#9A4A07]",
  attention: "border-[#E3735E]/60 bg-[#FCEDE9] text-[#A8351F]",
};

function AlertsVisual({ ui, active, reduce }) {
  const phase = useSequence({ active, reduce, steps: ui.items.length, stepMs: 300 });
  return (
    <Surface>
      <div className="flex items-center justify-between gap-3">
        <Label>{ui.label}</Label>
        <span className="flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-accent">
          <LiveDot reduce={reduce} />
          {ui.live}
        </span>
      </div>
      <ul className="mt-2 divide-y divide-accent/10">
        {ui.items.map(([label, tone], i) => (
          <motion.li
            key={label}
            animate={{ opacity: phase > i ? 1 : 0.18, x: phase > i ? 0 : -6 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center justify-between gap-3 py-1.5 text-[11px] text-foreground/85"
          >
            <span>{label}</span>
            <span
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border font-mono text-[9px]",
                STATE_GLYPH[tone]
              )}
            >
              {tone === "ok" ? "✓" : "!"}
            </span>
          </motion.li>
        ))}
      </ul>
    </Surface>
  );
}

/* ── 05 Operation sync ───────────────────────────────────────── */

function SyncVisual({ ui, active, reduce, lane }) {
  /* Each event row lights its own destinations only: row phases are
     laid out one after another — event, CRM, then each target. */
  let cursor = 0;
  const rows = ui.events.map((event) => {
    const start = cursor;
    cursor = start + 1 + event.targets.length + 1;
    return { ...event, start };
  });
  const steps = cursor - 1;
  const phase = useSequence({ active, reduce, steps });
  const ambient = !active && !reduce;
  return (
    <Surface className="space-y-3">
      {rows.map((row, r) => (
        <div
          key={row.label}
          className={cn(
            flowClass,
            r > 0 && "border-t border-accent/15 pt-3 sm:border-0 sm:pt-0"
          )}
        >
          <Node tone="cyan" on={phase >= row.start}>
            {row.label}
          </Node>
          <Arrow on={phase >= row.start + 1} pulse={ambient} delay={lane * 0.9 + r * 2.4} />
          <Node tone="accent" on={phase >= row.start + 1}>
            {ui.source}
          </Node>
          {row.targets.map((target, k) => (
            <span key={target} className="contents">
              <Arrow on={phase >= row.start + 2 + k} />
              <Node on={phase >= row.start + 2 + k}>{target}</Node>
            </span>
          ))}
        </div>
      ))}
    </Surface>
  );
}

/* ── 06 AI-assisted qualification ────────────────────────────── */

function AiVisual({ ui, active, reduce, lane }) {
  const phase = useSequence({ active, reduce, steps: 6, stepMs: 380 });
  const ambient = !active && !reduce;
  return (
    <Surface className="flex flex-col gap-3 md:grid md:grid-cols-[minmax(0,1.05fr)_auto_minmax(0,1fr)] md:items-center md:gap-5">
      <div>
        <Label className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#17B4CD]" />
          {ui.source}
        </Label>
        <p className="mt-2 rounded-md rounded-tl-sm border border-accent/25 bg-white px-3 py-2 text-[11.5px] leading-snug text-foreground/90">
          “{ui.message}”
        </p>
      </div>
      <div className="flex flex-col items-center gap-1.5 self-center">
        <Arrow dir="vertical" on={phase >= 1} pulse={ambient} delay={lane * 0.9} />
        <Node tone="accent" on={phase >= 1} className="px-2.5 py-1.5">
          <span className="h-1 w-1 rounded-full bg-accent" />
          {ui.ai}
        </Node>
        <Arrow dir="vertical" on={phase >= 2} />
      </div>
      <div>
        <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1">
          {ui.fields.map(([key, value], i) => (
            <motion.div
              key={key}
              animate={{ opacity: phase >= 2 + i ? 1 : 0.18 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="contents"
            >
              <dt className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-foreground/60">
                {key}
              </dt>
              <dd className="border-b border-accent/10 pb-1 text-[11px] text-foreground/90">{value}</dd>
            </motion.div>
          ))}
        </dl>
        <Node tone="accent" on={phase >= 6} className="mt-3">
          {ui.result}
        </Node>
      </div>
    </Surface>
  );
}

export const VISUALS = {
  matching: MatchingVisual,
  leads: LeadsVisual,
  checklists: ChecklistVisual,
  alerts: AlertsVisual,
  sync: SyncVisual,
  ai: AiVisual,
};
