import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { cn } from "@/lib/utils";
import { Act, Caption, Ext, KICKER, Mark, MONO, Shot, Statement } from "./webBits";

/** The design problem and the decisions, set beside the real interface. */
function Notes({ p, t, project, wp, className = "" }) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className={KICKER}>{project.category}</p>
      <h3 className="mt-3 font-heading text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground">{project.name}</h3>
      <p className={cn(MONO, "mt-8 text-muted-foreground")}>{t.problemLabel}</p>
      <p className="mt-2 max-w-md font-heading text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground md:text-2xl">{p.problem}</p>
      <p className={cn(MONO, "mt-7 text-muted-foreground")}>{t.decisionLabel}</p>
      <ul className="mt-2 space-y-1.5">
        {p.decisions.map((d) => <li key={d} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-foreground/85"><span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-accent" />{d}</li>)}
      </ul>
      <p className="mt-6 max-w-md text-[14px] leading-[1.65] text-muted-foreground">{p.lesson}</p>
      <div className="mt-6"><Ext href={project.url} label={`${wp.visit} · ${project.host}`} hint={wp.visitHint} /></div>
    </div>
  );
}

/**
 * Act IV — real work, editorially. Four projects, four briefs, four
 * different answers: a wide spread, a calm vertical composition, a 3D
 * scene that breaks the grid, a dense application. Real captures only.
 */
