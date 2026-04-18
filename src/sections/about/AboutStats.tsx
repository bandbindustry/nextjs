"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { aboutStats } from "@/data/about";

const EASE = [0.16, 1, 0.3, 1] as const;
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Container>
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {aboutStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center justify-center text-center py-10 px-4"
              style={{
                borderRight:
                  i < aboutStats.length - 1
                    ? "1px solid var(--color-border)"
                    : "none",
              }}
            >
              <span
                className="font-display font-black mb-2"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  color: "var(--color-text)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                className="font-display uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "var(--color-text-faint)",
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
