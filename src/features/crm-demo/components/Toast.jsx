import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/** Bottom-centre notifications of the demo. */
export default function Toasts({ toasts }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3.5 py-2 text-[12.5px] text-white shadow-lg"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toast.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
