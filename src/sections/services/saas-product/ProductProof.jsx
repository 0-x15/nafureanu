import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, MONO, Note, Statement, Tag } from "./saasBits";

const IMG = "block aspect-[16/10] w-full rounded-[8px] border border-border object-cover object-top";

/** Two products, two problems that had nothing in common — Fivo as a product surface progression, Life Admin as a document becoming a system, and a thin third strip. */
export default function ProductProof({ lang, c, paths }) {
  const p = c.proof;
  return (
    <Act id="sp-proof" tone="proof">
      <Reveal><Statement id="sp-proof-title" a={p.statementA} b={p.statementB} /></Reveal>
      <Reveal delay={0.05}><p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{p.intro}</p></Reveal>
      {/* Fivo */}
      <article className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10" aria-labelledby="sp-proof-fivo">
        <Reveal className="lg:col-span-4">
          <Note tone="accent">01 · {p.fivo.name}</Note>
          <h3 id="sp-proof-fivo" className="mt-3 font-heading text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground md:text-3xl">{p.fivo.line}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{p.fivo.text}</p>
          <ul className="mt-5 grid grid-cols-2 gap-3">{p.fivo.facts.map(([v, l]) => <li key={l}><span className="block font-heading text-xl font-bold tracking-tight text-foreground">{v}</span><span className="block text-[10px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">{l}</span></li>)}</ul>
          <Link to={paths.fivo} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent outline-none hover:text-accent-deep focus-visible:underline">{p.fivo.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" /></Link>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-8">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {p.fivo.steps.map((st, i) => (
              <li key={st.label} className="relative rounded-[10px] border border-border bg-white p-2.5">
                <img src={`/work/fivo/${st.img}.webp`} alt="" loading="lazy" decoding="async" className={IMG} />
                <span className={cn(MONO, "mt-3 block text-accent")}>0{i + 1} · {st.who}</span>
                <span className="mt-1 block text-[13px] font-semibold text-foreground">{st.label}</span>
                <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{st.text}</span>
                {i < 3 && <span aria-hidden="true" className="absolute -right-[8px] top-1/2 hidden h-px w-3 bg-accent lg:block" />}
              </li>
            ))}
          </ol>
        </Reveal>
      </article>
      {/* Life Admin */}
      <article className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-10" aria-labelledby="sp-proof-la">
        <Reveal variant="scale" className="order-last lg:order-none lg:col-span-7">
          <ol className="grid gap-3 sm:grid-cols-3">
            {p.lifeAdmin.steps.map((st, i) => (
              <li key={st.label} className="relative rounded-[10px] border border-border bg-white p-2.5">
                <img src={`/work/life-admin/${st.img}.${lang}.webp`} alt="" loading="lazy" decoding="async" className={IMG} />
                <span className={cn(MONO, "mt-3 block text-accent")}>0{i + 1}</span>
                <span className="mt-1 block text-[13px] font-semibold text-foreground">{st.label}</span>
                <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{st.text}</span>
                {i < 2 && <span aria-hidden="true" className="absolute -right-[8px] top-1/2 hidden h-px w-3 bg-accent sm:block" />}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.05} className="lg:col-span-5">
          <Note tone="accent">02 · {p.lifeAdmin.name}</Note>
          <h3 id="sp-proof-la" className="mt-3 font-heading text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground md:text-3xl">{p.lifeAdmin.line}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{p.lifeAdmin.text}</p>
          <ul className="mt-5 grid grid-cols-3 gap-3">{p.lifeAdmin.facts.map(([v, l]) => <li key={l}><span className="block font-heading text-xl font-bold tracking-tight text-foreground">{v}</span><span className="block text-[10px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">{l}</span></li>)}</ul>
          <Link to={paths.lifeAdmin} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent outline-none hover:text-accent-deep focus-visible:underline">{p.lifeAdmin.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" /></Link>
        </Reveal>
      </article>
      {/* third, thin */}
      <Reveal delay={0.05} className="mt-16">
        <Link to={paths.web} className="group flex flex-wrap items-center justify-between gap-4 rounded-[10px] border border-border bg-white px-5 py-4 outline-none transition-colors hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          <span className="min-w-0"><span className={cn(MONO, "block text-muted-foreground")}>{p.third.kicker} · {p.third.kind}</span><span className="mt-1 block text-[15px] leading-snug text-foreground"><span className="font-heading font-bold">{p.third.name}</span> — {p.third.line}</span></span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">{p.third.cta}<ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" /></span>
        </Link>
      </Reveal>
      <Reveal delay={0.08} className="mt-16">
        <Statement a={p.closingA} b={p.closingB} as="p" className="md:text-4xl lg:text-5xl" />
        <p className="mt-5"><Tag tone="muted">{p.note}</Tag></p>
      </Reveal>
    </Act>
  );
}
