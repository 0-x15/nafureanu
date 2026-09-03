import Reveal from "@/components/Reveal";

/**
 * Visits & operations — the operational stages the CRM can model,
 * kept high level: statuses, deadlines and dependencies.
 */
export default function CrmOperations({ c }) {
  const o = c.operations;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {o.title}
          </h2>
          {o.paras.map((para) => (
            <p key={para} className="mt-6 max-w-2xl text-base leading-[1.75] text-muted-foreground">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal variant="scale" className="mt-10 border-t border-border pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {o.stages.map((stage) => (
              <li
                key={stage}
                className="flex items-center gap-2.5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-foreground"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                {stage}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}