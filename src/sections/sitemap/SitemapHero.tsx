"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedLine from "@/components/ui/AnimatedLine";
import { staggerContainer, clipUp, fadeIn } from "@/lib/motion";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function SitemapHero() {
  const words = ["Site", "Map"];

  return (
    <section
      className="relative pt-40 pb-24 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative z-10">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-1.5 mb-5"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.05 }}
        >
          <Link
            href="/"
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.05em",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
            }}
          >
            Home
          </Link>
          <FiChevronRight size={11} color="var(--color-text-faint)" />
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-faint)",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.05em",
            }}
          >
            Sitemap
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          All Pages
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold leading-none mb-6"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block mr-[0.2em] overflow-hidden">
              <motion.span
                className="inline-block"
                variants={clipUp}
                style={{
                  color:
                    word === "Map"
                      ? "var(--color-accent)"
                      : "var(--color-text)",
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <AnimatedLine className="mb-6 w-20" />

        {/* Subtitle */}
        <motion.p
          className="text-lg max-w-lg leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
        >
          A complete overview of every page on the B and B Industries website —
          from our products to support resources.
        </motion.p>
      </Container>
    </section>
  );
}
