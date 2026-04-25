"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { staggerContainer, clipUp, fadeIn } from "@/lib/motion";

const BG_IMAGE = "/images/homeHero/Making_the_case_for_tube_laser.jpeg";

// ─── Typing phrases ───────────────────────────────────────────────────────────
const TYPING_PHRASES = [
  "We are manufacturer in Rajkot",
  "Precision laser cutting solutions",
];

// ─── TypingText component ─────────────────────────────────────────────────────
function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      // Typing
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        55,
      );
    } else if (!isDeleting && displayed.length === current.length) {
      // Pause at full word
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        30,
      );
    } else {
      // Move to next phrase — defer to avoid synchronous setState in effect
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <span className="inline-flex items-center gap-0.5">
      <span style={{ color: "rgba(255,255,255,0.85)" }}>{displayed}</span>
      {/* Blinking cursor */}
      <motion.span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          background: "var(--color-accent)",
          borderRadius: "1px",
          verticalAlign: "middle",
        }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
    </span>
  );
}

export default function HeroSection() {
  const words = ["Engineering", "Excellence", "at", "Every", "Scale"];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY, scale: 1.1 }}
      >
        <Image
          src={BG_IMAGE}
          alt="CNC laser cutting metal sheet"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ── Overlays ── */}

      {/* Base dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.35)" }}
      />

      {/* Bottom-up — text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Left vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 65%)",
        }}
      />

      {/* ── Warm glow matching the spark color ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          background: "rgba(255, 120, 30, 0.18)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          bottom: "-15%",
          right: "15%",
          filter: "blur(120px)",
        }}
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <Container className="pt-28 pb-24 md:py-36">
          {/* Eyebrow */}
          {/* <motion.div
            className="flex items-center gap-3 mb-3 md:mb-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <span
              className="h-px w-8 shrink-0"
              style={{ background: "var(--color-accent)" }}
            />
            <p className="eyebrow" style={{ marginBottom: 0 }}>
              Precision Manufacturing
            </p>
          </motion.div> */}

          {/* Typing text */}
          <motion.div
            className="mb-5 md:mb-7"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
          >
            <p
              className="font-display font-semibold"
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
                letterSpacing: "0.02em",
              }}
            >
              <TypingText />
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display font-bold leading-none mb-5 md:mb-7"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)" }}
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
                      word === "Excellence" ? "var(--color-accent)" : "#ffffff",
                    textShadow: "0 2px 24px rgba(0,0,0,0.6)",
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
            style={{ color: "rgba(255,255,255,0.6)" }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
          >
            B and B Industries delivers precision-engineered industrial
            solutions trusted across Gujarat and beyond.
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

          {/* Trust strip */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mt-10 md:mt-14"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.85 }}
          >
            {["ISO Certified", "60+ Clients", "Pan-India Delivery"].map(
              (badge, i) => (
                <div key={badge} className="flex items-center gap-4">
                  <span
                    className="text-xs font-display uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {badge}
                  </span>
                  {i < 3 && (
                    <span
                      className="w-px h-3 shrink-0"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    />
                  )}
                </div>
              ),
            )}
          </motion.div>
        </Container>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      >
        <span
          className="eyebrow"
          style={{ marginBottom: 0, color: "rgba(255,255,255,0.25)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10 overflow-hidden relative"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ height: "40%", background: "var(--color-accent)" }}
            animate={{ scaleY: [0, 1, 0], transformOrigin: "top" }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
