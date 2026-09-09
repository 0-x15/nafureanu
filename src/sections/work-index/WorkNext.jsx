import { motion, useReducedMotion } from "framer-motion";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import ActionLink from "@/components/ActionLink";
import { EASE, MONO } from "./workBits";

/**
 * Act 03 — next. The closing looks forward: a huge pale 05, partly
 * cropped, an unfinished frame — three sides drawn, the fourth open —
 * a registration mark, the statement and the door. On hover or focus
 * the open side completes a little, the mark shifts into place and the
 * 05 gains contrast. Nothing about the projects already seen.
 */
export default function WorkNext({ lang, t }) {
  const reduced = useReducedMotion();
  const n = t.next;
  const io = { initial: reduced ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

  return (
    <section aria-labelledby="work-next" className="group/next relative overflow-hidden border-t border-foreground/10 px-5 py-24 md:px-10 md:py-32">
      {/* the stronger closing field: cobalt light, no tint */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -bottom-[40%] left-[20%] h-[110%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.13),transparent)] blur-2xl" />
        <span className="absolute -right-[6%] top-[-10%] h-[70%] w-[36%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.07),transparent)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          {/* the entry waiting to exist */}
          <motion.div {...io} transition={{ duration: 0.9, ease: EASE }} className="relative lg:col-span-6">
            <p className={cn(MONO, "text-accent")}>{n.kicker}</p>
            <div className="relative mt-4 h-[220px] md:h-[300px]">
              <span aria-hidden="true" className="absolute -left-2 top-[-0.08em] select-none font-heading text-[12rem] font-bold leading-none tracking-[-0.06em] text-foreground/[0.07] transition-colors duration-700 group-hover/next:text-foreground/[0.12] group-focus-within/next:text-foreground/[0.12] md:text-[17rem]">05</span>
              {/* the unfinished frame: three sides drawn, the fourth open */}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-6 top-8 md:left-[6%]">
                <span className="absolute inset-y-0 left-0 w-px bg-foreground/30" />
                <span className="absolute inset-x-0 top-0 h-px bg-foreground/30" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-foreground/30" />
                <span className="absolute right-0 top-0 h-[38%] w-px bg-foreground/30 transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/next:h-[62%] group-focus-within/next:h-[62%]" />
                {/* the registration mark that shifts into place */}
                <span className="absolute right-0 top-[38%] h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 border border-accent bg-[#F9F7F0] transition-[top] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/next:top-[62%] group-focus-within/next:top-[62%]" />
                <span className="absolute left-0 top-0 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 border border-foreground/40 bg-[#F9F7F0]" />
                <span className="absolute bottom-0 left-0 h-[9px] w-[9px] -translate-x-1/2 translate-y-1/2 border border-foreground/40 bg-[#F9F7F0]" />
              </span>
              <span aria-hidden="true" className={cn(MONO, "absolute bottom-0 left-0 text-muted-foreground md:left-[6%]")}>{n.slot}</span>
            </div>
          </motion.div>

          {/* the statement and the door */}
          <motion.div {...io} transition={{ duration: 0.9, delay: 0.15, ease: EASE }} className="lg:col-span-5 lg:col-start-8 lg:self-center">
            <h2 id="work-next" className="max-w-[16ch] font-heading text-[clamp(1.9rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground [text-wrap:balance]">{n.line}</h2>
            <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[17px]">{n.support}</p>
            <div className="mt-9">
              <ActionLink to={langPath(lang, "/contact")} size="lg">{n.cta}</ActionLink>
            </div>
            <p className={cn(MONO, "mt-5 text-muted-foreground")}>{n.reassure}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
