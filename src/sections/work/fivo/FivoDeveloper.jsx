import { ArrowDown, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Mono, Tag } from "./fivoBits";

/**
 * Developer infrastructure — API, signed webhooks, keys and docs, with
 * one webhook event traced end to end and the build → go-live pair of
 * environments folded into the same chapter.
 */
export default function FivoDeveloper({ c }) {
  const d = c.developer;
  const w = d.webhook;
  const e = d.environments;
  return (
    <Chapter tone="blue" aria-labelledby="fivo-developer">
      <ChapterHead kicker={d.kicker} title={d.title} intro={d.intro} wide />

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="grid gap-4 sm:grid-cols-2 min-w-0 lg:col-span-5 lg:content-start">
          {d.cards.map((card) => (
            <div key={card.title} className="rounded-xl border border-[#DCE2EF] bg-white p-5">
              <p className="text-sm font-semibold text-foreground">{card.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5A6070]">{card.text}</p>
              <p className="mt-3 font-mono text-[10px] text-accent">{card.meta}</p>
            </div>
          ))}
        </Reveal>

        <Reveal variant="scale" delay={0.08} className="min-w-0 lg:col-span-7">
          <div className="rounded-2xl border border-[#1B2340] bg-[#0F1524] p-5 text-[#D6DCEA] shadow-[0_30px_60px_-30px_rgba(12,18,32,0.5)] md:p-6">
            <Mono className="text-white/50">{w.label}</Mono>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">event</p>
                <p className="mt-1 font-mono text-sm text-[#9DB8FF]">{w.event}</p>
                <ul className="mt-3 space-y-1">
                  {w.headers.map((h) => <li key={h} className="truncate font-mono text-[10.5px] text-white/60">{h}</li>)}
                </ul>
              </div>
              <ArrowRight aria-hidden="true" className="hidden h-4 w-4 text-white/30 md:block" />
              <ArrowDown aria-hidden="true" className="mx-auto h-4 w-4 text-white/30 md:hidden" />
              <div className="rounded-lg border border-accent/40 bg-accent/10 p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">signature</p>
                <p className="mt-1 font-mono text-[11.5px] text-[#C9B8FF]">{w.signature}</p>
                <p className="mt-3 font-mono text-[10.5px] text-white/60">{w.retry}</p>
              </div>
              <ArrowRight aria-hidden="true" className="hidden h-4 w-4 text-white/30 md:block" />
              <ArrowDown aria-hidden="true" className="mx-auto h-4 w-4 text-white/30 md:hidden" />
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">{w.endpoint}</p>
                <p className="mt-1 flex items-center gap-2 font-mono text-sm text-emerald-300">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {w.response}
                </p>
              </div>
            </div>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {w.events.map((ev) => (
                <li key={ev} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-white/70">{ev}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.06} className="mt-10">
        <div className="rounded-2xl border border-[#DCE2EF] bg-white p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Mono className="text-accent">{e.kicker}</Mono>
            <p className="text-sm text-[#4A5164]">{e.message}</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            {[e.build, e.live].map((env, i) => (
              <div key={env.title} className={i === 0 ? "contents" : "contents"}>
                {i === 1 && (
                  <>
                    <ArrowRight aria-hidden="true" className="hidden h-5 w-5 text-accent md:block" />
                    <ArrowDown aria-hidden="true" className="mx-auto h-5 w-5 text-accent md:hidden" />
                  </>
                )}
                <div className={i === 0 ? "rounded-xl border border-[#E1E5EF] bg-[#F7F9FD] p-4" : "rounded-xl border border-accent/30 bg-accent/5 p-4"}>
                  <p className="font-heading text-base font-bold text-foreground">{env.title}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {env.items.map((it) => <Tag key={it}>{it}</Tag>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
