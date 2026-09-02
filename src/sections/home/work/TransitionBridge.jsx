import { motion } from "framer-motion";

/**
 * The bridge between chapters: the warm operational light cools into
 * the pale fintech canvas while a single cobalt filament carries
 * operations into payments. No explanatory text — the gradient says it.
 */
export default function TransitionBridge() {
  return (
    <div aria-hidden="true" className="relative h-[20vh] overflow-hidden md:h-[24vh]">
      {/* warm stone → pale cool blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3F0E8] via-[#F0F2F7] to-[#F2F5FA]" />
      {/* soft cobalt diffusion */}
      <span className="absolute left-1/2 top-1/2 h-[26vh] w-[52vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.10),transparent)]" />
      {/* a single glass ribbon carrying across the transition */}
      <motion.span
        initial={{ opacity: 0, scaleX: 0.2, rotate: -4 }}
        whileInView={{ opacity: 1, scaleX: 1, rotate: -4 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[10%] right-[10%] top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-[#2B59FF]/60 to-transparent blur-[0.5px]"
      />
    </div>
  );
}