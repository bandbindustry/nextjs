"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export function useCounterAnimation(target: number, suffix = "") {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const duration = 2000; // ms
    const startTime = performance.now();
    const startVal = 0;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);

      if (ref.current) {
        ref.current.textContent = current + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, target, suffix]);

  return ref;
}
