import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import CrmProblemVisual from "./CrmProblemVisual";

const EASE = [0.22, 1, 0.36, 1];

/**
 * One problem row with its solution folded underneath. The row is a
 * real disclosure button (aria-expanded / aria-controls); the panel
 * animates its height open and closed.
 */
function ProblemRow({ pain, i, open, onToggle, howLabel }) {
  const buttonId = `crm-problem-${i}`;
  const panelId = `crm-solution-${i}`;

  return (
    <li
      className={cn(
        "border-t border-border transition-colors duration-300 first:border-t-0",
        open && "bg-accent/[0.05]"
      )}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex w-full items-baseline gap-4 px-2 py-5 text-left transition-colors duration-300 md:py-6",
          !open && "hover:bg-accent/[0.04]"
        )}
      >
        <span className="font-mono text-[10px] text-accent">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex-1 text-sm font-medium leading-snug transition-colors duration-300 md:text-base",
            open ? "text-foreground" : "text-foreground/75"
          )}
        >
          {pain.title}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 self-center text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-accent"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-6 pl-9 md:pb-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                {howLabel}
              </p>
              <p className="mt-2 font-heading text-base font-bold leading-snug tracking-tight text-foreground md:text-lg">
                {pain.solutionTitle}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-[1.7] text-muted-foreground">
                {pain.solution}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/**
 * The problem — supporting visual LEFT, two-part headline RIGHT, then
 * the heading of the problems block and ONE shared framed container
 * with the 8 problems in 2 columns of 4. Each problem is a disclosure:
 * clicking it unfolds how the CRM solves it directly underneath, only
 * one problem is open at a time, and the first one starts open.
 */
export default function CrmProblem({ c, lang = "es" }) {
  const p = c.problem;
  /* The first problem starts open so the block reads as a disclosure
     list at a glance; the rest unfold on click, one at a time. */
  const [open, setOpen] = useState(0);
  const toggle = (i) => setOpen((current) => (current === i ? null : i));

  return (
    <section className="overflow-x-clip border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Intro — visual LEFT, text RIGHT */}
        <div className="md:grid md:grid-cols-12 md:items-center md:gap-16">
          <Reveal className="md:col-span-7 md:col-start-6 md:row-start-1">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {p.kicker}
            </p>
            <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.5rem]">
              {p.titleA}
            </h2>
            <h2 className="mt-6 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.5rem]">
              {p.titleB}
            </h2>
          </Reveal>

          <div className="mt-14 md:col-span-5 md:col-start-1 md:row-start-1 md:mt-0">
            <Reveal variant="scale" delay={0.1}>
              <CrmProblemVisual lang={lang} />
            </Reveal>
          </div>
        </div>

        {/* Heading of the problems block, then ONE shared framed container */}
        <Reveal className="mt-10 md:mt-16">
          <h3
            id="crm-problems-heading"
            className="mx-auto max-w-3xl text-center font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-xl"
          >
            {p.intro}
          </h3>
          <div
            role="group"
            aria-labelledby="crm-problems-heading"
            className="mt-12 overflow-hidden rounded-xl border border-border bg-card/80 shadow-[0_1px_2px_rgba(12,18,32,0.05),0_24px_60px_-24px_rgba(12,18,32,0.22)] md:mt-16"
          >
            {/* The 8 problems — 2 columns of 4 */}
            <div className="grid p-5 sm:p-8 md:grid-cols-2 md:items-start md:gap-x-16 md:p-10">
              <ul className="border-b border-border md:border-b-0">
                {p.pains.slice(0, 4).map((pain, idx) => (
                  <ProblemRow
                    key={pain.title}
                    pain={pain}
                    i={idx}
                    open={open === idx}
                    onToggle={() => toggle(idx)}
                    howLabel={p.howLabel}
                  />
                ))}
              </ul>
              <ul>
                {p.pains.slice(4).map((pain, idx) => (
                  <ProblemRow
                    key={pain.title}
                    pain={pain}
                    i={idx + 4}
                    open={open === idx + 4}
                    onToggle={() => toggle(idx + 4)}
                    howLabel={p.howLabel}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
