import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO, Num } from "./serviceBits";

/**
 * Automation — what the system can do by itself, shown as lanes:
 * event → system logic → automatic action → result. Hover or focus
 * makes a lane definite; everything is readable without it.
 */
export default function CrmServiceAutomation({ c }) {
  const a = c.automation;
  return (
    <Chapter aria-labelledby="crm-service-automation">
      <ChapterHead id="crm-service-automation" kicker={a.kicker} titleMuted={a.titleA} title={a.titleB} intro={a.intro} />

      <div className="mt-12 md:mt-16">
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,32%)_1fr] lg:gap-10">
          <span aria-hidden="true" />
          <ol className={cn("grid grid-cols-4 gap-3 pb-3", MONO, "text-muted-foreground")} aria-hidden="true">
            {a.stages.map((st) => <li key={st}>{st}</li>)}
          </ol>
        </div>

        <ol className="border-t border-border">
          {a.lanes.map((lane, i) => (
            <li key={lane.id} className="border-b border-border">
              <Reveal delay={0.04 * i}>
                <article tabIndex={0} aria-labelledby={`crm-lane-${lane.id}`} className="group grid gap-5 py-7 outline-none lg:grid-cols-[minmax(0,32%)_1fr] lg:gap-10 lg:py-8">
                  <div className="flex items-start gap-4">
                    <Num n={i + 1} className="pt-1.5" />
                    <div>
                      <h3 id={`crm-lane-${lane.id}`} className="font-heading text-lg font-bold tracking-[-0.015em] text-foreground md:text-xl">{lane.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{lane.text}</p>
                    </div>
                  </div>
                  <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
                    {lane.flow.map((step, si) => {
                      const last = si === lane.flow.length - 1;
                      return (
                        <li key={step} className="relative">
                          <div className={cn(
                            "h-full rounded-lg border px-3.5 py-3 text-[13px] leading-snug transition-colors duration-300",
                            last ? "border-accent/40 bg-[#EDF2FF] text-foreground group-hover:border-accent group-focus-visible:border-accent" : "border-[#DCE2EE] bg-white text-foreground/85 group-hover:border-accent/50 group-focus-visible:border-accent/50"
                          )}>
                            <span className={cn(MONO, "block", last ? "text-accent" : "text-muted-foreground")}>{a.stages[si]}</span>
                            <span className="mt-1.5 block">{step}</span>
                          </div>
                          {!last && (
                            <span aria-hidden="true" className="absolute -right-2.5 top-1/2 hidden h-px w-2 -translate-y-1/2 bg-accent/50 lg:block" />
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 flex max-w-3xl items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-accent" />
          {a.note}
        </p>
      </Reveal>
    </Chapter>
  );
}
