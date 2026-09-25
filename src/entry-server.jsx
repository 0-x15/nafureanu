import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppRoutes from "./AppRoutes";

/**
 * Build-time entry. `scripts/prerender.mjs` renders every public URL of
 * the route manifest through this function and writes static HTML; the
 * same route tree and SEO model as the browser, behind a
 * StaticRouter instead of a BrowserRouter.
 */
export { PUBLIC_URLS, ALIASES, normalizePath } from "@/data/routes";
export { seoForPath, notFoundSeo, headHtml } from "@/lib/seo";

/**
 * Starts a streaming render of one URL. The caller pipes the stream once
 * `onAllReady` fires, so lazy routes and Suspense boundaries are complete
 * in the output — no fallback shells.
 * @param {string} url
 * @param {import("react-dom/server").RenderToPipeableStreamOptions} options
 */
export function renderStream(url, options) {
  return renderToPipeableStream(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
    options
  );
}
