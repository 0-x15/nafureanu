import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUi } from "../store/UiContext";
import { fill } from "../i18n";
import { cx } from "../utils/format";
import { Button } from "./ui";

/** Lightweight internal guided tour: a docked panel, no third-party package. */
export default function Tour() {
  const { S, tour, sheetOpen } = useUi();
  const steps = S.tour.steps;
  const step = steps[tour.step];
  const last = tour.step === steps.length - 1;

  return (
    <AnimatePresence>
      {tour.active && step && (
        <motion.aside
          role="dialog"
          aria-label={S.tour.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className={cx(
            "fixed bottom-4 z-[65] w-[calc(100%-2rem)] max-w-sm rounded-lg border border-blue-200 bg-white p-4 shadow-xl",
            sheetOpen ? "left-4" : "right-4"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-blue-700">
              {S.tour.title} · {fill(S.tour.step, { n: tour.step + 1, total: steps.length })}
            </p>
            <button type="button" onClick={tour.exit} aria-label={S.common.exit} className="rounded-md p-0.5 text-slate-500 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <h2 className="mt-1.5 text-[14px] font-semibold text-slate-900">{step.title}</h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{step.text}</p>
          <div className="mt-3 flex h-1 gap-1">
            {steps.map((_, i) => (
              <span key={i} className={i <= tour.step ? "flex-1 rounded-full bg-blue-600" : "flex-1 rounded-full bg-slate-200"} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <Button variant="ghost" onClick={tour.exit}>
              {S.app.explore}
            </Button>
            <div className="flex gap-2">
              <Button onClick={tour.prev} disabled={tour.step === 0}>
                {S.common.prev}
              </Button>
              <Button variant="primary" onClick={last ? tour.exit : tour.next}>
                {last ? S.common.finish : S.common.next}
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
