import { CAPABILITIES } from "@/data/capabilities";
import Reveal from "@/components/Reveal";

export default function CapabilityList() {
  return (
    <section className="px-5 md:px-10" aria-label="Capabilities">
      {CAPABILITIES.map((cap, i) => (
        <Reveal
          key={cap.id}
          className="grid gap-6 border-t border-[#E0E0DE] py-14 md:grid-cols-12 md:py-20"
        >
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#848482]">
              <span className="text-[#E63946]">{cap.num}</span> / 0{i + 1}
            </p>
          </div>
          <div id={cap.id} className="md:col-span-9 md:scroll-mt-32">
            <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] md:text-5xl">
              {cap.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[#5C5C58]">{cap.detail}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {cap.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-[#E0E0DE] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#848482]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
      <div className="border-t border-[#E0E0DE]" />
    </section>
  );
}