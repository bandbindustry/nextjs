"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { timeline } from "@/data/about";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

// ── Card ──────────────────────────────────────────────────────────────────────
function TimelineCard({
  item,
  index,
  isLeft,
}: {
  item: (typeof timeline)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={isLeft ? fadeLeft : fadeRight}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`relative p-6 rounded-sm group ${isLeft ? "md:mr-0" : "md:ml-0"}`}
      style={{
        background:
          "linear-gradient(160deg, var(--color-light-bg) 0%, var(--color-light-surface) 100%)",
        border: "1px solid var(--color-light-border)",
        maxWidth: "420px",
        width: "100%",
      }}
      whileHover={{
        borderColor: "var(--color-light-accent)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-sm origin-left"
        style={{ background: "var(--color-light-accent)" }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      {/* Watermark number */}
      <span
        className="absolute top-4 right-5 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: "3.5rem",
          lineHeight: 1,
          color: "var(--color-light-accent)",
          opacity: 0.07,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Year */}
      <span
        className="font-display font-black block mb-2"
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2rem)",
          color: "var(--color-light-accent)",
          lineHeight: 1,
        }}
      >
        {item.year}
      </span>

      {/* Title */}
      <h3
        className="font-display font-bold mb-3"
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
          color: "var(--color-light-text)",
        }}
      >
        {item.title}
      </h3>

      {/* Divider */}
      <div
        className="mb-3 h-px"
        style={{ background: "var(--color-light-border)" }}
      />

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-light-muted)" }}
      >
        {item.description}
      </p>
    </motion.div>
  );
}

// ── Animated centre line ──────────────────────────────────────────────────────
function CentreLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px overflow-hidden"
    >
      {/* Track */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--color-light-border)" }}
      />
      {/* Progress fill */}
      <motion.div
        className="absolute inset-x-0 top-0 origin-top"
        style={{
          scaleY,
          background: "var(--color-light-accent)",
          height: "100%",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AboutTimeline() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{
        borderTop: "1px solid var(--color-light-border)",
      }}
    >
      <Container>
        {/* Heading */}
        <motion.div
          ref={headRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8 shrink-0"
              style={{
                background: "var(--color-light-accent)",
                opacity: 0.4,
              }}
            />
            <span
              className="eyebrow"
              style={{ margin: 0, color: "var(--color-light-faint)" }}
            >
              Our Journey
            </span>
            <span
              className="h-px w-8 shrink-0"
              style={{
                background: "var(--color-light-accent)",
                opacity: 0.4,
              }}
            />
          </div>

          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
              color: "var(--color-light-text)",
            }}
          >
            25 Years in the Making
          </h2>

          <motion.div
            className="mx-auto rounded-full mt-4"
            style={{
              height: "3px",
              background: "var(--color-light-accent)",
              width: 0,
            }}
            animate={headInView ? { width: "64px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <CentreLine />

          <motion.div
            className="flex flex-col gap-8 md:gap-10"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-0"
                >
                  {/* Left slot */}
                  <div
                    className={
                      isLeft ? "md:pr-12 md:flex md:justify-end" : "md:pr-12"
                    }
                  >
                    {isLeft ? (
                      <TimelineCard item={item} index={i} isLeft={true} />
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {/* Centre dot */}
                  <motion.div
                    className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px 0px" }}
                    transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute w-6 h-6 rounded-full"
                      style={{
                        background:
                          "oklch(from var(--color-light-accent) l c h / 0.12)",
                        border:
                          "1px solid oklch(from var(--color-light-accent) l c h / 0.25)",
                      }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Dot */}
                    <div
                      className="w-3 h-3 rounded-full border-2 relative z-10"
                      style={{
                        background: "var(--color-light-accent)",
                        borderColor: "var(--color-light-bg)",
                      }}
                    />
                  </motion.div>

                  {/* Right slot */}
                  <div
                    className={
                      !isLeft ? "md:pl-12 md:flex md:justify-start" : "md:pl-12"
                    }
                  >
                    {!isLeft ? (
                      <TimelineCard item={item} index={i} isLeft={false} />
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
