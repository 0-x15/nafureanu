import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { langPath } from "@/i18n";

/**
 * The supporting facts of a capability: when it's needed, what can
 * be built, small technology evidence and the contextual CTA.
 */
export default function CapabilityFacts({ cap, lang, labels }) {
  return (
    <div className="mt-8 border-t border-border pt-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
        {labels.when}
      </p>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
        {cap.when}
      </p>

      <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
        {labels.build}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {cap.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-black/[0.07] bg-white/60 px-3 py-1 text-[11px] text-foreground/70"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="mt-5 font-mono text-[10px] tracking-[0.08em] text-muted-foreground/60">
        {cap.evidence}
      </p>
      <Link
        to={langPath(lang, "/services")}
        className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent"
      >
        {cap.cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}