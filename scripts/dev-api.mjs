/**
 * Runs api/contact.js locally on port 8794 with a minimal Vercel-style
 * request/response shim, so `npm run dev` (which proxies /api there) can
 * exercise the real function. Provide the same environment variables as
 * in Vercel:  CONTACT_TO=… RESEND_API_KEY=… node scripts/dev-api.mjs
 */
import { createServer } from "node:http";
import handler from "../api/contact.js";

const PORT = Number(process.env.PORT || 8794);
createServer((req, res) => {
  let raw = "";
  req.on("data", (c) => { raw += c; });
  req.on("end", async () => {
    if (String(req.headers["content-type"] || "").startsWith("application/json") && raw) {
      try { req.body = JSON.parse(raw); } catch { res.writeHead(400, { "Content-Type": "application/json" }); res.end('{"ok":false,"error":"payload"}'); return; }
    }
    const shim = Object.assign(res, {
      status(code) { res.statusCode = code; return shim; },
      json(body) { res.setHeader("Content-Type", "application/json; charset=utf-8"); res.end(JSON.stringify(body)); return shim; },
    });
    if (!req.url.startsWith("/api/contact")) { res.writeHead(404); res.end(); return; }
    try { await handler(req, shim); } catch { res.writeHead(500, { "Content-Type": "application/json" }); res.end('{"ok":false,"error":"internal"}'); }
  });
}).listen(PORT, "127.0.0.1", () => console.log(`contact function on http://127.0.0.1:${PORT}/api/contact`));
