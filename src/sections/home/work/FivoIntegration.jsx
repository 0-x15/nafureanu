import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const LABEL = { es: "Una integración", en: "One integration" };

/**
 * The one-integration proof: a small, quiet script-tag fragment showing
 * how little it takes to put Fivo behind a product. Deliberately tiny —
 * evidence, not a code editor.
 */
export default function FivoIntegration({ lang = "es" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="w-full max-w-[330px] rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.55)] backdrop-blur-md"
    >
      <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/35">
        {LABEL[lang]}
      </p>
      <pre className="mt-2.5 whitespace-pre-wrap font-mono text-[10px] leading-[1.8] text-white/55">
        <code>
          <span className="text-white/30">{"<script async"}</span>
          {" src="}
          <span className="text-[#8FB8FF]">"checkout.fivo.finance"</span>
          <span className="text-white/30">{" />"}</span>
          {"\n"}
          <span className="text-white/30">{"<fivo-button"}</span>
          {"\n  merchant-id="}
          <span className="text-[#8FB8FF]">"fivo_live_•••"</span>
          {"\n  amount="}
          <span className="text-[#8FB8FF]">"29.99"</span>
          {"\n  currency="}
          <span className="text-[#8FB8FF]">"USDC"</span>
          {"\n"}
          <span className="text-white/30">{"/>"}</span>
        </code>
      </pre>
    </motion.div>
  );
}