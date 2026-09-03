import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * One layer of the system architecture: number and role on the rail,
 * label and description on the left, the layer's architecture detail on
 * the right (entities, flows, surfaces or platform services). Focusable
 * so keyboard users get the same emphasis as hover. Copy from i18n.
 */

const EASE = [0.22, 1, 0.36, 1];

function Chip({ active, className = "", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-1 text-[10.5px] leading-none transition-colors duration-300",
        active
          ? "border-accent/50 bg-[#EDF2FF] text-accent"
          : "border-accent/20 bg-white text-foreground/75",
        className
      )}
    >
      {children}
    </span>
  );
}

function FlowNode({ active, first, children }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm border px-2 py-1 font-mono text-[9px] uppercase leading-none tracking-[0.1em] transition-colors duration-300",
        first
          ? "border-[#17B4CD]/60 bg-[#E6F7FA] text-[#0B7D91]"
          : active
            ? "border-accent/60 bg-[#EDF2FF] text-accent"
            : "border-accent/30 bg-white text-foreground/80"
      )}
    >
      {children}
    </span>
  );
}

function FlowArrow({ active }) {
  return (
    <span className={cn("flex items-center transition-colors duration-300", active ? "text-accent" : "text-accent/40")}>
      <span className={cn("block h-px w-3", active ? "bg-accent/70" : "bg-accent/25")} />
      <ArrowRight className="h-3 w-3" />
    </span>
  );
}

/** A horizontal flow: node → node → node. Wraps on small screens. */
function Flow({ steps, active }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
      {steps.map((step, i) => (
        <span key={step} className="contents">
          {i > 0 && <FlowArrow active={active} />}
          <FlowNode active={active} first={i === 0}>
            {step}
          </FlowNode>
        </span>
      ))}
    </div>
  );
}

/** Operational entities joined by restrained relationship lines. */
function Entities({ items, active }) {
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {items.map((item, i) => (
        <span key={item} className="flex items-center">
          {i > 0 && (
            <span className={cn("mx-1.5 h-px w-4 transition-colors duration-300", active ? "bg-accent/60" : "bg-accent/25")} />
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[9px] uppercase leading-none tracking-[0.1em] transition-colors duration-300",
              active ? "border-accent/60 bg-[#EDF2FF] text-accent" : "border-accent/30 bg-white text-foreground/80"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-[2px]", active ? "bg-accent" : "bg-accent/50")} />
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

/** The business process as a chain of stages. */
function Chain({ items, active }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2">
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          {i > 0 && (
            <span className={cn("mx-1.5 h-px w-4 transition-colors duration-300", active ? "bg-accent/60" : "bg-accent/30")} />
          )}
          <span
            className={cn(
              "rounded-sm border px-2.5 py-1.5 text-[11px] font-medium leading-none transition-colors duration-300",
              active ? "border-accent/60 bg-[#EDF2FF] text-accent" : "border-accent/30 bg-white text-foreground/85"
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** A sanitized work-surface wireframe beside the interface concepts. */
function Surface({ active }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-16 w-28 shrink-0 gap-1.5 rounded-md border bg-white p-1.5 transition-colors duration-300",
        active ? "border-accent/50" : "border-accent/25"
      )}
    >
      <span className="flex w-6 flex-col gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("h-1 rounded-full", i === 0 ? "bg-accent/70" : "bg-foreground/10")} />
        ))}
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="h-1.5 w-3/4 rounded-full bg-foreground/15" />
        <span className="grid flex-1 grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("rounded-[2px]", i === 1 ? "bg-accent/25" : "bg-foreground/[0.06]")} />
          ))}
        </span>
        <span className="h-1 w-1/2 rounded-full bg-foreground/10" />
      </span>
    </span>
  );
}

/**
 * @param {{
 *   layer: any;
 *   index: number;
 *   count: number;
 *   state?: "idle" | "active" | "dim";
 *   reduce?: boolean;
 *   flowLabel?: string;
 *   onEngage?: () => void;
 *   onRelease?: () => void;
 * }} props
 */
export default function CrmOdooLayer({
  layer,
  index,
  count,
  state = "idle",
  reduce = false,
  flowLabel,
  onEngage,
  onRelease,
}) {
  const active = state === "active";
  const foundation = layer.id === "foundation";
  const top = index === 0;
  const titleId = `crm-odoo-${layer.id}`;
  /* Builds from the foundation upward: the lowest layer appears first. */
  const delay = (count - 1 - index) * 0.14;

  return (
    <motion.article
      tabIndex={0}
      aria-labelledby={titleId}
      onMouseEnter={onEngage}
      onMouseLeave={onRelease}
      onFocus={onEngage}
      onBlur={onRelease}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={cn(
        "relative grid gap-4 border-t px-4 py-4 outline-none transition-[background-color,opacity,box-shadow] duration-300 first:border-t-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/40 md:grid-cols-[minmax(0,32%)_minmax(0,1fr)] md:gap-8 md:px-6 md:py-5",
        foundation ? "border-accent/25 bg-[#EDF2FF]/70" : "border-accent/15",
        active && !foundation && "bg-white shadow-[inset_0_0_0_1px_rgba(49,87,246,0.35)]",
        active && foundation && "bg-[#EDF2FF] shadow-[inset_0_0_0_1px_rgba(49,87,246,0.45)]",
        state === "dim" && "opacity-80"
      )}
    >
      {/* Identity — number on the rail, label, role, description */}
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "relative z-10 mt-0.5 flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full border bg-white px-1.5 font-mono text-[10px] transition-colors duration-300",
            active || top ? "border-accent text-accent" : "border-accent/40 text-accent"
          )}
        >
          {layer.num}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 id={titleId} className="font-heading text-base font-bold tracking-[-0.01em] text-foreground md:text-lg">
              {layer.label}
            </h3>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-foreground/55">
              {layer.role}
            </span>
          </div>
          <p
            className={cn(
              "mt-1.5 max-w-sm text-[12.5px] leading-relaxed transition-colors duration-300",
              active ? "text-foreground/85" : "text-foreground/65"
            )}
          >
            {layer.text}
          </p>
        </div>
      </div>

      {/* Architecture detail */}
      <div className="min-w-0 space-y-3 md:pt-0.5">
        {foundation && (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-heading text-2xl font-bold tracking-[-0.02em] text-foreground">
              {layer.main}
            </span>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-accent">
              {layer.label}
            </span>
          </div>
        )}
        {layer.visual === "chain" && <Chain items={layer.items} active={active} />}
        {layer.visual === "entities" && <Entities items={layer.items} active={active} />}
        {(layer.visual === "surface" || (!layer.visual && !foundation)) && (
          <div className="flex flex-wrap items-start gap-3">
            {layer.visual === "surface" && <Surface active={active} />}
            <ul className="flex flex-wrap gap-1.5">
              {layer.items.map((item) => (
                <li key={item}>
                  <Chip active={active}>{item}</Chip>
                </li>
              ))}
            </ul>
          </div>
        )}
        {foundation && (
          <ul className="flex flex-wrap gap-1.5">
            {layer.items.map((item) => (
              <li key={item}>
                <Chip active={active}>{item}</Chip>
              </li>
            ))}
          </ul>
        )}
        {layer.flow && (
          <div className="space-y-1.5">
            {layer.id === "automation" && flowLabel && (
              <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-foreground/50">{flowLabel}</p>
            )}
            <Flow steps={layer.flow} active={active} />
          </div>
        )}
      </div>
    </motion.article>
  );
}
