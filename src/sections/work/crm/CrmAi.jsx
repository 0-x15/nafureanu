import Reveal from "@/components/Reveal";

/**
 * AI — positioned as engineering: the model works on the system's
 * data and rules; it doesn't replace the business logic.
 */
export default function CrmAi({ c }) {
  const a = c.ai;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <h2 className="max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {a.title}
          </h2>
          {a.paras.map((para) => (
            <p key={para} className="mt-6 max-w-2xl text-base leading-[1.75] text-muted-foreground">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal variant="left" className="mt-10 max-w-2xl border-l-2 border-accent pl-6">
          <p className="font-heading text-lg font-semibold leading-snug text-foreground md:text-xl">
            {a.key}
          </p>
        </Reveal>
      </div>
    </section>
  );
}