/**
 * Nafureanu — contact intake (Vercel Serverless Function, Node runtime).
 *
 * The site is a static Vite build on Vercel; this is the only server-side
 * piece. It receives the project brief as JSON, validates it, applies light
 * abuse protection and hands it to a delivery service over HTTPS.
 *
 * Nothing about the inbox reaches the browser. Configuration lives only in
 * Vercel environment variables (Project → Settings → Environment Variables):
 *   WEB3FORMS_ACCESS_KEY  Web3Forms key; the inbox is bound to the key on
 *                         web3forms.com (the channel the previous site used)
 *   RESEND_API_KEY + CONTACT_TO (+ optional CONTACT_FROM)  alternative
 *                         transport through Resend, used when set
 * With neither configured the endpoint answers 503 and nothing is sent.
 * Nothing from the message is logged.
 */
const MAX_BODY = 16384;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const MIN_ELAPSED_MS = 2500;
const LIMITS = { name: 120, company: 160, email: 200, need: 4000, problem: 4000, result: 4000 };
const ALLOWED = ["name", "company", "email", "need", "problem", "result", "lang", "website", "elapsed"];
const STRINGS = ["name", "company", "email", "need", "problem", "result", "lang", "website"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESEND_URL = process.env.RESEND_API_URL || "https://api.resend.com/emails";
const WEB3FORMS_URL = process.env.WEB3FORMS_API_URL || "https://api.web3forms.com/submit";

/** Best-effort sliding window per client address (per function instance). */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const times = (hits.get(ip) || []).filter((t) => t > now - RATE_WINDOW_MS);
  if (times.length >= RATE_MAX) {
    hits.set(ip, times);
    return true;
  }
  times.push(now);
  hits.set(ip, times);
  if (hits.size > 5000) hits.clear();
  return false;
}

/** Trim, normalise line breaks and drop control characters (keeps \n and \t). */
const clean = (v) => String(v).replace(/\r\n?/g, "\n").replace(/[^\P{C}\n\t]+/gu, "").trim();
/** One line, nothing that could open a new header. */
const headerSafe = (v) => String(v).replace(/[\r\n\t"<>]+/g, " ").trim();

function readBody(req) {
  if (req.body !== undefined) {
    if (typeof req.body === "string") {
      try { return JSON.parse(req.body); } catch { return null; }
    }
    return req.body;
  }
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => { raw += chunk; if (raw.length > MAX_BODY + 1) req.destroy(); });
    req.on("end", () => { try { resolve(JSON.parse(raw)); } catch { resolve(null); } });
    req.on("error", () => resolve(null));
  });
}

const LABELS = {
  es: { subject: "Nuevo proyecto", name: "Nombre", company: "Empresa", email: "Email de contacto", need: "Qué necesita construir", problem: "Problema que quiere resolver", result: "Resultado esperado", lang: "Enviado desde", time: "Recibido", none: "—", langName: "Español (/contact)" },
  en: { subject: "New project", name: "Name", company: "Company", email: "Contact email", need: "What they need to build", problem: "Problem they want to solve", result: "Expected result", lang: "Sent from", time: "Received", none: "—", langName: "English (/en/contact)" },
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  const reply = (status, body) => res.status(status).json(body);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(405, { ok: false, error: "method" });
  }
  if (!String(req.headers["content-type"] || "").toLowerCase().startsWith("application/json")) {
    return reply(415, { ok: false, error: "content_type" });
  }
  // same-origin only: the form lives on this site
  const fetchSite = req.headers["sec-fetch-site"];
  if (fetchSite && !["same-origin", "none"].includes(fetchSite)) return reply(403, { ok: false, error: "origin" });
  const origin = req.headers.origin;
  if (origin) {
    let originHost = "";
    try { originHost = new URL(origin).hostname; } catch { originHost = ""; }
    const host = String(req.headers.host || "").replace(/:\d+$/, "");
    if (!originHost || originHost.toLowerCase() !== host.toLowerCase()) return reply(403, { ok: false, error: "origin" });
  }
  if (Number(req.headers["content-length"] || 0) > MAX_BODY) return reply(413, { ok: false, error: "too_large" });

  const data = await readBody(req);
  if (!data || typeof data !== "object" || Array.isArray(data)) return reply(400, { ok: false, error: "payload" });
  for (const key of Object.keys(data)) if (!ALLOWED.includes(key)) return reply(400, { ok: false, error: "payload" });
  for (const key of STRINGS) if (data[key] !== undefined && typeof data[key] !== "string") return reply(400, { ok: false, error: "payload" });

  // abuse: honeypot and fill time, answered as if accepted
  const elapsed = Number(data.elapsed);
  if ((data.website || "") !== "" || !Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS) return reply(200, { ok: true });

  const name = clean(data.name || "");
  const company = clean(data.company || "");
  const email = clean(data.email || "");
  const need = clean(data.need || "");
  const problem = clean(data.problem || "");
  const result = clean(data.result || "");
  const lang = data.lang === "en" ? "en" : "es";

  const fields = {};
  if (name.length < 2) fields.name = "required";
  else if (name.length > LIMITS.name) fields.name = "too_long";
  if (!email) fields.email = "required";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email) || /\s/.test(email)) fields.email = "invalid";
  if (need.length < 10) fields.need = "required";
  else if (need.length > LIMITS.need) fields.need = "too_long";
  if (company.length > LIMITS.company) fields.company = "too_long";
  if (problem.length > LIMITS.problem) fields.problem = "too_long";
  if (result.length > LIMITS.result) fields.result = "too_long";
  if (Object.keys(fields).length) return reply(422, { ok: false, error: "validation", fields });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
  if (rateLimited(ip)) return reply(429, { ok: false, error: "rate_limited" });

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const w3Key = process.env.WEB3FORMS_ACCESS_KEY;
  const viaResend = Boolean(resendKey && to && EMAIL_RE.test(to));
  if (!viaResend && !w3Key) return reply(503, { ok: false, error: "not_configured" });

  const L = LABELS[lang];
  const received = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
  const text = [
    `${L.name}: ${name}`,
    `${L.company}: ${company || L.none}`,
    `${L.email}: ${email}`,
    "",
    `${L.need}:`,
    need,
    "",
    `${L.problem}:`,
    problem || L.none,
    "",
    `${L.result}:`,
    result || L.none,
    "",
    "—",
    `${L.lang}: ${L.langName}`,
    `${L.time}: ${received}`,
  ].join("\n");

  const subject = `${L.subject} · ${headerSafe(name)}`;
  let sent = false;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    if (viaResend) {
      const from = process.env.CONTACT_FROM || "Nafureanu <onboarding@resend.dev>";
      const r = await fetch(RESEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
        signal: ctrl.signal,
      });
      sent = r.ok;
    } else {
      const r = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: w3Key, subject, from_name: "Nafureanu Web", name, email, replyto: email, message: text }),
        signal: ctrl.signal,
      });
      const out = await r.json().catch(() => null);
      sent = r.ok && Boolean(out && out.success);
    }
    clearTimeout(timer);
  } catch {
    sent = false;
  }
  if (!sent) return reply(502, { ok: false, error: "send_failed" });
  return reply(200, { ok: true });
}
