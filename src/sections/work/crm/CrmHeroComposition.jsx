import CrmOpsMockup from "@/components/work/crm/CrmOpsMockup";
import CrmMatchingSurface from "@/components/work/crm/CrmMatchingSurface";
import CrmCommsFragment from "@/components/work/crm/CrmCommsFragment";
import CrmDocsFragment from "@/components/work/crm/CrmDocsFragment";

/**
 * The CRM hero visual — ONE designed system of four real product
 * surfaces on a shared rotated backdrop plane:
 *
 *   LARGE 1  operational CRM surface (nav, filters, properties, tabs)
 *   LARGE 2  matching surface (demand → matches → visita/seguimiento),
 *            overlapping the main surface's lower-right with intention
 *   SMALL 1  communication fragment, peeking behind the top-left
 *   SMALL 2  documentation fragment, peeking behind the top-right
 *
 * One rotation axis, one shadow family, one composition.
 */
export default function CrmHeroComposition({ lang }) {
  return (
    <div className="relative">
      {/* Shared backdrop plane — the group's common ground */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-[5%] -top-[7%] -bottom-[14%] rotate-[1.2deg] rounded-[20px] border border-white/80 bg-[linear-gradient(165deg,rgba(255,255,255,0.9),rgba(232,238,250,0.55))] shadow-[0_40px_90px_-40px_rgba(12,18,32,0.28)]"
      />

      {/* SMALL 1 — communication / follow-up, top-left supporting layer */}
      <div className="absolute -top-9 left-[4%] z-0 hidden lg:block">
        <CrmCommsFragment lang={lang} className="rotate-[1.2deg]" />
      </div>

      {/* SMALL 2 — documentation / checklist, top-right supporting layer */}
      <div className="absolute -top-7 right-[4%] z-0 hidden lg:block">
        <CrmDocsFragment lang={lang} className="rotate-[1.2deg]" />
      </div>

      {/* LARGE 1 — the main operational CRM surface */}
      <div className="relative z-10">
        <CrmOpsMockup lang={lang} />
      </div>

      {/* LARGE 2 — the matching surface, overlapping the main surface */}
      <div className="absolute -bottom-14 right-[3%] z-20 w-[68%] hidden lg:block">
        <CrmMatchingSurface lang={lang} className="rotate-[1.2deg]" />
      </div>
    </div>
  );
}