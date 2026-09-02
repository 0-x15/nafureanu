import { motion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A small glass-morphism fragment — an art-directed supporting
 * detail. Fades in around its state, drifts with parallax depth.
 */
function Fragment({ t, progress, depth = 1, className, children }) {
  const opacity = useTransform(t, [-0.7, -0.28, 0.28, 0.7], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 1], [`${2 * depth}vh`, `${-2 * depth}vh`]);
  return (
    <motion.div
      style={{ opacity, y }}
      className={cn("pointer-events-none absolute z-10", className)}
    >
      <div className="rounded-lg border border-white/70 bg-white/55 px-3 py-2.5 shadow-[0_20px_45px_-20px_rgba(12,18,32,0.28),0_2px_6px_-2px_rgba(12,18,32,0.06)] backdrop-blur-md">
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

/* 01 — Nafureanu: shipped work */
function ProjectFragments({ t, progress }) {
  return (
    <>
      <Fragment t={t} progress={progress} depth={0.6} className="left-[7%] top-[46%] -rotate-2">
        <div className="flex gap-1.5">
          {["API", "Web", "ERP"].map((tag, i) => (
            <span
              key={tag}
              className={cn(
                "whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em]",
                i === 0
                  ? "border-accent/30 text-accent"
                  : "border-black/[0.08] text-foreground/50"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </Fragment>
      <Fragment t={t} progress={progress} depth={1.4} className="right-[12%] top-[23%] rotate-3">
        <div className="flex h-12 items-end gap-1">
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

/* 02 — SophIA: property rows and a match indicator */
function PropertyFragments({ t, progress }) {
  return (
    <>
      <Fragment t={t} progress={progress} depth={1.2} className="left-[8%] top-[50%] -rotate-3">
        <div className="space-y-1.5">
          {[
            ["P-4821", "€1.250K"],
            ["P-1094", "€890K"],
            ["P-7650", "€2.400K"],
          ].map(([code, price], i) => (
            <div key={code} className="flex items-center gap-2.5 whitespace-nowrap">
              <Dot accent={i === 1} />
              <span className="font-mono text-[9px] text-foreground/70">{code}</span>
              <span className="font-mono text-[9px] text-muted-foreground">{price}</span>
            </div>
          ))}
        </div>
      </Fragment>
      <Fragment t={t} progress={progress} depth={0.7} className="right-[8%] top-[26%] rotate-2">
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

/* 03 — Odoo Engineering: modular tiles and a code accent */
function ModuleFragments({ t, progress }) {
  return (
    <>
      <Fragment t={t} progress={progress} depth={0.9} className="left-[7%] top-[48%] -rotate-2">
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
      <Fragment t={t} progress={progress} depth={1.5} className="right-[11%] top-[24%] rotate-3">
        <span className="whitespace-nowrap rounded-md bg-accent px-2 py-1 font-mono text-[9px] text-white">
          custom.py
        </span>
      </Fragment>
    </>
  );
}

/* 04 — Fivo: settlement chips and status */
function PaymentFragments({ t, progress }) {
  return (
    <>
      <Fragment t={t} progress={progress} depth={0.8} className="left-[9%] top-[46%] -rotate-2">
        <div className="flex gap-1.5">
          {["USDC", "EURC"].map((a) => (
            <span
              key={a}
              className="whitespace-nowrap rounded-full border border-black/[0.08] px-2.5 py-0.5 font-mono text-[9px] text-foreground/70"
            >
              {a}
            </span>
          ))}
        </div>
      </Fragment>
      <Fragment t={t} progress={progress} depth={1.3} className="right-[9%] top-[28%] rotate-2">
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