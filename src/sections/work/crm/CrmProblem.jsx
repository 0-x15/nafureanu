import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import CrmProblemVisual from "./CrmProblemVisual";
import CrmSolutionBubble from "./CrmSolutionBubble";

function ProblemRow({ pain, i, active, onSelect }) {
  return (
    <li className="border-t border-border first:border-t-0">
      <button
        type="button"
        onMouseEnter={onSelect}
        onFocus={onSelect}
        onClick={onSelect}
        aria-controls="crm-solutions"
        className={cn(
          "flex w-full items-baseline gap-4 px-2 py-4 text-left transition-colors duration-300 md:py-5",
          active ? "bg-accent/[0.05]" : "hover:bg-accent/[0.04]"
        )}
      >
        <span className="font-mono text-[10px] text-accent">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex-1 text-sm font-medium leading-snug transition-colors duration-300 md:text-base",
            active ? "text-foreground" : "text-foreground/75"
          )}
        >
          {pain.title}
        </span>
      </button>
    </li>
  );
}

/**
 * The problem — supporting visual LEFT, two-part headline RIGHT, then
 * ONE shared framed container holding the 8 problems in 2 columns of
 * 4, with the organic solution bubble overlaid INSIDE the same
 * container, floating OVER the problem list on hover / focus / tap.
 */
export default function CrmProblem({ c, lang = "es" }) {
  const p = c.problem;
  const [active, setActive] = useState(null);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      {/* Top — visual left, text right */}
      <div className="md:grid md:grid-cols-12 md:items-center md:gap-16">
        <Reveal className="md:col-span-7 md:col-start-7 md:row-start-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {p.kicker}
          </p>
          <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.5rem]">
            {p.titleA}
          </h2>
          <h2 className="mt-6 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.5rem]">
            {p.titleB}
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {p.intro}
          </p>
        </Reveal>

        <div className="mt-14 md:col-span-5 md:col-start-1 md:row-start-1 md:mt-0">
          <Reveal variant="scale" delay={0.1}>
            <CrmProblemVisual lang={lang} />
          </Reveal>
        </div>
      </div>

      {/* ONE shared framed container — problems + bubble overlay */}
      <Reveal className="mt-16 md:mt-24">
        <div
          onMouseLeave={() => setActive(null)}
          className="relative overflow-hidden rounded-xl border border-border bg-card/80 shadow-[0_28px_64px_-32px_rgba(12,18,32,0.2)]"
        >
          {/* The 8 problems — 2 columns of 4 */}
          <div className="grid p-5 sm:p-8 md:grid-cols-2 md:gap-x-16 md:p-10">
            <ul className="border-b border-border md:border-b-0">
              {p.pains.slice(0, 4).map((pain, idx) => (
                <ProblemRow
                  key={pain.title}
                  pain={pain}
                  i={idx}
                  active={active === idx}
                  onSelect={() => setActive(idx)}
                />
              ))}
            </ul>
            <ul>
              {p.pains.slice(4).map((pain, idx) => (
                <ProblemRow
                  key={pain.title}
                  pain={pain}
                  i={idx + 4}
                  active={active === idx + 4}
                  onSelect={() => setActive(idx + 4)}
                />
              ))}
            </ul>
          </div>

          {/* Solution bubble — overlay INSIDE the same container, over the list */}
          <div
            id="crm-solutions"
            aria-live="polite"
            className={cn(
              "pointer-events-none absolute top-[5%] z-20 w-[88%] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[72%] md:w-[52%]",
              active === null
                ? "left-[6%] translate-y-3 opacity-0"
                : active <= 3
                  ? "left-[6%] translate-y-0 opacity-100 md:left-[43%]"
                  : "left-[6%] translate-y-0 opacity-100 md:left-[5%]"
            )}
          >
            {active !== null && (
              <CrmSolutionBubble pain={p.pains[active]} howLabel={p.howLabel} />
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}