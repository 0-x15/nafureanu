import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SurfacePlane from "./SurfacePlane";

const EASE = [0.22, 1, 0.36, 1];

/* Which system layers each principle lives in */
const ANCHORS = [
  [0, 1, 2], // Primero el proceso → Proceso · Datos · Lógica
  [2, 3, 4], // Automatización por defecto → Lógica · Integraciones · Automatización
  [5], // Sistemas que duran → Operación
];

function LayerRow({ layer, i, lit, deep }) {
  return (
    <div
      style={{ marginLeft: deep ? `${i * 4.5}%` : `${i * 2.5}%` }}
      className={cn(
        "flex h-[56px] items-center justify-between gap-4 border px-5 transition-colors duration-500",
        lit ? "border-foreground/25 bg-[#EBF0FC]" : "border-foreground/10 bg-[#F4F6F9]"
      )}
    >
      <span className="flex items-center gap-3">
        <span className={cn("h-px w-3 transition-colors duration-500", lit ? "bg-accent" : "bg-accent/40")} />
        <span
          className={cn(
            "font-mono text-[9px] uppercase tracking-[0.22em] transition-colors duration-500",
            lit ? "text-accent" : "text-foreground/60"
          )}
        >
          {layer.name}
        </span>
      </span>
      <span className="text-right text-[10px] leading-snug text-muted-foreground/85">{layer.note}</span>
    </div>
  );
}

/**
 * The layered "surface vs system" composition: a quiet interface plane
 * in front, the six system layers receding behind it in depth.
 */
export default function SystemLayers({ t, active }) {
  const isLit = (i) => active !== null && ANCHORS[active]?.includes(i);

  return (
    <div>
      {/* Desktop — one depth composition */}
      <div className="relative hidden h-[540px] lg:block">
        {/* the system behind the surface */}
        <div className="absolute inset-y-4 left-[17%] right-0 z-0 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            {t.systemLabel}
          </motion.p>
          <div className="flex flex-col gap-3">
            {t.systemLayers.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: 44 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.55 + i * 0.14, ease: EASE }}
              >
                <LayerRow layer={layer} i={i} lit={isLit(i)} deep />
              </motion.div>
            ))}
          </div>
        </div>

        {/* the surface — the smallest part of the work */}
        <div className="absolute left-0 top-1/2 z-10 w-[26%] -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <SurfacePlane t={t} />
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              {t.surfaceLabel}
            </p>
            <p className="font-heading text-sm font-bold tracking-[-0.01em] text-foreground">
              {t.surfaceName}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile — the same narrative, vertical */}
      <div className="lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SurfacePlane t={t} />
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            {t.surfaceLabel}
          </p>
          <p className="font-heading text-sm font-bold tracking-[-0.01em] text-foreground">
            {t.surfaceName}
          </p>
        </motion.div>
        <div aria-hidden="true" className="mx-auto mt-8 h-10 w-px bg-foreground/15" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-5 mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          {t.systemLabel}
        </motion.p>
        <div className="flex flex-col gap-3">
          {t.systemLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: EASE }}
            >
              <LayerRow layer={layer} i={i} lit={isLit(i)} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}