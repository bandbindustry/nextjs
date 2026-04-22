"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from "@/lib/motion";
import { FiCheckCircle, FiAward, FiUsers, FiTrendingUp } from "react-icons/fi";

const highlights = [
  "ISO-certified manufacturing processes",
  "State-of-the-art CNC machinery and tooling",
  "In-house R&D and quality control lab",
  "On-time delivery with zero compromise",
];

const metrics = [
  { icon: FiAward, value: "25+", label: "Years of Excellence" },
  { icon: FiUsers, value: "200+", label: "Happy Clients" },
  { icon: FiTrendingUp, value: "500+", label: "Projects Delivered" },
];

export default function AboutSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="section-light section-pad overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* ── Left: Image ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Main image */}
            <div
              className="relative rounded-sm overflow-hidden"
              style={{
                aspectRatio: "4/3",
                background: "var(--color-light-surface)",
                border: "1px solid var(--color-light-border)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/factory/800/600"
                alt="B & B Industries manufacturing facility"
                width={800}
                height={600}
                className="w-full h-full object-cover rounded-sm"
                loading="lazy"
              />

              {/* Bottom gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
                }}
              />

              {/* Est. tag */}

              {/* ISO badge */}
              {/* <div
                className="absolute bottom-4 right-4 px-4 py-3 rounded-sm"
                style={{
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p
                  className="font-display font-black uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "#ffffff",
                  }}
                >
                  ISO Certified
                </p>
              </div> */}
            </div>

            {/* ── Metrics strip ── */}
            {/* <div
              className="grid grid-cols-3 gap-px mt-4 rounded-sm overflow-hidden"
              style={{
                background: "var(--color-light-border)",
                border: "1px solid var(--color-light-border)",
              }}
            >
              {metrics.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 py-5 px-3"
                  style={{ background: "var(--color-light-bg)" }}
                >
                  <Icon
                    size={15}
                    style={{ color: "var(--color-light-accent)" }}
                  />
                  <span
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
                      color: "var(--color-light-text)",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-display uppercase text-center"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      color: "var(--color-light-faint)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div> */}
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="h-px w-8 shrink-0"
                style={{ background: "var(--color-light-accent)" }}
              />
              <span
                className="font-display font-semibold uppercase tracking-[0.2em]"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-light-muted)",
                }}
              >
                Who We Are
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-display font-bold leading-tight mb-5"
              style={{
                fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
                color: "var(--color-light-text)",
              }}
            >
              Built on Precision,
              <br />
              <span style={{ color: "var(--color-light-accent)" }}>
                Driven by Innovation
              </span>
            </h2>

            {/* Animated accent line */}
            <motion.div
              className="mb-6 rounded-full"
              style={{
                height: "3px",
                width: 0,
                background: "var(--color-light-accent)",
              }}
              animate={isInView ? { width: "64px" } : { width: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Body copy */}
            <p
              className="leading-relaxed mb-5 text-base"
              style={{ color: "var(--color-light-muted)", maxWidth: "50ch" }}
            >
              B and B Industries is a trusted name in industrial manufacturing,
              delivering precision-engineered components and machinery solutions
              across Gujarat and beyond. From concept to production, we maintain
              uncompromising standards at every step.
            </p>

            <p
              className="leading-relaxed mb-8 text-base"
              style={{ color: "var(--color-light-muted)", maxWidth: "50ch" }}
            >
              With a team of over 80 skilled engineers and technicians, we serve
              industries including automotive, construction, aerospace, and
              heavy engineering — delivering on time, every time.
            </p>

            {/* Highlights list */}
            <motion.ul
              className="space-y-3 mb-10"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {highlights.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--color-light-text)" }}
                >
                  <FiCheckCircle
                    className="shrink-0"
                    style={{ color: "var(--color-light-accent)" }}
                    size={15}
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button href="/about" variant="primary" theme="light">
                Learn More About Us
              </Button>
              <Button href="/contact" variant="outline" theme="light">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
