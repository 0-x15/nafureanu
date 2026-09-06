import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, CheckItem, Code, Mono, Shot } from "./fivoBits";

/**
 * One integration — three developer paths on the same infrastructure.
 * The mode switch changes the explanation, the sanitized snippet and
 * the resulting surface (real screenshot or endpoint panel).
 */
export default function FivoIntegration({ c }) {
  const t = c.integration;
  const [active, setActive] = useState(t.methods[0].id);
  const reduce = useReducedMotion();
  const m = t.methods.find((x) => x.id === active) || t.methods[0];

  return (
    <Chapter tone="blue" aria-labelledby="fivo-integration">
      <ChapterHead kicker={t.kicker} title={t.title} intro={t.intro} />

      <Reveal delay={0.06} className="mt-10">
        <div role="tablist" aria-label={t.kicker} className="inline-flex flex-wrap gap-1 rounded-lg border border-[#DCE2EF] bg-white p-1">
          {t.methods.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={x.id === active}
              onClick={() => setActive(x.id)}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                x.id === active ? "bg-accent text-white" : "text-[#4A5164] hover:bg-[#F2F5FA]"
              )}
            >
              <span className={cn("font-mono text-[10px]", x.id === active ? "text-white/70" : "text-accent")}>0{i + 1}</span>
              {x.tab}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={m.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
            >
              <h3 className="font-heading text-2xl font-bold tracking-[-0.01em] text-foreground">{m.title}</h3>
              <p className="mt-3 text-base leading-[1.7] text-[#4A5164]">{m.text}</p>
              <ul className="mt-6 space-y-2.5">
                {m.bullets.map((b) => <CheckItem key={b}>{b}</CheckItem>)}
              </ul>
              {m.id === "widget" && (
                <div className="mt-8">
                  <Mono>{t.modes.label}</Mono>
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {t.modes.items.map((mode) => (
                      <li key={mode.name} className="rounded-lg border border-[#DCE2EF] bg-white px-3 py-2.5">
                        <p className="text-xs font-semibold text-foreground">{mode.name}</p>
                        <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{mode.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={m.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className={cn("grid min-w-0 items-start gap-5 [&>*]:min-w-0", m.id === "api" ? "md:grid-cols-[1fr_260px]" : "md:grid-cols-[1fr_220px]")}
            >
              <Code label={m.codeLabel} code={m.code} />
              <div>
                <Mono>{t.resultLabel}</Mono>
                <div className="mt-2">
                  {m.id === "widget" && <Shot id="product-button" alt={m.result} className="rounded-xl border-[#2A3050]" />}
                  {m.id === "session" && <Shot id="checkout-light" alt={m.result} />}
                  {m.id === "api" && (
                    <ul className="divide-y divide-[#EEF1F7] overflow-hidden rounded-xl border border-[#E1E5EF] bg-white">
                      {m.endpoints.map(([verb, path]) => (
                        <li key={path} className="flex items-center gap-2.5 px-3 py-2">
                          <span className={cn("w-11 rounded px-1.5 py-0.5 text-center font-mono text-[9px] font-bold", verb === "GET" ? "bg-emerald-50 text-emerald-700" : "bg-accent/10 text-accent-deep")}>{verb}</span>
                          <span className="truncate font-mono text-[11px] text-[#4A5164]">{path}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="mt-2 text-[11px] leading-snug text-muted-foreground">{m.result}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Chapter>
  );
}
