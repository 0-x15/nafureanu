import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const getHashId = (hash) => {
  const rawId = hash.slice(1);

  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
};

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const first = useRef(true);

  useEffect(() => {
    const isFirst = first.current;
    first.current = false;
    /* A direct load with a hash: the browser scrolled before the app
       rendered, so scroll again once the target exists. Other POP
       navigations keep the browser's own restored position. */
    if (navigationType === "POP") {
      if (!(isFirst && hash)) return undefined;
      const id = getHashId(hash);
      const timers = [120, 600].map((ms) => window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" }), ms));
      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    if (hash) {
      const id = getHashId(hash);
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);

  return null;
}
