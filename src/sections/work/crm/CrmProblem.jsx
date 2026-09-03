import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import CrmProblemVisual from "./CrmProblemVisual";
import CrmSolutionBubble from "./CrmSolutionBubble";

/**
 * The problem — supporting visual LEFT, two-part headline RIGHT,
 * then the eight numbered problems as a list, with the solution of
 * the hovered / focused / tapped problem shown in an organic
 * floating bubble in a reserved zone ABOVE the list.
 */
export default function CrmProblem({ c, lang = "es" }) {
  const p = c.problem;
  const [active, setActive] = useState(0);

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

      {/* Bottom — solution bubble zone ABOVE the problem list */}
      <Reveal className="mt-16 md:mt-24">
        <div className="min-h-[250px] md:min-h-[290px]">
          <CrmSolutionBubble pain={p.pains[active]} howLabel={p.howLabel} />
        </div>

        <ul className="border-b border-border">
          {p.pains.map((pain, i) => (
            <li key={pain.title} className="border-t border-border">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-controls="crm-solutions"
                className={cn(
                  "flex w-full items-baseline gap-5 px-2 py-5 text-left transition-colors duration-300",
                  active === i ? "bg-accent/[0.05]" : "hover:bg-accent/[0.035]"
                )}
              >
                <span className="font-mono text-[10px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex-1 text-base font-medium leading-snug transition-colors duration-300 md:text-lg",
                    active === i ? "text-foreground" : "text-foreground/75"
                  )}
                >
                  {pain.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}