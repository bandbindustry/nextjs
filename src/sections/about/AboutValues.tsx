"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { values } from "@/data/about";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function AboutValues() {
  const headRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const listInView = useInView(listRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{
        borderTop: "1px solid var(--color-light-border)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* ── Left — sticky heading ── */}
          <motion.div
            ref={headRef}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="h-px w-8 shrink-0"
                style={{
                  background: "var(--color-light-accent)",
                  opacity: 0.4,
                }}
              />
              <span
                className="eyebrow"
                style={{ margin: 0, color: "var(--color-light-faint)" }}
              >
                What We Stand For
              </span>
            </div>

            <h2
              className="font-display font-bold leading-tight mb-5"
              style={{
                fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
                color: "var(--color-light-text)",
              }}
            >
              Our Core
              <br />
              <span style={{ color: "var(--color-light-accent)" }}>Values</span>
            </h2>

            <motion.div
              className="rounded-full mb-6"
              style={{
                height: "3px",
                background: "var(--color-light-accent)",
                width: 0,
              }}
              animate={headInView ? { width: "48px" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            />

            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--color-light-muted)",
                maxWidth: "36ch",
              }}
            >
              These aren&apos;t just words on a wall — they&apos;re the
              principles that shape every decision we make on the shop floor.
            </p>

            {/* Total count */}
            <div
              className="mt-8 inline-flex items-baseline gap-1"
              style={{ color: "var(--color-light-faint)" }}
            >
              <span
                className="font-display font-black"
                style={{
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  color: "var(--color-light-accent)",
                  opacity: 0.2,
                }}
              >
                {String(values.length).padStart(2, "0")}
              </span>
              <span
                className="font-display uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.18em" }}
              >
                Principles
              </span>
            </div>
          </motion.div>

          {/* ── Right — numbered list ── */}
          <motion.div
            ref={listRef}
            className="lg:col-span-8 flex flex-col"
            variants={stagger}
            initial="hidden"
            animate={listInView ? "visible" : "hidden"}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="group relative flex gap-6 py-8"
                style={{
                  borderBottom: "1px solid var(--color-light-border)",
                }}
                whileHover={{ x: 4, transition: { duration: 0.2, ease: EASE } }}
              >
                {/* Hover accent left rule */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
                  style={{ background: "var(--color-light-accent)" }}
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />

                {/* Number */}
                <div className="relative shrink-0 w-12 pt-0.5">
                  <span
                    className="font-display font-black"
                    style={{
                      fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                      lineHeight: 1,
                      color: "var(--color-light-accent)",
                      opacity: 0.12,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    {/* Icon */}
                    <span
                      className="text-xl mt-0.5 shrink-0"
                      style={{ color: "var(--color-light-accent)" }}
                    >
                      {v.icon}
                    </span>

                    <h3
                      className="font-display font-bold"
                      style={{
                        fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                        color: "var(--color-light-text)",
                        lineHeight: 1.2,
                      }}
                    >
                      {v.title}
                    </h3>
                  </div>

                  {/* Thin rule */}
                  <div
                    className="mb-3 h-px ml-9"
                    style={{ background: "var(--color-light-border)" }}
                  />

                  <p
                    className="text-sm leading-relaxed ml-9"
                    style={{
                      color: "var(--color-light-muted)",
                      maxWidth: "58ch",
                    }}
                  >
                    {v.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
