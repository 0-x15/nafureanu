import { cn } from "@/lib/utils";
import { Act, MONO, Statement } from "./webBits";

/**
 * Act 06 — let's build yours. Not a process: a design brief on one large
 * editorial sheet. Four questions, and with their answers we can start.
 */
export default function WebBrief({ c }) {
  const t = c.brief;
  return (
    <Act id="wd-brief" tone="white" index={c.index.brief} wireLabel={c.wire.action}>
      <Statement id="wd-brief-title" a={t.a} b={t.b} />
      <ol className="mt-16 border-t border-foreground/15 md:mt-20">
        {t.questions.map((q, i) => (
          <li key={q} className="grid gap-2 border-b border-foreground/15 py-7 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9">
            <span className={cn(MONO, "text-muted-foreground md:col-span-1")}>0{i + 1}</span>
            <span className="font-heading text-[clamp(1.7rem,4.4vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:col-span-11 [text-wrap:balance]">{q}</span>
          </li>
        ))}
      </ol>
      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
        <p className="font-heading text-[clamp(1.5rem,2.8vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-accent md:col-span-5">{t.start}</p>
        <div className="md:col-span-6 md:col-start-7">
          <p className={cn(MONO, "text-muted-foreground")}>{t.fromLabel}</p>
          <p className="mt-3 font-heading text-xl font-medium leading-[1.4] tracking-[-0.02em] text-foreground/80 md:text-2xl">{t.from.join(" · ")}</p>
          <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground">{t.noSpec}</p>
        </div>
      </div>
    </Act>
  );
}
