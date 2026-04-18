"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

type AnimationType =
  | "fadeUp"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "lineReveal";

interface ScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
}

/**
 * Returns a ref that triggers a CSS-class-based reveal when the element
 * enters the viewport. Framer Motion's useInView drives the visibility;
 * the actual animation is handled by the caller (AnimatedSection /
 * AnimatedLine) via motion variants.
 *
 * We keep the same public API so existing callers don't need changes.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {},
) {
  const ref = useRef<T>(null);
  const { once = true, margin = "-80px 0px" } = options;

  // useInView attaches to ref internally; we expose ref to the caller.
  // The return value (isInView) is unused here — AnimatedSection /
  // AnimatedLine use their own useInView calls directly.
  useInView(ref, { once, margin: margin as `${number}px ${number}px` });

  return ref;
}
