import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, m as motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import ActionLink from "@/components/ActionLink";
import LanguageSwitch from "@/components/LanguageSwitch";
import { LogoInline, LogoSymbol } from "@/components/brand/Logo";
import ServicesMobileNav from "@/components/layout/ServicesMobileNav";
import { useReducedMotion } from "@/lib/motion";
import { STRINGS, langPath } from "@/i18n";
import { SERVICE_NAV_ITEMS, isServicesSection } from "@/data/serviceNavigation";
import { cn } from "@/lib/utils";
import { CurrentMark, EASE, FOCUS, MONO, pad } from "./mobileMenuBits";
import "./mobileMenu.css";

const LINKS = [
  { path: "/", key: "home" },
  { path: "/services", key: "services" },
  { path: "/work", key: "work" },
  { path: "/about", key: "about" },
];
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const ROW = cn("group relative flex w-full items-baseline gap-4 py-[clamp(0.55rem,2.2vh,1.35rem)] text-left", FOCUS);

/** The portal as a component, so AnimatePresence can keep the surface mounted while it leaves. */
function Portal({ children }) {
  return createPortal(children, document.body);
}

/* The two views trade places horizontally: the one entering comes from the side it belongs to, the one leaving recedes. With reduced motion (custom 0) they only fade. */
const VIEW = {
  enter: (d) => (d === 0 ? { opacity: 0 } : { x: d > 0 ? "26%" : "-26%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => (d === 0 ? { opacity: 0 } : { x: d > 0 ? "-16%" : "16%", opacity: 0 }),
};

/**
 * The primary navigation: four numbered rows, one composition. The
 * Services row opens the second view instead of navigating; the others
 * are real links. The row of the current page carries the mark.
 */
function PrimaryNav({ lang, stagger, reduced, onServices, servicesRowRef }) {
  const s = STRINGS[lang];
  const { pathname } = useLocation();
  return (
    <nav aria-label={s.nav.menu.primary}>
      <ol className="mt-2">
        {LINKS.map((l, i) => {
          const to = langPath(lang, l.path);
          const services = l.key === "services";
          const active = services ? isServicesSection(pathname, lang) : l.key === "home" ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
          const inner = (
            <>
              <span className={cn(MONO, "w-6 shrink-0 tabular-nums", active ? "text-accent" : "text-muted-foreground")}>{pad(i + 1)}</span>
              <span className="font-heading text-[clamp(2rem,9vw,3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground transition-colors group-hover:text-accent">{s.nav[l.key]}</span>
              {services && <span className={cn(MONO, "self-center text-muted-foreground")}>{pad(SERVICE_NAV_ITEMS.length)}</span>}
              <ArrowRight aria-hidden="true" className={cn("ml-auto h-4 w-4 shrink-0 self-center transition-transform duration-300 group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]", active ? "text-accent" : "text-foreground/35")} />
              {active && <CurrentMark />}
            </>
          );
          return (
            <motion.li
              key={l.key}
              initial={stagger && !reduced ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 + i * 0.05, ease: EASE }}
            >
              {services ? (
                <button ref={servicesRowRef} type="button" onClick={onServices} aria-current={active ? "page" : undefined} className={ROW}>
                  {inner}
                </button>
              ) : (
                <Link to={to} aria-current={active ? "page" : undefined} className={ROW}>
                  {inner}
                </Link>
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * The mobile navigation — one full-screen surface in the language of the
 * Structural N: the ivory canvas, an oversized piece of the mark behind,
 * numbered rows in the heading face, cobalt where something is current.
 * Two views inside the same surface: the primary navigation and, one
 * step deeper, the index of services (ServicesMobileNav). Rendered
 * through a portal: the header animates with transforms, which would
 * otherwise position this fixed layer inside it instead of the viewport.
 *
 * Dialog semantics: the page behind is inert and does not scroll, focus
 * moves into the dialog on open and back to the trigger on close, Tab
 * cycles inside, Escape closes. A route change closes it and leaves
 * focus with the new page.
 */
export default function MobileMenu({
  lang = "es",
  open = false,
  onOpenChange = (_open) => {},
}) {
  const { pathname } = useLocation();
  const s = STRINGS[lang];
  const t = s.nav.menu;
  const reduced = useReducedMotion();
  const [view, setView] = useState("main");
  const [dir, setDir] = useState(1);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const servicesRowRef = useRef(null);
  const servicesViewRef = useRef(null);
  const restoreFocus = useRef(false);

  const show = () => {
    setView("main");
    setDir(1);
    onOpenChange(true);
  };
  const close = useCallback(() => {
    restoreFocus.current = true;
    onOpenChange(false);
  }, [onOpenChange]);
  const openServices = () => { setDir(1); setView("services"); };
  const back = () => { setDir(-1); setView("main"); };

  /* A navigation closes the menu; focus stays with the new page. */
  useEffect(() => {
    restoreFocus.current = false;
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  /* While open: the page behind is inert and locked, the dialog holds focus, Escape closes. */
  useEffect(() => {
    if (!open) return undefined;
    const root = /** @type {any} */ (document.getElementById("root"));
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (root) root.inert = true;
    const raf = window.requestAnimationFrame(() => dialogRef.current?.focus({ preventScroll: true }));
    const onKey = (e) => { if (e.key === "Escape") { e.preventDefault(); close(); } };
    document.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      if (root) root.inert = false;
      if (restoreFocus.current) triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open, close]);

  /* Moving between views moves the keyboard with it: into the services view, back onto the Services row. */
  useEffect(() => {
    if (!open) return;
    if (view === "services") servicesViewRef.current?.focus({ preventScroll: true });
    else if (dir < 0) servicesRowRef.current?.focus({ preventScroll: true });
  }, [view, dir, open]);

  /* Tab cycles inside the dialog (the page behind is inert where supported; this covers the rest). */
  const onKeyDown = (e) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE)).filter((el) => /** @type {HTMLElement} */ (el).getClientRects().length > 0);
    if (!items.length) return;
    const first = /** @type {HTMLElement} */ (items[0]);
    const last = /** @type {HTMLElement} */ (items[items.length - 1]);
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const custom = reduced ? 0 : dir;
  const viewTransition = { duration: reduced ? 0.12 : 0.36, ease: EASE };
  const viewClass = "mm-view absolute inset-0 flex flex-col overflow-y-auto px-5 pt-2";
  const viewPad = { paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)" };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={show}
        aria-label={t.open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="mm-control -mr-1"
      >
        <span aria-hidden="true" className="mm-strokes"><i /><i /><i /></span>
      </button>

      <AnimatePresence>
        {open && (
          <Portal key="mobile-menu">
            <motion.div
              ref={dialogRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t.label}
              tabIndex={-1}
              onKeyDown={onKeyDown}
              initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={reduced ? { opacity: 0, transition: { duration: 0.12 } } : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.22, ease: EASE } }}
              transition={{ duration: reduced ? 0.15 : 0.42, ease: EASE }}
              className="fixed inset-0 z-[80] flex flex-col overflow-hidden bg-background text-foreground outline-none"
            >
              {/* the piece of the N behind everything, and a breath of cobalt in the lower corner */}
              <motion.span
                aria-hidden="true"
                initial={reduced ? false : { opacity: 0, x: 40, rotate: -3 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                className="pointer-events-none absolute -right-[46vw] top-[9vh] text-foreground"
              >
                {/* the opacity sits on the symbol: the wrapper animates its own */}
                <LogoSymbol size="min(140vw, 120vh)" className="opacity-[0.045]" />
              </motion.span>
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-[18vh] -right-[20vw] h-[64vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.09),transparent)]" />

              {/* the top bar */}
              <div className="relative flex h-16 shrink-0 items-center justify-between px-5" style={{ marginTop: "env(safe-area-inset-top, 0px)" }}>
                <Link to={langPath(lang, "/")} className={cn("inline-flex items-center", FOCUS)}>
                  <LogoInline className="text-lg" />
                </Link>
                <button type="button" onClick={close} aria-label={t.close} className="mm-control -mr-1">
                  <motion.span
                    aria-hidden="true"
                    className="flex"
                    initial={reduced ? false : { opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.45, delay: 0.16, ease: EASE }}
                  >
                    <X className="h-[18px] w-[18px]" />
                  </motion.span>
                </button>
              </div>

              {/* the two views, trading places inside the same surface */}
              <div className="relative min-h-0 flex-1">
                <AnimatePresence initial={false} custom={custom}>
                  {view === "main" ? (
                    <motion.div key="main" custom={custom} variants={VIEW} initial="enter" animate="center" exit="exit" transition={viewTransition} className={viewClass} style={viewPad}>
                      <motion.div
                        initial={dir > 0 && !reduced ? { opacity: 0, y: 8 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                        className="flex items-baseline justify-between border-b border-foreground/12 pb-3"
                      >
                        <p className={cn(MONO, "text-accent")}>{t.label}</p>
                        <p className={cn(MONO, "text-muted-foreground")}>01 — {pad(LINKS.length)}</p>
                      </motion.div>
                      <PrimaryNav lang={lang} stagger={dir > 0} reduced={reduced} onServices={openServices} servicesRowRef={servicesRowRef} />

                      {/* the lower zone: the door to a project, then the language and the signature */}
                      <motion.div
                        initial={dir > 0 && !reduced ? { opacity: 0, y: 10 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.36, ease: EASE }}
                        className="mt-auto pt-8"
                      >
                        <p className={cn(MONO, "mb-3 text-muted-foreground")}>{s.contact.meta.left}</p>
                        <ActionLink to={langPath(lang, "/contact")} className="mm-cta flex w-full">{s.nav.brief}</ActionLink>
                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-foreground/12 pt-4">
                          <span className={cn(MONO, "hidden text-muted-foreground min-[360px]:inline")}>Nafureanu · Software Engineering</span>
                          <LanguageSwitch lang={lang} className={cn("min-h-[44px]", FOCUS)} />
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div key="services" ref={servicesViewRef} tabIndex={-1} custom={custom} variants={VIEW} initial="enter" animate="center" exit="exit" transition={viewTransition} className={cn(viewClass, "outline-none")} style={viewPad}>
                      <ServicesMobileNav lang={lang} onBack={back} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
