import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Card, DISPLAY, Mono, Pill, STATUS } from "./laBits";

const TONE_OF = { paid: "week", unpaid: "today", unknown: "soon" };

/**
 * The core workflow — from a document to a living obligation, as a
 * six-step ledger — beside a micro-demonstration of the product's own
 * payment-state logic: one question ("is this invoice paid?") and the
 * state, agenda and history that follow from each answer.
 */
function PaymentDemo({ d }) {
  const [answer, setAnswer] = useState("unknown");
  const reduce = useReducedMotion();
  const st = d.states[answer];
  const tone = STATUS[TONE_OF[answer]];
  return (
    <Card className="overflow-hidden shadow-[0_40px_90px_-50px_rgba(32,31,29,0.45)]">
      <div className="border-b border-[#EFEBE4] px-5 py-4">
        <Mono>{d.kicker}</Mono>
        <p className={`${DISPLAY} mt-1 text-xl text-[#201F1D]`}>{d.title}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-[#706B66]">{d.intro}</p>
      </div>
      <div className="bg-[#F9F8F4] px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#201F1D]">{d.record.title}</p>
            <p className="text-xs text-[#928C86]">{d.record.provider} · {d.record.due}</p>
          </div>
          <p className={`${DISPLAY} text-xl text-[#201F1D]`}>{d.record.amount}</p>
        </div>
        <div className="mt-4 rounded-lg border border-[#E8E4DE] bg-white px-4 py-3">
          <p className="text-sm text-[#201F1D]">{d.question}</p>
          <div role="radiogroup" aria-label={d.question} className="mt-2.5 flex flex-wrap gap-2">
            {d.options.map((o) => (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={answer === o.id}
                onClick={() => setAnswer(o.id)}
                className={cn(
                  "rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  answer === o.id ? "border-[#201F1D] bg-[#201F1D] text-[#F9F8F4]" : "border-[#E8E4DE] bg-white text-[#201F1D] hover:bg-[#F1EEE9]"
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-5 py-4" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={answer}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Mono>{d.labels.state}</Mono>
              <Pill tone={TONE_OF[answer]}>{st.badge}</Pill>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[#706B66]">{st.text}</p>
            <dl className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-[#EFEBE4] px-3.5 py-2.5">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-[#928C86]">{d.labels.upcoming}</dt>
                <dd className="mt-1 text-sm text-[#201F1D]">{st.upcoming}</dd>
              </div>
              <div className="rounded-lg border border-[#EFEBE4] px-3.5 py-2.5">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-[#928C86]">{d.labels.history}</dt>
                <dd className="mt-1 flex items-center gap-2 text-sm text-[#201F1D]">
                  <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", tone.dot)} />
                  {st.history}
                </dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="border-t border-[#EFEBE4] px-5 py-3 text-[11px] leading-relaxed text-[#928C86]">{d.note}</p>
    </Card>
  );
}

export default function LifeAdminWorkflow({ c }) {
  const w = c.workflow;
  return (
    <Chapter tone="sand" aria-labelledby="la-workflow">
      <ChapterHead kicker={w.kicker} title={w.title} intro={w.intro} />
      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <ol className="relative border-l border-[#C9C3BB] pl-8">
            {w.steps.map((s, i) => (
              <li key={s.title} className="relative pb-8 last:pb-0">
                <span aria-hidden="true" className={`${DISPLAY} absolute -left-[41px] top-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#C9C3BB] bg-[#F9F8F4] text-[13px] text-[#201F1D]`}>{i + 1}</span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={`${DISPLAY} text-xl text-[#201F1D]`}>{s.title}</h3>
                  <Mono className="normal-case tracking-[0.08em]">{s.detail}</Mono>
                </div>
                <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-[#706B66]">{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal variant="scale" delay={0.1} className="lg:col-span-6 lg:self-start lg:sticky lg:top-28">
          <PaymentDemo d={w.demo} />
        </Reveal>
      </div>
    </Chapter>
  );
}
