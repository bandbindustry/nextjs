"use client";

/**
 * LenisController
 *
 * Initialises Lenis smooth-scroll with a `prevent` callback that tells Lenis
 * to skip any element (or descendant) marked with [data-lenis-prevent].
 *
 * Add  data-lenis-prevent  to any scroll container that must receive native
 * wheel / trackpad events (e.g. the QuoteModal body div).  Lenis will leave
 * those elements alone while still providing smooth scroll everywhere else.
 *
 * This is the correct Lenis v1.x pattern — lenis.stop() only pauses the
 * animation but Lenis still intercepts wheel events, so the modal body
 * would never receive them.
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisController() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Skip elements that carry [data-lenis-prevent] (or are inside one).
      // This lets the modal's overflow-y-auto container receive wheel events
      // natively without Lenis intercepting them.
      prevent: (node: Element) => !!node.closest("[data-lenis-prevent]"),
    });

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}
