"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { fadeLeft, fadeRight } from "@/lib/motion";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

interface CtaSectionProps {
  /** "light" = white bg, black accent | "dark" = dark bg, white accent */
  pad?: "light" | "dark";
}

const promises = [
  "No-obligation custom quote",
  "Response within 24 hours",
  "Dedicated project engineer",
];

export default function CtaSection({ pad = "light" }: CtaSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const isLight = pad === "light";

  // ── Token aliases ─────────────────────────────────────────────────────────
  const T = {
    sectionBg: isLight ? "var(--color-light-bg)" : "var(--color-surface)",
    border: isLight ? "var(--color-light-border)" : "var(--color-border)",
    accent: isLight ? "var(--color-light-accent)" : "var(--color-accent)",
    accentHover: isLight
      ? "var(--color-light-accent-hover)"
      : "var(--color-accent-hover)",
    text: isLight ? "var(--color-light-text)" : "var(--color-text)",
    muted: isLight ? "var(--color-light-muted)" : "var(--color-text-muted)",
    faint: isLight ? "var(--color-light-faint)" : "var(--color-text-faint)",
    surface: isLight ? "var(--color-light-surface)" : "var(--color-surface-2)",
    surface2: isLight
      ? "var(--color-light-surface-2)"
      : "var(--color-surface-3)",
  };

  return (
    <section
      className="section-pad overflow-hidden"
      style={{
        background: T.sectionBg,
        borderTop: `1px solid ${T.border}`,
      }}
    >
      {/* ── Decorative dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, ${T.accent} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <Container>
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* ── LEFT: Copy ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="h-px w-8 shrink-0"
                style={{ background: T.accent }}
              />
              <span
                className="font-display font-semibold uppercase tracking-[0.2em]"
                style={{ fontSize: "0.7rem", color: T.faint }}
              >
                Let&apos;s Work Together
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-display font-bold leading-tight mb-5"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                color: T.text,
              }}
            >
              Ready to Start
              <br />
              <span style={{ color: T.accent }}>Your Project?</span>
            </h2>

            {/* Animated underline */}
            <motion.div
              className="rounded-full mb-6"
              style={{ height: "3px", width: 0, background: T.accent }}
              animate={isInView ? { width: "64px" } : { width: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Body */}
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: T.muted, maxWidth: "46ch" }}
            >
              Talk to our engineering team and get a custom quote tailored to
              your exact requirements — no obligation, no guesswork.
            </p>

            {/* Promise list */}
            <ul className="space-y-2.5 mb-10">
              {promises.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: T.text }}
                >
                  <FiCheckCircle
                    size={14}
                    className="shrink-0"
                    style={{ color: T.accent }}
                  />
                  {p}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" theme={pad}>
                Contact Us Today
              </Button>
              <Button href="/products" variant="outline" theme={pad}>
                Browse Products
              </Button>
            </div>
          </motion.div>

          {/* ── RIGHT: Visual card ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {/* Hero card */}
            <div
              className="relative rounded-sm overflow-hidden p-8 lg:p-10"
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
              }}
            >
              {/* Decorative large number */}
              <span
                className="absolute top-4 right-6 font-display font-black select-none pointer-events-none"
                style={{
                  fontSize: "clamp(5rem, 10vw, 8rem)",
                  lineHeight: 1,
                  color: T.accent,
                  opacity: 0.05,
                }}
              >
                B&B
              </span>

              <p
                className="font-display font-bold mb-2"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  color: T.text,
                }}
              >
                Why Choose B&B Industries?
              </p>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: T.muted, maxWidth: "38ch" }}
              >
                Over two decades of precision manufacturing — serving the most
                demanding industries with zero compromise on quality.
              </p>

              {/* CTA link */}
              <a
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-widest transition-opacity duration-200 hover:opacity-70"
                style={{ color: T.accent }}
              >
                Our Story <FiArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
