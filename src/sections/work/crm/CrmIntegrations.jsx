import Reveal from "@/components/Reveal";

/**
 * Integrations — the tools and portals connected to the system in
 * this project. Typographic treatment; no partner logos, no
 * implied endorsement.
 */
export default function CrmIntegrations({ c }) {
  const ig = c.integrations;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {ig.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {ig.title}
          </h2>
        </Reveal>

        <Reveal variant="left" className="mt-12">
          <ul className="flex flex-wrap gap-x-10 gap-y-5">
            {ig.list.map((name) => (
              <li key={name} className="flex items-baseline gap-3">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-heading text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
                  {name}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs uppercase tracking-[0.15em] text-muted-foreground/80">
            {ig.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}