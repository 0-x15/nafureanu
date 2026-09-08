import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, MONO, Note, Statement, Tag, tabKey } from "./saasBits";
import ProductFrame from "./ProductFrame";

/**
 * The product studio — the signature moment. Desktop: the story scrolls
 * on the left while one persistent product frame on the right gains
 * definition through five stages. Mobile: four compact snapshots.
 */
export default function ProductStudio({ c }) {
  const s = c.studio;
  const [i, setI] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setI(Number(/** @type {HTMLElement} */ (e.target).dataset.stage)); }); }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const stage = s.stages[i];
  const go = (k) => { setI(k); refs.current[k]?.scrollIntoView({ block: "center", behavior: "smooth" }); };
  return (
    <Act id="sp-studio" tone="studio">
      <Reveal><Statement id="sp-studio-title" a={s.title} /></Reveal>
      <Reveal delay={0.05}><p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{s.intro}</p></Reveal>
      {/* desktop: narrative + sticky frame */}
      <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-5">
          {s.stages.map((st, k) => (
            <div key={st.id} ref={(el) => { refs.current[k] = el; }} data-stage={k} className={cn("flex min-h-[62vh] flex-col justify-center border-l pl-8 transition-colors duration-500", k === i ? "border-accent" : "border-border")}>
              <span className={cn(MONO, k === i ? "text-accent" : "text-muted-foreground")}>0{k + 1} · {st.label}</span>
              <h3 className={cn("mt-3 font-heading text-2xl font-bold tracking-[-0.02em] transition-colors duration-500 md:text-3xl", k === i ? "text-foreground" : "text-foreground/45")}>{st.title}</h3>
              <p className={cn("mt-4 max-w-md text-[15px] leading-relaxed transition-colors duration-500", k === i ? "text-foreground/85" : "text-muted-foreground/70")}>{st.text}</p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-7">
          <div className="sticky top-28">
            <ol role="tablist" aria-label={s.hint} className="mb-3 flex flex-wrap gap-1.5">
              {s.stages.map((st, k) => { const on = k === i; return <li key={st.id}><button type="button" role="tab" id={`sp-stage-${st.id}`} aria-selected={on} aria-controls="sp-frame" tabIndex={on ? 0 : -1} onClick={() => go(k)} onKeyDown={(e) => tabKey(e, k, s.stages.length, go)} className={cn("rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-accent text-white" : "border-border bg-white text-muted-foreground hover:text-foreground")}>0{k + 1} · {st.label}</button></li>; })}
            </ol>
            <div id="sp-frame" role="tabpanel" aria-labelledby={`sp-stage-${stage.id}`}><ProductFrame f={s.frame} layers={s.layers} stage={stage.id} /></div>
            <div className="mt-3 flex items-center justify-between gap-3"><Tag tone="muted">{s.note}</Tag>{stage.id === "system" && <span className={cn(MONO, "text-muted-foreground")}>{s.layers.length} · {s.stages[3].label}</span>}</div>
          </div>
        </div>
      </div>
      {/* mobile & tablet: snapshots */}
      <div className="mt-12 lg:hidden">
        <Note>{s.snapshotsLabel}</Note>
        <ol className="mt-4 space-y-10">
          {s.stages.filter((st) => st.id !== "idea").map((st, k) => (
            <li key={st.id}>
              <span className={cn(MONO, "text-accent")}>0{k + 1} · {st.label}</span>
              <h3 className="mt-2 font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{st.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">{st.text}</p>
              <div className="mt-4"><ProductFrame f={s.frame} layers={s.layers} stage={st.id} compact /></div>
            </li>
          ))}
        </ol>
        <p className="mt-4"><Tag tone="muted">{s.note}</Tag></p>
      </div>
    </Act>
  );
}
