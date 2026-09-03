import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import CrmAutomationLane from "./CrmAutomationLane";
import { LiveDot, VISUALS } from "./CrmAutomationVisuals";

/**
 * Automation — the dark chapter of the case study: one automation
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
    <section className="bg-[#0B1220] px-5 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#8FA5E8]">
            {a.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-white md:text-5xl">
            {a.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            {a.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_40px_90px_-60px_rgba(0,0,0,0.8)]">
            {/* Top bar — the engine's identity and its state */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/10 px-5 py-3 md:px-6">
              <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#3157F6]" />
                {a.engine}
              </p>
              <p className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 md:flex">
                {a.stages.map((stage, i) => (
                  <span key={stage} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[#3157F6]/70">→</span>}
                    {stage}
                  </span>
                ))}
              </p>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8FA5E8]">
                <LiveDot reduce={reduce} />
                {a.active}
              </p>
            </div>

            {/* Lanes on the automation spine */}
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 top-6 hidden w-px bg-white/10 md:left-[35px] md:block"
              >
                {!reduce && (
                  <motion.span
                    className="absolute left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#5B84FF] to-transparent"
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
            <p className="flex items-start gap-3 border-t border-white/10 px-5 py-6 md:px-6 md:py-7">
              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-[#3157F6]" />
              <span className="max-w-3xl font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-white md:text-lg">
                {a.closing}
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
