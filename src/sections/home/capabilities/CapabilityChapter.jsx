import VISUALS from "./visuals";
import CapabilityFacts from "./CapabilityFacts";

/**
 * Mobile: each capability is a full-width chapter of a vertical
 * story — eyebrow, headline, copy, visual, when-needed, evidence
 * and CTA. Not an accordion.
 */
export default function CapabilityChapter({ cap, index, lang, labels }) {
  const Visual = VISUALS[index];
  return (
    <article>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        {String(index + 1).padStart(2, "0")} · {cap.name}
      </p>
      <h3 className="mt-3 font-heading text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
        {cap.headline}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {cap.copy}
      </p>
      <div aria-hidden="true" className="mt-6 h-[230px] w-full">
        <Visual />
      </div>
      <CapabilityFacts cap={cap} lang={lang} labels={labels} />
    </article>
  );
}