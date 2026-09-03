import SophIADashboard from "@/components/mockups/SophIADashboard";

// TODO: replace demo CRM visual with approved sanitized project screenshot.
/**
 * Replaceable hero visual slot. The demo composition below is a
 * generic interface mock — swap <SophIADashboard/> for an approved
 * sanitized screenshot (<Image/>) without touching the hero layout.
 */
export default function CrmHeroVisual({ lang }) {
  return (
    <div className="mx-auto max-w-4xl pb-8">
      <SophIADashboard lang={lang} />
    </div>
  );
}