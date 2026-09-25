/**
 * Checks the static output of every public URL: one title, description,
 * canonical, hreflang trio, language, H1, real content and one truthful
 * JSON-LD graph about that page — and that the generated sitemap lists
 * every canonical URL once with reciprocal alternates. Fails the build on
 * any critical error.
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
    /* structured data: exactly one parseable graph, about this page, truthful */
    const scripts = [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    if (scripts.length !== 1) fail(`expected exactly one JSON-LD script, found ${scripts.length}`);
    else {
      let graph = null;
      try { graph = JSON.parse(scripts[0]); } catch { fail("JSON-LD does not parse"); }
      if (graph) {
        const nodes = Array.isArray(graph["@graph"]) ? graph["@graph"] : [];
        if (!nodes.length) fail("JSON-LD has no @graph");
        const pageNode = nodes.find((n) => n["@id"] === `${seo.canonical}#webpage`);
        if (!pageNode) fail("no WebPage node for this canonical");
        else {
          if (pageNode.url !== seo.canonical) fail("WebPage url ≠ canonical");
          if (pageNode.inLanguage !== page.lang) fail("WebPage inLanguage ≠ page language");
        }
        const services = nodes.filter((n) => n["@type"] === "Service");
        if (seo.type === "service" ? services.length !== 1 : services.length !== 0) fail(`Service nodes: ${services.length} on a ${seo.type} page`);
        if (services[0] && services[0]["@id"] !== `${seo.canonical}#service`) fail("Service @id ≠ canonical#service");
        const org = nodes.find((n) => n["@type"] === "Organization");
        if (!org || org["@id"] !== "https://nafureanu.com/#organization") fail("Organization node missing or wrong @id");
        for (const n of nodes) if (typeof n["@id"] === "string" && /^https:\/\/nafureanu\.com\//.test(n["@id"]) && !n["@id"].startsWith(seo.canonical) && !/#(organization|website)$/.test(n["@id"])) fail(`node from another route: ${n["@id"]}`);
        const forbidden = new Set(["email", "telephone", "faxNumber", "address", "contactPoint", "aggregateRating", "review", "reviews", "offers", "price", "priceRange", "sameAs", "foundingDate", "numberOfEmployees", "award", "openingHours", "areaServed"]);
        const walk = (v, path) => { if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`)); else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) { if (forbidden.has(k)) fail(`forbidden property ${k} at ${path}`); walk(x, `${path}.${k}`); } else if (typeof v === "string" && /[\w.+-]+@[\w-]+\.[\w.]+/.test(v)) fail(`email address in JSON-LD at ${path}`); };
        walk(graph, "$");
      }
    }
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
  /* sitemap: generated from the manifest — every canonical URL once, reciprocal alternates, nothing else */
  try {
    const sitemap = await readFile(join(root, "dist", "sitemap.xml"), "utf8");
    const publicUrls = server.PUBLIC_URLS;
    const blocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    const locs = blocks.map((b) => (b.match(/<loc>([^<]+)<\/loc>/) || [])[1]);
    const expected = new Map(publicUrls.map((u) => ["https://nafureanu.com" + u.path, u]));
    if (blocks.length !== publicUrls.length) failures.push(`sitemap has ${blocks.length} URLs, manifest has ${publicUrls.length}`);
    if (new Set(locs).size !== locs.length) failures.push("sitemap lists a URL more than once");
    if (/<lastmod>|<priority>|<changefreq>/.test(sitemap)) failures.push("sitemap carries lastmod/priority/changefreq");
    if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>') || !sitemap.trim().endsWith("</urlset>")) failures.push("sitemap is not a well-formed urlset");
    const open = (sitemap.match(/<url>/g) || []).length; const close = (sitemap.match(/<\/url>/g) || []).length;
    if (open !== close) failures.push("sitemap <url> tags are unbalanced");
    blocks.forEach((b, i) => {
      const loc = locs[i]; const u = expected.get(loc);
      if (!u) { failures.push(`sitemap lists unknown URL ${loc}`); return; }
      const alt = Object.fromEntries([...b.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
      const es = "https://nafureanu.com" + u.route.paths.es; const en = "https://nafureanu.com" + u.route.paths.en;
      if (alt.es !== es || alt.en !== en || alt["x-default"] !== es || Object.keys(alt).length !== 3) failures.push(`sitemap alternates wrong for ${loc}`);
    });
    for (const [loc] of expected) if (!locs.includes(loc)) failures.push(`sitemap is missing ${loc}`);
    const aliases = new Set((server.ALIASES || []).map((a) => "https://nafureanu.com" + a.from));
    for (const loc of locs) if (aliases.has(loc)) failures.push(`sitemap lists a redirect alias ${loc}`);
  } catch (err) {
    failures.push(`sitemap not validated: ${err.message}`);
  }
  for (const w of warnings) console.warn(`seo warning: ${w}`);
  if (failures.length) {
    console.error(`\nSEO validation failed (${failures.length}):`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    throw new Error("SEO validation failed");
  }
  console.log(`seo validation passed: ${pages.length} pages`);
}
