"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useModal } from "@/context/ModalContext";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import { staggerContainer, clipUp, fadeIn } from "@/lib/motion";

const STATS = [
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Retention" },
  { value: "12+", label: "Industries Served" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useModal();

  // Scroll-linked parallax for the BG watermark
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* ── BG watermark ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          overflow: "hidden",
          y: bgY,
          opacity: bgOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
      >
        <p
          className="font-display font-black"
          style={{
            fontSize: "clamp(9rem, 32vw, 32rem)",
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: "1px var(--color-border)",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          B&amp;B
        </p>
      </motion.div>

      {/* ── Horizontal lines ── */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "calc(50% - 280px)",
          height: "1px",
          background: "var(--color-border)",
          transformOrigin: "left center",
          zIndex: 2,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: "calc(50% - 280px)",
          height: "1px",
          background: "var(--color-border)",
          transformOrigin: "right center",
          zIndex: 2,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          zIndex: 3,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35 }}
        >
          <span
            style={{
              height: "1px",
              width: "32px",
              background: "var(--color-accent)",
              display: "block",
            }}
          />
          <p
            className="font-display uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "var(--color-text-faint)",
            }}
          >
            Precision Manufacturing
          </p>
          <span
            style={{
              height: "1px",
              width: "32px",
              background: "var(--color-accent)",
              display: "block",
            }}
          />
        </motion.div>

        {/* ── Headline ── */}
        {/* Row 1: B & B */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* B left */}
          <div style={{ overflow: "hidden" }}>
            <motion.span
              className="font-display font-black uppercase"
              variants={clipUp}
              style={{
                display: "block",
                fontSize: "clamp(4rem, 11vw, 10rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.88,
                color: "var(--color-text)",
              }}
            >
              B
            </motion.span>
          </div>

          {/* & accent */}
          <div style={{ overflow: "hidden" }}>
            <motion.span
              className="font-display font-black uppercase"
              variants={clipUp}
              style={{
                display: "block",
                fontSize: "clamp(4rem, 11vw, 10rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.88,
                color: "var(--color-accent)",
              }}
            >
              &amp;
            </motion.span>
          </div>

          {/* B right */}
          <div style={{ overflow: "hidden" }}>
            <motion.span
              className="font-display font-black uppercase"
              variants={clipUp}
              style={{
                display: "block",
                fontSize: "clamp(4rem, 11vw, 10rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.88,
                color: "var(--color-text)",
              }}
            >
              B
            </motion.span>
          </div>
        </motion.div>

        {/* Row 2: INDUSTRIES */}
        <div style={{ overflow: "hidden", marginTop: "4px" }}>
          <motion.span
            className="font-display font-black uppercase"
            variants={clipUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            style={{
              display: "block",
              fontSize: "clamp(1.6rem, 5vw, 4.5rem)",
              letterSpacing: "0.22em",
              lineHeight: 1.1,
              color: "var(--color-text)",
            }}
          >
            INDUSTRIES
          </motion.span>
        </div>

        {/* Subtitle */}
        <motion.p
          style={{
            marginTop: "28px",
            maxWidth: "500px",
            fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
            color: "var(--color-text-muted)",
            lineHeight: 1.8,
          }}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
        >
          Engineering components with unmatched precision — trusted by
          manufacturers, builders, and innovators across India.
        </motion.p>

        {/* CTA */}
        <motion.div
          style={{
            marginTop: "32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
          }}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.15 }}
        >
          <motion.button
            onClick={openModal}
            className="font-display font-semibold uppercase"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              fontSize: "13px",
              letterSpacing: "0.12em",
              background: "var(--color-accent)",
              color: "white",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Get a Quote <FiArrowRight size={14} />
          </motion.button>

          <Link
            href="/products"
            className="font-display font-semibold uppercase"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 28px",
              fontSize: "13px",
              letterSpacing: "0.12em",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-border)";
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-text-muted)";
            }}
          >
            View Products
          </Link>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "52px",
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "clamp(20px, 5vw, 60px)",
            padding: "0 32px",
            zIndex: 4,
          }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(20px, 5vw, 60px)",
              }}
            >
              <motion.div
                variants={fadeIn}
                transition={{ delay: 1.25 + i * 0.08 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  className="font-display font-black"
                  style={{
                    fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)",
                    color: "var(--color-text)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="font-display uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    color: "var(--color-text-faint)",
                  }}
                >
                  {s.label}
                </span>
              </motion.div>

              {/* Divider (not after last) */}
              {i < STATS.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "32px",
                    background: "var(--color-border)",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Scroll nudge */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "18px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            zIndex: 4,
          }}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
        >
          <FiArrowDown
            size={13}
            className="animate-bounce"
            style={{ color: "var(--color-text-faint)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
