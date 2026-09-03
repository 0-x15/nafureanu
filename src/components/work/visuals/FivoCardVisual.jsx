const T = {
  es: {
    secure: "Pago seguro",
    item: "Suscripción anual",
    pay: "Pagar",
    networks: "9 redes",
  },
  en: {
    secure: "Secure payment",
    item: "Annual subscription",
    pay: "Pay",
    networks: "9 networks",
  },
};

/** Compact stablecoin-checkout fragment for the Fivo project card. */
export default function FivoCardVisual({ lang = "es" }) {
  const t = T[lang];
  return (
    <div className="w-full max-w-[230px] overflow-hidden rounded-lg border border-[#E5E1D6] bg-white text-left shadow-[0_12px_28px_-14px_rgba(12,18,32,0.25)]">
      <div className="flex items-center justify-between border-b border-[#EFEBE0] bg-[#F9F7F2] px-3 py-1.5">
        <span className="font-heading text-[11px] font-bold text-[#171C29]">fivo</span>
        <span className="text-[8px] text-[#9A94A6]">{t.secure}</span>
      </div>
      <div className="p-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[9px] text-[#9A94A6]">{t.item}</span>
          <span className="font-heading text-[11px] font-bold text-[#171C29]">€ 189,00</span>
        </div>
        <div className="mt-2.5 flex gap-1.5">
          <span className="flex-1 rounded-md border border-[#3157F6] bg-[#EDF2FF] py-1 text-center text-[9px] font-semibold text-[#3157F6]">
            USDC
          </span>
          <span className="flex-1 rounded-md border border-[#EFEBE0] py-1 text-center text-[9px] font-medium text-[#8A8FA0]">
            EURC
          </span>
        </div>
        <div className="mt-2.5 rounded-md bg-[#3157F6] py-1.5 text-center text-[10px] font-medium text-white">
          {t.pay} 189,00 USDC
        </div>
        <div className="mt-2 flex items-center justify-between text-[7px] text-[#9A94A6]">
          <span>Base</span>
          <span>{t.networks}</span>
        </div>
      </div>
    </div>
  );
}