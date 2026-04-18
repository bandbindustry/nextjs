"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { staggerContainer, fadeUp } from "@/lib/motion";
import {
  TbDroplet,
  TbCar,
  TbPlane,
  TbBuildingFactory2,
  TbBolt,
  TbShip,
  TbTractor,
  TbShield,
  TbDiamond,
} from "react-icons/tb";
import type { IconType } from "react-icons";

const industries: {
  label: string;
  icon: IconType;
}[] = [
  { label: "Oil & Gas", icon: TbDroplet },
  { label: "Automotive", icon: TbCar },
  { label: "Jewelry", icon: TbDiamond },
  { label: "Aerospace", icon: TbPlane },
  { label: "Electronics", icon: TbBolt },
  { label: "Construction", icon: TbBuildingFactory2 },
  { label: "Marine", icon: TbShip },
  { label: "Agriculture", icon: TbTractor },
  { label: "Defense", icon: TbShield },
];

const getIndustryImage = (label: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(
    label.toLowerCase().replace(/\s+/g, "-"),
  )}/600/400`;

export default function IndustriesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      className="section-pad section-light"
      style={{
        borderTop: "1px solid var(--color-light-border)",
      }}
    >
      <Container>
        <AnimatedSection direction="up">
          <div className="text-center mb-3">
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
            className="text-center text-base max-w-xl mx-auto mb-12"
            style={{ color: "var(--color-light-muted)" }}
          >
            Tailor-made specific solutions for different industries and
            application scenarios
          </p>
        </AnimatedSection>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            const image = getIndustryImage(industry.label);

            return (
              <motion.div
                key={industry.label}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-sm cursor-pointer"
                style={{
                  aspectRatio: "1 / 1",
                  border: "1px solid var(--color-light-border)",
                  background: "var(--color-light-surface)",
                }}
              >
                {/* Default background */}
                <div
                  className="absolute inset-0 transition-opacity duration-400 group-hover:opacity-0"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-light-bg) 0%, var(--color-light-surface) 100%)",
                  }}
                />

                {/* Hover image */}
                <img
                  src={image}
                  alt={industry.label}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 scale-[1.04] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100"
                />

                {/* Dark overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.08) 100%)",
                  }}
                />

                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "var(--color-light-accent)" }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 z-10">
                  <div
                    className="flex items-center justify-center rounded-sm transition-all duration-300 group-hover:scale-95"
                    style={{
                      width: 72,
                      height: 72,
                      background: "rgba(0,0,0,0.02)",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <Icon
                      size={42}
                      strokeWidth={1.15}
                      className="transition-colors duration-300 text-[var(--color-light-text)] group-hover:text-white"
                    />
                  </div>

                  <span
                    className="font-display font-semibold text-center leading-tight transition-colors duration-300 text-[var(--color-light-text)] group-hover:text-white"
                    style={{
                      fontSize: "clamp(0.72rem, 1.2vw, 0.86rem)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {industry.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
