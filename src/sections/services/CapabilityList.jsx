import { CAPABILITIES } from "@/data/capabilities";
import Reveal from "@/components/Reveal";

export default function CapabilityList({ lang = "es" }) {
  return (
    <section className="px-5 md:px-10" aria-label="Capabilities">
      {CAPABILITIES.map((cap, i) => {
        const c = cap.copy[lang];
        return (
          <Reveal
            key={cap.id}
            variant={i % 2 === 0 ? "up" : "left"}
            className="grid gap-6 border-t border-[#1E2530] py-14 md:grid-cols-12 md:py-20"
          >
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">
                <span className="text-[#3D7BFF]">{cap.num}</span> / 07
              </p>
            </div>
            <div id={cap.id} className="md:col-span-9 md:scroll-mt-32">
              <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] text-[#F0EFEA] md:text-5xl">
                {c.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[#A6AEBD]">
                {c.detail}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {cap.tech.map((t) => (
                  <li
                    key={t}
                    className="border border-[#2A3550] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A93A6]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
      <div className="border-t border-[#1E2530]" />
    </section>
  );
}