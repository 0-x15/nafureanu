import Reveal from "@/components/Reveal";
import { Frame, Kicker, PhoneFrame, Shot } from "./wpBits";

/**
 * Hero — the positioning (web work with product thinking, as one part
 * of a broader engineering practice) and a restrained composition that
 * says "several real projects": one large desktop surface, three small
 * fragments from the other three sites. No pile of windows.
 */
export default function WebProjectsHero({ c }) {
  const h = c.hero;
  const alt = h.composition;
  return (
    <header className="mx-auto max-w-[1440px] overflow-x-clip px-5 pb-10 pt-8 md:px-10 md:pb-16 md:pt-12">
      <Reveal>
        <Kicker>{h.kicker}</Kicker>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-foreground md:text-6xl">{h.title}</h1>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{h.support}</p>
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:max-w-xs md:text-right">{h.meta}</p>
        </div>
      </Reveal>

      <Reveal variant="scale" delay={0.1} className="mt-14 md:mt-20">
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-x-[1%] -top-6 bottom-4 rounded-[24px] border border-white bg-[linear-gradient(165deg,#F4F6FA_0%,#FBFAF7_60%,#F2F5FA_100%)] shadow-[0_50px_110px_-60px_rgba(12,18,32,0.3)] md:-top-10 md:bottom-8" />
          {/* Desktop composition */}
          <div className="relative hidden md:grid md:grid-cols-12 md:gap-6">
            <div className="md:col-span-8">
              <Frame host="dd-evecom-comfort.es">
                <Shot project="dd-evecom" id="desktop" alt={alt.main} priority />
              </Frame>
            </div>
            <div className="relative md:col-span-4">
              <Frame host="reformasoctavian.es" chrome={false} className="w-[92%]">
                <Shot project="reformas-octavian" id="desktop" alt={alt.a} priority />
              </Frame>
              <Frame host="mpmonitor.netlify.app" dark chrome={false} className="ml-auto mt-4 w-[92%]">
                <Shot project="mp-monitor" id="desktop" alt={alt.b} priority />
              </Frame>
              <PhoneFrame className="absolute -bottom-6 left-[6%] w-[30%]">
                <div className="aspect-[9/16] overflow-hidden">
                  <Shot project="dental-goya" id="mobile" alt={alt.c} className="object-cover object-top" />
                </div>
              </PhoneFrame>
            </div>
          </div>
          {/* Phone composition */}
          <div className="relative space-y-4 pt-2 md:hidden">
            <Frame host="dd-evecom-comfort.es"><Shot project="dd-evecom" id="desktop" alt={alt.main} priority /></Frame>
            <div className="grid grid-cols-2 gap-4">
              <Frame chrome={false}><Shot project="reformas-octavian" id="desktop" alt={alt.a} /></Frame>
              <Frame dark chrome={false}><Shot project="mp-monitor" id="desktop" alt={alt.b} /></Frame>
            </div>
          </div>
        </div>
      </Reveal>
    </header>
  );
}
