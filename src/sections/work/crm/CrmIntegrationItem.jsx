import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * One connected external system on the integration switchboard: what it
 * is, what it contributes (capabilities), the direction of its relation
 * with the CRM, a small data-flow demonstration and the explanation.
 * Focusable, so keyboard users get the same emphasis as hover. Copy and
 * demo data come from i18n; nothing is a real record.
 */

const EASE = [0.22, 1, 0.36, 1];

/** Replays the item's flow once when it becomes active; rests in its final state. */
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

function Node({ tone = "muted", on = true, className = "", children }) {
  return (
    <motion.span
      animate={{ opacity: on ? 1 : 0.35 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[9px] uppercase leading-none tracking-[0.1em]",
        tone === "accent"
          ? "border-accent/60 bg-[#EDF2FF] text-accent"
          : tone === "cyan"
            ? "border-[#17B4CD]/60 bg-[#E6F7FA] text-[#0B7D91]"
            : "border-accent/30 bg-white text-foreground/80",
        className
      )}
    >
      {children}
    </motion.span>
  );
}

/** In-flow connector: vertical on phones, horizontal from sm; ↔ for both-way flows. */
function Link({ on, both = false }) {
  return (
    <span className="flex shrink-0 items-center justify-center self-start sm:self-auto">
      <span
        className={cn(
          "flex items-center gap-0.5 transition-colors duration-300",
          on ? "text-accent" : "text-accent/30"
        )}
      >
        <span className={cn("block h-3 w-px sm:h-px sm:w-4", on ? "bg-accent/70" : "bg-accent/25")} />
        {both ? (
          <ArrowLeftRight className="h-3 w-3 rotate-90 sm:rotate-0" />
        ) : (
          <ArrowRight className="h-3 w-3 rotate-90 sm:rotate-0" />
        )}
      </span>
    </span>
  );
}

/** Workflow state marker: passed states are a filled dot, the final one a check. */
function Mark({ done, final = false }) {
  return (
    <span
      className={cn(
        "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
        done ? "border-accent bg-accent" : "border-accent/40 bg-white"
      )}
    >
      {done && final ? (
        <Check className="h-2 w-2 text-white" strokeWidth={3} />
      ) : done ? (
        <span className="h-1 w-1 rounded-full bg-white" />
      ) : null}
    </span>
  );
}

/* A flow row: steps lit progressively by the sequence phase. `offset` is
   the phase at which this row's first step lights up. */
function FlowRow({ flow, phase, offset, itemTitle }) {
  if (flow.variant === "states") {
    return (
      <ol className="flex flex-wrap items-center gap-2">
        {flow.steps.map((step, i) => {
          const on = phase >= offset + i;
          const last = i === flow.steps.length - 1;
          return (
            <li key={step} className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: on ? 1 : 0.35 }}
                className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground/80"
              >
                <Mark done={on} final={last} />
                {step}
              </motion.span>
              {!last && <span className={cn("h-px w-3", on ? "bg-accent/60" : "bg-accent/20")} />}
            </li>
          );
        })}
      </ol>
    );
  }
  return (
    <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
      {flow.steps.map((step, i) => {
        const on = phase >= offset + i;
        const first = i === 0;
        const tone = first ? (flow.dir === "in" ? "cyan" : "accent") : "muted";
        return (
          <span key={step} className="contents">
            {i > 0 && <Link on={on} both={flow.dir === "both"} />}
            <Node tone={tone} on={on}>
              {step}
            </Node>
            {flow.variant === "network" && i === flow.steps.length - 1 && (
              <span aria-label={itemTitle} className="ml-1 flex items-center gap-1">
                {[0, 1, 2].map((k) => (
                  <motion.span
                    key={k}
                    animate={{ opacity: on ? 1 : 0.3 }}
                    transition={{ delay: k * 0.08 }}
                    className="h-3 w-4 rounded-[2px] border border-accent/40 bg-[#EDF2FF]"
                  />
                ))}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

const CrmIntegrationItem = forwardRef(
  /**
   * @param {{
   *   item: any;
   *   state?: "idle" | "active" | "muted";
   *   reduce?: boolean;
   *   onEngage?: () => void;
   *   onRelease?: () => void;
   * }} props
   * @param {import("react").ForwardedRef<HTMLElement>} ref
   */
  function CrmIntegrationItem({ item, state = "idle", reduce = false, onEngage, onRelease }, ref) {
    const active = state === "active";
    const titleId = `crm-int-${item.id}`;
    const total = item.flows.reduce((n, f) => n + f.steps.length, 0);
    const phase = useSequence({ active, reduce, steps: total });
    let offset = 0;

    return (
      <article
        ref={ref}
        tabIndex={0}
        aria-labelledby={titleId}
        onMouseEnter={onEngage}
        onMouseLeave={onRelease}
        onFocus={onEngage}
        onBlur={onRelease}
        className={cn(
          "relative rounded-lg border bg-white p-4 outline-none transition-[border-color,box-shadow,opacity,transform] duration-300 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2F5FA]",
          active
            ? "-translate-y-px border-accent/60 shadow-[0_22px_48px_-28px_rgba(49,87,246,0.5)]"
            : "border-accent/20 shadow-[0_1px_2px_rgba(12,18,32,0.04),0_14px_34px_-26px_rgba(49,87,246,0.3)]",
          state === "muted" && "opacity-80"
        )}
      >
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 id={titleId} className="font-heading text-base font-bold tracking-[-0.01em] text-foreground">
              {item.title}
            </h3>
            <p className="mt-0.5 text-[11px] text-foreground/60">{item.category}</p>
          </div>
          {/* Direction of the relation — also the mobile substitute for the connector */}
          <span
            className={cn(
              "shrink-0 rounded-sm border px-1.5 py-[3px] font-mono text-[8.5px] uppercase leading-none tracking-[0.1em] transition-colors duration-300",
              active ? "border-accent/60 bg-[#EDF2FF] text-accent" : "border-accent/25 bg-white text-foreground/65"
            )}
          >
            {item.directionLabel}
          </span>
        </header>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.capabilities.map((cap) => (
            <li
              key={cap}
              className="rounded-sm border border-accent/20 bg-[#F8FAFD] px-1.5 py-0.5 text-[10px] leading-tight text-foreground/75"
            >
              {cap}
            </li>
          ))}
        </ul>

        {/* Data-flow demonstration */}
        <div aria-hidden="true" className="mt-3 space-y-2 rounded-md border border-accent/15 bg-[#F8FAFD] p-3">
          {item.flows.map((flow, i) => {
            const row = <FlowRow key={i} flow={flow} phase={phase} offset={offset} itemTitle={item.title} />;
            offset += flow.steps.length;
            return row;
          })}
        </div>

        <p
          className={cn(
            "mt-3 text-[12px] leading-relaxed transition-colors duration-300",
            active ? "text-foreground/85" : "text-foreground/65"
          )}
        >
          {item.detail}
        </p>
      </article>
    );
  }
);

export default CrmIntegrationItem;
