import { cn } from "@/lib/utils";
import { Act, Fade, H2, H3, MONO } from "./studioBits";

/** Act 01 — what kind of company this is: the operating profile as an institutional table. */
export default function StudioModel({ a }) {
  const t = a.model;
  return (
    <Act id="studio-model" index={a.index[0]} className="py-14 md:py-20">
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 id="studio-model-title" className={H2}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
          <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.65] text-foreground/80">{t.intro}</p>
        </div>
        <dl className="border-t border-foreground/12 lg:col-span-8">
          {t.rows.map((r, i) => (
            <Fade key={r.k} delay={i * 0.06}>
              <div className="grid gap-2 border-b border-foreground/12 py-5 md:grid-cols-[130px_1fr_1.5fr] md:items-baseline md:gap-8">
                <dt className={cn(MONO, "text-accent")}>{r.k}</dt>
                <dd className={H3}>{r.v}</dd>
                <dd className="text-[14px] leading-[1.65] text-foreground/80">{r.text}</dd>
              </div>
            </Fade>
          ))}
        </dl>
      </div>
      <p className="mt-8 max-w-[64ch] text-[15px] leading-[1.65] text-muted-foreground lg:ml-auto lg:mr-0 lg:w-2/3">{t.note}</p>
    </Act>
  );
}
