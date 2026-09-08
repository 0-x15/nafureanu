import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, MONO, Stamp, Statement } from "./intBits";

const VERB_TONE = { GET: "neutral", POST: "transit", PATCH: "transit", EVENT: "ok" };

/**
 * Act III — the API as a contract. Sometimes the job is not to connect
 * to an API but to build one: what others may read, create, change and
 * be told, what is always validated, who may do what. A contract sheet,
 * not documentation; boundaries, not a security checklist.
 */
export default function ApiContract({ c }) {
  const t = c.contract;
  return (
    <Act id="in-contract" tone="white">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <Statement id="in-contract-title" a={t.a} b={t.b} className="lg:text-[2.6rem]" />
          <p className="mt-6 max-w-lg text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
          <p className={cn(MONO, "mt-10 text-muted-foreground")}>{t.boundariesLabel}</p>
          <dl className="mt-3 divide-y divide-border border-y border-border">
            {t.boundaries.map((b) => (
              <div key={b.label} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-[14px] font-semibold text-foreground">{b.label}</dt>
                <dd className="text-[14px] leading-[1.6] text-foreground/80">{b.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal variant="scale" delay={0.1} className="lg:col-span-7">
          <div className="rounded-[14px] border border-border bg-[#FAFBFD] p-1.5 shadow-[0_30px_70px_-50px_rgba(12,18,32,0.35)]">
            <div className="rounded-[11px] border border-border bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
                <span className="flex items-center gap-3"><span className={cn(MONO, "text-muted-foreground")}>{t.resourceLabel}</span><span className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{t.resource}</span></span>
                <Stamp tone="muted" glyph={false}>{t.resourceNote}</Stamp>
              </div>
              <ol className="divide-y divide-border">
                {t.ops.map((o) => (
                  <li key={o.verb} className="grid items-center gap-2 px-5 py-3.5 sm:grid-cols-[90px_150px_1fr] sm:gap-4">
                    <Stamp tone={VERB_TONE[o.verb] || "neutral"} glyph={false} className="w-fit">{o.verb}</Stamp>
                    <span className="font-mono text-[12px] text-foreground">{o.label}</span>
                    <span className="text-[14px] text-foreground/80">{o.q}</span>
                  </li>
                ))}
              </ol>
              <div className="grid gap-5 border-t border-border px-5 py-5 sm:grid-cols-2">
                {[[t.rulesLabel, t.rules], [t.permissionsLabel, t.permissions]].map(([label, items]) => (
                  <div key={label}>
                    <span className={cn(MONO, "text-accent")}>{label}</span>
                    <ul className="mt-2 space-y-1.5">
                      {items.map((x) => <li key={x} className="flex items-start gap-2 text-[13px] leading-[1.55] text-foreground/85"><span aria-hidden="true" className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-accent" />{x}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="flex items-start gap-3 border-t border-border bg-[#FAFBFD] px-5 py-4 text-[13px] leading-[1.6] text-foreground/80"><Stamp tone="ok" glyph={false} className="mt-[1px] shrink-0">{t.proofTag}</Stamp>{t.proofNote}</p>
            </div>
          </div>
          <p className="mt-6 max-w-xl font-heading text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground md:text-2xl">{t.closing}</p>
        </Reveal>
      </div>
    </Act>
  );
}
