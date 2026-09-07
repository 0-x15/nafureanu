import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { STRINGS, langPath } from "@/i18n";
import { SERVICE_NAV, isDedicatedService, isServiceNavItemActive, isServicesSection, serviceNavPath } from "@/data/serviceNavigation";
import { cn } from "@/lib/utils";

const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
const CLOSE_DELAY = 140;

/**
 * The "Services" navigation item: a real link to the Services index plus
 * a compact mega-menu. Hover or focus opens it; the chevron toggles it
 * for keyboard and touch users; Escape and outside interaction close it.
 * The panel is positioned inside the header's <nav> so it aligns under
 * the trigger and is clamped to the header's width — never the viewport.
 */
export default function ServicesMenu({ lang = "es", onOpenChange = undefined }) {
  const s = STRINGS[lang];
  const t = s.serviceNav;
  const { pathname } = useLocation();
  const base = langPath(lang, "/services");
  const sectionActive = isServicesSection(pathname, lang);
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState(16);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const timer = useRef(null);
  const skipFocusOpen = useRef(false);
  const reduced = useReducedMotion();

  const show = useCallback(() => { window.clearTimeout(timer.current); setOpen(true); }, []);
  const hide = useCallback((delay = CLOSE_DELAY) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), delay); }, []);

  useEffect(() => { onOpenChange?.(open); }, [open, onOpenChange]);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  /* Escape returns focus to the trigger; pointer/keyboard interaction outside closes. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); skipFocusOpen.current = true; triggerRef.current?.focus(); } };
    const onDown = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);

  /* Align the panel's left edge with the trigger, clamped inside the header's nav. */
  useLayoutEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const nav = rootRef.current?.closest("nav");
      const trig = triggerRef.current;
      const panel = panelRef.current;
      if (!nav || !trig || !panel) return;
      const n = nav.getBoundingClientRect();
      const tr = trig.getBoundingClientRect();
      const cs = getComputedStyle(nav);
      const padL = parseFloat(cs.paddingLeft) || 0;
      const padR = parseFloat(cs.paddingRight) || 0;
      const desired = tr.left - n.left - 28;
      const max = n.width - padR - panel.offsetWidth;
      setLeft(Math.round(Math.max(padL, Math.min(desired, max))));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  const onBlur = (e) => { if (!rootRef.current?.contains(e.relatedTarget)) hide(0); };
  /* Focus opens, except right after Escape handed focus back to the trigger. */
  const onTriggerFocus = () => { if (skipFocusOpen.current) { skipFocusOpen.current = false; return; } show(); };

  return (
    <div ref={rootRef} className="contents" onBlur={onBlur}>
      <span className="flex items-center gap-0.5" onPointerEnter={show} onPointerLeave={() => hide()}>
        <Link
          ref={triggerRef}
          to={base}
          aria-current={sectionActive ? "page" : undefined}
          onFocus={onTriggerFocus}
          className={cn("text-sm font-medium transition-colors", sectionActive ? "text-accent" : "text-[#4A5164] hover:text-foreground")}
        >
          {s.nav.services}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="services-menu"
          aria-label={open ? t.close : t.open}
          onClick={() => (open ? setOpen(false) : show())}
          onFocus={onTriggerFocus}
          className={cn("-mr-1 rounded-[4px] p-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent", sectionActive ? "text-accent" : "text-[#4A5164] hover:text-foreground")}
        >
          <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            key="services-menu"
            ref={panelRef}
            id="services-menu"
            initial={{ opacity: 0, y: reduced ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -4 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            onPointerEnter={show}
            onPointerLeave={() => hide()}
            className="absolute top-full z-50 w-[min(880px,calc(100vw-80px))] pt-2"
            style={{ left }}
          >
            <nav aria-label={t.menuLabel} className="rounded-[10px] border border-border bg-white shadow-[0_28px_64px_-32px_rgba(12,18,32,0.42),0_1px_0_rgba(15,23,42,0.04)]">
              <div className="grid md:grid-cols-[1.02fr_1fr]">
                {SERVICE_NAV.groups.map((g, gi) => (
                  <div key={g.id} className={cn("p-4 md:p-5", gi === 0 && "md:border-r md:border-border")}>
                    <p className={cn(MONO, "px-3 text-muted-foreground")}>{t.groups[g.id]}</p>
                    <ul className="mt-2">
                      {g.items.map((item) => {
                        const copy = t.items[item.id];
                        const dedicated = isDedicatedService(item);
                        const active = isServiceNavItemActive(item, pathname, lang);
                        return (
                          <li key={item.id}>
                            <Link
                              to={serviceNavPath(item, lang)}
                              aria-current={active ? "page" : undefined}
                              className="group flex items-start gap-3 rounded-[6px] px-3 py-2.5 outline-none transition-colors hover:bg-[#F6F8FB] focus-visible:bg-[#F6F8FB] focus-visible:ring-2 focus-visible:ring-accent"
                            >
                              <span aria-hidden="true" className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors", active ? "bg-accent" : dedicated ? "bg-accent/55 group-hover:bg-accent" : "bg-border group-hover:bg-accent")} />
                              <span className="min-w-0 flex-1">
                                {dedicated && <span className={cn(MONO, "mb-0.5 block text-[9px] text-accent")}>{t.dedicated}</span>}
                                <span className={cn("block text-[14px] font-semibold tracking-[-0.01em]", active ? "text-accent" : "text-foreground")}>{copy.label}</span>
                                <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{copy.description}</span>
                              </span>
                              <ArrowRight aria-hidden="true" className="mt-[3px] h-3.5 w-3.5 shrink-0 -translate-x-1 text-accent opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border px-7 py-3 md:px-8">
                <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className={cn(MONO, "text-muted-foreground")}>{t.specialities.label}</span>
                  {SERVICE_NAV.specialities.map((sp) => (
                    <Link key={sp.id} to={serviceNavPath(sp, lang)} className="text-[12px] font-medium text-foreground/70 outline-none transition-colors hover:text-foreground focus-visible:text-accent">{t.specialities.items[sp.id]}</Link>
                  ))}
                </p>
                <Link to={base} className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-accent outline-none transition-colors hover:text-accent-deep focus-visible:underline">
                  {t.explore}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[2px]" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
