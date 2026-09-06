import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";

/** The closing question, on the site's own ground so the exhibition dissolves into it. */
export default function Outro({ lang = "es", c }) {
  const o = c.exhibition.outro;
  return (
    <section className="wpx-outro" aria-labelledby="wpx-outro-title">
      <div className="wpx-outro-in">
        <h2 id="wpx-outro-title" className="wpx-outro-q">{o.question}</h2>
        <p className="wpx-outro-copy">{o.copy}</p>
        <div className="wpx-outro-actions">
          <ActionLink to={langPath(lang, "/contact")} size="lg">{o.primary}</ActionLink>
          <ActionLink to={langPath(lang, "/work")} variant="secondary" icon="right" size="lg">{o.secondary}</ActionLink>
        </div>
      </div>
    </section>
  );
}
