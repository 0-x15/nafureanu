/**
 * vercel.json is generated from the route manifest so the redirects never
 * drift from SERVICES/PROJECTS. Locally the file is rewritten; on Vercel
 * (where routing already came from the committed file) a stale file fails
 * the build with instructions.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export function buildVercelConfig(server) {
  return {
    $schema: "https://openapi.vercel.sh/vercel.json",
    framework: "vite",
    outputDirectory: "dist",
    cleanUrls: true,
    trailingSlash: false,
    redirects: [
      { source: "/(.*)", has: [{ type: "host", value: "www.nafureanu.com" }], destination: "https://nafureanu.com/$1", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      ...server.ALIASES.map((alias) => ({ source: alias.from, destination: alias.to, permanent: true })),
    ],
    headers: [
      { source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }] },
    ],
  };
}

export async function syncVercelConfig(server, { root }) {
  const file = join(root, "vercel.json");
  const generated = buildVercelConfig(server);
  const next = `${JSON.stringify(generated, null, 2)}\n`;
  const current = await readFile(file, "utf8").catch(() => null);
  if (current === null) {
    /* Vercel builds from the uploaded sources; if the file is not among them, routing already came from the deployed config. */
    if (process.env.VERCEL || process.env.CI) { console.warn("vercel.json not present in the build source; skipping the manifest check"); return; }
    await writeFile(file, next);
    console.log("vercel.json generated from the route manifest — commit it");
    return;
  }
  let parsed = null;
  try { parsed = JSON.parse(current); } catch { parsed = null; }
  if (parsed && JSON.stringify(parsed) === JSON.stringify(generated)) return;
  if (process.env.VERCEL || process.env.CI) {
    const have = parsed ? (parsed.redirects || []).map((r) => `${r.source} → ${r.destination}`) : ["<unparseable>"];
    const want = generated.redirects.map((r) => `${r.source} → ${r.destination}`);
    console.error("vercel.json differs from the route manifest.\n  file:", have.join("; "), "\n  manifest:", want.join("; "));
    throw new Error("vercel.json is out of date with the route manifest: run `npm run build` locally and commit vercel.json");
  }
  await writeFile(file, next);
  console.log("vercel.json regenerated from the route manifest — commit it");
}
