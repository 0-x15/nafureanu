import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { cn } from "@/lib/utils";
import { Chapter, KICKER, MONO, Pill } from "./bsBits";

/**
 * Real experience — one real implementation, stated as such. The
 * figures belong to the system already built; the secondary reference
 * is our own product, not a client. Nothing here is cross-industry proof.
 */
export default function BsProof({ c, servicePath, casePath, lifeAdminPath }) {
  const p = c.proof;
  return (
    <Chapter id="bs-proof" tone="white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className={KICKER}>{p.kicker}</p>
            <h2 id="bs-proof-title" className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-foreground md:text-5xl [text-wrap:balance]">{p.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{p.intro}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">{p.connects.map((x) => <li key={x}><Pill tone="done">{x}</Pill></li>)}</ul>
          </Reveal>
          <Reveal delay={0.06} className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {p.figures.map((f) => <div key={f.label}><p className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">{f.value}</p><p className="mt-1.5 text-[11px] uppercase leading-snug tracking-[0.14em] text-muted-foreground">{f.label}</p></div>)}
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl text-[15px] leading-[1.75] text-foreground/85">{p.scope}</p>
            <p className={cn(MONO, "mt-3 text-muted-foreground")}>{p.note}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
            <ActionLink to={servicePath} variant="secondary" icon="right" size="md">{p.cta}</ActionLink>
            <ActionLink to={casePath} variant="text" icon="right">{p.ctaCase}</ActionLink>
          </Reveal>
        </div>
        <Reveal variant="left" delay={0.1} className="lg:col-span-5 lg:self-end">
          <Link to={lifeAdminPath} className="group block rounded-[12px] border border-border bg-[#FAFBFD] p-6 outline-none transition-colors hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:p-7">
            <span className={cn(MONO, "text-accent")}>{p.secondary.kicker}</span>
            <span className="mt-2 flex items-start justify-between gap-4">
              <span className="font-heading text-2xl font-bold tracking-[-0.02em] text-foreground">{p.secondary.title}</span>
              <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
            </span>
            <span className="mt-3 block text-[14px] leading-relaxed text-muted-foreground">{p.secondary.text}</span>
            <span className="mt-4 block text-sm font-medium text-foreground/80">{p.secondary.cta}</span>
          </Link>
        </Reveal>
      </div>
    </Chapter>
  );
}
