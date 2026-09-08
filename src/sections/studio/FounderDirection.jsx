import { cn } from "@/lib/utils";
import { Act, Fade, H2, MONO } from "./studioBits";

/**
 * Act 05 — technical direction. A corporate profile of the founder's
 * role, built typographically: role, responsibility, company intent, and
 * the principle that lets the company grow beyond one person.
 */
export default function FounderDirection({ a }) {
  const t = a.founder;
  return (
    <Act id="studio-founder" index={a.index[4]} className="py-14 md:py-20">
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p id="studio-founder-title" className="font-heading text-[clamp(2.2rem,4vw,3.6rem)] font-bold leading-none tracking-[-0.04em] text-foreground">{t.name}</p>
          <p className={cn(MONO, "mt-3 text-accent")}>{t.role}</p>
          <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.65] text-foreground/80">{t.statement}</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <dl className="grid gap-8 border-t border-foreground/12 pt-5 sm:grid-cols-2">
            <div>
              <dt className={cn(MONO, "text-muted-foreground")}>{t.respLabel}</dt>
              <dd><ul className="mt-2 divide-y divide-foreground/10">{t.resp.map((r) => <li key={r} className="py-2 text-[14px] font-medium text-foreground">{r}</li>)}</ul></dd>
            </div>
            <div>
              <dt className={cn(MONO, "text-muted-foreground")}>{t.intentLabel}</dt>
              <dd className="mt-2 text-[14px] leading-[1.65] text-foreground/85">{t.intent}</dd>
            </div>
          </dl>
          <Fade className="mt-12">
            <h3 className={H2}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h3>
            <p className={cn(MONO, "mt-8 text-muted-foreground")}>{t.howLabel}</p>
            <dl className="mt-2 grid gap-x-8 border-t border-foreground/12 sm:grid-cols-2">
              {t.how.map((h) => (
                <div key={h.label} className="border-b border-foreground/12 py-3">
                  <dt className="text-[14px] font-semibold text-foreground">{h.label}</dt>
                  <dd className="mt-0.5 text-[13px] leading-[1.55] text-muted-foreground">{h.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[14px] leading-[1.65] text-muted-foreground">{t.note}</p>
          </Fade>
        </div>
      </div>
    </Act>
  );
}
