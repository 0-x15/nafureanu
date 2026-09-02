import { usePageMeta } from "@/lib/seo";
import CapabilityList from "@/sections/services/CapabilityList";
import HeardList from "@/sections/services/HeardList";
import ProcessStrip from "@/sections/services/ProcessStrip";
import CtaBand from "@/components/CtaBand";

export default function Services() {
  usePageMeta({
    title: "Capabilities — Nafureanu",
    description:
      "Custom software development, AI and intelligent automation, business process automation, Odoo engineering, web development, bots and integrations.",
    path: "/services",
  });

  return (
    <>
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          <span className="text-[#E63946]">02</span> — Capabilities
        </p>
        <h1 className="mt-8 font-heading text-6xl font-bold uppercase tracking-[-0.02em] md:text-8xl">
          What we build.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.7] text-[#5C5C58] md:text-lg">
          Six disciplines, one way of thinking: understand the business process first, then
          build the system that runs it — and keeps running it without a person pushing every
          step.
        </p>
      </header>
      <div className="mt-16 md:mt-24">
        <CapabilityList />
      </div>
      <HeardList />
      <ProcessStrip />
      <CtaBand
        kicker="05 — Initiation"
        title="Recognize your company in any of this?"
        note="Bring us the sentence that describes your bottleneck. We'll turn it into a system."
      />
    </>
  );
}