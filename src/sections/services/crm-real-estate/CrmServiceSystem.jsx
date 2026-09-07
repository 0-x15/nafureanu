import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO, Num } from "./serviceBits";

const EASE = [0.22, 1, 0.36, 1];

/**
 * What we can build — the operational areas a custom CRM can cover,
 * as one operating map: a typographic list of areas on the left and a
 * system canvas on the right that changes with the selection. Phones
 * get the areas as a readable vertical sequence.
 */
export default function CrmServiceSystem({ c }) {
  const s = c.system;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const area = s.areas[active];

  return (
    <Chapter tone="blue" aria-labelledby="crm-service-system">
      <ChapterHead id="crm-service-system" kicker={s.kicker} title={s.title} intro={s.intro} />

      {/* Desktop — operating map */}
      <div className="mt-12 hidden gap-10 md:mt-16 md:grid md:grid-cols-[minmax(0,36%)_1fr] lg:gap-16">
        <Reveal variant="left">
          <p className={cn(MONO, "text-muted-foreground")}>{s.hint}</p>
          <div role="tablist" aria-label={s.title} className="mt-4 border-t border-foreground/15">
            {s.areas.map((a, i) => {
              const on = i === active;
              return (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  id={`crm-area-tab-${a.id}`}
                  aria-selected={on}
                  aria-controls="crm-area-panel"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "group flex w-full items-baseline gap-4 border-b border-foreground/10 py-3.5 text-left outline-none transition-colors focus-visible:bg-white/70",
                    on ? "text-foreground" : "text-foreground/55 hover:text-foreground"
                  )}
                >
                  <Num n={i + 1} className={cn(on ? "text-accent" : "text-accent/60")} />
                  <span className="font-heading text-xl font-bold tracking-[-0.015em] lg:text-2xl">{a.title}</span>
                  <span aria-hidden="true" className={cn("ml-auto h-px transition-all duration-500", on ? "w-8 bg-accent" : "w-3 bg-foreground/20 group-hover:w-5")} />
                </button>
              );
            })}
          </div>
        </Reveal>

        <div id="crm-area-panel" role="tabpanel" aria-labelledby={`crm-area-tab-${area.id}`} className="relative min-h-[420px] overflow-hidden rounded-[20px] border border-[#DCE2EE] bg-white/85 p-8 lg:p-10">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(#3157F614_0.8px,transparent_0.8px),linear-gradient(90deg,#3157F614_0.8px,transparent_0.8px)] [background-size:24px_24px] [mask-image:radial-gradient(80%_80%_at_70%_30%,#000,transparent)]" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={area.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative"
            >
              <p className={cn(MONO, "text-accent")}>{String(active + 1).padStart(2, "0")} · {area.title}</p>
              <p className="mt-3 max-w-lg font-heading text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground lg:text-3xl">{area.descriptor}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {area.items.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: reduce ? 0 : 0.05 + i * 0.04, ease: EASE }}
                    className="rounded-md border border-[#DCE2EE] bg-white px-3 py-1.5 text-[13px] text-foreground/85"
                  >
                    {it}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 border-t border-[#E3E7F0] pt-5">
                <p className={cn(MONO, "text-muted-foreground")}>{s.connectedLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {area.connections.map((cn2) => (
                    <li key={cn2} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {cn2}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Phone — the same areas as a vertical sequence */}
      <ol className="mt-10 border-t border-foreground/15 md:hidden">
        {s.areas.map((a, i) => (
          <li key={a.id} className="border-b border-foreground/10 py-5">
            <p className="flex items-baseline gap-3">
              <Num n={i + 1} />
              <span className="font-heading text-lg font-bold tracking-[-0.015em] text-foreground">{a.title}</span>
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{a.descriptor}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {a.items.map((it) => <li key={it} className="rounded border border-[#DCE2EE] bg-white px-2 py-1 text-[12px] text-foreground/85">{it}</li>)}
            </ul>
          </li>
        ))}
      </ol>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-xl">{s.closing}</p>
      </Reveal>
    </Chapter>
  );
}
