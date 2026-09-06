import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Mono, Shot } from "./fivoBits";

const isEvent = (s) => /^[a-z]+\.[a-z]+$/.test(s);

/**
 * Operational automation — three complete flows (payment, refund,
 * withdrawal) as event chains, the background recovery workers, and
 * the sanitized automatic invoice as proof of the last link.
 */
export default function FivoOperations({ c }) {
  const o = c.operations;
  return (
    <Chapter tone="white" aria-labelledby="fivo-operations">
      <ChapterHead kicker={o.kicker} title={o.title} intro={o.intro} />

      <Reveal delay={0.06} className="mt-12">
        <div className="grid gap-6 md:grid-cols-3">
          {o.flows.map((flow) => (
            <div key={flow.title} className="rounded-2xl border border-[#E1E5EF] bg-white p-5">
              <p className="font-heading text-lg font-bold text-foreground">{flow.title}</p>
              <ol className="relative mt-4 space-y-3 border-l border-[#E1E5EF] pl-5">
                {flow.steps.map((s, i) => (
                  <li key={s} className="relative text-[13px] leading-relaxed text-[#4A5164]">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -left-[25px] top-[7px] h-2.5 w-2.5 rounded-full border-2 bg-white",
                        i === flow.steps.length - 1 ? "border-emerald-500" : isEvent(s) ? "border-accent" : "border-[#C9D3EC]"
                      )}
                    />
                    {isEvent(s) ? (
                      <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[11px] text-accent-deep">{s}</span>
                    ) : (
                      s
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <Reveal className="min-w-0 lg:col-span-5">
          <div className="rounded-2xl border border-[#E1E5EF] bg-[#F7F9FD] p-5 md:p-6">
            <Mono className="text-accent">{o.automation.title}</Mono>
            <ul className="mt-4 space-y-4">
              {o.automation.items.map((it) => (
                <li key={it.title}>
                  <p className="text-sm font-semibold text-foreground">{it.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#5A6070]">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="min-w-0 lg:col-span-7">
          <Shot id="invoice" alt={o.invoiceAlt} className="rounded-xl" />
          <p className="mt-2 text-[11px] text-muted-foreground">{o.invoiceCaption}</p>
        </Reveal>
      </div>
    </Chapter>
  );
}
