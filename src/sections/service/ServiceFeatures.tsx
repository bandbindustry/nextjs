"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { serviceFeatures } from "@/data/service";
import { FiHeadphones, FiPackage, FiUsers, FiBookOpen } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Top 3 stat cards
const statCards = [
  {
    stat: "24/7",
    title: "Remote Service",
    description:
      "Our team is available round-the-clock to provide uninterrupted support whenever you need it — no matter the time zone.",
  },
  {
    stat: "30min",
    title: "Rapid Response Time",
    description:
      "We pride ourselves on responding to your queries and concerns within 30 minutes, minimising disruptions to your production schedule.",
  },
  {
    stat: "500+",
    title: "Spare Part Warehouses",
    description:
      "Our spare part warehouses guarantee local availability and fast delivery of original components, ensuring optimal and stable performance.",
  },
];

// Bottom 2 icon cards
const iconCards = [
  {
    icon: FiHeadphones,
    title: "Dedicated Local After-Sales Team",
    description:
      "B & B Industries has professional after-sales teams deployed across Gujarat and beyond, safeguarding your interests and ensuring zero unresolved issues.",
  },
  {
    icon: FiBookOpen,
    title: "Comprehensive Training",
    description:
      "We conduct comprehensive training for service personnel to ensure they provide professional and consistent service to every customer.",
  },
];

export default function ServiceFeatures() {
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const bodyInView = useInView(bodyRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <Container>
        {/* ── Heading ── */}
        <motion.div
          ref={headRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
              color: "var(--color-light-text)",
            }}
          >
            Our Service Commitment
          </h2>
          <motion.div
            className="mx-auto rounded-full mt-4"
            style={{
              height: "3px",
              background: "var(--color-light-accent)",
              width: 0,
            }}
            animate={headInView ? { width: "64px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          />
        </motion.div>

        {/* ── Body ── */}
        <motion.div
          ref={bodyRef}
          className="flex flex-col gap-4"
          variants={stagger}
          initial="hidden"
          animate={bodyInView ? "visible" : "hidden"}
        >
          {/* Row 1 — 3 stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statCards.map((card) => (
              <motion.div
                key={card.stat}
                variants={fadeUp}
                className="group p-8 rounded-sm relative overflow-hidden"
                style={{
                  background: "var(--color-light-bg)",
                  border: "1px solid var(--color-light-border)",
                }}
                whileHover={{
                  borderColor: "var(--color-light-accent)",
                  transition: { duration: 0.2 },
                }}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  style={{ background: "var(--color-light-accent)" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {/* Big stat */}
                <div
                  className="font-display font-black mb-3 leading-none"
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                    color: "var(--color-light-text)",
                  }}
                >
                  {card.stat}
                </div>

                {/* Divider */}
                <div
                  className="h-px mb-4"
                  style={{ background: "var(--color-light-border)" }}
                />

                {/* Title */}
                <p
                  className="font-display font-semibold mb-2"
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    color: "var(--color-light-text)",
                  }}
                >
                  {card.title}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-light-muted)" }}
                >
                  {card.description}
                </p>

                {/* Watermark */}
                <span
                  className="absolute -bottom-3 -right-2 font-display font-black select-none pointer-events-none"
                  style={{
                    fontSize: "6rem",
                    lineHeight: 1,
                    color: "var(--color-light-accent)",
                    opacity: 0.04,
                  }}
                >
                  {card.stat}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Row 2 — 2 icon cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {iconCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className="group flex items-start gap-8 p-8 rounded-sm relative overflow-hidden"
                  style={{
                    background: "var(--color-light-bg)",
                    border: "1px solid var(--color-light-border)",
                  }}
                  whileHover={{
                    borderColor: "var(--color-light-accent)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                    style={{ background: "var(--color-light-accent)" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />

                  {/* Icon */}
                  <div
                    className="shrink-0 w-16 h-16 rounded-sm flex items-center justify-center"
                    style={{
                      border: "1.5px solid var(--color-light-border)",
                      background: "var(--color-light-surface)",
                      color: "var(--color-light-text)",
                    }}
                  >
                    <Icon size={28} strokeWidth={1.25} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-display font-semibold mb-2"
                      style={{
                        fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                        color: "var(--color-light-text)",
                      }}
                    >
                      {card.title}
                    </p>
                    <div
                      className="h-px mb-3"
                      style={{ background: "var(--color-light-border)" }}
                    />
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-light-muted)" }}
                    >
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
