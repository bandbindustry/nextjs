"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function AboutCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{
        background: "var(--color-light-surface)",
        borderTop: "1px solid var(--color-light-border)",
      }}
    >
      {/* ── Dot grid texture ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* ── Faint corner cross marks ── */}
      <div
        aria-hidden="true"
        className="absolute top-6 left-6 pointer-events-none"
        style={{ opacity: 0.15 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="10"
            x2="20"
            y2="10"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-6 right-6 pointer-events-none"
        style={{ opacity: 0.15 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="10"
            x2="20"
            y2="10"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-6 pointer-events-none"
        style={{ opacity: 0.15 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="10"
            x2="20"
            y2="10"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-6 right-6 pointer-events-none"
        style={{ opacity: 0.15 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="20"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="10"
            x2="20"
            y2="10"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ── Content ── */}
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-2xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span
              className="h-px w-8"
              style={{ background: "var(--color-light-accent)", opacity: 0.4 }}
            />
            <span
              className="eyebrow"
              style={{ margin: 0, color: "var(--color-light-faint)" }}
            >
              Manufacturer & Direct Seller
            </span>
            <span
              className="h-px w-8"
              style={{ background: "var(--color-light-accent)", opacity: 0.4 }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
              color: "var(--color-light-text)",
            }}
          >
            Find the Right Laser Cutting{" "}
            <span
              style={{
                color: "var(--color-light-accent)",
                borderBottom: "2px solid var(--color-light-accent)",
                paddingBottom: "2px",
              }}
            >
              Machine for You
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--color-light-muted)" }}
          >
            B&amp;B Industries manufactures and sells fiber laser cutting
            machines, tube laser cutters, and sheet metal laser systems — built
            in Gujarat, shipped across India and beyond. Share your cutting
            requirements and our team will recommend the right machine and
            configuration within 24 hours.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/contact" variant="primary" theme="light">
              Request a Machine Quote <FiArrowRight size={13} />
            </Button>
            <Button href="/products" variant="outline" theme="light">
              View Our Machines
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
