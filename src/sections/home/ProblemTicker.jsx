import { STRINGS } from "@/i18n";

/**
 * Marquee of the problems clients arrive with.
 * Content is duplicated for the seamless loop; clones are aria-hidden.
 */
export default function ProblemTicker({ lang = "es" }) {
  const quotes = STRINGS[lang].heard.slice(0, 6);
  const row = [...quotes, ...quotes];
  return (
    <section
      aria-label="Problems we solve"
      className="overflow-hidden border-y border-[#E0E0DE] py-5"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((q, i) => (
          <span
            key={i}
            aria-hidden={i >= quotes.length}
            className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.15em] text-[#848482]"
          >
            {q}
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#E63946]" />
          </span>
        ))}
      </div>
    </section>
  );
}