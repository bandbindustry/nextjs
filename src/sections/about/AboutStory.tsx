"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { FiTarget, FiEye, FiCheckCircle } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const missionPoints = [
  "Deliver precision-engineered components with consistent quality and reliability.",
  "Support industrial clients with responsive manufacturing and on-time delivery.",
  "Build long-term partnerships through technical expertise and transparent service.",
];

const visionPoints = [
  "Become a globally trusted name in precision manufacturing and engineered solutions.",
  "Advance with smarter processes, better technology, and continuous innovation.",
  "Set new benchmarks for quality, efficiency, and customer confidence in the industry.",
];

interface CardProps {
  icon: React.ReactNode;
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
  inView: boolean;
  delay: number;
}

function MissionVisionCard({
  icon,
  eyebrow,
  heading,
  body,
  points,
  inView,
  delay,
}: CardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col h-full rounded-sm p-8"
      style={{
        background: "var(--color-light-bg)",
        border: "1px solid var(--color-light-border)",
      }}
    >
      {/* Icon + eyebrow */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 shrink-0 rounded-sm flex items-center justify-center"
          style={{
            background: "var(--color-light-surface-2)",
            border: "1px solid var(--color-light-border)",
          }}
        >
          {icon}
        </div>
        <div>
          <p
            className="font-display uppercase mb-1"
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: "var(--color-light-faint)",
            }}
          >
            {eyebrow}
          </p>
          <h3
            className="font-display font-bold leading-snug"
            style={{ fontSize: "1.15rem", color: "var(--color-light-text)" }}
          >
            {heading}
          </h3>
        </div>
      </div>

      {/* Accent line */}
      <motion.div
        className="rounded-full mb-5"
        style={{
          height: "2px",
          background: "var(--color-light-accent)",
          width: 0,
          opacity: 0.6,
        }}
        animate={inView ? { width: "40px" } : { width: 0 }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      />

      {/* Body */}
      <p
        className="text-sm leading-relaxed mb-6"
        style={{ color: "var(--color-light-muted)" }}
      >
        {body}
      </p>

      {/* Points */}
      <ul className="space-y-3 mt-auto">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 text-sm"
            style={{ color: "var(--color-light-muted)" }}
          >
            <FiCheckCircle
              size={15}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--color-light-accent)" }}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="section-pad section-light">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span
              className="h-px w-8"
              // style={{ background: "var(--color-light-accent)", opacity: 0.4 }}
            />
            <span
              className="font-display uppercase font-semibold"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--color-light-faint)",
              }}
            >
              Who We Are
            </span>
            <span
              className="h-px w-8"
              style={{ background: "var(--color-light-accent)", opacity: 0.4 }}
            />
          </div>

          <h2
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
              color: "var(--color-light-text)",
            }}
          >
            Engineering Growth{" "}
            <span style={{ color: "var(--color-light-accent)", opacity: 0.7 }}>
              With Purpose & Precision
            </span>
          </h2>

          <p
            className="text-sm leading-relaxed mt-4 mx-auto"
            style={{ color: "var(--color-light-muted)", maxWidth: "54ch" }}
          >
            Our work is guided by a clear mission for today and a long-term
            vision for the future — driving us to deliver dependable
            manufacturing solutions while continuously raising our standards.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <MissionVisionCard
            icon={
              <FiTarget
                size={20}
                style={{ color: "var(--color-light-accent)" }}
              />
            }
            eyebrow="Our Mission"
            heading="Deliver manufacturing excellence every day"
            body="To provide precision-engineered products and dependable industrial solutions that help our clients operate with confidence, efficiency, and consistency."
            points={missionPoints}
            inView={inView}
            delay={0.35}
          />

          <MissionVisionCard
            icon={
              <FiEye size={20} style={{ color: "var(--color-light-accent)" }} />
            }
            eyebrow="Our Vision"
            heading="Shape the future of precision engineering"
            body="To be recognized as a trusted global manufacturing partner known for innovation, uncompromising quality, and long-term value creation."
            points={visionPoints}
            inView={inView}
            delay={0.5}
          />
        </motion.div>
      </Container>
    </section>
  );
}
