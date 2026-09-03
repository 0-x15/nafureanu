import CrmOpsMockup from "@/components/work/crm/CrmOpsMockup";
import CrmMatchingSurface from "@/components/work/crm/CrmMatchingSurface";
import CrmCommsFragment from "@/components/work/crm/CrmCommsFragment";
import CrmDocsFragment from "@/components/work/crm/CrmDocsFragment";

/**
 * The CRM hero visual — the same 4-surface system, redistributed
 * with deliberate disorder and breathing room across the whole
 * column, using the top and bottom space:
 *
 *   LARGE 1   operational CRM surface — center-right anchor
 *   LARGE 2   matching surface — noticeably offset to the lower-right
 *   SMALL 1   communication fragment — floating in the top area
 *   SMALL 2   documentation fragment — settled in the lower-left
 *
 * Light, intentional overlaps only; varied tilts on one restrained
 * axis family; soft shadows; no constant floating.
 */
export default function CrmHeroComposition({ lang }) {
  return (
    <div className="relative pt-10 pb-32 lg:pb-36">
      <div className="relative">
        {/* Shared backdrop plane — the group's common ground */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-[6%] -top-[10%] -bottom-[2%] rotate-[1.2deg] rounded-[20px] border border-white/80 bg-[linear-gradient(165deg,rgba(255,255,255,0.9),rgba(232,238,250,0.55))] shadow-[0_40px_90px_-40px_rgba(12,18,32,0.28)]"
        />

        {/* SMALL 1 — communication / follow-up, drifting in the top area */}
        <div className="absolute -top-20 -left-[7%] z-0 hidden lg:block">
          <CrmCommsFragment lang={lang} className="-rotate-[1.6deg]" />
        </div>

        {/* LARGE 1 — the main operational CRM surface, center-right */}
        <div className="relative z-10 ml-auto w-[97%]">
          <CrmOpsMockup lang={lang} />
        </div>

        {/* SMALL 2 — documentation / checklist, settled in the lower-left */}
        <div className="absolute -bottom-12 left-[0%] z-30 hidden lg:block">
          <CrmDocsFragment lang={lang} className="rotate-[1.8deg]" />
        </div>

        {/* LARGE 2 — the matching surface, noticeably offset to the lower-right */}
        <div className="absolute -bottom-28 -right-[4%] z-20 w-[58%] hidden lg:block">
          <CrmMatchingSurface lang={lang} className="-rotate-[1.2deg]" />
        </div>
      </div>
    </div>
  );
}