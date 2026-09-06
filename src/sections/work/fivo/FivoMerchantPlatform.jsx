import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Shot } from "./fivoBits";

/* Where the numbered capabilities live on the sanitized dashboard (as % of the image). */
const MARKERS = { 0: { x: 2.6, y: 18.3 }, 1: { x: 2.6, y: 24 }, 2: { x: 2.6, y: 35.6 }, 3: { x: 2.6, y: 29.8 }, 4: { x: 2.6, y: 54.1 }, 5: { x: 2.6, y: 48.3 } };

/**
 * Merchant platform — the real light-theme dashboard (kept close to
 * its native size) with the verified capabilities listed beside it.
 * Markers sit on the sidebar column of the screenshot, one per item;
 * nothing covers data.
 */
export default function FivoMerchantPlatform({ c }) {
  const m = c.merchant;
  return (
    <Chapter tone="blue" aria-labelledby="fivo-merchant">
      <ChapterHead kicker={m.kicker} title={m.title} intro={m.intro} />

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="scale" className="min-w-0 lg:col-span-7">
          <div className="relative">
            <Shot id="merchant-dashboard" alt={m.imageAlt} className="rounded-2xl" />
            {Object.entries(MARKERS).map(([i, pos]) => (
              <span
                key={i}
                aria-hidden="true"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent font-mono text-[9px] font-bold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_4px_10px_-2px_rgba(49,87,246,0.5)] md:flex"
              >
                {Number(i) + 1}
              </span>
            ))}
            <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-[#E1E5EF] bg-white/95 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/80 shadow-sm backdrop-blur">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />
              {m.live}
            </span>
          </div>
        </Reveal>
        <Reveal variant="left" delay={0.08} className="min-w-0 lg:col-span-5">
          <ol className="divide-y divide-[#DCE2EF] rounded-2xl border border-[#DCE2EF] bg-white">
            {m.callouts.map((co, i) => (
              <li key={co.title} className="flex gap-4 px-5 py-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[9px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{co.title}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[#5A6070]">{co.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Chapter>
  );
}
