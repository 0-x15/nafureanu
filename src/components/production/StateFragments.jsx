import { motion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A floating interface fragment — a small authored surface that
 * belongs to the composition, not a screenshot inside a card.
 * Fades in around its state and drifts with parallax depth.
 */
function Fragment({ t, progress, depth = 1, className, children }) {
  const opacity = useTransform(t, [-0.85, -0.3, 0.3, 0.85], [0, 1, 1, 0]);
  const x = useTransform(progress, [0, 1], [`${-5 * depth}vw`, `${5 * depth}vw`]);
  return (
    <motion.div
      style={{ opacity, x }}
      className={cn("pointer-events-none absolute z-10", className)}
    >
      <div className="rounded-xl border border-black/[0.06] bg-white/90 px-3.5 py-3 shadow-[0_24px_50px_-24px_rgba(12,18,32,0.35)]">
        {children}
      </div>
    </motion.div>
  );
}

const Dot = ({ accent }) => (
  <span
    aria-hidden="true"
    className={cn("h-1.5 w-1.5 rounded-full", accent ? "bg-accent" : "bg-black/15")}
  />
);

/* 01 — Nafureanu: delivered work fragments */
function ProjectFragments({ t, progress }) {
  return (
    <>
      <Fragment t={t} progress={progress} depth={0.6} className="left-[7%] top-[30%] -rotate-2">
        <div className="space-y-2">
          {["API", "Web", "ERP"].map((tag, i) => (
            <div key={tag} className="flex items-center gap-2.5 whitespace-nowrap">
              <Dot accent={i === 0} />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/70">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </Fragment>
      <Fragment t={t} progress={progress} depth={1.4} className="right-[13%] top-[24%] rotate-3">
        <div className="flex h-14 items-end gap-1.5">
          {[40, 65, 30, 85, 55, 95, 70].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={cn("w-1.5 rounded-sm", i === 5 ? "bg-accent" : "bg-foreground/10")}
            />
          ))}
        </div>
      </Fragment>
    </>
  );
}

/* 02 — SophIA: property rows and matching indicators */
function PropertyFragments({ t, progress }) {
  return (
    <>
      <Fragment t={t} progress={progress} depth={1.2} className="left-[9%] top-[27%] -rotate-3">
        <div className="space-y-2">
          {[
            ["P-4821", "€1.250K"],
            ["P-1094", "€890K"],
            ["P-7650", "€2.400K"],
          ].map(([code, price], i) => (
            <div key={code} className="flex items-center gap-3 whitespace-nowrap">
              <Dot accent={i === 1} />
              <span className="font-mono text-[9px] text-foreground/70">{code}</span>
              <span className="font-mono text-[9px] text-muted-foreground">{price}</span>
            </div>
          ))}
        </div>
      </Fragment>
      <Fragment t={t} progress={progress} depth={0.7} className="right-[9%] top-[58%] rotate-2">
        <span className="flex items-center gap-2 whitespace-nowrap">
          <Dot accent />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/70">
            Match 98%
          </span>
        </span>
      </Fragment>
    </>
  );
}

/* 03 — Odoo Engineering: modules as editorial abstraction */
function ModuleFragments({ t, progress }) {
  return (
    <>
      <Fragment t={t} progress={progress} depth={0.9} className="left-[8%] top-[52%] -rotate-2">
        <div className="grid grid-cols-3 gap-1.5">
          {["sale", "stock", "hr", "crm", "api", "portal"].map((m) => (
            <span
              key={m}
              className="whitespace-nowrap rounded-md border border-black/[0.06] px-2 py-1 font-mono text-[8px] text-foreground/60"
            >
              {m}
            </span>
          ))}
        </div>
      </Fragment>
      <Fragment t={t} progress={progress} depth={1.5} className="right-[12%] top-[28%] rotate-3">
        <span className="whitespace-nowrap rounded-md bg-accent px-2 py-1 font-mono text-[9px] text-white">
          custom.py
        </span>
      </Fragment>
    </>
  );
}

/* 04 — Fivo: settlement and payment infrastructure chips */
function PaymentFragments({ t, progress }) {
  return (
    <>
      <Fragment t={t} progress={progress} depth={0.8} className="left-[11%] top-[31%] -rotate-2">
        <div className="flex gap-1.5">
          {["USDC", "EURC"].map((a) => (
            <span
              key={a}
              className="whitespace-nowrap rounded-full border border-black/[0.06] px-2.5 py-1 font-mono text-[9px] text-foreground/70"
            >
              {a}
            </span>
          ))}
        </div>
      </Fragment>
      <Fragment t={t} progress={progress} depth={1.3} className="right-[10%] top-[57%] rotate-2">
        <span className="flex items-center gap-2 whitespace-nowrap">
          <Dot accent />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/70">
            Circle CCTP
          </span>
        </span>
      </Fragment>
    </>
  );
}

const FRAGMENTS = [ProjectFragments, PropertyFragments, ModuleFragments, PaymentFragments];

export default function StateFragments({ state, f, progress }) {
  const t = useTransform(f, (v) => v - state);
  const Comp = FRAGMENTS[state];
  return <Comp t={t} progress={progress} />;
}