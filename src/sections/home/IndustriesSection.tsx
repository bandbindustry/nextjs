"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { staggerContainer } from "@/lib/motion";
import {
  TbTool,
  TbSettings,
  TbRuler2,
  TbDroplet,
  TbChefHat,
  TbCar,
} from "react-icons/tb";
import type { IconType } from "react-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const industries: { label: string; icon: IconType; desc: string }[] = [
  {
    label: "Hardware",
    icon: TbTool,
    desc: "Bolts, nuts, fasteners & industrial fittings",
  },
  {
    label: "Fabrication",
    icon: TbSettings,
    desc: "Sheet metal, structural & custom fabrication",
  },
  {
    label: "Precision",
    icon: TbRuler2,
    desc: "High-tolerance CNC & machined components",
  },
  {
    label: "Submersible",
    icon: TbDroplet,
    desc: "Pump bodies, impellers & water-resistant parts",
  },
  {
    label: "Kitchen Ware",
    icon: TbChefHat,
    desc: "Stainless steel cookware & kitchen fittings",
  },
  {
    label: "Auto Parts",
    icon: TbCar,
    desc: "Engine components, brackets & chassis parts",
  },
];

const cardVariant: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function IndustriesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <Container>
        <AnimatedSection direction="up">
          <div className="mb-3">
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: "var(--color-light-text)",
              }}
            >
              Industries We Serve
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p
            className="text-base max-w-xl mb-12"
            style={{ color: "var(--color-light-muted)" }}
          >
            Tailor-made solutions for demanding industries and critical
            application scenarios.
          </p>
        </AnimatedSection>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ border: "1px solid var(--color-light-border)" }}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <motion.div
                key={industry.label}
                variants={cardVariant}
                className="group relative flex items-center gap-5 px-6 py-5 cursor-default overflow-hidden"
                style={{
                  background: "var(--color-light-surface)",
                  borderRight: "1px solid var(--color-light-border)",
                  borderBottom: "1px solid var(--color-light-border)",
                  transition: "background 250ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--color-light-bg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--color-light-surface)";
                }}
              >
                {/* Accent left bar — slides in on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ background: "var(--color-light-accent)" }}
                />

                {/* Icon */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-sm transition-colors duration-250"
                  style={{
                    width: 48,
                    height: 48,
                    background: `oklch(from var(--color-light-accent) l c h / 0.07)`,
                    border: `1px solid oklch(from var(--color-light-accent) l c h / 0.12)`,
                    color: "var(--color-light-accent)",
                  }}
                >
                  <Icon size={22} strokeWidth={1.3} />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p
                    className="font-display font-bold leading-none mb-1 transition-colors duration-250 group-hover:text-[var(--color-light-accent)]"
                    style={{
                      fontSize: "clamp(0.82rem, 1.1vw, 0.94rem)",
                      color: "var(--color-light-text)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {industry.label}
                  </p>
                  <p
                    className="text-xs leading-snug"
                    style={{ color: "var(--color-light-faint)" }}
                  >
                    {industry.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
