import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui";

export default function ConfirmDialog({ open, title, body, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4"
          onClick={onCancel}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="crm-demo-confirm-title"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-5 shadow-xl"
          >
            <h2 id="crm-demo-confirm-title" className="text-[15px] font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{body}</p>
            <div className="mt-5 flex justify-end gap-2">
              <Button onClick={onCancel}>{cancelLabel}</Button>
              <Button variant="primary" onClick={onConfirm} autoFocus>
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
