import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, CheckItem, Mono } from "./fivoBits";

/** Security — five verified layers on one vertical path. No slogans. */
export default function FivoSecurity({ c }) {
  const s = c.security;
  return (
    <Chapter tone="white" aria-labelledby="fivo-security">
      <ChapterHead kicker={s.kicker} title={s.title} intro={s.intro} />
      <Reveal delay={0.06} className="mt-12">
        <ol className="relative">
          <span aria-hidden="true" className="absolute bottom-6 left-[11px] top-6 hidden w-px bg-[linear-gradient(180deg,#3157F6,#C9D3EC)] md:block" />
          {s.layers.map((layer, i) => (
            <li key={layer.name} className="relative grid gap-3 border-t border-[#EEF1F7] py-6 md:grid-cols-12 md:gap-6 md:pl-10">
              <span aria-hidden="true" className="absolute left-[7px] top-[30px] hidden h-2.5 w-2.5 rounded-full border-2 border-accent bg-white md:block" />
              <div className="min-w-0 md:col-span-2">
                <Mono className="text-accent">{String(i + 1).padStart(2, "0")} · {layer.name}</Mono>
              </div>
              <div className="min-w-0 md:col-span-3">
                <p className="font-heading text-lg font-bold text-foreground">{layer.title}</p>
              </div>
              <ul className="space-y-2 min-w-0 md:col-span-7">
                {layer.items.map((it) => <CheckItem key={it}>{it}</CheckItem>)}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs text-muted-foreground">{s.note}</p>
      </Reveal>
    </Chapter>
  );
}
