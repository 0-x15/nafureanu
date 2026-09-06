import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Number } from "./wpBits";

/** What this work demonstrates — four principles, no measured claims. */
export default function WebProjectsPrinciples({ c }) {
  const p = c.principles;
  return (
    <Chapter tone="white" aria-labelledby="wp-principles">
      <ChapterHead kicker={p.kicker} title={p.title} intro={p.intro} />
      <Reveal delay={0.06} className="mt-12">
        <ol className="grid gap-x-8 gap-y-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {p.items.map((it, i) => (
            <li key={it.title}>
              <Number n={i + 1} />
              <p className="mt-3 font-heading text-xl font-bold tracking-[-0.01em] text-foreground">{it.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5A6070]">{it.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Chapter>
  );
}