export default function WebProof({ c, wp, paths }) {
  const t = c.proof;
  const P = Object.fromEntries(wp.projects.map((p) => [p.id, p]));
  const dd = P["dd-evecom"], goya = P["dental-goya"], oct = P["reformas-octavian"], mp = P["mp-monitor"];
  return (
    <Act id="wd-proof" tone="white" className="overflow-x-clip">
      <Reveal>
        <Statement id="wd-proof-title" a={t.a} b={t.b} />
        <p className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
      </Reveal>

      {/* 01 · DD Evecom — a wide horizontal spread */}
      <article className="mt-20 md:mt-28" aria-labelledby="wd-p-dd">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-8">
            <div className="overflow-hidden border border-border bg-[#F1F1F3] shadow-[0_50px_100px_-70px_rgba(12,18,32,0.5)]"><Shot id="dd-evecom" file="desktop" alt={dd.images.desktop} sizes="(min-width: 1024px) 64vw, 100vw" /></div>
            <div className="absolute -bottom-10 right-4 w-[26%] max-w-[190px] overflow-hidden border border-border bg-white shadow-[0_30px_60px_-30px_rgba(12,18,32,0.45)] md:-bottom-16 md:right-8 lg:-right-6"><Shot id="dd-evecom" file="mobile" alt={dd.images.mobile} sizes="190px" /></div>
            <Caption className="mt-14 md:mt-20">{t.n1} · {dd.captions.desktop} · {dd.captions.mobile}</Caption>
          </div>
          <Notes p={t.items.dd} t={t} project={{ ...dd, name: <span id="wd-p-dd">{dd.name}</span> }} wp={wp} className="lg:col-span-4 lg:pt-6" />
        </Reveal>
      </article>

      {/* 02 · Goya — calm, vertical */}
      <article className="mt-28 border-t border-border pt-16 md:mt-40 md:pt-24" aria-labelledby="wd-p-goya">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <Notes p={t.items.goya} t={t} project={{ ...goya, name: <span id="wd-p-goya">{goya.name}</span> }} wp={wp} className="order-2 lg:order-1 lg:col-span-4 lg:pt-10" />
          <div className="order-1 grid grid-cols-[1fr_1.6fr] items-end gap-4 md:gap-6 lg:order-2 lg:col-span-8">
            <div className="overflow-hidden rounded-[18px] border border-border bg-[#F1F1F3] shadow-[0_40px_80px_-50px_rgba(12,18,32,0.5)]"><Shot id="dental-goya" file="mobile" alt={goya.images.mobile} sizes="(min-width: 1024px) 22vw, 36vw" /></div>
            <div>
              <div className="overflow-hidden border border-border bg-[#F1F1F3] shadow-[0_40px_80px_-50px_rgba(12,18,32,0.5)]"><Shot id="dental-goya" file="detail" alt={goya.images.detail} sizes="(min-width: 1024px) 40vw, 58vw" /></div>
              <div className="mt-4 overflow-hidden border border-border bg-[#F1F1F3]"><Shot id="dental-goya" file="desktop" alt={goya.images.desktop} sizes="(min-width: 1024px) 40vw, 58vw" className="aspect-[16/7] object-cover object-top" /></div>
            </div>
            <Caption className="col-span-2">{t.n2} · {goya.captions.mobile} · {goya.captions.detail} · {goya.captions.desktop}</Caption>
          </div>
        </Reveal>
      </article>

      {/* 03 · Octavian — the scene breaks the grid */}
      <article className="relative mt-28 md:mt-40" aria-labelledby="wd-p-oct">
        <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-0 w-screen -translate-x-1/2 bg-[#EEEEEA]" />
        <div className="relative py-16 md:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4 lg:pt-4"><Notes p={t.items.octavian} t={t} project={{ ...oct, name: <span id="wd-p-oct">{oct.name}</span> }} wp={wp} /></div>
            <div className="relative lg:col-span-8">
              <div className="relative -mx-5 md:-mx-10 lg:-mr-[14vw] lg:ml-0">
                <div className="overflow-hidden bg-white shadow-[0_60px_120px_-70px_rgba(12,18,32,0.6)]"><Shot id="reformas-octavian" file="desktop" alt={oct.images.desktop} sizes="(min-width: 1024px) 78vw, 100vw" /></div>
                <div className="absolute -bottom-8 left-6 w-[38%] max-w-[360px] -rotate-1 overflow-hidden bg-white shadow-[0_30px_60px_-30px_rgba(12,18,32,0.45)] md:-bottom-14 md:left-10"><Shot id="reformas-octavian" file="detail" alt={oct.images.detail} sizes="360px" /></div>
                <div className="absolute -bottom-4 right-6 hidden w-[30%] max-w-[300px] rotate-1 overflow-hidden bg-white shadow-[0_30px_60px_-30px_rgba(12,18,32,0.45)] md:-bottom-10 md:block lg:right-[16vw]"><Shot id="reformas-octavian" file="detail2" alt={oct.images.detail2} sizes="300px" /></div>
              </div>
              <Caption className="mt-20 md:mt-24">{t.n3} · {oct.captions.desktop} · {oct.captions.detail} · {oct.captions.detail2}</Caption>
            </div>
          </Reveal>
        </div>
      </article>

      {/* 04 · MP Monitor — a dense application, briefly */}
      <article className="mt-16 md:mt-24" aria-labelledby="wd-p-mp">
        <Reveal className="grid gap-8 border border-border bg-[#0F1320] p-5 text-white md:grid-cols-12 md:gap-8 md:p-8">
          <div className="md:col-span-7">
            <div className="overflow-hidden border border-white/10"><Shot id="mp-monitor" file="desktop" alt={mp.images.desktop} sizes="(min-width: 768px) 56vw, 100vw" /></div>
            <Caption className="mt-3 text-white/50">{t.n4} · {mp.captions.desktop}</Caption>
          </div>
          <div className="md:col-span-5 md:pl-4">
            <p className={cn(MONO, "text-[#8FB3FF]")}>{t.mpKicker}</p>
            <h3 id="wd-p-mp" className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.03em]">{mp.name}</h3>
            <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-white/80">{t.items.mp.problem}</p>
            <ul className="mt-5 space-y-1.5">
              {t.items.mp.decisions.map((d) => <li key={d} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-white/75"><span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-[#8FB3FF]" />{d}</li>)}
            </ul>
            <p className="mt-6 max-w-md text-[14px] leading-[1.65] text-white/55">{t.items.mp.lesson}</p>
            <div className="mt-6"><Ext href={mp.url} label={`${wp.visit} · ${mp.host}`} hint={wp.visitHint} className="text-white decoration-white/40 hover:decoration-white" /></div>
          </div>
        </Reveal>
      </article>

      <Reveal className="mt-20 flex flex-col items-start gap-6 border-t border-border pt-12 md:mt-28 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Mark label={t.exploreLabel} />
          <p className="mt-3 font-heading text-[clamp(1.6rem,3vw,2.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground [text-wrap:balance]">{t.exploreTitle}</p>
        </div>
        <ActionLink to={paths.exhibition} variant="secondary" icon="right" size="lg">{t.explore}</ActionLink>
      </Reveal>
    </Act>
  );
}
