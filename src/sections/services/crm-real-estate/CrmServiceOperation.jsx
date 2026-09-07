import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Surface } from "./serviceBits";

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -1];
const SHIFTS = [0, 10, -6, 4, 12, -4, 6];

/**
 * The operation before the software. Left: the pieces as they live
 * today — scattered, tilted, joined by hand. Right: the same pieces
 * around a core. Nothing new is invented; it is the same operation.
 */
export default function CrmServiceOperation({ c }) {
  const o = c.operation;
  const reduced = useReducedMotion();
  return (
    <Chapter id="crm-service-operation" tone="white">
      <ChapterHead id="crm-service-operation" kicker={o.kicker} title={o.titleB} titleMuted={o.titleA} intro={o.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-2">
        {/* Today */}
        <Reveal variant="left">
          <Surface title={o.piecesLabel} meta="—" bodyClassName="p-5 md:p-6">
            <p className={cn(MONO, "text-muted-foreground")}>{o.inputsLabel}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">{o.inputs.map((i) => <li key={i}><Pill tone="soft">{i}</Pill></li>)}</ul>
            <ul className="mt-6 flex flex-wrap gap-3">
              {o.pieces.map((p, i) => (
                <motion.li
                  key={p}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  style={{ rotate: reduced ? 0 : TILTS[i % TILTS.length], y: reduced ? 0 : SHIFTS[i % SHIFTS.length] }}
                  className="rounded-[6px] border border-dashed border-foreground/30 bg-[#FAFBFD] px-3 py-2 text-[13px] font-medium text-foreground/80"
                >
                  {p}
                </motion.li>
              ))}
            </ul>
            <p className={cn(MONO, "mt-8 text-muted-foreground")}>{o.gapsLabel}</p>
            <ul className="mt-2 divide-y divide-dashed divide-border">
              {o.gaps.map((g) => (
                <li key={g} className="flex items-center gap-3 py-2 text-[13px] text-foreground/75">
                  <span aria-hidden="true" className="h-px w-5 shrink-0 border-t border-dashed border-foreground/40" />
                  {g}
                </li>
              ))}
            </ul>
          </Surface>
        </Reveal>
        {/* With the CRM as the core */}
        <Reveal variant="scale" delay={0.1}>
          <Surface title={o.afterLabel} meta="CRM" className="border-accent/30" bodyClassName="p-5 md:p-6">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
              <svg aria-hidden="true" viewBox="0 0 100 75" className="absolute inset-0 h-full w-full">
                {o.pieces.map((p, i) => {
                  const a = ((i * (360 / o.pieces.length) - 90) * Math.PI) / 180;
                  return <motion.line key={p} x1="50" y1="37.5" x2={50 + 40 * Math.cos(a)} y2={37.5 + 28 * Math.sin(a)} stroke="#2563EB" strokeWidth="0.35" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, delay: 0.1 + i * 0.06 }} />;
                })}
              </svg>
              <div className="absolute left-1/2 top-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-white font-heading text-lg font-bold tracking-[-0.03em] text-foreground shadow-[0_0_0_8px_rgba(37,99,235,0.06)]">CRM</div>
              {o.pieces.map((p, i) => {
                const a = ((i * (360 / o.pieces.length) - 90) * Math.PI) / 180;
                return (
                  <span key={p} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[6px] border border-accent/40 bg-white px-2.5 py-1.5 text-[12px] font-medium text-foreground shadow-sm" style={{ left: `${50 + 40 * Math.cos(a)}%`, top: `${50 + 37.3 * Math.sin(a)}%` }}>
                    {p}
                  </span>
                );
              })}
            </div>
            <ul className="mt-6 divide-y divide-border">
              {o.after.map((g) => (
                <li key={g} className="flex items-center gap-3 py-2 text-[13px] text-foreground/85">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-[2px] bg-accent" />
                  {g}
                </li>
              ))}
            </ul>
          </Surface>
        </Reveal>
      </div>
      <Closing>{o.closing}</Closing>
    </Chapter>
  );
}
