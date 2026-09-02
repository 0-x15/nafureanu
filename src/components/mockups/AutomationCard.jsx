import { cn } from "@/lib/utils";

const T = {
  es: {
    title: "Flujo automático",
    steps: ["Recibe un email", "La IA lo clasifica", "Se crea la tarea"],
    status: "Activo",
  },
  en: {
    title: "Automated flow",
    steps: ["Email arrives", "AI classifies it", "Task created"],
    status: "Active",
  },
};

/** Small automation-workflow card used in hero compositions. */
export default function AutomationCard({ lang = "es", className }) {
  const t = T[lang];
  return (
    <div
      className={cn(
        "w-56 rounded-xl border border-[#E5E1D6] bg-white p-4 text-left shadow-[0_20px_40px_-16px_rgba(12,18,32,0.25)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[#171C29]">{t.title}</p>
        <span className="flex items-center gap-1.5 rounded-full bg-[#EDF2FF] px-2 py-0.5 text-[9px] font-medium text-[#2B59FF]">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#2B59FF]" />
          {t.status}
        </span>
      </div>
      <div className="mt-3.5 space-y-2">
        {t.steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px]",
                i === t.steps.length - 1
                  ? "bg-[#2B59FF] text-white"
                  : "border border-[#D9D5C8] text-[#9A94A6]"
              )}
            >
              {i + 1}
            </span>
            <p className="text-[11px] text-[#4A5164]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}