import { useCallback, useEffect, useState } from "react";

let webglSupport;
function hasWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      webglSupport = false;
      return false;
    }
    /* A software rasteriser (SwiftShader, llvmpipe) cannot carry the
       scene at a good frame rate and mip-maps large textures badly. */
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    webglSupport = !/swiftshader|llvmpipe|softpipe|software/i.test(renderer);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const QUERIES = ["(min-width: 1024px)", "(hover: hover) and (pointer: fine)", "(prefers-reduced-motion: no-preference)"];

function detect() {
  if (typeof window === "undefined" || !window.matchMedia) return "gallery";
  return QUERIES.every((q) => window.matchMedia(q).matches) && hasWebGL() ? "immersive" : "gallery";
}

/**
 * "immersive" = wide screen, precise pointer, motion allowed, WebGL
 * available. Anything else (phones, tablets, reduced motion, no WebGL,
 * a runtime WebGL failure) gets the DOM gallery.
 */
export default function useExperienceMode() {
  const [mode, setMode] = useState(detect);
  const [forced, setForced] = useState(false);
  useEffect(() => {
    const lists = QUERIES.map((q) => window.matchMedia(q));
    const update = () => setMode(detect());
    lists.forEach((l) => l.addEventListener("change", update));
    return () => lists.forEach((l) => l.removeEventListener("change", update));
  }, []);
  const forceGallery = useCallback(() => setForced(true), []);
  return [forced ? "gallery" : mode, forceGallery];
}
