import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

/* Which system layers each principle lives in */
const ANCHORS = [
  [0, 1, 2], // Primero el proceso → Proceso · Datos · Lógica
  [2, 3, 4], // Automatización por defecto → Lógica · Integraciones · Automatización
  [5], // Sistemas que duran → Operación
];

function LayerCell({ layer, lit }) {
  return (
    <div
      className={cn(
        "border-t pt-4 transition-colors duration-500",
        lit ? "border-accent" : "border-foreground/15"
      )}
    >
      <p className="flex items-center gap-2.5">
        <span
          className={cn(
            "h-1 w-1 transition-colors duration-500",
            lit ? "bg-accent" : "bg-accent/40"
          )}
        />
        <span
          className={cn(
            "font-mono text-[9px] uppercase tracking-[0.22em] transition-colors duration-500",
            lit ? "text-accent" : "text-foreground/60"
          )}
        >
          {layer.name}
        </span>
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground/85">{layer.note}</p>
    </div>
  );
}

/**
 * "Lo que construimos" — the system architecture as a 3 × 2 matrix of
 * typographic cells bound by thin structural rules: one architecture,
 * not a card grid. On small screens the same cells flow vertically.
 */
export default function SystemLayers({ t, active }) {
  const isLit = (i) => active !== null && ANCHORS[active]?.includes(i);

  return (
    <div>
      {/* Desktop / large — architectural system field */}
      <div className="hidden lg:block">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          {t.systemLabel}
        </motion.p>
        <div className="mt-6 grid grid-cols-3 gap-x-10 gap-y-12">
          {t.systemLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.45 + i * 0.1, ease: EASE }}
            >
              <LayerCell layer={layer} lit={isLit(i)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile — the same layers, vertical */}
      <div className="lg:hidden">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          {t.systemLabel}
        </motion.p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {t.systemLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: EASE }}
            >
              <LayerCell layer={layer} lit={isLit(i)} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}