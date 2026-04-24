"use client";

import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FiTarget, FiGlobe, FiHeart } from "react-icons/fi";

const HERO_IMAGE = "/images/about/handShake.jpg";

const badges = [
  { icon: <FiTarget size={18} />, label: "Customer-First Approach" },
  { icon: <FiGlobe size={18} />, label: "Pan-India Support" },
  { icon: <FiHeart size={18} />, label: "Long-Term Partnership" },
];

const services = [
  {
    title: "Pre-Sales Service",
    body: "To help customers better understand our laser cutting equipment — product details, functional advantages, and market conditions — B & B Industries provides a full range of consulting services tailored to your needs. We offer free proofing, trial machine services, and welcome factory visits so you can evaluate the equipment first-hand.",
  },
  {
    title: "Mid-Sales Service",
    body: "We work from the customer's point of view, analysing actual production requirements to deliver customised laser processing solutions and detailed technical guidance. Equipment of different formats and power ratings can be configured to order, ensuring every machine meets your specific production demands.",
  },
  {
    title: "After-Sales Service",
    body: "Our professional after-sales engineers provide free on-site installation and commissioning services calibrated to your actual site conditions. We supply complete documentation, spare-parts guidance, and hands-on operator training — and remain available to resolve any operational issues throughout the life of the equipment.",
  },
];

export default function AboutAfterSales() {
  return (
    <section
      className="section-light overflow-hidden"
      style={{ borderTop: "1px solid var(--color-light-border)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
        {/* ── Left: image ── */}
        <div className="relative min-h-[320px] lg:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="Business handshake — after sales partnership"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient overlay — darkens bottom + right edge for text bleed */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.32) 100%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
            }}
          />
          {/* Title badge at bottom-left */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <h2
              className="font-display font-black uppercase italic leading-none text-white"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                letterSpacing: "-0.01em",
                textShadow: "0 4px 24px rgba(0,0,0,0.6)",
              }}
            >
              After Sales
              <br />
              Services
            </h2>
          </div>
        </div>

        {/* ── Right: content ── */}
        <div
          className="flex flex-col justify-center px-8 md:px-12 lg:px-14 py-14 lg:py-16"
          style={{ background: "var(--color-light-bg)" }}
        >
          {/* Eyebrow */}
          <AnimatedSection direction="up">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="h-px w-8 shrink-0"
                style={{
                  background: "var(--color-light-accent)",
                  opacity: 0.5,
                }}
              />
              <span
                className="eyebrow"
                style={{ margin: 0, color: "var(--color-light-faint)" }}
              >
                Our Commitment
              </span>
            </div>
          </AnimatedSection>

          {/* Badge strip */}
          <AnimatedSection direction="up" delay={0.05}>
            <div className="flex flex-wrap gap-3 mb-10">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-sm"
                  style={{
                    border: "1px solid var(--color-light-border)",
                    background: "var(--color-light-surface)",
                  }}
                >
                  <span style={{ color: "var(--color-light-accent)" }}>
                    {b.icon}
                  </span>
                  <span
                    className="font-display uppercase"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.13em",
                      color: "var(--color-light-text)",
                    }}
                  >
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Service descriptions */}
          <div className="flex flex-col gap-8">
            {services.map((s, i) => (
              <AnimatedSection
                key={s.title}
                direction="up"
                delay={0.1 + i * 0.07}
              >
                <div>
                  <h3
                    className="font-display font-bold mb-2"
                    style={{
                      fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                      color: "var(--color-light-text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.title}
                  </h3>
                  <div
                    className="h-px w-8 mb-3"
                    style={{
                      background: "var(--color-light-accent)",
                      opacity: 0.5,
                    }}
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-light-muted)" }}
                  >
                    {s.body}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
