import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import Magnetic from "@/components/Magnetic";
import { langPath } from "@/i18n";

/**
 * Closing call-to-action band — dark navy panel with a soft cobalt glow.
 */
export default function CtaBand({
  lang = "es",
  kicker,
  title,
  note,
  button,
}) {
  return (
    <section className="bg-background px-5 py-20 md:px-10 md:py-28">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl bg-[#0B1220] px-6 py-16 text-center md:px-10 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-44 left-1/2 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[#2B59FF]/25 blur-[120px]"
        />
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#8FA5E8]">
            {kicker}
          </p>
          <Reveal variant="mask">
            <h2 className="mx-auto mt-6 max-w-2xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-white md:text-5xl">
              {title}
            </h2>
          </Reveal>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
            {note}
          </p>
          <Magnetic className="mt-10 inline-block">
            <ActionLink
              to={langPath(lang, "/contact")}
              className="px-8 py-4"
            >
              {button}
            </ActionLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}