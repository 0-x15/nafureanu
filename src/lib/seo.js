import { useEffect } from "react";

const setAttr = (el, attr, value) => {
  if (el) el.setAttribute(attr, value);
};

/**
 * Per-page SEO: updates title, description, Open Graph / Twitter metadata
 * and the canonical URL (nafureanu.com + route path).
 */
export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      const head = document.head;
      setAttr(head.querySelector('meta[property="og:title"]'), "content", title);
      setAttr(head.querySelector('meta[name="twitter:title"]'), "content", title);
    }
    if (description) {
      const head = document.head;
      setAttr(head.querySelector('meta[name="description"]'), "content", description);
      setAttr(head.querySelector('meta[property="og:description"]'), "content", description);
      setAttr(head.querySelector('meta[name="twitter:description"]'), "content", description);
    }
    if (path !== undefined) {
      setAttr(
        document.head.querySelector('link[rel="canonical"]'),
        "href",
        `https://nafureanu.com${path}`
      );
    }
  }, [title, description, path]);
}