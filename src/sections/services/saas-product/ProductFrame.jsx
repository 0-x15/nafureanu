import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, Handles, MONO, Tag, Wire } from "./saasBits";

const LAYER_POS = ["left-2 top-12", "right-2 top-12", "left-2 top-1/2", "right-2 top-1/2", "left-2 bottom-3", "right-2 bottom-3"];

/** The fictional product surface, at one of five stages. Compact (mobile snapshots) or full. */
export default function ProductFrame({ f, layers, stage, compact = false }) {
  const reduced = useReducedMotion();
  const t = { duration: reduced ? 0 : 0.45, ease: EASE };
  const app = (
    <div className={cn("grid h-full gap-3", compact ? "grid-cols-[92px_1fr]" : "grid-cols-[120px_1fr]")}>
      <nav aria-hidden="true" className="rounded-[6px] border border-border bg-[#FAFBFD] p-2">
        {[f.workspace.split(" ")[0], f.history, f.settings].map((n, i) => <span key={n} className={cn("block rounded-[4px] px-2 py-1.5 text-[11px]", i === 0 ? "bg-white font-semibold text-accent shadow-sm" : "text-muted-foreground")}>{n}</span>)}
      </nav>
      <div className="min-w-0">
        {stage === "v1" && <div className="mb-2 flex items-center justify-between rounded-[6px] border border-accent/40 bg-[#EEF3FC] px-3 py-1.5 text-[11px] text-accent-deep"><span className="truncate">{f.onboarding}</span><span aria-hidden="true" className="ml-2 shrink-0 text-muted-foreground">×</span></div>}
        <div className="flex items-center justify-between gap-2"><span className="text-[12px] font-semibold text-foreground">{f.workspace}</span><span className="relative rounded-[5px] bg-accent px-2.5 py-1 text-[11px] font-medium text-white">{f.action}{stage === "v1" && <Handles />}</span></div>
        <ul className="mt-2 divide-y divide-border rounded-[6px] border border-border">{f.rows.map(([id, st]) => <li key={id} className="flex items-center justify-between px-2.5 py-1.5 text-[11px]"><span className="font-mono text-foreground/80">#{id}</span><Tag tone={st === f.rows[0][1] ? "ok" : "neutral"}>{st}</Tag></li>)}</ul>
        {(stage === "v1" || stage === "live") && <p className="mt-2 rounded-[5px] border border-[#B9DDC6] bg-[#EAF6EE] px-2.5 py-1.5 text-[11px] text-[#1F6B3A]">{f.result}</p>}
        {stage === "system" && <p className={cn(MONO, "mt-2 text-[9px] text-accent")}>{f.rule}</p>}
        {stage === "live" && <p className={cn(MONO, "mt-2 text-[9px] text-muted-foreground")}>{f.feedback}</p>}
      </div>
    </div>
  );
  return (
    <div className={cn("relative overflow-hidden rounded-[12px] border bg-white shadow-[0_24px_56px_-36px_rgba(12,18,32,0.35)]", stage === "idea" ? "border-dashed border-foreground/30" : "border-border")}>
      <div className="flex items-center justify-between gap-3 border-b border-border bg-[#FAFBFD] px-4 py-2.5">
        <span className="flex items-center gap-2 text-[12px] font-bold tracking-[-0.01em] text-foreground"><i aria-hidden="true" className="h-2 w-2 bg-accent" />{f.product}</span>
        <span className="flex items-center gap-2">{stage === "live" && <Tag tone="accent">{f.version}</Tag>}{stage === "live" ? <Tag tone="ok">{f.status}</Tag> : <span className="flex gap-1.5"><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /></span>}</span>
      </div>
      <div className={cn("relative p-4", compact ? "min-h-[220px]" : "min-h-[360px] md:min-h-[420px]")}>
        {stage === "idea" && (
          <motion.div key="idea" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t} className="flex h-full min-h-[200px] items-center justify-center">
            <span className="relative rounded-[8px] border border-dashed border-accent px-5 py-3 font-heading text-lg font-semibold tracking-[-0.01em] text-foreground/80">{f.workspace}…<Handles /></span>
          </motion.div>
        )}
        {stage === "journey" && (
          <motion.ol key="journey" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t} className="grid h-full grid-cols-2 gap-3 sm:grid-cols-4">
            {[f.signin, f.workspace, f.action, f.result.split(" · ")[0]].map((s, i) => (
              <li key={s} className={cn("relative rounded-[8px] border p-3", i === 2 ? "border-accent bg-[#EEF3FC]" : "border-border bg-[#FAFBFD]")}>
                <span className={cn(MONO, "block", i === 2 ? "text-accent" : "text-muted-foreground")}>0{i + 1}</span>
                <span className="mt-1 block text-[12px] font-semibold leading-snug text-foreground">{s}</span>
                <Wire lines={2} className="mt-3" />
                {i < 3 && <span aria-hidden="true" className="absolute -right-[8px] top-1/2 hidden h-px w-3 bg-accent sm:block" />}
              </li>
            ))}
          </motion.ol>
        )}
        {(stage === "v1" || stage === "live") && <motion.div key={stage} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={t} className="h-full">{app}</motion.div>}
        {stage === "system" && (
          <motion.div key="system" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t} className={cn("relative", compact ? "min-h-0" : "min-h-[328px] md:min-h-[388px]")}>
            <div className="opacity-40">{app}</div>
            {!compact && layers.map((l, i) => (
              <motion.div key={l.id} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.1 * i }} className={cn("absolute max-w-[46%] rounded-[6px] border border-accent/50 bg-white/95 px-2.5 py-1.5 shadow-sm", LAYER_POS[i])}>
                <span className={cn(MONO, "block text-accent")}>{l.label}</span>
                <span className="block text-[10px] leading-snug text-foreground/80">{l.items.join(" · ")}</span>
              </motion.div>
            ))}
            {compact && <ul className="mt-3 flex flex-wrap gap-1">{layers.map((l) => <li key={l.id}><Tag tone="accent">{l.label}</Tag></li>)}</ul>}
          </motion.div>
        )}
      </div>
    </div>
  );
}
