import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, DISPLAY, Shot, Window } from "./laBits";

/**
 * Product surfaces — one hero surface, two large process surfaces and
 * three supporting ones, each captioned with what it is and why it
 * matters. Dense screens are shown as controlled product windows.
 */
function Caption({ n, item }) {
  return (
    <figcaption className="mt-4 flex gap-3">
      <span className={`${DISPLAY} text-[13px] text-[#928C86]`}>{String(n).padStart(2, "0")}</span>
      <div>
        <p className="text-sm font-medium text-[#201F1D]">{item.title}</p>
        <p className="mt-1 max-w-xl text-[12.5px] leading-relaxed text-[#706B66]">{item.text}</p>
      </div>
    </figcaption>
  );
}

export default function LifeAdminProductSurfaces({ lang, c }) {
  const s = c.surfaces;
  const byId = Object.fromEntries(s.items.map((it) => [it.id, it]));
  const hero = byId.dashboard;
  const large = [byId.import, byId.purchase];
  const medium = [byId.upcoming, byId.privacy, byId.ask];
  return (
    <Chapter tone="paper" aria-labelledby="la-surfaces">
      <ChapterHead kicker={s.kicker} title={s.title} intro={s.intro} />
      <Reveal variant="scale" delay={0.06} className="mt-12">
        <figure>
          <Window id="dashboard" lang={lang} alt={`${hero.title}. ${hero.text}`} className="md:[&>img]:rounded-2xl" />
          <Caption n={1} item={hero} />
        </figure>
      </Reveal>
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
        {large.map((item, i) => (
          <Reveal key={item.id} variant="scale" delay={i * 0.06}>
            <figure className="flex h-full flex-col">
              <div className="overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white shadow-[0_24px_60px_-30px_rgba(32,31,29,0.35)] max-md:aspect-[4/3]">
                <Shot id={item.id} lang={lang} alt={`${item.title}. ${item.text}`} frame={false} className="max-md:w-[170%] max-md:max-w-none" />
              </div>
              <Caption n={i + 2} item={item} />
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {medium.map((item, i) => (
          <Reveal key={item.id} variant="scale" delay={i * 0.06}>
            <figure className="flex h-full flex-col">
              <div className={cn("relative overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white shadow-[0_24px_60px_-30px_rgba(32,31,29,0.35)]", "aspect-[4/5]")}>
                <Shot id={item.id} lang={lang} alt={`${item.title}. ${item.text}`} frame={false} className="absolute inset-0 h-full w-full object-cover object-top" />
              </div>
              <Caption n={i + 4} item={item} />
            </figure>
          </Reveal>
        ))}
      </div>
    </Chapter>
  );
}
