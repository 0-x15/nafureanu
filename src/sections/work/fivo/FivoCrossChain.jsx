import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Mono, Shot } from "./fivoBits";

/**
 * Cross-chain — the path of one payment when customer and merchant
 * networks differ: customer → Fivo checkout → Circle cross-chain layer
 * → merchant wallet → Fivo backend verification. The primary message
 * stays readable; the burn/attestation/mint detail is disclosed on
 * demand. A single token travels the rail (not under reduced motion).
 */
export default function FivoCrossChain({ c }) {
  const x = c.crosschain;
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <Chapter tone="tint" aria-labelledby="fivo-crosschain">
      <ChapterHead kicker={x.kicker} title={x.title} intro={x.intro} wide />

      <Reveal delay={0.08} className="mt-12 md:mt-16">
        <div className="rounded-2xl border border-white/90 bg-white/70 p-5 shadow-[0_1px_2px_rgba(12,18,32,0.04),0_40px_90px_-56px_rgba(49,87,246,0.35)] backdrop-blur-[20px] md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground md:text-xl">
              {x.message.primary} <span className="text-accent">{x.message.secondary}</span>
            </p>
          </div>

          {/* rail */}
          <div className="relative mt-6">
            <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-[#C9D3EC] lg:block">
              {!reduce && (
                <motion.span
                  className="absolute -top-[5px] h-[11px] w-[11px] rounded-full bg-accent shadow-[0_0_0_4px_rgba(49,87,246,0.15)]"
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                />
              )}
            </div>
            <ol className="grid gap-3 md:grid-cols-5 md:gap-4">
              {x.lanes.map((lane, i) => (
                <li key={lane.id} className="relative flex items-start gap-3 md:block">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white font-mono text-[11px] font-bold md:mx-auto",
                      lane.id === "circle" ? "border-accent text-accent" : "border-[#C9D3EC] text-[#4A5164]"
                    )}
                  >
                    0{i + 1}
                  </span>
                  <div className={cn("md:mt-4 md:text-center", lane.id === "circle" && "rounded-xl border border-accent/25 bg-accent/5 p-3 md:-mx-1")}>
                    <Mono className={lane.id === "circle" ? "text-accent" : ""}>{lane.label}</Mono>
                    <p className="mt-1 text-sm font-semibold text-foreground">{lane.name}</p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{lane.sub}</p>
                  </div>
                  {i < x.lanes.length - 1 && (
                    <ArrowRight aria-hidden="true" className="absolute -right-3.5 top-4 hidden h-4 w-4 text-[#B4C0E0] md:block" />
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* progressive disclosure */}
          <div className="mt-7 border-t border-[#E1E5EF] pt-5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-deep"
            >
              {open ? x.technical.hide : x.technical.show}
              <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="tech"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-5">
                    <Mono>{x.technical.label}</Mono>
                    <ol className="mt-3 grid gap-3 md:grid-cols-4">
                      {x.technical.steps.map((s, i) => (
                        <li key={s.name} className="rounded-xl border border-[#E1E5EF] bg-white p-4">
                          <p className="flex items-center gap-2 font-mono text-[11px] text-accent">
                            <span className="text-muted-foreground">{i + 1}</span> {s.name}
                          </p>
                          <p className="mt-2 text-[12.5px] leading-relaxed text-[#5A6070]">{s.text}</p>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{x.technical.note}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <Reveal className="grid gap-4 sm:grid-cols-2 min-w-0 lg:col-span-7 lg:content-start">
          {[x.sameChain, x.eurc].map((card) => (
            <div key={card.title} className="rounded-xl border border-[#E1E5EF] bg-white p-5">
              <p className="text-sm font-semibold text-foreground">{card.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5A6070]">{card.text}</p>
            </div>
          ))}
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="min-w-0 lg:col-span-5">
          <div className="mx-auto max-w-[360px] lg:ml-auto lg:mr-0">
            <Shot id="crosschain-confirm" alt={x.imageAlt} />
            <p className="mt-2 text-[11px] text-muted-foreground">{x.imageCaption}</p>
          </div>
        </Reveal>
      </div>
    </Chapter>
  );
}
