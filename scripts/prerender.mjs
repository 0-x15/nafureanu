/**
 * Renders every public URL of the route manifest to static HTML.
 * The React tree streams through `renderStream`; the stream is only piped
 * once `onAllReady` fires, so lazy routes are complete in the output.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Writable } from "node:stream";

const RENDER_TIMEOUT_MS = 30000;

function renderUrl(server, url) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const errors = [];
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        callback();
      },
    });
    const timer = setTimeout(() => reject(new Error(`render timed out after ${RENDER_TIMEOUT_MS} ms`)), RENDER_TIMEOUT_MS);
    sink.on("finish", () => {
      clearTimeout(timer);
      if (errors.length) reject(errors[0]);
      else resolve(Buffer.concat(chunks).toString("utf8"));
    });
    sink.on("error", (err) => { clearTimeout(timer); reject(err); });
    const stream = server.renderStream(url, {
      onAllReady() { stream.pipe(sink); },
      onShellError(err) { clearTimeout(timer); reject(err); },
      onError(err) { errors.push(err instanceof Error ? err : new Error(String(err))); },
    });
  });
}

function compose(template, { lang, head, html }) {
  if (!/<html lang="[a-z-]+"/.test(template)) throw new Error("template: <html lang> not found");
  if (!template.includes("<!--app-head-->")) throw new Error("template: <!--app-head--> placeholder not found");
  if (!template.includes('<div id="root"></div>')) throw new Error('template: <div id="root"></div> not found');
  return template
    .replace(/<html lang="[a-z-]+"/, `<html lang="${lang}"`)
    .replace("<!--app-head-->", head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

const fileFor = (dist, path) => (path === "/" ? join(dist, "index.html") : join(dist, path.slice(1), "index.html"));

export async function prerender(server, { dist }) {
  const template = await readFile(join(dist, "index.html"), "utf8");
  const pages = [];
  for (const { path, lang } of server.PUBLIC_URLS) {
    const seo = server.seoForPath(path);
    if (!seo) throw new Error(`prerender ${path}: no SEO model for a public route`);
    let html;
    try {
      html = await renderUrl(server, path);
    } catch (err) {
      throw new Error(`prerender ${path}: ${err && err.stack ? err.stack : err}`);
    }
    if (!html || html.trim().length < 200) throw new Error(`prerender ${path}: empty render`);
    if (/<template id="B:|\$RC\(|<div hidden id="S:/.test(html)) throw new Error(`prerender ${path}: the render still contains a Suspense fallback shell`);
    const file = fileFor(dist, path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, compose(template, { lang, head: server.headHtml(seo), html }));
    pages.push({ path, lang, file, seo, html });
  }
  /* The 404 document: a static page without the application bundle, so an unknown URL never hydrates into a mismatched tree. */
  const notFound = server.notFoundSeo("es");
  const html404 = await renderUrl(server, "/__not-found__");
  const page404 = compose(template, { lang: "es", head: server.headHtml(notFound), html: html404 })
    .replace(/\s*<script type="module"[^>]*><\/script>/g, "")
    .replace(/\s*<link rel="modulepreload"[^>]*>/g, "");
  await writeFile(join(dist, "404.html"), page404);
  console.log(`prerendered ${pages.length} pages + 404.html`);
  return pages;
}
