// src/sections/about/AboutTeam.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { team } from "@/data/about";

const EASE = [0.16, 1, 0.3, 1] as const;
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function AboutTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <Container>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8"
              style={{ background: "var(--color-accent)" }}
            />
            <span className="eyebrow" style={{ margin: 0 }}>
              Leadership
            </span>
            <span
              className="h-px w-8"
              style={{ background: "var(--color-accent)" }}
            />
          </div>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
              color: "var(--color-text)",
            }}
          >
            The Team Behind the Work
          </h2>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              className="flex flex-col rounded-sm overflow-hidden"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-5">
                <p
                  className="font-display font-bold text-base mb-0.5"
                  style={{ color: "var(--color-text)" }}
                >
                  {member.name}
                </p>
                <p
                  className="font-display uppercase mb-3"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "var(--color-accent)",
                  }}
                >
                  {member.role}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
