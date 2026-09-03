import { Phone, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const T = {
  es: {
    label: "WhatsApp",
    incoming: "Entrante",
    call: "Llamada · Seguimiento",
    alert: "Alerta · Tarea",
  },
  en: {
    label: "WhatsApp",
    incoming: "Incoming",
    call: "Call · Follow-up",
    alert: "Alert · Task",
  },
};

/**
 * Hero overlay — a small communication / task product fragment: an
 * incoming WhatsApp message with its linked call and task rows.
 */
export default function CrmCommsFragment({ lang = "es", className = "" }) {
  const t = T[lang];

  return (
    <div
      className={cn(
        "w-56 overflow-hidden rounded-xl border border-[#E5E1D6] bg-white/95 text-left shadow-[0_22px_44px_-16px_rgba(12,18,32,0.3)] backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#EFEBE0] px-4 py-2.5">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#3157F6]"
        />
        <p className="flex-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#4A5164]">
          {t.label}
        </p>
        <span className="rounded-full bg-[#EDF2FF] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-[#3157F6]">
          {t.incoming}
        </span>
      </div>

      <div className="px-4 py-3">
        {/* Incoming message — abstract, language-neutral */}
        <div className="rounded-md bg-[#F4F7FB] px-2.5 py-2.5">
          <span
            aria-hidden="true"
            className="block h-1.5 w-11/12 rounded-full bg-[#E3E8F2]"
          />
          <span
            aria-hidden="true"
            className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-[#E3E8F2]"
          />
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <Phone
              aria-hidden="true"
              className="h-3 w-3 shrink-0 text-[#3157F6]"
            />
            <span className="text-[10px] font-medium text-[#171C29]">
              {t.call}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bell
              aria-hidden="true"
              className="h-3 w-3 shrink-0 text-[#9A94A6]"
            />
            <span className="text-[10px] font-medium text-[#4A5164]">
              {t.alert}
            </span>
            <span
              aria-hidden="true"
              className="ml-auto h-1 w-8 rounded-full bg-[#E3E8F2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}