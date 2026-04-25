"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { staggerContainer, clipUp, fadeIn } from "@/lib/motion";

const BG_IMAGE = "/images/products/product-hero.jpeg";

export default function ProductsHero() {
  const words = ["Our", "Products"];

  return (
    <section className="relative pt-40 pb-24 overflow-hidden min-h-[420px]">
      {/* Background image */}
      <Image
        src={BG_IMAGE}
        alt="B and B Industries product range"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.58)" }}
      />

      {/* Bottom-up gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
        }}
      />

      {/* Left vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 60%)",
        }}
      />

      <Container className="relative z-10">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <span
            className="h-px w-8 shrink-0"
            style={{ background: "var(--color-accent)" }}
          />
          <p
            className="font-display font-semibold uppercase tracking-[0.2em]"
            style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)" }}
          >
            Precision Manufacturing
          </p>
        </motion.div>

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
                    word === "Products" ? "var(--color-accent)" : "#ffffff",
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg max-w-xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
        >
          Explore our full range of precision-engineered components, laser
          cutting machines, and industrial solutions — built to the highest
          standards and ready to ship across India.
        </motion.p>
      </Container>
    </section>
  );
}
