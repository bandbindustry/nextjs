"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";
import { fadeUp, fadeLeft, fadeRight } from "@/lib/motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  /** kept for API compatibility — ignored (no scrub in Framer Motion) */
  scrub?: boolean;
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const variantMap = { up: fadeUp, left: fadeLeft, right: fadeRight };
  const base = variantMap[direction];

  // Inject delay into the transition without mutating the shared variant object
  const variants = {
    hidden: base.hidden,
    visible: {
      ...base.visible,
      transition: {
        ...(base.visible as { transition?: object }).transition,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
