import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, MONO, Rule } from "./workBits";

/**
 * The range of the work: a classification spread. Two truthful axes —
 * who uses the system (internal team ↔ external users) and what it is
 * (operations ↔ product) — and the four projects placed as large
 * typographic labels inside that field, each with one caption. No
 * cards, no nodes, no arrows: thin guides and type. On phones the same
 * field becomes a vertical spectrum, one project per row.
 */
const POS = {
  "crm-inmobiliario": { x: 12, y: 18, enter: { x: -24, y: 0 } },
  "life-admin": { x: 56, y: 26, enter: { x: 0, y: -18 } },
  "web-projects": { x: 40, y: 66, enter: { x: 0, y: 18 } },
  fivo: { x: 78, y: 74, enter: { x: 24, y: 0 } },
};

export default function WorkRange({ t }) {
  const reduced = useReducedMotion();
  const r = t.range;
  return (
    <section aria-labelledby="work-range" className="relative overflow-hidden bg-background/40 px-5 py-20 md:px-10 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -left-[10%] top-[10%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.7),transparent)]" />
      </div>
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <p className={cn(MONO, "text-accent")}>{r.label}</p>
            <h2 id="work-range" className="mt-4 max-w-[16ch] font-heading text-[clamp(1.7rem,2.8vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.03em] text-foreground [text-wrap:balance]">{r.statement}</h2>
            <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.6] text-foreground/75 md:text-[16px]">{r.support}</p>
          </div>

          {/* the field — desktop */}
          <div className="relative hidden aspect-[16/9] lg:col-span-8 lg:block">
            {/* guides */}
            <span aria-hidden="true" className="absolute inset-x-0 top-1/2 block"><Rule className="bg-foreground/15" /></span>
            <span aria-hidden="true" className="absolute inset-y-0 left-1/2 block"><Rule vertical className="bg-foreground/15" delay={0.15} /></span>
            <span aria-hidden="true" className="absolute inset-0 border border-dashed border-foreground/10" />
            {/* axis labels */}
            <p className={cn(MONO, "absolute left-0 top-1/2 -translate-y-1/2 bg-[#F8F6F0] pr-3 text-foreground/70")}>{r.axisX[0]}</p>
            <p className={cn(MONO, "absolute right-0 top-1/2 -translate-y-1/2 bg-[#F8F6F0] pl-3 text-right text-foreground/70")}>{r.axisX[1]}</p>
            <p className={cn(MONO, "absolute left-1/2 top-0 -translate-x-1/2 bg-[#F8F6F0] px-3 text-foreground/70")}>{r.axisY[0]}</p>
            <p className={cn(MONO, "absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#F8F6F0] px-3 text-foreground/70")}>{r.axisY[1]}</p>
            {/* the projects as coordinates */}
            {r.items.map((item, i) => {
              const p = POS[item.slug];
              return (
                <motion.div
                  key={item.slug}
                  initial={reduced ? false : { opacity: 0, x: p.enter.x, y: p.enter.y }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: EASE }}
                  className="absolute"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span aria-hidden="true" className="absolute -left-3 top-[0.55em] h-[7px] w-[7px] border border-accent bg-[#F8F6F0]" />
                  <p className="font-heading text-[clamp(1.4rem,2.2vw,2.1rem)] font-bold leading-none tracking-[-0.03em] text-foreground">{item.name}</p>
                  <p className={cn(MONO, "mt-2 text-muted-foreground")}>{item.note}</p>
                </motion.div>
              );
            })}
          </div>

          {/* the spectrum — phones and tablets */}
          <div className="lg:hidden">
            <div className="flex items-baseline justify-between">
              <p className={cn(MONO, "text-foreground/70")}>{r.axisX[0]}</p>
              <p className={cn(MONO, "text-foreground/70")}>{r.axisX[1]}</p>
            </div>
            <ol className="mt-3 border-t border-foreground/15">
              {r.items.map((item) => {
                const p = POS[item.slug];
                return (
                  <li key={item.slug} className="border-b border-foreground/12 py-4">
                    <div className="relative h-px bg-foreground/12">
                      <span aria-hidden="true" className="absolute top-1/2 h-[7px] w-[7px] -translate-y-1/2 border border-accent bg-[#F8F6F0]" style={{ left: `calc(${p.x}% - 3px)` }} />
                    </div>
                    <p className="mt-3 font-heading text-[20px] font-bold leading-tight tracking-[-0.02em] text-foreground">{item.name}</p>
                    <p className={cn(MONO, "mt-1 text-muted-foreground")}>{item.note} · {p.y < 50 ? r.axisY[0] : r.axisY[1]}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
