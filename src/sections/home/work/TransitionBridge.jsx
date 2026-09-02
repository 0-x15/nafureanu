import { motion } from "framer-motion";

/**
 * The bridge between chapters: the warm operational light darkens and a
 * single cobalt filament carries operations into infrastructure. No
 * explanatory text — the gradient says it.
 */
export default function TransitionBridge() {
  return (
    <div aria-hidden="true" className="relative h-[24vh] overflow-hidden bg-[#0B1220] md:h-[30vh]">
      {/* ivory → dusk → navy */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3F0E8] via-[#2E3036] to-[#0B1220]" />
      {/* a single cobalt filament carrying across the transition */}
      <motion.span
        initial={{ opacity: 0, scaleX: 0.2, rotate: -4 }}
        whileInView={{ opacity: 1, scaleX: 1, rotate: -4 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[10%] right-[10%] top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-[#2B59FF]/70 to-transparent blur-[0.5px]"
      />
      {/* the infrastructure glow waiting underneath */}
      <span className="absolute bottom-[16%] left-1/2 h-[28vh] w-[42vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.16),transparent)]" />
    </div>
  );
}