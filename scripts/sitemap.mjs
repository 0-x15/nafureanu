/**
 * sitemap.xml, generated from the route manifest at build time: every
 * canonical ES and EN URL once, each with its reciprocal es / en / x-default
 * alternates (x-default = the Spanish page). No lastmod: there is no
 * reliable per-page modification date to publish.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const DOMAIN = "https://nafureanu.com";
const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function sitemapXml(publicUrls) {
  const entries = publicUrls.map(({ route, path }) => {
    const es = DOMAIN + route.paths.es;
    const en = DOMAIN + route.paths.en;
    return [
      "  <url>",
      `    <loc>${esc(DOMAIN + path)}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="es" href="${esc(es)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${esc(en)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(es)}"/>`,
      "  </url>",
    ].join("\n");
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}

export async function writeSitemap(server, { dist }) {
  const xml = sitemapXml(server.PUBLIC_URLS);
  await writeFile(join(dist, "sitemap.xml"), xml);
  console.log(`sitemap.xml generated: ${server.PUBLIC_URLS.length} URLs`);
  return xml;
}
