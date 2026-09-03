import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

/**
 * One problem → solution row. The numbered statement expands into a
 * restrained integrated panel explaining how the CRM solves that
 * specific pain. Works with mouse, touch and keyboard.
 */
export default function CrmProblemItem({
  pain,
  index,
  open,
  onToggle,
  howLabel,
}) {
  const isOpen = open === index;
  const panelId = `crm-problem-panel-${index}`;

  return (
    <div className="border-t border-border">
      <button
        type="button"
        onClick={() => onToggle(isOpen ? null : index)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "group flex w-full items-baseline gap-5 px-2 py-5 text-left transition-colors duration-300",
          isOpen ? "bg-accent/[0.045]" : "hover:bg-accent/[0.035]"
        )}
      >
        <span className="font-mono text-[10px] text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex-1 text-base font-medium leading-snug transition-colors duration-300 md:text-lg",
            isOpen
              ? "text-foreground"
              : "text-foreground/75 group-hover:text-foreground"
          )}
        >
          {pain.title}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 self-center transition-all duration-300",
            isOpen ? "-rotate-180 text-accent" : "text-muted-foreground/60"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: EASE }}
              className="px-2 pb-6"
            >
              <div className="border-l-2 border-accent bg-accent/[0.035] px-5 py-5 md:px-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                  {howLabel}
                </p>
                <p className="mt-2.5 font-heading text-sm font-bold tracking-tight text-foreground">
                  {pain.solutionTitle}
                </p>
                <p className="mt-2.5 text-sm leading-[1.75] text-muted-foreground">
                  {pain.solution}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}