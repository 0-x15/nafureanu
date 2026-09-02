import { cn } from "@/lib/utils";

const T = {
  es: {
    url: "fivo · checkout",
    secure: "Pago seguro",
    item: "Suscripción anual",
    method: "Método de pago",
    network: "Red",
    pay: "Pagar",
    verify: "Verificación on-chain",
    settle: "Liquidación automática",
    salesTitle: "Liquidaciones",
    salesStatus: "On-chain · Completada",
    networks: "9 redes",
  },
  en: {
    url: "fivo · checkout",
    secure: "Secure payment",
    item: "Annual subscription",
    method: "Payment method",
    network: "Network",
    pay: "Pay",
    verify: "On-chain verification",
    settle: "Automatic settlement",
    salesTitle: "Settlements",
    salesStatus: "On-chain · Completed",
    networks: "9 networks",
  },
};

/** Nine settlement networks, subtle cobalt dots. */
const DOTS = [
  "bg-[#2B59FF]",
  "bg-[#2B59FF]/80",
  "bg-[#2B59FF]/65",
  "bg-[#2B59FF]/55",
  "bg-[#2B59FF]/45",
  "bg-[#2B59FF]/38",
  "bg-[#2B59FF]/32",
  "bg-[#2B59FF]/26",
  "bg-[#2B59FF]/20",
];

/**
 * Fivo product mockup — stablecoin checkout with the settlement
 * status card floating alongside. Pure CSS, no images.
 */
export default function FivoCheckout({
  lang = "es",
  className,
  bare = false,
}) {
  const t = T[lang];

  return (
    <div className={cn("relative", className)}>
      <div className="w-full max-w-[340px] overflow-hidden rounded-xl border border-[#E5E1D6] bg-white text-left shadow-[0_30px_60px_-20px_rgba(12,18,32,0.25)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-[#EFEBE0] bg-[#F9F7F2] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3DFD2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3DFD2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3DFD2]" />
          </div>
          <span className="rounded-md bg-white px-3 py-1 text-[10px] text-[#9A94A6]">
            {t.url}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between">
            <p className="font-heading text-base font-bold tracking-tight text-[#171C29]">
              fivo
            </p>
            <span className="text-[10px] text-[#9A94A6]">{t.secure}</span>
          </div>

          {/* Order line */}
          <div className="mt-4 flex items-baseline justify-between border-b border-[#EFEBE0] pb-4">
            <div>
              <p className="text-xs font-medium text-[#171C29]">{t.item}</p>
              <p className="text-[10px] text-[#9A94A6]">EURC · Base</p>
            </div>
            <p className="font-heading text-sm font-bold text-[#171C29]">€ 189,00</p>
          </div>

          {/* Method */}
          <p className="mt-4 text-[10px] font-medium uppercase tracking-wider text-[#9A94A6]">
            {t.method}
          </p>
          <div className="mt-2 flex gap-2">
            <span className="flex-1 rounded-lg border border-[#2B59FF] bg-[#EDF2FF] px-3 py-2 text-center text-xs font-semibold text-[#2B59FF]">
              USDC
            </span>
            <span className="flex-1 rounded-lg border border-[#EFEBE0] px-3 py-2 text-center text-xs font-medium text-[#8A8FA0]">
              EURC
            </span>
          </div>

          {/* Network */}
          <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-[#9A94A6]">
            {t.network}
          </p>
          <span className="mt-2 flex w-full items-center justify-between rounded-lg border border-[#EFEBE0] px-3 py-2 text-xs text-[#4A5164]">
            Base
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2B59FF]" />
          </span>

          {/* Pay button */}
          <div className="mt-4 w-full rounded-lg bg-[#2B59FF] py-2.5 text-center text-sm font-medium text-white">
            {t.pay} 189,00 USDC
          </div>

          <div className="mt-3.5 flex justify-between text-[9px] text-[#9A94A6]">
            <span>{t.verify}</span>
            <span>{t.settle}</span>
          </div>
        </div>
      </div>

      {/* Settlement status card */}
      {!bare && (
      <div className="absolute -bottom-6 -left-10 hidden w-44 rounded-xl border border-[#E5E1D6] bg-white p-4 text-left shadow-[0_20px_40px_-16px_rgba(12,18,32,0.3)] md:block lg:-left-16">
        <p className="text-[10px] text-[#9A94A6]">{t.salesTitle}</p>
        <p className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-[#171C29]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2B59FF]" />
          {t.salesStatus}
        </p>
        <div className="mt-3 flex gap-1">
          {DOTS.map((dot, i) => (
            <span key={i} aria-hidden="true" className={cn("h-2 w-2 rounded-full", dot)} />
          ))}
        </div>
        <p className="mt-2 text-[9px] text-[#9A94A6]">{t.networks}</p>
      </div>
      )}
    </div>
  );
}