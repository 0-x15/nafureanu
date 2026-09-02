import { Bars, Chrome, Line, Panel } from "../visualBits";

/**
 * 05 — Digital products: the most design-oriented scene — layered
 * browser and mobile views in perspective, demonstrating craft.
 */
export default function DigitalProductsVisual() {
  return (
    <div className="relative h-full w-full">
      {/* editorial layout — behind */}
      <Panel className="absolute left-[4%] top-[6%] h-[52%] w-[54%] -rotate-6 opacity-80">
        <Line className="h-3 w-3/4 bg-foreground/20" />
        <div className="mt-3 space-y-2">
          <Line className="h-1.5 w-full" />
          <Line className="h-1.5 w-4/5" />
        </div>
        <div className="mt-4 h-[42%] rounded-lg bg-[linear-gradient(135deg,rgba(43,89,255,0.14),rgba(139,124,246,0.12))]" />
      </Panel>

      {/* mobile experience */}
      <Panel className="absolute bottom-[2%] right-[18%] h-[62%] w-[19%] rotate-3 p-2.5">
        <Line className="mx-auto h-1.5 w-8" />
        <div className="mt-3 space-y-2">
          <Line className="h-1.5 w-full" />
          <Line className="h-1.5 w-2/3" />
        </div>
        <div className="mt-3 h-[26%] rounded-md bg-[linear-gradient(135deg,rgba(43,89,255,0.16),rgba(139,124,246,0.14))]" />
        <Bars heights={[40, 65, 50, 85]} accentIndex={3} className="mt-3 h-8" />
      </Panel>

      {/* product view — front */}
      <Panel className="absolute right-[2%] top-[18%] h-[54%] w-[50%] rotate-2">
        <Chrome lineW="w-14" />
        <div className="mt-3 h-[40%] rounded-lg bg-[linear-gradient(135deg,rgba(43,89,255,0.15),rgba(139,124,246,0.13))]" />
        <div className="mt-3 space-y-2">
          <Line className="h-2 w-2/3 bg-foreground/20" />
          <Line className="h-1.5 w-1/2" />
        </div>
        <span className="mt-3 block h-2 w-16 rounded-full bg-accent" />
      </Panel>
    </div>
  );
}