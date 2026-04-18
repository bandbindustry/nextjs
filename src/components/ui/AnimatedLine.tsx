"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{
        height: "1px",
        background: "var(--color-border-hover)",
        transformOrigin: "left center",
      }}
    />
  );
}
