import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import CoreScene from "./CoreScene";
import Fallback from "./Fallback";

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Nafureanu System Core wrapper: WebGL detection, mobile simplification
 * and reduced-motion handling. Rendered as its own lazy chunk.
 */
export default function SystemCore({ progressRef, pointerRef }) {
  const [supported] = useState(detectWebGL);
  const [simplified] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(pointer: coarse)").matches)
  );
  const reduced = useReducedMotion();

  if (!supported) return <Fallback />;
  return (
    <CoreScene
      simplified={simplified}
      progressRef={progressRef}
      pointerRef={pointerRef}
      reduced={reduced}
    />
  );
}