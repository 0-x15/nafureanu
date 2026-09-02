import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STRINGS } from "@/i18n";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

/** Nine settlement networks, resolving into place. */
const DOTS = [
  "bg-[#2B59FF]",
  "bg-[#2B59FF]/80",
  "bg-[#2B59FF]/65",
  "bg-[#2B59FF]/55",
  "bg-[#2B59FF]/45",
  "bg-[#2B59FF]/38",
  "bg-[#2B59FF]/32",
  "bg-[#2B59FF]/26",
  "bg-[#2B59FF]/20",
];

/**
 * The middle layer of the Fivo scene: the payment journey settling
 * behind the clean checkout — verification, cross-chain settlement,
 * completion across nine networks. Plays once on viewport entry.
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
    <div className="w-52 rounded-xl border border-white/15 bg-[#101A30]/90 p-4 text-left shadow-[0_24px_48px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md">
      <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
        {t.title}
      </p>
      <div className="mt-3 space-y-2.5">
        <motion.p
          {...step(0.3)}
          className="flex items-center gap-2 text-[11px] text-white/70"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2B59FF]" />
          {t.verifying}
        </motion.p>
        <motion.p
          {...step(1.1)}
          className="flex items-center gap-2 text-[11px] text-white/70"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2B59FF]/60" />
          {t.settling}
        </motion.p>
        <motion.p
          {...step(1.9)}
          className="flex items-center gap-2 text-[11px] font-medium text-white"
        >
          <span
            aria-hidden="true"
            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2B59FF]"
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
            {...step(1.2 + i * 0.09)}
            aria-hidden="true"
            className={cn("h-2 w-2 rounded-full", dot)}
          />
        ))}
      </div>
      <motion.p {...step(2.1)} className="mt-2 text-[9px] text-white/35">
        {t.networks}
      </motion.p>
    </div>
  );
}