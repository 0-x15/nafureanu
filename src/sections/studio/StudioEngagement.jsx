import { cn } from "@/lib/utils";
import { Act, Fade, H2, MONO, Sheet } from "./studioBits";

/** Act 06 — what it is like to work together: expectations and the capacity decision. */
export default function StudioEngagement({ a }) {
  const t = a.engagement;
  return (
    <Act id="studio-engagement" index={a.index[5]} className="py-14 md:py-20">
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 id="studio-engagement-title" className={H2}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
          <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.65] text-foreground/80">{t.intro}</p>
          <ol className="mt-8 border-t border-foreground/12">
            {t.items.map((x, i) => (
              <Fade key={x} delay={i * 0.04}>
                <li className="grid grid-cols-[32px_1fr] items-baseline gap-4 border-b border-foreground/12 py-3">
                  <span className={cn(MONO, "text-accent")}>0{i + 1}</span>
                  <span className="text-[15px] leading-[1.55] text-foreground/90">{x}</span>
                </li>
              </Fade>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Sheet title={t.capacity.label} bodyClassName="px-5 py-5 md:px-6">
            <p className="font-heading text-[clamp(1.2rem,1.7vw,1.5rem)] font-bold leading-[1.25] tracking-[-0.025em] text-foreground">{t.capacity.text}</p>
            <p className={cn(MONO, "mt-6 text-muted-foreground")}>{t.capacity.whyLabel}</p>
            <p className="mt-2 text-[14px] leading-[1.65] text-foreground/85">{t.capacity.why}</p>
            <p className={cn(MONO, "mt-6 text-muted-foreground")}>{t.capacity.selectLabel}</p>
            <p className="mt-2 text-[14px] leading-[1.65] text-foreground/85">{t.capacity.select}</p>
          </Sheet>
        </div>
      </div>
    </Act>
  );
}
