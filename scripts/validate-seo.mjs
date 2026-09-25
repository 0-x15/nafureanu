/**
 * Checks the static output of every public URL: one title, description,
 * canonical, hreflang trio, language, H1 and real content — and that the
 * sitemap does not list anything the manifest does not know. Fails the
 * build on any critical error.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const count = (html, re) => (html.match(re) || []).length;
const attr = (html, re) => { const m = html.match(re); return m ? unesc(m[1]) : null; };
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

/* A few identifying strings that must appear in the body of representative routes. */
const EXPECT = {
  "/": ["Software que elimina trabajo"],
  "/en": ["Software that removes work"],
  "/services": ["Qué construir depende de dónde está el problema"],
  "/services/software-a-medida": ["Cuando la herramienta que necesitas no existe"],
  "/en/services/custom-software": ["When the tool you need doesn"],
  "/services/ia-automatizacion": ["Automatizamos el trabajo"],
  "/work": ["Sistemas que ya están trabajando"],
  "/work/crm-inmobiliario": ["Cuando el CRM se adapta a la inmobiliaria"],
  "/en/work/real-estate-crm": ["When the CRM adapts to the agency"],
  "/about": ["Ingeniería de software con responsabilidad directa"],
  "/contact": ['id="contact-name"', "Cuéntanos qué necesitas construir"],
  "/en/contact": ['id="contact-name"'],
};

export async function validateOutput(pages, server, { root }) {
  const failures = [];
  const warnings = [];
  const homeTitle = server.seoForPath("/").title;
  const canonicals = new Map();
  const titles = new Map();
  const descriptions = new Map();
  for (const page of pages) {
    const html = await readFile(page.file, "utf8");
    const p = page.path;
    const fail = (msg) => failures.push(`${p}: ${msg}`);
    const seo = page.seo;
    /* metadata lives in <head>; inline SVGs in the body may carry their own <title> */
    const head = html.slice(0, html.indexOf("</head>"));
    const title = attr(head, /<title>([^<]*)<\/title>/);
    if (count(head, /<title>/g) !== 1) fail(`expected exactly one <title> in <head>, found ${count(head, /<title>/g)}`);
    if (title !== seo.title) fail(`title mismatch: ${JSON.stringify(title)} vs ${JSON.stringify(seo.title)}`);
    if (p !== "/" && title === homeTitle) fail("title is the Home title");
    if (titles.has(title)) fail(`title duplicates ${titles.get(title)}: ${JSON.stringify(title)}`);
    titles.set(title, p);
    if (count(head, /<meta name="description"/g) !== 1) fail("expected exactly one meta description");
    const desc = attr(head, /<meta name="description" content="([^"]*)"/);
    if (desc !== seo.description) fail("description mismatch");
    if (descriptions.has(desc)) fail(`description duplicates ${descriptions.get(desc)}`);
    descriptions.set(desc, p);
    const canon = count(head, /<link rel="canonical"/g);
    if (canon !== 1) fail(`expected exactly one canonical, found ${canon}`);
    const canonHref = attr(head, /<link rel="canonical" href="([^"]*)"/);
    if (canonHref !== seo.canonical) fail(`canonical ${canonHref} ≠ ${seo.canonical}`);
    if (canonicals.has(canonHref)) fail(`canonical also used by ${canonicals.get(canonHref)}`);
    canonicals.set(canonHref, p);
    const lang = attr(head, /<html lang="([a-z-]+)"/);
    if (lang !== page.lang) fail(`html lang ${lang} ≠ ${page.lang}`);
    for (const [code, expected] of [["es", seo.alternates.es], ["en", seo.alternates.en], ["x-default", seo.alternates.xDefault]]) {
      const re = new RegExp(`<link rel="alternate" hreflang="${code}" href="([^"]*)"`, "g");
      const n = count(head, re);
      if (n !== 1) fail(`expected exactly one hreflang=${code}, found ${n}`);
      const href = attr(head, new RegExp(`<link rel="alternate" hreflang="${code}" href="([^"]*)"`));
      if (href !== expected) fail(`hreflang=${code} ${href} ≠ ${expected}`);
    }
    if (count(head, /property="og:url"/g) !== 1) fail("expected exactly one og:url");
    if (attr(head, /property="og:url" content="([^"]*)"/) !== seo.canonical) fail("og:url ≠ canonical");
    if (count(head, /property="og:title"/g) !== 1) fail("expected exactly one og:title");
    if (attr(head, /property="og:locale" content="([^"]*)"/) !== seo.ogLocale) fail("og:locale mismatch");
    if (count(head, /property="og:locale"\s/g) !== 1) fail("expected exactly one og:locale");
    const ld = count(head, /application\/ld\+json/g);
    if (seo.type === "home" ? ld !== 1 : ld !== 0) fail(`unexpected JSON-LD count ${ld}`);
    const h1 = count(html, /<h1[\s>]/g);
    if (h1 !== 1) fail(`expected exactly one <h1>, found ${h1}`);
    const h1Text = text(html.match(/<h1[\s\S]*?<\/h1>/)?.[0] || "");
    if (h1Text.length < 3) fail("empty <h1>");
    const rootHtml = html.slice(html.indexOf('<div id="root">'), html.lastIndexOf("</body>"));
    const body = text(rootHtml);
    if (body.length < 1200) fail(`thin body: ${body.length} characters`);
    if (/class="min-h-screen" aria-hidden="true"><\/div>\s*<!--\/\$-->/.test(rootHtml) && body.length < 1200) fail("Suspense-only shell");
    if (/<template id="B:|\$RC\(/.test(html)) fail("streaming fallback markers in output");
    for (const needle of EXPECT[p] || []) if (!html.includes(needle) && !body.includes(needle)) fail(`expected content not found: ${needle}`);
  }
  /* sitemap: nothing stale, everything public present */
  try {
    const sitemap = await readFile(join(root, "public", "sitemap.xml"), "utf8");
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace("https://nafureanu.com", "") || "/");
    const known = new Set(pages.map((pg) => pg.path));
    for (const loc of locs) if (!known.has(loc)) failures.push(`sitemap lists ${loc}, which is not a public route`);
    for (const pg of pages) if (!locs.includes(pg.path)) warnings.push(`sitemap is missing ${pg.path}`);
  } catch (err) {
    warnings.push(`sitemap not checked: ${err.message}`);
  }
  for (const w of warnings) console.warn(`seo warning: ${w}`);
  if (failures.length) {
    console.error(`\nSEO validation failed (${failures.length}):`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    throw new Error("SEO validation failed");
  }
  console.log(`seo validation passed: ${pages.length} pages`);
}
