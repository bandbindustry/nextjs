"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { certifications } from "@/data/about";
import { FiAward, FiCheck } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function AboutCertifications() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad section-light relative overflow-hidden"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <Container className="relative z-10">
        {/* Heading */}
        <motion.div
          ref={headRef}
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8 shrink-0"
              style={{ background: "var(--color-light-accent)", opacity: 0.4 }}
            />
            <span
              className="eyebrow"
              style={{ margin: 0, color: "var(--color-light-faint)" }}
            >
              Certifications
            </span>
            <span
              className="h-px w-8 shrink-0"
              style={{ background: "var(--color-light-accent)", opacity: 0.4 }}
            />
          </div>

          <h2
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
              color: "var(--color-light-text)",
            }}
          >
            Quality You Can{" "}
            <span style={{ color: "var(--color-light-accent)" }}>Count On</span>
          </h2>

          <motion.div
            className="mx-auto rounded-full mb-5"
            style={{
              height: "3px",
              background: "var(--color-light-accent)",
              width: 0,
            }}
            animate={headInView ? { width: "64px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          />

          <p
            className="text-base leading-relaxed"
            style={{
              color: "var(--color-light-muted)",
              maxWidth: "50ch",
              margin: "0 auto",
            }}
          >
            Our certifications reflect decades of disciplined manufacturing
            practices and a culture where quality is non-negotiable.
          </p>
        </motion.div>

        {/* Badge grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={stagger}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              variants={fadeUp}
              className="group relative flex flex-col items-center text-center p-6 rounded-sm cursor-default"
              style={{
                background:
                  "linear-gradient(160deg, var(--color-light-bg) 0%, var(--color-light-surface) 100%)",
                border: "1px solid var(--color-light-border)",
              }}
              whileHover={{
                borderColor: "var(--color-light-accent)",
                y: -3,
                transition: { duration: 0.25, ease: EASE },
              }}
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-sm origin-left"
                style={{ background: "var(--color-light-accent)" }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
              />

              {/* Badge icon ring */}
              <div
                className="relative mb-5 flex items-center justify-center"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  border: "1.5px solid var(--color-light-border)",
                  background: "var(--color-light-surface)",
                }}
              >
                {/* Outer ring — accent tint */}
                <div
                  className="absolute inset-[-6px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    border: "1px dashed var(--color-light-accent)",
                    opacity: 0,
                  }}
                />

                <FiAward
                  size={28}
                  style={{ color: "var(--color-light-accent)" }}
                />

                {/* Verified tick */}
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--color-light-accent)",
                    border: "2px solid var(--color-light-bg)",
                  }}
                >
                  <FiCheck size={10} color="white" strokeWidth={3} />
                </div>
              </div>

              {/* Cert code — large */}
              <span
                className="font-display font-black mb-1 leading-none"
                style={{
                  fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                  color: "var(--color-light-text)",
                  letterSpacing: "0.02em",
                }}
              >
                {cert.name}
              </span>

              {/* Divider */}
              <div
                className="my-3 h-px w-8"
                style={{ background: "var(--color-light-border)" }}
              />

              {/* Detail */}
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--color-light-faint)",
                  letterSpacing: "0.06em",
                  lineHeight: 1.5,
                }}
              >
                {cert.detail}
              </p>

              {/* Index watermark */}
              <span
                className="absolute bottom-3 right-4 font-display font-black select-none pointer-events-none"
                style={{
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  color: "var(--color-light-accent)",
                  opacity: 0.05,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
