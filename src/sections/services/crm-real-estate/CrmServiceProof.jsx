import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CrmOpsMockup from "@/components/work/crm/CrmOpsMockup";
import { cn } from "@/lib/utils";
import { Chapter, KICKER, MONO } from "./serviceBits";

/**
 * Real proof — the service separated from the sales claims: the
 * figures belong to one system already built, and the case study is
 * offered with editorial weight, not as another button. The sanitized
 * operational surface of that system is reused unchanged.
 */
export default function CrmServiceProof({ lang, c, proofPath }) {
  const p = c.proof;
  return (
    <Chapter id="crm-service-proof" tone="white">
      <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-10">
        <div className="md:col-span-6 lg:col-span-5">
          <Reveal>
            <p className={KICKER}>{p.kicker}</p>
            <h2 id="crm-service-proof-title" className="mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-foreground md:text-5xl">{p.title}</h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
            {p.figures.map((f) => (
              <div key={f.value} className="min-w-[160px] max-w-[220px]">
                <p className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">{f.value}</p>
                <p className="mt-2 text-xs uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">{f.label}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl text-base leading-[1.75] text-muted-foreground md:text-lg">{p.copy}</p>
            <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-muted-foreground/80">{p.scopeNote}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to={proofPath}
              className="group mt-10 flex items-end justify-between gap-6 border-t border-foreground/20 pt-5 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span>
                <span className={cn(MONO, "block text-accent")}>{p.linkLabel}</span>
                <span className="mt-1.5 block font-heading text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-accent-deep md:text-3xl">{p.linkTitle}</span>
                <span className="mt-2 block text-sm font-medium text-foreground/70">{p.cta}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="mb-1 h-6 w-6 shrink-0 text-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px]" />
            </Link>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={0.1} className="min-w-0 md:col-span-6 lg:col-span-7">
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-x-[4%] -inset-y-[6%] rounded-[22px] bg-[linear-gradient(165deg,rgba(242,245,250,0.9),rgba(255,255,255,0.4))]" />
            <div className="relative">
              <CrmOpsMockup lang={lang} />
            </div>
          </div>
          <p className={cn(MONO, "mt-4 text-muted-foreground")}>{p.surfaceNote}</p>
        </Reveal>
      </div>
    </Chapter>
  );
}
