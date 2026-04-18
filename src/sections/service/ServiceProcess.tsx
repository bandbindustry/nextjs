"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { serviceProcess } from "@/data/service";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

export default function ServiceProcess() {
  const headRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const lineInView = useInView(lineRef, { once: true, margin: "-80px 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <Container>
        {/* ── Heading ── */}
        <motion.div
          ref={headRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
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
              How It Works
            </span>
            <span
              className="h-px w-8 shrink-0"
              style={{
                background: "var(--color-light-accent)",
                opacity: 0.4,
              }}
            />
          </div>

          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
              color: "var(--color-light-text)",
            }}
          >
            Our{" "}
            <span style={{ color: "var(--color-light-accent)" }}>
              Service Process
            </span>
          </h2>

          <motion.div
            className="mx-auto rounded-full mt-4"
            style={{
              height: "3px",
              background: "var(--color-light-accent)",
              width: 0,
            }}
            animate={headInView ? { width: "64px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          />
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={lineRef} className="relative">
          {/* ── Connecting line — desktop only ── */}
          <div
            className="hidden lg:block absolute top-[2.35rem] left-0 right-0 h-px z-0"
            style={{ background: "var(--color-light-border)" }}
          >
            {/* Animated fill */}
            <motion.div
              className="absolute inset-y-0 left-0 h-full"
              style={{ background: "var(--color-light-accent)", opacity: 0.35 }}
              initial={{ width: "0%" }}
              animate={lineInView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            />
          </div>

          {/* ── Steps ── */}
          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10"
            variants={stagger}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
          >
            {serviceProcess.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="group flex flex-col"
              >
                {/* Node row */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Circle node */}
                  <motion.div
                    className="relative shrink-0 w-[4.7rem] h-[4.7rem] rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--color-light-bg)",
                      border: "1.5px solid var(--color-light-border)",
                    }}
                    whileHover={{
                      borderColor: "var(--color-light-accent)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Inner accent ring on hover */}
                    <motion.div
                      className="absolute inset-[5px] rounded-full"
                      style={{ background: "var(--color-light-accent)" }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileHover={{ opacity: 0.08, scale: 1 }}
                      transition={{ duration: 0.25 }}
                    />

                    {/* Step number */}
                    <span
                      className="font-display font-black leading-none"
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--color-light-text)",
                      }}
                    >
                      {step.step}
                    </span>

                    {/* Accent dot bottom center */}
                    <span
                      className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        background: "var(--color-light-accent)",
                        borderColor: "var(--color-light-bg)",
                      }}
                    />
                  </motion.div>

                  {/* Step index label */}
                  <span
                    className="font-display uppercase hidden sm:block lg:hidden"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      color: "var(--color-light-faint)",
                    }}
                  >
                    Step {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="flex-1 p-5 rounded-sm relative overflow-hidden"
                  style={{
                    background: "var(--color-light-bg)",
                    border: "1px solid var(--color-light-border)",
                  }}
                >
                  {/* Top accent line on hover */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                    style={{ background: "var(--color-light-accent)" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />

                  {/* Watermark */}
                  <span
                    className="absolute -bottom-2 -right-1 font-display font-black select-none pointer-events-none"
                    style={{
                      fontSize: "5rem",
                      lineHeight: 1,
                      color: "var(--color-light-accent)",
                      opacity: 0.05,
                    }}
                  >
                    {step.step}
                  </span>

                  <h3
                    className="font-display font-bold mb-2 relative z-10"
                    style={{
                      fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                      color: "var(--color-light-text)",
                    }}
                  >
                    {step.title}
                  </h3>

                  <div
                    className="h-px mb-3"
                    style={{ background: "var(--color-light-border)" }}
                  />

                  <p
                    className="text-sm leading-relaxed relative z-10"
                    style={{ color: "var(--color-light-muted)" }}
                  >
                    {step.description}
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
