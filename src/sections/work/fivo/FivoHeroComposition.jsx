import { Shot } from "./fivoBits";

/**
 * The hero visual — real Fivo surfaces on one controlled stage:
 *
 *   LARGE   the light demo store with the Fivo button in the cart (crisp 2x capture)
 *   MAIN    checkout with network selection, tall, front-left
 *   SMALL   completed-payment state, front-right
 *   CHIP    a settlement note, top-right of the dashboard
 *
 * Desktop is an absolute composition on a fixed-ratio stage; phones
 * get a stacked layout with the same three surfaces.
 */
export default function FivoHeroComposition({ c }) {
  const alt = c.composition;
  return (
    <div className="relative">
      {/* Stage — the common ground of the group */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[2%] -top-6 bottom-2 rounded-[24px] border border-white/90 bg-[linear-gradient(160deg,#EEF3FF_0%,#F8F7F3_55%,#EEF3FF_100%)] shadow-[0_50px_120px_-60px_rgba(49,87,246,0.35)] md:-top-10 md:bottom-6"
      />

      {/* Desktop composition */}
      <div className="relative hidden md:block md:aspect-[16/7.2]">
        <div className="absolute left-[27%] top-[4%] w-[56%]">
          <Shot id="demo-store-light" alt={alt.store} priority className="rounded-2xl shadow-[0_40px_90px_-40px_rgba(12,18,32,0.35)]" />
        </div>
        <div className="absolute left-[8%] top-[8%] w-[20%]">
          <Shot id="checkout-network" alt={alt.checkout} priority className="rounded-2xl shadow-[0_44px_90px_-34px_rgba(12,18,32,0.4)]" />
        </div>
        <div className="absolute right-[6%] top-[46%] w-[22%]">
          <Shot id="checkout-complete" alt={alt.complete} priority className="rounded-2xl shadow-[0_40px_80px_-30px_rgba(12,18,32,0.4)]" />
        </div>
        <div className="absolute right-[9%] -top-5 flex items-center gap-3 rounded-xl border border-[#E1E5EF] bg-white/95 px-4 py-2.5 shadow-[0_18px_40px_-20px_rgba(12,18,32,0.3)] backdrop-blur">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{alt.settle.label}</p>
            <p className="text-xs font-semibold text-foreground">
              {alt.settle.value} <span className="font-normal text-muted-foreground">· {alt.settle.status}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Phone / tablet-portrait composition */}
      <div className="relative space-y-4 pt-2 md:hidden">
        <Shot id="demo-store-light" alt={alt.store} priority className="rounded-xl" />
        <div className="grid grid-cols-2 items-start gap-4">
          <Shot id="checkout-network" alt={alt.checkout} className="rounded-xl" />
          <Shot id="checkout-complete" alt={alt.complete} className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}
