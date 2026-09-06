import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Shot } from "./fivoBits";

/* Editorial placement: [column span, portrait crop] per item id. */
const LAYOUT = {
  "demo-store-light": { span: "md:col-span-4", crop: false },
  "checkout-light": { span: "md:col-span-2", crop: true },
  "merchant-dashboard": { span: "md:col-span-4", crop: false, dark: true },
  "crosschain-progress-light": { span: "md:col-span-2", crop: true },
  invoice: { span: "md:col-span-3", crop: false },
  "cart-checkout": { span: "md:col-span-3", crop: true, dark: true },
};

/** Inside the product — an art-directed sequence of real surfaces. */
export default function FivoProductSurfaces({ c }) {
  const s = c.surfaces;
  return (
    <Chapter tone="blue" aria-labelledby="fivo-surfaces">
      <ChapterHead kicker={s.kicker} title={s.title} intro={s.intro} />
      <ol className="mt-12 grid gap-8 md:grid-cols-6 md:gap-6">
        {s.items.map((item, i) => {
          const l = LAYOUT[item.id];
          return (
            <li key={item.id} className={cn("flex flex-col", l.span)}>
              <Reveal variant="scale" delay={(i % 2) * 0.06} className="flex-1">
                <figure className="flex h-full flex-col">
                  <div className={cn("relative overflow-hidden rounded-2xl border shadow-[0_24px_60px_-28px_rgba(12,18,32,0.35)]", l.dark ? "border-[#2A3050]" : "border-[#E1E5EF]", l.crop && "aspect-[4/5] md:aspect-auto md:min-h-[280px] md:flex-1")}>
                    <Shot
                      id={item.id}
                      alt={`${item.title}. ${item.text}`}
                      frame={false}
                      className={cn(l.crop && "absolute inset-0 h-full w-full object-cover object-top")}
                    />
                  </div>
                  <figcaption className="mt-4 flex gap-3">
                    <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-[#5A6070]">{item.text}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Chapter>
  );
}
