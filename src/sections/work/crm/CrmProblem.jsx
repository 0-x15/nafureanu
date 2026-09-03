import { useState } from "react";
import Reveal from "@/components/Reveal";
import CrmProblemVisual from "./CrmProblemVisual";
import CrmProblemItem from "./CrmProblemItem";

/**
 * The problem — fragmented-operation visual on the left, editorial
 * introduction on the right, then an interactive list where each
 * problem expands into how this CRM actually solves it.
 */
export default function CrmProblem({ c, lang = "es" }) {
  const p = c.problem;
  const [open, setOpen] = useState(null);
  const columns = [p.pains.slice(0, 4), p.pains.slice(4, 8)];

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      {/* Intro — visual left, text right on desktop; text first on mobile */}
      <div className="md:grid md:grid-cols-12 md:items-center md:gap-16">
        <Reveal
          variant="left"
          className="order-2 mt-14 md:order-1 md:col-span-5 md:mt-0"
        >
          <CrmProblemVisual lang={lang} />
        </Reveal>
        <div className="order-1 md:order-2 md:col-span-7">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {p.kicker}
            </p>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
              {p.title}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {p.intro}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Problems — two independent columns of four, one open at a time */}
      <div className="mt-16 grid gap-x-14 md:mt-20 md:grid-cols-2">
        {columns.map((column, ci) => (
          <div key={ci} className="border-b border-border">
            {column.map((pain, i) => {
              const index = ci * 4 + i;
              return (
                <Reveal key={index} delay={index * 0.04}>
                  <CrmProblemItem
                    pain={pain}
                    index={index}
                    open={open}
                    onToggle={setOpen}
                    howLabel={p.howLabel}
                  />
                </Reveal>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}