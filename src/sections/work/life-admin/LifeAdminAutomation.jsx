import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, DISPLAY, Mono } from "./laBits";

/** Automation — real event → rule → action → result chains, and what the product honestly does not do yet. */
export default function LifeAdminAutomation({ c }) {
  const a = c.automation;
  const cols = a.columns;
  return (
    <Chapter tone="white" aria-labelledby="la-automation">
      <ChapterHead kicker={a.kicker} title={a.title} intro={a.intro} />
      <Reveal delay={0.06} className="mt-12">
        <div className="hidden grid-cols-[1.1fr_1.1fr_1.3fr_1.3fr] gap-4 border-b border-[#E8E4DE] pb-3 lg:grid">
          {cols.map((col, i) => (
            <Mono key={col} className="flex items-center gap-2">
              {col}
              {i < cols.length - 1 && <ArrowRight aria-hidden="true" className="h-3 w-3 text-[#C9C3BB]" />}
            </Mono>
          ))}
        </div>
        <ol>
          {a.rows.map((r, i) => (
            <li key={r.event} className="grid gap-2 border-b border-[#EFEBE4] py-5 lg:grid-cols-[1.1fr_1.1fr_1.3fr_1.3fr] lg:gap-4">
              <div className="flex gap-3">
                <span className={`${DISPLAY} text-[13px] text-[#928C86]`}>{String(i + 1).padStart(2, "0")}</span>
                <p className={`${DISPLAY} text-lg leading-snug text-[#201F1D]`}>{r.event}</p>
              </div>
              <div className="lg:pt-0.5"><Mono className="lg:hidden">{cols[1]}</Mono><p className="text-[13.5px] leading-relaxed text-[#706B66]">{r.rule}</p></div>
              <div className="lg:pt-0.5"><Mono className="lg:hidden">{cols[2]}</Mono><p className="text-[13.5px] leading-relaxed text-[#201F1D]">{r.action}</p></div>
              <div className="lg:pt-0.5"><Mono className="lg:hidden">{cols[3]}</Mono><p className="flex gap-2 text-[13.5px] leading-relaxed text-[#4F7267]"><span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F7267]" />{r.result}</p></div>
            </li>
          ))}
        </ol>
        <div className="mt-8 max-w-2xl rounded-xl border border-[#EEDDBF] bg-[#FBF3E6] px-5 py-4">
          <p className="text-sm font-medium text-[#B67520]">{a.honesty.title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#706B66]">{a.honesty.text}</p>
        </div>
      </Reveal>
    </Chapter>
  );
}
