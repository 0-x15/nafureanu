import Reveal from "@/components/Reveal";

/**
 * Documents — documents as part of the workflow: requirements,
 * status, review and signature, with generic state labels.
 */
export default function CrmDocuments({ c }) {
  const d = c.documents;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {d.title}
          </h2>
          {d.paras.map((para) => (
            <p key={para} className="mt-6 max-w-2xl text-base leading-[1.75] text-muted-foreground">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal variant="left" className="mt-10 flex flex-wrap items-center gap-3">
          {d.states.map((state, i) => (
            <span key={state} className="flex items-center gap-3">
              <span className="rounded-md border border-border bg-card px-4 py-2 font-heading text-sm font-semibold text-foreground">
                {state}
              </span>
              {i < d.states.length - 1 && (
                <span aria-hidden="true" className="h-px w-6 bg-foreground/20" />
              )}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}