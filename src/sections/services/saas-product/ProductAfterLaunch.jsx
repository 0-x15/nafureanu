import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, MONO, Note, Statement, Tag, Wire } from "./saasBits";

/** Launch is not the end: a release timeline where the same product changes because real users showed up, and the loop behind it. */
export default function ProductAfterLaunch({ c }) {
  const l = c.launch;
  const blocks = [1, 3, 4, 5, 7];
  return (
    <Act id="sp-launch" tone="white">
      <Reveal><Statement id="sp-launch-title" a={l.statementA} b={l.statementB} /></Reveal>
      <Reveal delay={0.05}><p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{l.intro}</p></Reveal>
      <Reveal delay={0.06} className="mt-14">
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <span aria-hidden="true" className="absolute left-0 top-[7px] hidden h-px w-full bg-accent/30 lg:block" />
          {l.versions.map((v, i) => (
            <li key={v.v} className="relative lg:pt-7">
              <span aria-hidden="true" className={cn("absolute left-0 top-0 hidden h-[13px] w-[13px] rounded-full border border-accent lg:block", i === 1 || i === 4 ? "bg-accent" : "bg-white")} />
              <Tag tone={i === 0 ? "muted" : i === 4 ? "solid" : "accent"}>{v.v}</Tag>
              <div aria-hidden="true" className={cn("mt-3 min-h-[62px] rounded-[6px] border p-2", i === 0 ? "border-dashed border-foreground/25" : "border-border bg-[#FAFBFD]")}><span className="grid grid-cols-4 gap-1">{Array.from({ length: blocks[i] }).map((_, k) => <i key={k} className={cn("block h-3 rounded-[2px]", k === 0 ? "bg-accent/70" : "bg-foreground/12")} />)}</span><Wire lines={1} className="mt-2" /></div>
              <p className="mt-3 font-heading text-base font-bold tracking-[-0.01em] text-foreground">{v.label}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{v.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <Reveal delay={0.05} className="lg:col-span-4">
          <ol className="relative mx-auto flex aspect-square w-full max-w-[260px] items-center justify-center rounded-full border border-dashed border-accent/50">
            {l.loop.map((w, i) => { const pos = ["left-1/2 -top-3 -translate-x-1/2", "-right-4 top-1/2 -translate-y-1/2", "left-1/2 -bottom-3 -translate-x-1/2", "-left-4 top-1/2 -translate-y-1/2"][i]; return <li key={w} className={cn("absolute rounded-full border border-accent bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent", pos)}>{w}</li>; })}
            <span aria-hidden="true" className={cn(MONO, "text-muted-foreground")}>↻</span>
          </ol>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-8">
          <p className="max-w-2xl font-heading text-xl font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-2xl">{l.editorial}</p>
          <Note className="mt-6">{l.decisionsLabel}</Note>
          <ul className="mt-2 flex flex-wrap gap-1.5">{l.decisions.map((d) => <li key={d}><Tag>{d}</Tag></li>)}</ul>
          <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground">{l.closing}</p>
        </Reveal>
      </div>
    </Act>
  );
}
