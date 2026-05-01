"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedLine from "@/components/ui/AnimatedLine";
import { staggerContainer, clipUp, fadeIn } from "@/lib/motion";

const BG_IMAGE = "/images/contact/contact-hero.webp";

export default function ContactHero() {
  const words = ["Let's", "Work", "Together"];

  return (
    <section className="relative pt-40 pb-24 overflow-hidden min-h-[420px]">
      {/* Background image */}
      <Image
        src={BG_IMAGE}
        alt="Contact B&B Industries"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.62)" }}
      />

      {/* Bottom-up gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        }}
      />

      <Container className="relative z-10">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          style={{ color: "rgba(255,255,255,0.6)" }}
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
                    word === "Together" ? "var(--color-accent)" : "#ffffff",
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
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
          style={{ color: "rgba(255,255,255,0.65)" }}
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
