import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SophIADashboard from "@/components/mockups/SophIADashboard";
import FivoCheckout from "@/components/mockups/FivoCheckout";
import AutomationCard from "@/components/mockups/AutomationCard";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

/** Small web / digital-product browser surface — abstract, language-neutral. */
function WebSurface({ className = "" }) {
  return (
    <div
      className={cn(
        "w-52 rounded-xl border border-[#E5E1D6] bg-white p-4 text-left shadow-[0_20px_40px_-16px_rgba(12,18,32,0.25)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#EFEBE0] pb-2.5">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#E3DFD2]" />
          <span className="h-2 w-2 rounded-full bg-[#E3DFD2]" />
        </div>
        <span className="rounded bg-[#F9F7F2] px-2 py-0.5 text-[9px] text-[#9A94A6]">
          producto digital · web
        </span>
      </div>
      <div className="mt-3 space-y-2">
        <span className="block h-2.5 w-3/4 rounded-full bg-[#171C29]/85" />
        <span className="block h-2 w-1/2 rounded-full bg-[#D9D5C8]" />
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-[#EFEBE0] bg-[#FCFBF8] p-2.5">
        <span className="block h-6 w-16 rounded-md bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]" />
        <span className="block h-5 w-10 rounded-[5px] bg-[#3157F6]" />
      </div>
    </div>
  );
}

/**
 * /work hero visual — real software surfaces in the grammar of the
 * homepage hero: one dominant business/CRM interface, a Fivo payment
 * fragment overlapping its lower edge, a small web-product browser
 * surface and an automation micro-layer behind. Same perspective,
 * shadows, restrained entrance and scroll parallax as home.
 */
export default function WorkHeroVisual({ lang = "es" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ySide = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <div ref={ref} className="relative">
      {/* automation micro-layer — behind, upper left */}
      <motion.div
        style={{ y: ySide }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className="absolute -top-6 left-0 z-0 hidden lg:block"
      >
        <AutomationCard lang={lang} className="-rotate-2" />
      </motion.div>

      {/* dominant surface — custom business / CRM software */}
      <motion.div
        style={{ y: yMain }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className="relative z-10"
      >
        <SophIADashboard
          lang={lang}
          bare
          className="hidden [transform:perspective(1600px)_rotateY(-8deg)] sm:block"
        />
        <SophIADashboard lang={lang} bare className="sm:hidden" />
      </motion.div>

      {/* secondary surface — Fivo payment fragment, partial overlap */}
      <motion.div
        style={{ y: ySide }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        className="absolute -bottom-14 -left-2 z-20 hidden md:block lg:-left-10"
      >
        <FivoCheckout lang={lang} bare className="w-56 -rotate-3" />
      </motion.div>

      {/* secondary surface — web / digital product fragment */}
      <motion.div
        style={{ y: ySide }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
        className="absolute -top-8 right-0 z-0 hidden lg:block"
      >
        <WebSurface className="rotate-2" />
      </motion.div>
    </div>
  );
}