import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const LABEL = { es: "Una integración", en: "One integration" };

/**
 * The entry layer of the Fivo system: one small, quiet integration
 * fragment in translucent glass. Evidence of "one integration" —
 * never a code editor.
 */
export default function FivoIntegration({ lang = "es" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="w-full max-w-[300px]"
    >
      <div className="rounded-lg border border-white/75 bg-white/55 p-4 shadow-[0_26px_52px_-30px_rgba(49,87,246,0.35)] backdrop-blur-xl">
        <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#8A8FA0]">
          {LABEL[lang]}
        </p>
        <pre className="mt-2.5 whitespace-pre-wrap font-mono text-[10px] leading-[1.8] text-[#3A4356]">
          <code>
            <span className="text-[#A7AEBF]">{"<script async"}</span>
            {" src="}
            <span className="text-[#3157F6]/90">"checkout.fivo.finance"</span>
            <span className="text-[#A7AEBF]">{" />"}</span>
            {"\n"}
            <span className="text-[#A7AEBF]">{"<fivo-button"}</span>
            {"\n  merchant-id="}
            <span className="text-[#3157F6]/90">"fivo_live_•••"</span>
            {"\n  amount="}
            <span className="text-[#3157F6]/90">"29.99"</span>
            {"\n  currency="}
            <span className="text-[#3157F6]/90">"USDC"</span>
            {"\n"}
            <span className="text-[#A7AEBF]">{"/>"}</span>
          </code>
        </pre>
      </div>
      {/* thin glass strip — the material continuing toward the flow */}
      <span
        aria-hidden="true"
        className="mt-4 block h-[3px] w-[72%] rounded-full bg-[linear-gradient(to_right,rgba(49,87,246,0.35),transparent)]"
      />
    </motion.div>
  );
}