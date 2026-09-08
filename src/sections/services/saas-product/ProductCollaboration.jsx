import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, MONO, Note, Statement } from "./saasBits";

/** A shared table: what you bring, what we define together, what we build; how you can arrive; four starting points on one journey. */
export default function ProductCollaboration({ c }) {
  const k = c.collab;
  return (
    <Act id="sp-collab" tone="page">
      <Reveal><Statement id="sp-collab-title" a={k.title} /></Reveal>
      <Reveal delay={0.05}><p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{k.intro}</p></Reveal>
      <Reveal delay={0.06} className="mt-14">
        <div className="grid gap-px overflow-hidden rounded-[12px] border border-border bg-border md:grid-cols-3">
          {k.columns.map((col, i) => (
            <div key={col.label} className={cn("bg-white p-5 md:p-6", i === 1 && "bg-[#F7F9FD]")}>
              <span className={cn(MONO, i === 1 ? "text-accent" : "text-muted-foreground")}>0{i + 1}</span>
              <p className="mt-1 font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{col.label}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{col.items.map((it) => <li key={it} className={cn("rounded-[6px] border px-3 py-1.5 text-[13px]", i === 1 ? "border-accent/40 bg-white text-accent-deep" : i === 2 ? "border-accent bg-accent text-white" : "border-border bg-[#FAFBFD] text-foreground/85")}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </Reveal>
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <Reveal delay={0.05} className="lg:col-span-6">
          <Note>{k.arrivalsLabel}</Note>
          <ul className="mt-3 divide-y divide-border border-t border-border">{k.arrivals.map((a) => <li key={a} className="py-3 font-heading text-[17px] font-medium leading-snug tracking-[-0.01em] text-foreground/85"><span aria-hidden="true" className="mr-1 text-accent">“</span>{a}<span aria-hidden="true" className="text-accent">”</span></li>)}</ul>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-6">
          <Note>{k.startsLabel}</Note>
          <ol className="relative mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <span aria-hidden="true" className="absolute left-0 top-[6px] hidden h-px w-full bg-accent/40 sm:block" />
            {k.starts.map((st, i) => <li key={st.label} className="relative sm:pt-6"><span aria-hidden="true" className={cn("absolute left-0 top-0 hidden h-[13px] w-[13px] rounded-full border border-accent sm:block", i === 0 ? "bg-white" : "bg-accent")} /><span className="block font-heading text-base font-bold tracking-[-0.01em] text-foreground">{st.label}</span><span className="mt-1 block text-[12px] leading-snug text-muted-foreground">{st.text}</span></li>)}
          </ol>
          <p className="mt-8 text-[14px] leading-relaxed text-muted-foreground">{k.closing}</p>
        </Reveal>
      </div>
    </Act>
  );
}
