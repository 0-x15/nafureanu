import { useCallback, useEffect, useState } from "react";

/*
 * Header scroll behavior — compact on scroll, hide when reading
 * down, reveal instantly when scrolling up. State changes only on
 * threshold crossings (passive listener, movement epsilon), so
 * there is no per-pixel React work and no jitter.
 */
const COMPACT_AFTER = 80; // px scrolled → compact header
const HIDE_AFTER = 120; // below this the header is always visible
const DIRECTION_EPSILON = 8; // px of movement before a direction switch counts

export default function useHeaderScroll({ menuOpenRef, interactingRef }) {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);

  const reveal = useCallback(() => setHidden(false), []);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastDir = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      setCompact(y > COMPACT_AFTER);

      // Near the top the header is always visible.
      if (y <= HIDE_AFTER) {
        lastDir = 0;
        setHidden(false);
        return;
      }
      // Ignore very small movements — no direction jitter.
      if (Math.abs(delta) < DIRECTION_EPSILON) return;
      const dir = delta > 0 ? 1 : -1;
      if (dir === lastDir) return;
      lastDir = dir;

      if (dir < 0) {
        // Scrolling up → reveal immediately.
        setHidden(false);
      } else if (!menuOpenRef.current && !interactingRef.current) {
        // Scrolling down and nobody is using the header → hide.
        setHidden(true);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpenRef, interactingRef]);

  return { compact, hidden, reveal };
}