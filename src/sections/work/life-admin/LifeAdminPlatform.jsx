import { ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, DISPLAY, Mono } from "./laBits";

/** Platform vs product — Base44 as infrastructure, product engineering on top, Life Admin as the result. */
export default function LifeAdminPlatform({ c }) {
  const p = c.platform;
  return (
    <Chapter tone="sand" aria-labelledby="la-platform">
      <ChapterHead kicker={p.kicker} title={p.title} intro={p.intro} wide />
      <Reveal delay={0.08} className="mt-12 md:mt-16">
        <ol className="mx-auto max-w-4xl">
          {p.layers.map((layer, i) => {
            const last = i === p.layers.length - 1;
            return (
              <li key={layer.name} className="relative">
                <div className={cn("rounded-2xl border p-5 md:p-6", last ? "border-[#201F1D] bg-[#201F1D] text-[#F9F8F4]" : "border-[#E8E4DE] bg-white")}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <Mono className={last ? "text-[#F9F8F4]/60" : ""}>{layer.name}</Mono>
                    <p className={`${DISPLAY} text-2xl ${last ? "text-[#F9F8F4]" : "text-[#201F1D]"}`}>{layer.title}</p>
                  </div>
                  <ul className={cn("mt-4 grid gap-x-6 gap-y-2", last ? "" : "sm:grid-cols-2")}>
                    {layer.items.map((it) => (
                      <li key={it} className={cn("flex gap-2.5 text-[13.5px] leading-relaxed", last ? "text-[#F9F8F4]/85" : "text-[#4A4642]")}>
                        <span aria-hidden="true" className={cn("mt-[8px] h-1 w-1 shrink-0 rounded-full", last ? "bg-[#F9F8F4]/60" : "bg-[#928C86]")} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                {!last && (
                  <div className="flex justify-center py-2" aria-hidden="true">
                    <ArrowDown className="h-5 w-5 text-[#928C86]" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-[#706B66]">{p.note}</p>
      </Reveal>
    </Chapter>
  );
}
