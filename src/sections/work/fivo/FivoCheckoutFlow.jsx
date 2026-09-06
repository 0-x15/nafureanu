import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Mono, Shot } from "./fivoBits";

/**
 * Customer payment flow — one payment followed across six steps on a
 * single rail: real checkout screens where a screen exists, a compact
 * state card where the step happens in the wallet. Desktop reads left
 * to right on one rail; phones stack the same sequence.
 */
function StateCard({ state }) {
  return (
    <div className="rounded-xl border border-[#E1E5EF] bg-white p-4 shadow-[0_18px_40px_-24px_rgba(12,18,32,0.3)]">
      <Mono>{state.label}</Mono>
      <p className="mt-2 flex items-center gap-2 font-mono text-xs text-foreground">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {state.value}
      </p>
      <div className="mt-4 space-y-1.5" aria-hidden="true">
        <span className="block h-1.5 w-3/4 rounded-full bg-[#EEF1F7]" />
        <span className="block h-1.5 w-1/2 rounded-full bg-[#EEF1F7]" />
      </div>
    </div>
  );
}

export default function FivoCheckoutFlow({ c }) {
  const f = c.flow;
  const reduce = useReducedMotion();
  return (
    <Chapter tone="white" aria-labelledby="fivo-flow">
      <ChapterHead kicker={f.kicker} title={f.title} intro={f.intro} />

      <Reveal delay={0.08} className="mt-12 md:mt-16">
        {/* the rail */}
        <div aria-hidden="true" className="relative hidden h-px bg-[#E1E5EF] md:block">
          {!reduce && (
            <motion.span
              className="absolute top-1/2 h-[3px] w-24 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,#3157F6,transparent)]"
              initial={{ left: "-8%" }}
              whileInView={{ left: "104%" }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 7, ease: "linear", repeat: Infinity, repeatDelay: 1.2 }}
            />
          )}
        </div>
        <ol className="grid gap-8 md:mt-8 md:grid-cols-3 md:gap-6 xl:grid-cols-6">
          {f.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span aria-hidden="true" className="absolute -top-8 left-0 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-accent bg-white md:block" />
              <p className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1.5 text-sm font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#5A6070]">{s.text}</p>
              <div className="mt-4 max-w-[280px] md:max-w-none">
                {s.image ? (
                  <Shot id={s.image} alt={s.alt} className="rounded-xl" />
                ) : (
                  <StateCard state={s.state} />
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-xs text-muted-foreground">{f.note}</p>
      </Reveal>
    </Chapter>
  );
}
