import { useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, EASE, Note, Statement, Tag } from "./saasBits";

/**
 * Deciding what deserves to exist. The idea arrives as a wishlist of
 * sixteen features; one control finds the product inside it: four
 * features become the core journey, three become essential support,
 * the rest can wait. Chips keep their identity across the change.
 */
export default function ProductDefinition({ c }) {
  const d = c.definition;
  const [product, setProduct] = useState(false);
  const reduced = useReducedMotion();
  const later = d.wishlist.filter((w) => !d.journey.includes(w));
  const chip = (w, tone) => (
    <motion.li key={w} layout={!reduced} layoutId={reduced ? undefined : `chip-${w}`} transition={{ duration: 0.5, ease: EASE }} className={cn("rounded-[6px] border px-3 py-1.5 text-[13px] font-medium", tone === "journey" ? "border-accent bg-white text-foreground" : tone === "support" ? "border-accent/40 bg-[#EEF3FC] text-accent-deep" : tone === "later" ? "border-dashed border-foreground/25 bg-transparent text-muted-foreground" : "border-border bg-white text-foreground/85")}>{w}</motion.li>
  );
  return (
    <Act id="sp-definition" tone="white">
      <Reveal><Statement id="sp-definition-title" a={d.statement} /></Reveal>
      <Reveal delay={0.05}><p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{d.intro}</p></Reveal>
      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="left" className="lg:col-span-4">
          <Note>{d.ideaLabel}</Note>
          <p className="mt-3 rounded-[10px] border border-border bg-[#FAFBFD] p-5 font-heading text-lg font-medium leading-snug tracking-[-0.01em] text-foreground/85"><span aria-hidden="true" className="text-accent">“</span>{d.idea}<span aria-hidden="true" className="text-accent">”</span></p>
          <button type="button" aria-pressed={product} onClick={() => setProduct((v) => !v)} className={cn("mt-5 inline-flex items-center gap-2 rounded-[6px] border px-4 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", product ? "border-border bg-white text-foreground hover:border-foreground/40" : "border-accent bg-accent text-white hover:bg-accent-deep")}>{product ? d.reset : d.reduce}</button>
        </Reveal>
        <div className="lg:col-span-8">
          <LayoutGroup>
            {!product ? (
              <div>
                <Note>{d.wishlistLabel} · {d.wishlist.length}</Note>
                <ul className="mt-3 flex flex-wrap gap-2">{d.wishlist.map((w) => chip(w, "list"))}</ul>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-[10px] border border-accent bg-white p-4 md:p-5">
                  <Note tone="accent">{d.journeyLabel}</Note>
                  <ol className="mt-3 flex flex-wrap items-center gap-2">{d.journey.map((w, i) => <span key={w} className="flex items-center gap-2">{chip(w, "journey")}{i < d.journey.length - 1 && <span aria-hidden="true" className="h-px w-4 bg-accent" />}</span>)}</ol>
                  <Note className="mt-4">{d.supportsLabel}</Note>
                  <ul className="mt-2 flex flex-wrap gap-2">{d.supports.map((s) => <li key={s}><Tag tone="accent">{s}</Tag></li>)}</ul>
                </div>
                <div>
                  <Note>{d.laterLabel} · {later.length}</Note>
                  <ul className="mt-3 flex flex-wrap gap-2">{later.map((w) => chip(w, "later"))}</ul>
                </div>
              </div>
            )}
          </LayoutGroup>
        </div>
      </div>
      <Reveal delay={0.06} className="mt-16">
        <Note>{d.questionsLabel}</Note>
        <dl className="mt-4 grid gap-x-10 border-t border-border md:grid-cols-2">
          {d.questions.map((q, i) => <div key={q.q} className="grid grid-cols-[28px_1fr] gap-3 border-b border-border py-4"><dt className="font-mono text-[10px] tracking-[0.18em] text-accent pt-1">{String(i + 1).padStart(2, "0")}</dt><dd><span className="block font-heading text-[16px] font-semibold tracking-[-0.01em] text-foreground">{q.q}</span><span className="mt-1 block text-[14px] leading-snug text-muted-foreground">{q.a}</span></dd></div>)}
        </dl>
      </Reveal>
      <Reveal delay={0.08} className="mt-16">
        <Statement a={d.statementA} b={d.statementB} as="p" className="md:text-4xl lg:text-5xl" />
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{d.closing}</p>
      </Reveal>
    </Act>
  );
}
