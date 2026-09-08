import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, Caption, MONO, SERIF, Statement } from "./webBits";

/**
 * Act I — design starts with the message. A raw brief on the left, the
 * four questions behind the page, and on the right the elements they
 * become. Hovering or focusing a question lights the elements it feeds.
 * Copy is part of design: the vague sentence, and what a page has to say.
 */
export default function MessageStudio({ c }) {
  const t = c.message;
  const [q, setQ] = useState(null);
  const lit = (el) => q === null || el.from.includes(q);
  return (
    <Act id="wd-message" tone="paper">
      <Reveal>
        <Statement id="wd-message-title" a={t.a} b={t.b} />
      </Reveal>
      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className={cn(MONO, "text-muted-foreground")}>{t.brief.label}</p>
            <blockquote className={cn(SERIF, "mt-4 text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.02em] text-foreground")}>{t.brief.text}</blockquote>
            <Caption className="mt-4">{t.note}</Caption>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <p className={cn(MONO, "text-muted-foreground")}>{t.questionsLabel}</p>
            <ol className="mt-3 divide-y divide-foreground/10 border-y border-foreground/10" onMouseLeave={() => setQ(null)}>
              {t.questions.map((x) => (
                <li key={x.id}>
                  <button type="button" onMouseEnter={() => setQ(x.id)} onFocus={() => setQ(x.id)} onBlur={() => setQ(null)} onClick={() => setQ((v) => (v === x.id ? null : x.id))} aria-pressed={q === x.id} className={cn("grid w-full gap-1 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:grid-cols-[150px_1fr] sm:gap-6", q === x.id && "text-accent-deep")}>
                    <span className="font-heading text-lg font-bold tracking-[-0.02em]">{x.q}</span>
                    <span className="text-[15px] leading-[1.6] text-foreground/80">{x.a}</span>
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <p className={cn(MONO, "text-muted-foreground")}>{t.elementsLabel}</p>
            <ol className="mt-4 space-y-5" aria-live="polite">
              {t.elements.map((el, i) => (
                <li key={el.id} className={cn("grid gap-2 border-l-2 pl-5 transition-all duration-300 sm:grid-cols-[130px_1fr] sm:gap-6", lit(el) ? "border-accent opacity-100" : "border-foreground/10 opacity-35")}>
                  <span className={cn(MONO, "pt-1.5 text-accent")}>0{i + 1} · {el.label}</span>
                  <span className={cn(i === 0 ? "font-heading text-2xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground md:text-3xl" : i === 4 ? "inline-flex w-fit items-center gap-2 bg-foreground px-4 py-2 text-[14px] font-semibold text-white" : "text-[15px] leading-[1.65] text-foreground/85")}>{el.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-24 grid gap-10 border-t border-foreground/10 pt-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h3 className="font-heading text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]"><span className="block">{t.copyA}</span><span className="block text-muted-foreground">{t.copyB}</span></h3>
        </div>
        <div className="lg:col-span-7">
          <p className={cn(MONO, "text-[#A4261B]")}>{t.badLabel}</p>
          <p className={cn(SERIF, "mt-3 text-[clamp(1.3rem,2.4vw,2rem)] leading-[1.25] text-foreground/60 line-through decoration-[#A4261B]/60 decoration-1")}>{t.bad}</p>
          <p className={cn(MONO, "mt-8 text-accent")}>{t.principleLabel}</p>
          <ol className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
            {t.principle.map((p, i) => <li key={p} className="flex items-baseline gap-2 font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl"><span className={cn(MONO, "text-muted-foreground")}>0{i + 1}</span>{p}</li>)}
          </ol>
          <p className="mt-6 max-w-xl text-[14px] leading-[1.65] text-muted-foreground">{t.caveat}</p>
        </div>
      </Reveal>
    </Act>
  );
}
