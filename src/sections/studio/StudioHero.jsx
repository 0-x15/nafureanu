import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, H1, MONO, Sheet } from "./studioBits";

/**
 * The opening of the company profile: a corporate statement on the
 * left, the dossier on the right. Only factual fields in the dossier.
 * The index below the lead is the profile's table of contents.
 */
export default function StudioHero({ a }) {
  const reduced = useReducedMotion();
  const h = a.hero;
  const up = (i) => ({ initial: reduced ? false : { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE } });
  return (
    <header className="px-5 pb-12 pt-6 md:px-10 md:pb-20 md:pt-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <motion.div {...up(0)} className="flex items-baseline justify-between gap-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{a.kicker}</p>
            <p className={cn(MONO, "text-muted-foreground")}>{a.profile}</p>
          </motion.div>
          <motion.h1 {...up(1)} className={cn(H1, "mt-8 max-w-[18ch] md:mt-10")}>{h.title}</motion.h1>
          <motion.p {...up(2)} className="mt-6 max-w-[54ch] text-[16px] leading-[1.65] text-foreground/85 md:text-[17px]">{h.lead}</motion.p>
          <motion.nav {...up(3)} aria-label={a.indexLabel} className="mt-10 border-t border-foreground/12 pt-4 md:mt-12">
            <ol className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {a.index.map((x) => (
                <li key={x.id}><Link to={`#${x.id}`} className="group inline-flex items-baseline gap-2 py-1 text-[13px] text-foreground/75 outline-none transition-colors hover:text-foreground focus-visible:text-accent"><span className={cn(MONO, "text-accent")}>{x.n}</span><span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-foreground/30">{x.label}</span></Link></li>
              ))}
            </ol>
          </motion.nav>
        </div>
        <motion.div {...up(2)} className="lg:col-span-5 lg:col-start-8">
          <Sheet title={h.dossier.title} meta={h.dossier.meta} bodyClassName="divide-y divide-foreground/10">
            {h.dossier.rows.map((r) => (
              <dl key={r.k} className="grid grid-cols-[110px_1fr] gap-4 px-5 py-3.5 md:grid-cols-[130px_1fr] md:px-6">
                <dt className={cn(MONO, "pt-[3px] text-muted-foreground")}>{r.k}</dt>
                <dd className="text-[14px] font-medium leading-[1.5] text-foreground">{r.v}</dd>
              </dl>
            ))}
            <div className="flex items-baseline justify-between gap-4 bg-[#FAF9F5] px-5 py-3 md:px-6">
              <span className="font-heading text-[15px] font-bold tracking-[-0.02em] text-foreground">{h.dossier.foot}</span>
              <span className={cn(MONO, "text-muted-foreground")}>{h.dossier.footNote}</span>
            </div>
          </Sheet>
        </motion.div>
      </div>
    </header>
  );
}
