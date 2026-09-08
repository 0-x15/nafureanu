import { cn } from "@/lib/utils";
import { Act, Fade, H2, MONO } from "./studioBits";

/** Act 02 — judgement: a decision framework, not a catalogue of technologies. */
export default function DecisionStandard({ a }) {
  const t = a.decision;
  return (
    <Act id="studio-decision" index={a.index[1]} className="py-14 md:py-20">
      <div className="mt-8 grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 id="studio-decision-title" className={cn(H2, "lg:col-span-6")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
        <p className="max-w-[46ch] text-[15px] leading-[1.65] text-foreground/80 lg:col-span-5 lg:col-start-8">{t.intro}</p>
      </div>
      <div className="mt-8 overflow-hidden border border-foreground/12 bg-white">
        <div className={cn(MONO, "hidden grid-cols-[48px_1.4fr_1fr_150px] gap-6 border-b border-foreground/12 px-6 py-3 text-muted-foreground md:grid")}>
          <span>{t.cols.n}</span><span>{t.cols.q}</span><span>{t.cols.d}</span><span>{t.cols.t}</span>
        </div>
        <ol className="divide-y divide-foreground/10">
          {t.rows.map((r, i) => (
            <Fade key={r.q} delay={i * 0.05}>
              <li className="group grid gap-2 px-5 py-4 transition-colors hover:bg-[#FAF9F5] md:grid-cols-[48px_1.4fr_1fr_170px] md:items-baseline md:gap-6 md:px-6 md:py-4">
                <span className={cn(MONO, "text-accent")}>0{i + 1}</span>
                <span className="text-[15px] font-medium leading-[1.5] text-foreground md:text-[16px]">{r.q}</span>
                <span className="text-[14px] leading-[1.6] text-foreground/80">{r.d}</span>
                <span className="md:justify-self-start"><span className={cn(MONO, "inline-block border border-foreground/20 px-2 py-1 text-foreground/75 transition-colors group-hover:border-accent group-hover:text-accent")}>{r.t}</span></span>
              </li>
            </Fade>
          ))}
        </ol>
      </div>
      <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.65] text-foreground/85">{t.closing}</p>
    </Act>
  );
}
