import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Num } from "./serviceBits";

/** What the project can include — a clean scope overview, not a package. */
export default function CrmServiceScope({ c }) {
  const s = c.scope;
  return (
    <Chapter tone="white" aria-labelledby="crm-service-scope">
      <ChapterHead id="crm-service-scope" kicker={s.kicker} title={s.title} intro={s.intro} />
      <Reveal delay={0.06}>
        <ol className="mt-10 grid border-t border-border sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {s.items.map((it, i) => (
            <li key={it.title} className="border-b border-border py-5 pr-6 lg:[&:nth-child(4n+1)]:pl-0">
              <Num n={i + 1} />
              <p className="mt-2 font-heading text-base font-bold tracking-[-0.01em] text-foreground">{it.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Chapter>
  );
}
