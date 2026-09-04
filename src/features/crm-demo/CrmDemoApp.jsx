import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { usePageMeta } from "@/lib/seo";
import { DEMO_STRINGS } from "./i18n";
import { DemoProvider, useDemo } from "./store/DemoStore";
import { UiContext } from "./store/UiContext";
import CrmDemoShell from "./CrmDemoShell";
import Toasts from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";
import VisitSheet from "./components/VisitSheet";
import Tour from "./components/Tour";
import DemoDashboard from "./views/DemoDashboard";
import PropertiesView from "./views/PropertiesView";
import PropertyDetail from "./views/PropertyDetail";
import ContactsView from "./views/ContactsView";
import ContactDetail from "./views/ContactDetail";
import DemandsView from "./views/DemandsView";
import DemandDetail from "./views/DemandDetail";
import MatchingView from "./views/MatchingView";
import CalendarView from "./views/CalendarView";
import VisitsView from "./views/VisitsView";
import VisitDetail from "./views/VisitDetail";
import OperationsView from "./views/OperationsView";
import OperationDetail from "./views/OperationDetail";
import DocumentsView from "./views/DocumentsView";

const PATHS = {
  es: { demo: "/work/crm-inmobiliario/demo", caseStudy: "/work/crm-inmobiliario" },
  en: { demo: "/en/work/real-estate-crm/demo", caseStudy: "/en/work/real-estate-crm" },
};

const VIEWS = {
  dashboard: DemoDashboard,
  properties: PropertiesView,
  property: PropertyDetail,
  contacts: ContactsView,
  contact: ContactDetail,
  demands: DemandsView,
  demand: DemandDetail,
  matching: MatchingView,
  calendar: CalendarView,
  visits: VisitsView,
  visit: VisitDetail,
  operations: OperationsView,
  operation: OperationDetail,
  documents: DocumentsView,
};

/* What each guided-tour step does when it becomes active. */
const TOUR_ACTIONS = [
  (ui) => ui.go("demand", "DEMO-D001"),
  (ui) => ui.go("matching", null, { mode: "demand", id: "DEMO-D001" }),
  (ui) => ui.go("property", "DEMO-P001"),
  (ui) => {
    ui.go("property", "DEMO-P001");
    ui.openVisitSheet({ propertyId: "DEMO-P001", demandId: "DEMO-D001", contactId: "DEMO-C001" });
  },
  (ui) => ui.go("calendar", null, { focusLatest: true }),
  (ui) => ui.go("operations"),
  (ui) => ui.go("documents", null, { entityType: "property", entityId: "DEMO-P001" }),
];

function DemoInner({ lang }) {
  const S = DEMO_STRINGS[lang];
  const { reset } = useDemo();
  const [nav, setNav] = useState({ view: "dashboard", id: null, params: null });
  const historyRef = useRef([]);
  const [toasts, setToasts] = useState([]);
  const [sheet, setSheet] = useState({ open: false, prefill: null });
  const [confirmReset, setConfirmReset] = useState(false);
  const [tourState, setTourState] = useState({ active: false, step: 0 });

  const go = useCallback((view, id = null, params = null) => {
    setNav((current) => {
      historyRef.current = [...historyRef.current.slice(-19), current];
      return { view, id, params };
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const back = useCallback(() => {
    const previous = historyRef.current.pop();
    setNav(previous || { view: "dashboard", id: null, params: null });
  }, []);

  const toast = useCallback((text) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((list) => [...list, { id, text }]);
    window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3500);
  }, []);

  const openVisitSheet = useCallback((prefill = null) => setSheet({ open: true, prefill }), []);
  const closeVisitSheet = useCallback(() => setSheet((s) => ({ ...s, open: false })), []);

  const tour = useMemo(
    () => ({
      active: tourState.active,
      step: tourState.step,
      start: () => setTourState({ active: true, step: 0 }),
      next: () => setTourState((t) => ({ ...t, step: Math.min(t.step + 1, S.tour.steps.length - 1) })),
      prev: () => setTourState((t) => ({ ...t, step: Math.max(t.step - 1, 0) })),
      exit: () => setTourState({ active: false, step: 0 }),
    }),
    [tourState, S.tour.steps.length]
  );

  const ui = useMemo(
    () => ({
      lang,
      S,
      nav,
      go,
      back,
      toast,
      openVisitSheet,
      sheetOpen: sheet.open,
      tour,
      casePath: PATHS[lang].caseStudy,
      demoPath: PATHS[lang].demo,
      otherLangPath: PATHS[lang === "es" ? "en" : "es"].demo,
    }),
    [lang, S, nav, go, back, toast, openVisitSheet, sheet.open, tour]
  );

  /* Run the tour step's action when the step changes */
  const uiRef = useRef(ui);
  uiRef.current = ui;
  useEffect(() => {
    if (!tourState.active) return;
    const action = TOUR_ACTIONS[tourState.step];
    if (action) action(uiRef.current);
  }, [tourState.active, tourState.step]);

  usePageMeta({
    lang,
    title: S.app.pageTitle,
    description: S.app.disclaimer,
    path: PATHS[lang].demo,
    alternatePath: PATHS[lang === "es" ? "en" : "es"].demo,
  });

  const View = VIEWS[nav.view] || DemoDashboard;

  return (
    <UiContext.Provider value={ui}>
      <CrmDemoShell onReset={() => setConfirmReset(true)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${nav.view}-${nav.id || ""}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
          >
            <View />
          </motion.div>
        </AnimatePresence>
      </CrmDemoShell>
      <VisitSheet open={sheet.open} prefill={sheet.prefill} onClose={closeVisitSheet} />
      <ConfirmDialog
        open={confirmReset}
        title={S.reset.title}
        body={S.reset.body}
        confirmLabel={S.reset.confirm}
        cancelLabel={S.reset.cancel}
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          reset();
          setConfirmReset(false);
          setTourState({ active: false, step: 0 });
          setNav({ view: "dashboard", id: null, params: null });
          toast(S.toasts.reset);
        }}
      />
      <Tour />
      <Toasts toasts={toasts} />
    </UiContext.Provider>
  );
}

/**
 * The interactive CRM demo — its own application shell (no marketing
 * navbar/footer), frontend-only, fictional data, ES/EN.
 */
export default function CrmDemoApp({ lang = "es" }) {
  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <DemoInner lang={lang} />
      </DemoProvider>
    </MotionConfig>
  );
}
