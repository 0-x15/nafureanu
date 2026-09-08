import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { Act } from "./webBits";

/** The door — the page's own typography is the call to action. One link to the work, and only here. */
export default function WebCta({ lang, c, paths }) {
  const t = c.cta;
  return (
    <Act id="wd-cta" tone="page" wireLabel={c.wire.action} className="md:py-44">
      <h2 id="wd-cta-title" className="max-w-[15ch] font-heading text-[clamp(2.4rem,6.6vw,6.8rem)] font-bold leading-[0.94] tracking-[-0.045em] text-foreground [text-wrap:balance]">{t.title}</h2>
      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
        <p className="text-lg leading-[1.55] text-foreground/80 md:col-span-6 md:text-[1.2rem]">{t.support}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-6 md:justify-end">
          <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
          <ActionLink to={paths.work} variant="text" icon="right">{t.secondary}</ActionLink>
        </div>
      </div>
    </Act>
  );
}
