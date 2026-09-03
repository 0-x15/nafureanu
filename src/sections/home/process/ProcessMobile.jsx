import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

const FRAG = [
  "rotate-[-2.5deg]",
  "rotate-[1.5deg]",
  "rotate-[-1deg]",
  "rotate-[2deg]",
  "rotate-[-2deg]",
  "rotate-[1deg]",
];

/**
 * The vertical transformation for small screens: the real process on
 * top, one continuous rail with the six stations, and the system in
 * production resolving at the end.
 */
export default function ProcessMobile({ t, steps }) {
  return (
    <div className="mt-12 lg:hidden">
      {/* ENTRADA */}
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          {t.inputLabel}
        </p>
        <p className="mt-1.5 font-heading text-base font-bold tracking-[-0.01em] text-foreground">
          {t.inputName}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
          {t.inputFragments.map((f, i) => (
            <span key={f} className={cn("text-[10px] text-muted-foreground/80", FRAG[i])}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* The rail — one continuous vertical line */}
      <div className="relative mt-8 border-l border-foreground/15 pl-7">
        {steps.map((step, i) => (
          <div key={step.num}>
            {i % 2 === 0 && (
              <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.26em] text-muted-foreground/60">
                {t.movements[i / 2]}
              </p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="relative pb-8"
            >
              <span className="absolute -left-[28px] top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground/40" />
              <p className="font-mono text-[10px] text-accent">{step.num}</p>
              <h3 className="mt-1 font-heading text-lg font-bold tracking-[-0.01em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* SALIDA */}
      <div className="border-t border-foreground/15 pt-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          {t.outputLabel}
        </p>
        <p className="mt-1.5 font-heading text-base font-bold tracking-[-0.01em] text-foreground">
          {t.outputName}
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.outputLine}</p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(49,87,246,0.55)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/80">
            {t.status}
          </span>
        </div>
        <p className="mt-1.5 font-mono text-[9px] text-muted-foreground/70">{t.ops}</p>
      </div>
    </div>
  );
}