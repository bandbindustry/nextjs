"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { staggerContainer, clipUp, fadeIn } from "@/lib/motion";

export default function HeroBlackSection() {
  const words = ["Engineering", "Excellence", "at", "Every", "Scale"];

  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Breathing glow — smaller + repositioned on mobile */}
      <motion.div
        className="absolute rounded-full blur-[100px] md:blur-[140px] pointer-events-none"
        style={{
          background: "var(--color-accent)",
          width: "clamp(200px, 50vw, 500px)",
          height: "clamp(200px, 50vw, 500px)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10 w-full pt-28 pb-24 md:py-32">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow mb-4 md:mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Precision Manufacturing
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold leading-none mb-5 md:mb-6"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6.5rem)" }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.15em] md:mr-[0.2em] overflow-hidden"
            >
              <motion.span
                className="inline-block"
                variants={clipUp}
                style={{
                  color:
                    word === "Excellence"
                      ? "var(--color-accent)"
                      : "var(--color-text)",
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base md:text-lg max-w-md md:max-w-xl mb-8 md:mb-10 leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
        >
          B and B Industries delivers precision-engineered industrial solutions
          trusted across Gujarat and beyond.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <Button
            href="/products"
            variant="primary"
            className="w-full sm:w-auto"
          >
            Explore Products
          </Button>
          <Button
            href="/contact"
            variant="outline"
            className="w-full sm:w-auto"
          >
            Get a Quote
          </Button>
        </motion.div>

        {/* Scroll indicator — hidden on mobile, visible md+ */}
        <motion.div
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 }}
        >
          <span className="eyebrow" style={{ marginBottom: 0 }}>
            Scroll
          </span>
          <div
            className="w-px h-10 overflow-hidden relative"
            style={{ background: "var(--color-border)" }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ height: "40%", background: "var(--color-accent)" }}
              animate={{ scaleY: [0, 1, 0], transformOrigin: "top" }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
