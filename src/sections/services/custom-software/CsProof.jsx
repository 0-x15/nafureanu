import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CrmOpsMockup from "@/components/work/crm/CrmOpsMockup";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Tag } from "./csBits";

/**
 * Real proof — three problems, three systems, one capability. Every
 * figure comes from the projects' repositories; every visual is a
 * sanitised surface already used by the case studies.
 */
export default function CsProof({ lang, c, paths }) {
  const p = c.proof;
  const visual = (id) => {
    if (id === "crm") return <CrmOpsMockup lang={lang} />;
    const src = id === "lifeAdmin" ? `/work/life-admin/dashboard.${lang}.webp` : "/work/fivo/merchant-dashboard.webp";
    return <img src={src} alt="" loading="lazy" decoding="async" className="block aspect-[16/10] w-full rounded-[8px] border border-border object-cover object-top" />;
  };
  return (
    <Chapter id="cs-proof" tone="white">
      <ChapterHead id="cs-proof" kicker={p.kicker} title={p.title} intro={p.intro} />
      <ol className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
        {p.systems.map((s, i) => (
          <Reveal key={s.id} delay={0.06 * i} className="h-full">
            <li className="flex h-full flex-col rounded-[12px] border border-border bg-[#FAFBFD] p-5 md:p-6">
              <p className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")} · {s.domain}</p>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground">{s.name}</h3>
              <div className="mt-4 overflow-hidden rounded-[10px]">{visual(s.id)}</div>
              <dl className="mt-5 space-y-4">
                <div><dt className={cn(MONO, "text-muted-foreground")}>{p.labels.problem}</dt><dd className="mt-1 text-[13px] leading-relaxed text-foreground/85">{s.problem}</dd></div>
                <div><dt className={cn(MONO, "text-muted-foreground")}>{p.labels.became}</dt><dd className="mt-1 text-[13px] leading-relaxed text-foreground/85">{s.became}</dd></div>
                <div><dt className={cn(MONO, "text-muted-foreground")}>{p.labels.architecture}</dt><dd className="mt-2 flex flex-wrap gap-1.5">{s.architecture.map((t) => <Pill key={t} tone="done">{t}</Pill>)}</dd></div>
              </dl>
              <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">{s.figures.map(([v, l]) => <li key={l}><span className="block font-heading text-xl font-bold tracking-tight text-foreground">{v}</span><span className="block text-[10px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">{l}</span></li>)}</ul>
              <Link to={paths[s.id]} className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent outline-none transition-colors hover:text-accent-deep focus-visible:underline">{s.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" /></Link>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={0.1}><p className="mt-6 max-w-3xl text-[13px] text-muted-foreground"><Tag tone="ok" className="mr-2 align-middle">{p.kicker}</Tag>{p.note}</p></Reveal>
      <Closing>{p.closing}</Closing>
    </Chapter>
  );
}
