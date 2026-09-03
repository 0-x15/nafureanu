import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import CrmOdooLayer from "./CrmOdooLayer";

/**
 * Odoo engineering — a layered software architecture that grows from the
 * platform foundation (Odoo, in this project) up to the real-estate
 * operation: data models, business logic, automation and custom OWL
 * surfaces in between, with restrained technical proof. A second block
 * makes the positioning explicit: the platform is an architectural
 * decision (Odoo when it adds value, from scratch when the system needs
 * its own architecture), visualised as two equal routes.
 */

function Node({ tone = "muted", className = "", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-1.5 font-mono text-[9px] uppercase leading-none tracking-[0.12em]",
        tone === "accent"
          ? "border-accent/60 bg-[#EDF2FF] text-accent"
          : tone === "cyan"
            ? "border-[#17B4CD]/60 bg-[#E6F7FA] text-[#0B7D91]"
            : "border-accent/30 bg-white text-foreground/80",
        className
      )}
    >
      {children}
    </span>
  );
}

function Down() {
  return (
    <span aria-hidden="true" className="flex flex-col items-center text-accent/60">
      <span className="block h-4 w-px bg-accent/40" />
      <ArrowDown className="-mt-1 h-3 w-3" />
    </span>
  );
}

/** Two equal architecture routes: platform-based or custom, same weight. */
function ArchitectureChoice({ choice }) {
  return (
    <div className="rounded-xl border border-border bg-white/75 p-4 shadow-[0_1px_2px_rgba(12,18,32,0.04),0_36px_80px_-48px_rgba(49,87,246,0.3)] backdrop-blur-[20px] md:p-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <Node tone="cyan">{choice.start}</Node>
        <Down />
        <Node tone="accent">{choice.decision}</Node>

        {/* Branch — bracket on md+, plain stack on phones */}
        <span aria-hidden="true" className="mt-0 hidden h-6 w-1/2 rounded-t-md border-l border-r border-t border-accent/40 md:block" />
        <span aria-hidden="true" className="h-4 w-px bg-accent/40 md:hidden" />

        <div className="grid w-full gap-4 md:grid-cols-2 md:gap-6">
          {choice.routes.map((route, i) => (
            <div key={route.id} className="flex flex-col">
              {i > 0 && <span aria-hidden="true" className="mx-auto mb-1 h-4 w-px bg-accent/40 md:hidden" />}
              <div className="flex h-full flex-col rounded-lg border border-accent/25 bg-white p-4 shadow-[0_1px_2px_rgba(12,18,32,0.04),0_14px_34px_-26px_rgba(49,87,246,0.3)] md:p-5">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-foreground/55">{route.title}</p>
                <p className="mt-1 font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{route.subtitle}</p>
                <ul className="mt-4 space-y-1.5 border-t border-accent/15 pt-3">
                  {route.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12px] text-foreground/80">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Merge */}
        <span aria-hidden="true" className="hidden h-6 w-1/2 rounded-b-md border-b border-l border-r border-accent/40 md:block" />
        <span aria-hidden="true" className="h-4 w-px bg-accent/40 md:hidden" />
        <span aria-hidden="true" className="hidden h-4 w-px bg-accent/40 md:block" />
        <Node tone="accent" className="text-center">
          {choice.result}
        </Node>
      </div>
    </div>
  );
}

export default function CrmOdoo({ c }) {
  const o = c.odoo;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const stateOf = (id) => (!active ? "idle" : id === active ? "active" : "dim");

  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {o.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {o.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.75] text-muted-foreground">
            {o.copy}
          </p>
        </Reveal>

        {/* The layered architecture — one surface, built from the base upward */}
        <div className="mt-12 md:mt-16">
          <div className="overflow-hidden rounded-xl border border-border bg-[#F8FAFD] shadow-[0_1px_2px_rgba(12,18,32,0.04),0_36px_80px_-48px_rgba(49,87,246,0.3)]">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-accent/15 bg-white px-4 py-3 md:px-6">
              <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/85">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                {o.panelLabel}
              </p>
              {/* Restrained technical proof */}
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-heading text-lg font-bold tracking-[-0.02em] text-foreground">
                  {o.proof.value}
                </span>
                <span className="text-[11px] text-foreground/70">{o.proof.label}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/50">
                  {o.proof.stack}
                </span>
              </p>
            </div>

            <div className="relative">
              {/* rail through the layer numbers */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 top-5 hidden w-px bg-accent/25 md:left-[35px] md:block"
              />
              {o.layers.map((layer, i) => (
                <CrmOdooLayer
                  key={layer.id}
                  layer={layer}
                  index={i}
                  count={o.layers.length}
                  state={stateOf(layer.id)}
                  reduce={reduce}
                  flowLabel={o.flowLabel}
                  onEngage={() => setActive(layer.id)}
                  onRelease={() => setActive(null)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* The platform is a decision */}
        <div className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h3 className="max-w-md font-heading text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-3xl">
              {o.architectureChoice.title}
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-muted-foreground">
              {o.architectureChoice.copy}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <ArchitectureChoice choice={o.architectureChoice} />
          </Reveal>
        </div>

        {/* Closing */}
        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <p className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-accent" />
            <span className="max-w-3xl">
              <span className="block font-heading text-xl font-bold leading-snug tracking-[-0.02em] text-foreground md:text-2xl">
                {o.closing}
              </span>
              <span className="mt-2 block text-[15px] leading-relaxed text-muted-foreground">
                {o.closingSupport}
              </span>
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
