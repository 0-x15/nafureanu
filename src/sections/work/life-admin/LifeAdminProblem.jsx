import { ArrowRight, FileText, Mail, Receipt, Timer, Brain } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Card, DISPLAY, Mono, Pill } from "./laBits";

const ICONS = [FileText, Mail, Timer, Receipt, Brain];
const TILT = ["-rotate-[2.2deg]", "rotate-[1.4deg]", "-rotate-[0.8deg]", "rotate-[2deg]", "-rotate-[1.6deg]"];

/**
 * The problem — scattered inputs (a PDF, a renewal email, a trial, a
 * receipt, a mental note) held together by manual coordination, next
 * to what the same information becomes inside Life Admin: one
 * structured obligation with a single pending question.
 */
export default function LifeAdminProblem({ c }) {
  const p = c.problem;
  return (
    <Chapter tone="paper" aria-labelledby="la-problem">
      <ChapterHead kicker={p.kicker} title={p.title} intro={p.intro} wide />
      <Reveal delay={0.08} className="mt-12 md:mt-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* scattered inputs */}
          <div className="lg:col-span-5">
            <Mono>{p.inputsLabel}</Mono>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-0">
              {p.inputs.map((it, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <li key={it.title} className={cn("lg:-mb-2 lg:origin-left", TILT[i % TILT.length], i % 2 ? "lg:ml-10" : "lg:ml-0")}>
                    <div className="flex items-center gap-3 rounded-lg border border-[#E8E4DE] bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(32,31,29,0.35)] lg:max-w-[330px]">
                      <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F1EEE9] text-[#706B66]"><Icon className="h-4 w-4" /></span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#201F1D]">{it.title}</p>
                        <p className="truncate text-xs text-[#928C86]">{it.meta}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* manual coordination */}
          <div className="flex flex-col items-center gap-3 lg:col-span-2">
            <span aria-hidden="true" className="hidden h-px w-full bg-[repeating-linear-gradient(90deg,#C9C3BB_0_6px,transparent_6px_12px)] lg:block" />
            <Mono className="text-center text-[#706B66]">{p.arrow}</Mono>
            <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-90 text-[#928C86] lg:rotate-0" />
            <ul className="flex flex-wrap justify-center gap-1.5">
              {p.consequences.map((t) => <li key={t}><Pill tone="urgent">{t}</Pill></li>)}
            </ul>
          </div>

          {/* structured record */}
          <div className="lg:col-span-5">
            <Mono>{p.record.label}</Mono>
            <Card className="mt-4 overflow-hidden shadow-[0_30px_70px_-40px_rgba(32,31,29,0.4)]">
              <div className="flex items-start justify-between gap-3 border-b border-[#EFEBE4] px-5 py-4">
                <p className={`${DISPLAY} text-xl text-[#201F1D]`}>{p.record.title}</p>
                <Pill tone="today">{p.record.rows[3][1]}</Pill>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 px-5 py-4">
                {p.record.rows.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-[#928C86]">{k}</dt>
                    <dd className="mt-1 text-sm font-medium text-[#201F1D]">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-[#EFEBE4] bg-[#F9F8F4] px-5 py-3 text-xs text-[#706B66]">{p.record.footer}</p>
            </Card>
          </div>
        </div>
        <p className={`${DISPLAY} mt-12 max-w-3xl text-xl text-[#201F1D] md:text-2xl`}>{p.takeaway}</p>
      </Reveal>
    </Chapter>
  );
}
