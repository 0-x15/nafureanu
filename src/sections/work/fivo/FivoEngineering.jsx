import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Mono, Tag } from "./fivoBits";

/** Engineering — eight areas of responsibility and the verified stack. */
export default function FivoEngineering({ c }) {
  const e = c.engineering;
  return (
    <Chapter tone="white" aria-labelledby="fivo-engineering">
      <ChapterHead kicker={e.kicker} title={e.title} intro={e.intro} wide />
      <Reveal delay={0.06} className="mt-12">
        <ol className="grid gap-x-10 md:grid-cols-2">
          {e.areas.map((a, i) => (
            <li key={a.name} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-[#EEF1F7] py-5">
              <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <Mono>{a.name}</Mono>
                <p className="mt-1 font-heading text-lg font-bold text-foreground">{a.title}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5A6070]">{a.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal delay={0.1} className="mt-10 border-t border-[#EEF1F7] pt-6">
        <Mono>{e.stack.label}</Mono>
        <ul className="mt-3 flex flex-wrap gap-2">
          {e.stack.items.map((t) => <Tag key={t}>{t}</Tag>)}
        </ul>
      </Reveal>
    </Chapter>
  );
}
