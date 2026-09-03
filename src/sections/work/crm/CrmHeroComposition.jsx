import CrmOpsMockup from "@/components/work/crm/CrmOpsMockup";
import CrmMatchingFragment from "@/components/work/crm/CrmMatchingFragment";
import CrmCommsFragment from "@/components/work/crm/CrmCommsFragment";

/**
 * The CRM hero visual — ONE art-directed composition, not a stack of
 * loose images: the dominant operational CRM surface on a shared
 * rotated backdrop plane, with two supporting product fragments
 * docked with alignment logic — communication feeds in from the
 * top-left (behind), matching results emerge at the bottom-right
 * (in front). Same rotation axis, one shadow system, one group.
 */
export default function CrmHeroComposition({ lang }) {
  return (
    <div className="relative">
      {/* Unifying backdrop plane — the composition's shared ground */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-[4%] -top-[5%] -bottom-[7%] rotate-[1.2deg] rounded-[18px] border border-white/80 bg-[linear-gradient(165deg,rgba(255,255,255,0.9),rgba(232,238,250,0.55))] shadow-[0_40px_90px_-40px_rgba(12,18,32,0.28)]"
      />

      {/* Communication surface — feeds in from the top-left, behind the main surface */}
      <div className="absolute -top-14 left-[5%] z-0 hidden lg:block">
        <CrmCommsFragment lang={lang} className="rotate-[1.5deg]" />
      </div>

      {/* Main operational surface */}
      <div className="relative z-10">
        <CrmOpsMockup lang={lang} />
      </div>

      {/* Matching surface — results out at the bottom-right, in front */}
      <div className="absolute -bottom-11 right-[5%] z-20 hidden lg:block">
        <CrmMatchingFragment lang={lang} className="rotate-[1.5deg]" />
      </div>
    </div>
  );
}