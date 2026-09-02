import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { SITE } from "@/data/site";
import { STRINGS, langPath, otherLang } from "@/i18n";
import { usePageMeta } from "@/lib/seo";

const inputCls =
  "border-b border-[#121212] bg-transparent px-1 py-0.5 font-heading font-medium placeholder:text-[#B9B9B5] focus:border-[#E63946] focus:outline-none";

export default function Contact({ lang = "es" }) {
  const s = STRINGS[lang];
  const c = s.contact;
  usePageMeta({
    lang,
    title: s.meta.contact.title,
    description: s.meta.contact.description,
    path: langPath(lang, "/contact"),
    alternatePath: langPath(otherLang(lang), "/contact"),
  });

  const [form, setForm] = useState({ name: "", need: "", outcome: "", email: "" });
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const statement = `${c.s1a} ${form.name || "…"} ${c.s1b} ${form.need || "…"} ${c.s1c} ${
    form.outcome || "…"
  }. ${c.s2} ${form.email || "…"}.`;

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError(c.error);
      return;
    }
    setError("");
    const subject = `${c.subjectPrefix} — ${form.name}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(statement)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(statement);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(c.errorCopy);
    }
  };

  return (
    <>
      <section className="px-5 pt-36 md:px-10 md:pt-48" aria-labelledby="contact-title">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          <span className="text-[#E63946]">{c.kicker.split(" — ")[0]}</span> —{" "}
          {c.kicker.split(" — ")[1]}
        </p>
        <h1
          id="contact-title"
          className="mt-8 font-heading text-6xl font-bold uppercase tracking-[-0.02em] md:text-8xl"
        >
          {c.h1}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5C5C58] md:text-lg">
          {c.sub}
        </p>

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12">
          <form onSubmit={submit} noValidate className="md:col-span-8">
            <p className="font-heading text-2xl font-medium leading-[1.7] md:text-4xl">
              {c.s1a}{" "}
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder={c.phName}
                aria-label={c.phName}
                autoComplete="name"
                className={`w-44 ${inputCls}`}
              />{" "}
              {c.s1b}{" "}
              <input
                type="text"
                value={form.need}
                onChange={set("need")}
                placeholder={c.phNeed}
                aria-label={c.ariaNeed}
                className={`w-64 ${inputCls}`}
              />{" "}
              {c.s1c}{" "}
              <input
                type="text"
                value={form.outcome}
                onChange={set("outcome")}
                placeholder={c.phOutcome}
                aria-label={c.ariaOutcome}
                className={`w-64 ${inputCls}`}
              />
              .
            </p>
            <p className="mt-8 font-heading text-2xl font-medium leading-[1.7] md:text-4xl">
              {c.s2}{" "}
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder={c.phEmail}
                aria-label={c.ariaEmail}
                autoComplete="email"
                className={`w-64 ${inputCls}`}
              />
              .
            </p>

            {error && (
              <p role="alert" className="mt-6 font-mono text-xs text-[#E63946]">
                {error}
              </p>
            )}

            <div className="mt-14 flex flex-wrap items-center gap-8">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#121212] px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-[#F9F9F7] transition-colors hover:bg-[#E63946]"
              >
                {c.send} <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#848482] transition-colors hover:text-[#121212]"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[#E63946]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? c.copied : c.copy}
              </button>
            </div>
          </form>

          <aside className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
              {c.nextKicker}
            </p>
            <ol className="mt-6 space-y-4">
              {c.steps.map((step, i) => (
                <li key={step} className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-[#E63946]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-[#5C5C58]">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
              {c.emailKicker}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 inline-block font-mono text-sm underline underline-offset-4 transition-colors hover:text-[#E63946]"
            >
              {SITE.email}
            </a>
          </aside>
        </div>
      </section>

      <section className="mt-24 border-t border-[#E0E0DE] px-5 py-16 md:px-10 md:py-24" aria-label="Studio note">
        <p className="max-w-2xl font-heading text-2xl font-bold leading-[1.4] tracking-[-0.02em] md:text-4xl">
          {c.studioTitle}
        </p>
      </section>
    </>
  );
}