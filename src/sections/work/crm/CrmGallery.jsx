import Reveal from "@/components/Reveal";

function DemoSurface({ i }) {
  const w = [85, 70, 55, 78, 62, 90];
  return (
    <div aria-hidden="true" className="flex h-full flex-col">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
        <span className="ml-2 h-1.5 w-16 rounded-full bg-foreground/10" />
      </div>
      <div className="mt-4 grid flex-1 grid-cols-3 gap-2">
        <div className="col-span-2 rounded-md border border-border bg-white p-3">
          <span
            className="block h-1.5 rounded-full bg-foreground/15"
            style={{ width: `${w[i % 6]}%` }}
          />
          <span
            className="mt-2 block h-1.5 rounded-full bg-foreground/8"
            style={{ width: `${w[(i + 2) % 6]}%` }}
          />
          <span className="mt-3 block h-10 rounded-md bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]" />
        </div>
        <div className="rounded-md border border-border bg-white p-3">
          {[0, 1, 2].map((k) => (
            <span key={k} className="mb-2.5 flex items-center gap-1.5 last:mb-0">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              <span className="h-1.5 flex-1 rounded-full bg-foreground/8" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Media gallery — six generic demo views with a consistent aspect
 * ratio, each a replaceable slot for an approved screenshot later.
 */
export default function CrmGallery({ c }) {
  const g = c.gallery;
  return (
    <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {g.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl">
            {g.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {g.items.map((title, i) => (
            <Reveal key={title} delay={(i % 3) * 0.06}>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-[#FCFBF8] p-4">
                  {/* Replace the demo surface with an approved screenshot:
                      <img src="..." alt={title} className="h-full w-full object-cover" /> */}
                  <DemoSurface i={i} />
                  <span className="absolute left-3 top-3 font-mono text-[10px] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}