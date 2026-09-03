import Reveal from "@/components/Reveal";

function Node({ label, active = false }) {
  return (
    <div className="flex items-center gap-3.5">
      <span
        aria-hidden="true"
        className={
          active
            ? "h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(49,87,246,0.45)]"
            : "h-2 w-2 shrink-0 rounded-full border border-foreground/30 bg-background"
        }
      />
      <span
        className={
          active
            ? "font-heading text-sm font-bold uppercase tracking-[0.08em] text-accent-deep"
            : "font-heading text-sm font-semibold uppercase tracking-[0.08em] text-foreground"
        }
      >
        {label}
      </span>
    </div>
  );
}

/**
 * The system — one connected operational composition: a vertical
 * spine of stages, the matching cross between supply and demand,
 * and the system layers that run across the whole flow. Thin
 * structural lines and typography; no network-node aesthetic.
 */
export default function CrmFlow({ c }) {
  const f = c.system.flow;
  const stages = [f.visit, f.negotiation, f.deposit, f.financing, f.deed, f.afterSales];
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mx-auto max-w-[1440px]">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {c.system.kicker}
        </p>
        <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
          {c.system.title}
        </h2>
      </Reveal>

      <Reveal
        variant="scale"
        className="mx-auto mt-14 grid max-w-[1440px] gap-12 md:grid-cols-12"
      >
        {/* Operational spine */}
        <div className="relative border-l border-foreground/15 pl-6 md:col-span-8">
          <div className="space-y-5">
            <Node label={f.intake} />
            <Node label={f.property} />
          </div>

          <div className="my-8 rounded-xl border border-border bg-[#FCFBF8] p-6 md:ml-10">
            <Node label={f.matching} active />
            <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
              <Node label={f.demand} />
              <Node label={f.property} />
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              {f.note}
            </p>
          </div>

          <div className="space-y-5">
            {stages.map((stage) => (
              <Node key={stage} label={stage} />
            ))}
          </div>
        </div>

        {/* System layers */}
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {c.system.layersLabel}
          </p>
          <ul className="mt-6 border-t border-border">
            {c.system.layers.map((layer) => (
              <li
                key={layer}
                className="flex items-center gap-4 border-b border-border py-4"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                />
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-foreground">
                  {layer}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}