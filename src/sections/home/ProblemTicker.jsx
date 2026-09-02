const QUOTES = [
  "“We spend hours doing this manually.”",
  "“Our CRM doesn't do what we need.”",
  "“Our systems don't communicate.”",
  "“We need software specifically for our process.”",
  "“We want to introduce AI into our company.”",
  "“We have repetitive administrative work.”",
];

/**
 * Marquee of the problems clients arrive with.
 * Content is duplicated for the seamless loop; clones are aria-hidden.
 */
export default function ProblemTicker() {
  const row = [...QUOTES, ...QUOTES];
  return (
    <section
      aria-label="Problems we solve"
      className="overflow-hidden border-y border-[#E0E0DE] py-5"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((q, i) => (
          <span
            key={i}
            aria-hidden={i >= QUOTES.length}
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