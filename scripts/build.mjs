/**
 * The production build: client bundle → server bundle → static HTML for
 * every public URL → validation. `npm run build` runs this; a fresh clone
 * only needs `npm install && npm run build`. Any route that cannot be
 * rendered or validated fails the build.
 */
import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import { prerender } from "./prerender.mjs";
import { validateOutput } from "./validate-seo.mjs";
import { syncVercelConfig } from "./vercel-config.mjs";

process.env.NODE_ENV = "production";
const root = resolve(new URL("..", import.meta.url).pathname);
const serverDir = resolve(root, "dist-server");

try {
  await build({ root, configFile: resolve(root, "vite.config.js"), logLevel: "info" });
  await build({ root, configFile: resolve(root, "vite.config.js"), logLevel: "warn", build: { ssr: "src/entry-server.jsx", outDir: serverDir, emptyOutDir: true } });
  const server = await import(pathToFileURL(resolve(serverDir, "entry-server.js")).href);
  await syncVercelConfig(server, { root });
  const pages = await prerender(server, { dist: resolve(root, "dist") });
  await validateOutput(pages, server, { root });
} finally {
  await rm(serverDir, { recursive: true, force: true });
}
