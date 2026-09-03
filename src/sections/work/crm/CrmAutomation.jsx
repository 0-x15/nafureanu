import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import CrmAutomationLane from "./CrmAutomationLane";
import { LiveDot, VISUALS } from "./CrmAutomationVisuals";

/**
 * Automation — the light-blue chapter of the case study: one automation
 * engine panel with six lanes, each showing signal → CRM logic →
 * automatic action → result. A vertical spine ties the six behaviours
 * to the same engine (shared logic, not a sequence). Hover or focus
 * executes a lane's flow; at rest the panel shows quiet ambient
 * activity, and none of it runs under prefers-reduced-motion.
 */
export default function CrmAutomation({ c }) {
  const a = c.automation;
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  const stateOf = (id) => {
    if (!active) return "idle";
    return id === active ? "active" : "dim";
  };

  return (
    <section className="relative overflow-hidden bg-[#F2F5FA] px-5 py-16 text-foreground md:px-10 md:py-24">
      {/* atmosphere — restrained cobalt bloom and cyan reflection; the
          engine panel sits on it as a glass plane */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[14%] top-[8%] h-[70%] w-[66%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.11),transparent)]" />
        <span className="absolute bottom-[-6%] right-[0%] h-[48%] w-[46%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.09),transparent)]" />
        <span className="absolute left-[-8%] bottom-[10%] h-[36%] w-[34%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.07),transparent)]" />
      </div>
      <div className="relative mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {a.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {a.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {a.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-xl border border-white/90 bg-white/65 shadow-[0_1px_2px_rgba(12,18,32,0.04),0_48px_100px_-56px_rgba(49,87,246,0.38)] backdrop-blur-[24px]">
            {/* Top bar — the engine's identity and its state */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-accent/15 px-5 py-3 md:px-6">
              <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/85">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#3157F6]" />
                {a.engine}
              </p>
              <p className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/60 md:flex">
                {a.stages.map((stage, i) => (
                  <span key={stage} className="flex items-center gap-2">
                    {i > 0 && <span className="text-accent/60">→</span>}
                    {stage}
                  </span>
                ))}
              </p>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                <LiveDot reduce={reduce} />
                {a.active}
              </p>
            </div>

            {/* Lanes on the automation spine */}
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 top-6 hidden w-px bg-accent/25 md:left-[35px] md:block"
              >
                {!reduce && (
                  <motion.span
                    className="absolute left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#3157F6] to-transparent"
                    animate={{ top: ["-10%", "100%"] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </span>

              {a.modules.map((module, i) => {
                const Visual = VISUALS[module.id];
                const laneActive = active === module.id;
                return (
                  <CrmAutomationLane
                    key={module.id}
                    module={module}
                    state={stateOf(module.id)}
                    onEngage={() => setActive(module.id)}
                    onRelease={() => setActive(null)}
                  >
                    {Visual ? (
                      <Visual ui={module.ui} active={laneActive} reduce={reduce} lane={i} />
                    ) : null}
                  </CrmAutomationLane>
                );
              })}
            </div>

            {/* Conceptual conclusion */}
            <p className="flex items-start gap-3 border-t border-accent/15 px-5 py-6 md:px-6 md:py-7">
              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-[#3157F6]" />
              <span className="max-w-3xl font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-lg">
                {a.closing}
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
