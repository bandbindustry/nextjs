"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedLine from "@/components/ui/AnimatedLine";
import { staggerContainer, clipUp, fadeIn } from "@/lib/motion";

export default function ContactHero() {
  const words = ["Let's", "Work", "Together"];

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
        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Get in Touch
        </motion.p>

        {/* Headline — staggered word clip-up */}
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
                    word === "Together"
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
          Have a project in mind? Tell us about it. Our team will get back to
          you within 24 hours with a tailored response.
        </motion.p>
      </Container>
    </section>
  );
}
