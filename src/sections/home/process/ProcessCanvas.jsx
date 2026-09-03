import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CanvasDecoration from "./CanvasDecoration";

const EASE = [0.22, 1, 0.36, 1];

/* Station positions along the rail, as % of the canvas width */
const X = [18, 28.5, 41, 53.5, 66, 78];
/* Tiny movement labels sit on the rail between station pairs */
const MOVES = [23.25, 47.25, 72];

/* Entrada fragments — slight disorder, business reality */
const FRAG = [
  "rotate-[-2.5deg] translate-x-1",
  "rotate-[1.5deg] translate-x-3",
  "rotate-[-1deg] translate-x-0.5",
  "rotate-[2deg] translate-x-4",
  "rotate-[-2deg] translate-x-1.5",
  "rotate-[1deg] translate-x-2.5",
];

/**
 * The engineering canvas: ENTRADA (real process) on the left, one
 * continuous rail with six stations across the middle, SALIDA
 * (system in production) on the right. Stations alternate above and
 * below the rail for an architectural editorial rhythm.
 */
export default function ProcessCanvas({ t, steps }) {
  return (
    <div className="relative mt-16 hidden aspect-[1440/640] w-full lg:block">
      <CanvasDecoration />

      {/* ENTRADA — the messy process before technology */}
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="absolute bottom-[52%] left-0 w-[12.5%]"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          {t.inputLabel}
        </p>
        <p className="mt-1.5 font-heading text-base font-bold tracking-[-0.01em] text-foreground">
          {t.inputName}
        </p>
        <div className="mt-3.5 space-y-1.5">
          {t.inputFragments.map((f, i) => (
            <span key={f} className={cn("block w-fit text-[10px] text-muted-foreground/80", FRAG[i])}>
              {f}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Stations — verbs as the structural rhythm, descriptions quiet */}
      {steps.map((step, i) => {
        const above = i % 2 === 0;
        return (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: above ? 16 : -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.22, ease: EASE }}
            className={cn("group absolute", above ? "bottom-[55%]" : "top-[55%]")}
            style={{ left: `${X[i]}%` }}
          >
            <p className="font-mono text-[10px] text-muted-foreground/70 transition-colors duration-300 group-hover:text-accent">
              {step.num}
            </p>
            <h3 className="mt-1.5 font-heading text-lg font-bold tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover:text-accent">
              {step.title}
            </h3>
            <p className="mt-2 max-w-[138px] text-[11px] leading-relaxed text-muted-foreground/90">
              {step.text}
            </p>
          </motion.div>
        );
      })}

      {/* Station ticks on the rail */}
      {steps.map((step, i) => (
        <motion.span
          key={step.num}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.22 }}
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${X[i]}%` }}
        >
          <span className="block h-4 w-px bg-foreground/25" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/40" />
        </motion.span>
      ))}

      {/* Movement labels — the methodology in three movements */}
      {t.movements.map((m, i) => (
        <motion.span
          key={m}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.9 + i * 0.35, ease: EASE }}
          style={{ left: `${MOVES[i]}%` }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2.5 font-mono text-[8px] uppercase tracking-[0.26em] text-muted-foreground/70"
        >
          {m}
        </motion.span>
      ))}

      {/* SALIDA — the payoff */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 1.9, ease: EASE }}
        className="absolute bottom-[52%] right-0 w-[12%] text-right"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          {t.outputLabel}
        </p>
        <p className="mt-1.5 font-heading text-base font-bold leading-snug tracking-[-0.01em] text-foreground">
          {t.outputName}
        </p>
        <p className="mt-2.5 text-[10px] leading-relaxed text-muted-foreground/90">
          {t.outputLine}
        </p>
        <div className="mt-3 flex items-center justify-end gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(49,87,246,0.55)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/80">
            {t.status}
          </span>
        </div>
        <p className="mt-1.5 font-mono text-[9px] text-muted-foreground/70">{t.ops}</p>
      </motion.div>
    </div>
  );
}