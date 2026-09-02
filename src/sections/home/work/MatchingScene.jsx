import { motion } from "framer-motion";
import { STRINGS } from "@/i18n";

const EASE = [0.22, 1, 0.36, 1];

/**
 * The system reacting, floating over the SophIA product: a client
 * request appears, the matching engine runs, results land, and the
 * AI assistant answers. Plays once on viewport entry — not a demo.
 */
export default function MatchingScene({ lang = "es" }) {
  const t = STRINGS[lang].workSection.sophia.scene;
  const step = (delay) => ({
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, delay, ease: EASE },
  });

  return (
    <div className="rotate-1 rounded-xl border border-[#E5E1D6] bg-white/95 p-3.5 text-left shadow-[0_24px_48px_-18px_rgba(12,18,32,0.35)] backdrop-blur-sm">
      <motion.p
        {...step(0)}
        className="flex items-center gap-2 text-[10px] font-medium text-[#9A94A6]"
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
        {t.title}
      </motion.p>
      <motion.p
        {...step(0.35)}
        className="mt-2.5 rounded-lg rounded-tl-sm bg-[#F4F2EB] px-3 py-2 text-[11px] leading-snug text-[#4A5164]"
      >
        {t.request}
      </motion.p>
      <motion.div {...step(1)} className="mt-2 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-[#EDF2FF] px-2.5 py-1 text-[10px] font-medium text-[#2B59FF]">
          {t.matching}
        </span>
        <span className="rounded-full bg-[#171C29] px-2.5 py-1 text-[10px] font-medium text-white">
          {t.found}
        </span>
      </motion.div>
      <motion.p
        {...step(1.8)}
        className="mt-2 rounded-lg rounded-tl-sm bg-[#2B59FF] px-3 py-2 text-[11px] leading-snug text-white"
      >
        {t.answer}
      </motion.p>
    </div>
  );
}