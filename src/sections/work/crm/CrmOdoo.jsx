import Reveal from "@/components/Reveal";

/**
 * Odoo engineering — the commercial core: installing Odoo versus
 * engineering a business system on Odoo. Five editorial rows.
 */
export default function CrmOdoo({ c }) {
  const o = c.odoo;
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

        <div className="mt-12 border-t border-border">
          {o.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.05}
              className="grid gap-2 border-b border-border py-6 md:grid-cols-12 md:items-baseline md:py-7"
            >
              <p className="font-mono text-[10px] text-muted-foreground/60 md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground md:col-span-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-7">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}