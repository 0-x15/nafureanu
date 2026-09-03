import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const CARDS = [
  {
    index: "01",
    name: { es: "CRM", en: "CRM" },
    line: { es: "Odoo · Automatización", en: "Odoo · Automation" },
    pos: "left-0 top-[76px] z-40",
    rotate: -1.5,
  },
  {
    index: "02",
    name: { es: "FIVO", en: "FIVO" },
    line: { es: "Pagos · Stablecoins", en: "Payments · Stablecoins" },
    pos: "left-[72px] top-[42px] z-30",
    rotate: 1,
    reflection: true,
  },
  {
    index: "03",
    name: { es: "GESTIÓN", en: "INTERNAL" },
    line: { es: "CRM · Automatización", en: "CRM · Automation" },
    pos: "left-[142px] top-[16px] z-20",
    rotate: -1,
  },
  {
    index: "04",
    name: { es: "WEB", en: "WEB" },
    line: { es: "Producto digital", en: "Digital product" },
    pos: "left-[215px] top-0 z-10",
    rotate: 1.5,
  },
];

/**
 * Hero motif for the project index — four simplified project cards
 * resting as a small overlapping deck. A visual index, not a
 * navigation menu: no links, no full descriptions, no metrics.
 * Cards settle into place once; reduced motion skips the entrance.
 */
export default function ProjectDeckIntro({ lang = "es" }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="mx-auto h-[224px] w-[280px] md:h-[320px] md:w-[400px]">
      <div className="h-[320px] w-[400px] origin-top-left scale-[0.7] md:scale-100">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.index}
            initial={
              reduced
                ? false
                : { opacity: 0, y: 30, rotate: c.rotate + 4 }
            }
            whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}
            className={`absolute flex h-[240px] w-[180px] flex-col rounded-xl border p-4 text-left shadow-[0_18px_40px_-20px_rgba(20,30,50,0.18)] ${c.pos} ${
              c.reflection
                ? "border-[#DCE3F4] bg-[linear-gradient(155deg,#FFFFFF_58%,#EDF2FE_100%)]"
                : "border-[#E3E6EE] bg-white/95"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-muted-foreground/70">
                {c.index}
              </span>
              <span className="h-1.5 w-1.5 rounded-[2px] bg-accent" />
            </div>
            <div className="mt-auto">
              <p className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground">
                {c.name[lang]}
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                {c.line[lang]}
              </p>
            </div>
            <span className="mt-4 block h-[2px] w-8 rounded-full bg-accent/45" />
            <span className="absolute bottom-0 left-0 h-4 w-4 rounded-bl-[12px] border-b-2 border-l-2 border-accent/35" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}