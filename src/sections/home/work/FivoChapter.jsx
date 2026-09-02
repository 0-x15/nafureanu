import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import FivoCheckout from "@/components/mockups/FivoCheckout";
import { STRINGS, langPath } from "@/i18n";
import { ProjectTag, ProofRow, CapLine, TechLine, Takeaway } from "./chapterBits";
import SettlementScene from "./SettlementScene";
import FivoIntegration from "./FivoIntegration";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Chapter 02 — Fivo. "Complexity in motion, simplicity at the surface."
 * A light fintech canvas: one continuous horizontal system —
 * integration fragment → checkout → settlement — connected by a
 * single cobalt light path, with the proof figures distributed as
 * typographic anchors around the system. The client sees a simple
 * payment experience; the layers behind show the engineering.
 */
export default function FivoChapter({ lang = "es" }) {
  const s = STRINGS[lang].workSection.fivo;
  const to = langPath(lang, "/work/fivo");

  return (
    <section
      aria-label={s.name}
      className="relative overflow-hidden bg-[#F2F5FA] text-foreground"
    >
      {/* light architectural atmosphere — cobalt bloom, cyan reflection, glass planes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <span className="absolute left-[22%] top-[4%] h-[72%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.09),transparent)]" />
        <span className="absolute bottom-[0%] right-[2%] h-[44%] w-[46%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.07),transparent)]" />
        {/* glass plane 1 — broad, upper right, catching light */}
        <div className="absolute right-[-7%] top-[8%] h-[30vh] w-[52vw] -rotate-2 rounded-[36px] border border-white/70 bg-white/40 shadow-[0_70px_130px_-70px_rgba(43,89,255,0.35)] backdrop-blur-[28px]" />
        {/* glass plane 2 — lower left, faint cobalt within the material */}
        <div className="absolute bottom-[4%] left-[-9%] h-[34vh] w-[48vw] rotate-2 rounded-[42px] border border-white/60 bg-[linear-gradient(130deg,rgba(255,255,255,0.45),rgba(43,89,255,0.06),rgba(255,255,255,0.12))] backdrop-blur-[32px]" />
        {/* glass plane 3 — narrow diagonal catcher of light */}
        <div className="absolute left-[36%] top-[48%] h-[12vh] w-[46vw] -rotate-6 rounded-full border border-white/50 bg-white/25 backdrop-blur-[18px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-24 pt-16 md:px-10 md:pb-28 md:pt-24">
        {/* identity — small and elegant, top left */}
        <Reveal variant="left">
          <ProjectTag index={s.index} name={s.name} role={s.role} />
        </Reveal>

        {/* headline — the upper part of the chapter */}
        <Reveal className="mt-10 md:mt-14">
          <h3 className="font-heading text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-foreground md:text-6xl">
            {s.headlineA}
            <br />
            {s.headlineB}
          </h3>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {s.copy}
          </p>
        </Reveal>

        {/* THE SYSTEM — integration → payment → settlement, one composition */}
        <div className="relative mt-20 md:mt-28">
          {/* the light path — one cobalt flow moving toward settlement */}
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, delay: 0.9, ease: EASE }}
            className="absolute left-0 right-0 top-1/2 z-0 hidden h-[2px] origin-left bg-gradient-to-r from-transparent via-[#2B59FF]/45 to-transparent blur-[0.4px] md:block"
          />

          {/* proof anchor on the flow — cross-chain settlement time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 2.1, ease: EASE }}
            className="absolute left-[60%] top-1/2 z-20 hidden -translate-y-1/2 lg:block"
          >
            <div className="rounded-md border border-white/80 bg-white/70 px-3.5 py-2 text-left shadow-[0_18px_36px_-22px_rgba(43,89,255,0.45)] backdrop-blur-md">
              <p className="font-heading text-sm font-bold text-foreground">{"<2 min"}</p>
              <p className="text-[10px] text-muted-foreground">{s.proof[2].label}</p>
            </div>
          </motion.div>

          {/* three layers, one continuous system */}
          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center md:gap-8 lg:gap-10">
            {/* entry — one integration */}
            <div className="flex flex-col md:col-span-4 lg:col-span-3">
              <FivoIntegration lang={lang} />
            </div>

            {/* product — the clean user-facing surface */}
            <div className="flex justify-center md:col-span-4 lg:col-span-5">
              <div className="relative">
                {/* glass plane beneath the product */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-[112%] w-[116%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/70 bg-white/45 shadow-[0_80px_130px_-70px_rgba(43,89,255,0.4)] backdrop-blur-xl"
                />
                {/* faint cobalt reflection beneath */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-9 left-1/2 h-20 w-[82%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.16),transparent)] blur-md"
                />
                {/* floating detail — the stablecoins proof */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
                  className="absolute -top-9 right-1 z-20 hidden md:block"
                >
                  <div className="rounded-md border border-white/80 bg-white/70 px-3.5 py-2 text-left shadow-[0_18px_36px_-22px_rgba(43,89,255,0.45)] backdrop-blur-md">
                    <p className="font-heading text-sm font-bold text-foreground">
                      {s.proof[1].value}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{s.proof[1].label}</p>
                  </div>
                </motion.div>
                {/* the checkout — settles into place */}
                <motion.div
                  initial={{ opacity: 0, y: 44, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: 0.25, ease: EASE }}
                  style={{ transformPerspective: 1200 }}
                  className="relative z-10"
                >
                  <FivoCheckout lang={lang} bare />
                </motion.div>
              </div>
            </div>

            {/* result — settlement resolving quietly */}
            <div className="flex flex-col items-center md:col-span-4 md:items-end">
              <SettlementScene lang={lang} />
              {/* proof anchor near settlement — nine networks */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 2.6, ease: EASE }}
                className="mt-5 hidden text-right md:block"
              >
                <p className="font-heading text-4xl font-bold tracking-[-0.03em] text-foreground">
                  {s.proof[0].value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.proof[0].label}</p>
              </motion.div>
            </div>
          </div>

          {/* mobile — the proof as one quiet row under the system */}
          <div className="mt-12 md:hidden">
            <ProofRow items={s.proof} />
          </div>
        </div>

        {/* capabilities — a restrained technical rail */}
        <Reveal className="mt-16 border-t border-[#DCE0E8] pt-6 md:mt-24">
          <CapLine items={s.caps} />
        </Reveal>

        {/* conclusion — the commercial takeaway over quiet technology */}
        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-[1.5fr_1fr] md:items-end">
          <Reveal>
            <Takeaway kicker={s.showsKicker} text={s.shows} to={to} cta={s.cta} />
          </Reveal>
          <Reveal className="md:text-right" delay={0.06}>
            <TechLine>{s.tech}</TechLine>
            <p className="mt-2 font-mono text-[10.5px] tracking-wide text-muted-foreground/60">
              {s.security}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}