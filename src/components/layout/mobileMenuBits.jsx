import { cn } from "@/lib/utils";

/** Shared vocabulary of the mobile navigation: one easing, mono labels, one focus ring, the current-page mark. */
export const EASE = [0.22, 1, 0.36, 1];
export const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
export const FOCUS = "rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background";
export const pad = (n) => String(n).padStart(2, "0");

/**
 * The structural marker of the current page: a short cobalt segment
 * standing in the gutter beside the row — a piece of the N, locked in.
 */
export function CurrentMark({ className = "" }) {
  return <span aria-hidden="true" className={cn("absolute -left-3 top-1/2 h-[1.1em] w-[3px] -translate-y-1/2 bg-accent", className)} />;
}
