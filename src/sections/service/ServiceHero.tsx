"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const stats = [
  { value: "24/7", label: "Support" },
  { value: "48hr", label: "Response Time" },
  { value: "Pan-IN", label: "Coverage" },
  { value: "OEM", label: "Spare Parts" },
];

export default function ServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const overlayO = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.82]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-end overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* ── Parallax image ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: imageY }}
      >
        <img
          src="https://picsum.photos/seed/bnb-service-hero/1600/900"
          alt=""
          aria-hidden="true"
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* ── Dark overlays ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,1)", opacity: overlayO }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%)",
        }}
      />

      {/* ── Fine grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Left accent rule ── */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
        style={{ background: "var(--color-accent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
      />

      {/* ── Content ── */}
      <Container className="relative z-10 pb-20 pt-40">
        <motion.div style={{ y: contentY }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <motion.div
              variants={slideIn}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-sm"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--color-accent)" }}
              />
              <span
                className="font-display uppercase font-semibold"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "var(--color-accent)",
                }}
              >
                After-Sales Service
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-black leading-[0.95] mb-6 tracking-tight"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                color: "var(--color-text)",
              }}
            >
              We Don&apos;t Just
              <br />
              <span
                className="relative inline-block"
                style={{ color: "var(--color-accent)" }}
              >
                Build It
                <motion.span
                  className="absolute left-0 bottom-1 h-[3px] rounded-full"
                  style={{ background: "var(--color-accent)", width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
                />
              </span>
              {" — "}
              <br className="hidden md:block" />
              <span
                style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}
              >
                We Back It.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed mb-12"
              style={{ color: "rgba(255,255,255,0.6)", maxWidth: "50ch" }}
            >
              Our commitment doesn&apos;t end at delivery. B &amp; B Industries
              provides round-the-clock support, fast spare parts, and regional
              service engineers — so your production never stops.
            </motion.p>

            {/* ── Stat strip ── */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap hidden items-center gap-px overflow-hidden rounded-sm w-fit"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center px-7 py-4"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    borderRight:
                      i < stats.length - 1
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "none",
                  }}
                >
                  <span
                    className="font-display font-black"
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--color-accent)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-display uppercase mt-1"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-14 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div
                className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
                style={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                <motion.div
                  className="w-1 h-1.5 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span
                className="font-display uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Explore our services
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
