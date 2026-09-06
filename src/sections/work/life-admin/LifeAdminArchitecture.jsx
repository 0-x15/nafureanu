import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, DISPLAY, Mono } from "./laBits";

/** Architecture — six real parts and the verified stack, no résumé. */
export default function LifeAdminArchitecture({ c }) {
  const a = c.architecture;
  return (
    <Chapter tone="white" aria-labelledby="la-architecture">
      <ChapterHead kicker={a.kicker} title={a.title} intro={a.intro} />
      <Reveal delay={0.06} className="mt-10">
        <ol className="grid gap-x-10 md:grid-cols-2">
          {a.rows.map((r) => (
            <li key={r.name} className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-[#EFEBE4] py-5">
              <Mono className="pt-1.5">{r.name}</Mono>
              <div>
                <p className={`${DISPLAY} text-lg text-[#201F1D]`}>{r.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#706B66]">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal delay={0.1} className="mt-8 border-t border-[#EFEBE4] pt-6">
        <Mono>{a.stack.label}</Mono>
        <ul className="mt-3 flex flex-wrap gap-2">
          {a.stack.items.map((t) => (
            <li key={t} className="rounded-full border border-[#E8E4DE] bg-[#F9F8F4] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4A4642]">{t}</li>
          ))}
        </ul>
      </Reveal>
    </Chapter>
  );
}
