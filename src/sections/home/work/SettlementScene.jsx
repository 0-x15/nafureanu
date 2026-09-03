import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STRINGS } from "@/i18n";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

/** Nine settlement networks, resolving into place. */
const DOTS = [
  "bg-[#3157F6]",
  "bg-[#3157F6]/80",
  "bg-[#3157F6]/65",
  "bg-[#3157F6]/55",
  "bg-[#3157F6]/45",
  "bg-[#3157F6]/38",
  "bg-[#3157F6]/32",
  "bg-[#3157F6]/26",
  "bg-[#3157F6]/20",
];

/**
 * The result layer of the Fivo system: the payment journey —
 * confirmation, on-chain verification, cross-chain settlement,
 * completion across nine networks — plays once, quietly, in
 * translucent light material with a refracting cobalt edge.
 */
export default function SettlementScene({ lang = "es" }) {
  const t = STRINGS[lang].workSection.fivo.scene;
  const step = (delay) => ({
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, delay, ease: EASE },
  });

  return (
    <div className="relative w-52 rounded-lg border border-white/75 bg-white/60 p-4 text-left shadow-[0_32px_64px_-34px_rgba(49,87,246,0.4)] backdrop-blur-xl">
      {/* light-refraction edge */}
      <span
        aria-hidden="true"
        className="absolute inset-y-3 right-0 w-px bg-[linear-gradient(to_bottom,transparent,rgba(49,87,246,0.45),transparent)]"
      />
      <p className="text-[10px] font-medium uppercase tracking-wider text-[#8A8FA0]">
        {t.title}
      </p>
      <div className="mt-3 space-y-2.5">
        <motion.p
          {...step(0.6)}
          className="flex items-center gap-2 text-[11px] text-[#3A4356]"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#3157F6]/80" />
          {t.confirmed}
        </motion.p>
        <motion.p
          {...step(1.2)}
          className="flex items-center gap-2 text-[11px] text-[#3A4356]"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#3157F6]/60" />
          {t.verifying}
        </motion.p>
        <motion.p
          {...step(1.8)}
          className="flex items-center gap-2 text-[11px] text-[#3A4356]"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#3157F6]/45" />
          {t.settling}
        </motion.p>
        <motion.p
          {...step(2.5)}
          className="flex items-center gap-2 text-[11px] font-medium text-[#171C29]"
        >
          <span
            aria-hidden="true"
            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3157F6]"
          >
            <Check className="h-2.5 w-2.5 text-white" />
          </span>
          {t.done}
        </motion.p>
      </div>
      <div className="mt-4 flex gap-1">
        {DOTS.map((dot, i) => (
          <motion.span
            key={i}
            {...step(2.0 + i * 0.09)}
            aria-hidden="true"
            className={cn("h-2 w-2 rounded-full", dot)}
          />
        ))}
      </div>
      <motion.p {...step(2.8)} className="mt-2 text-[9px] text-[#8A8FA0]">
        {t.networks}
      </motion.p>
    </div>
  );
}