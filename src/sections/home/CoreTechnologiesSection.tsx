"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";

const technologies = [
  {
    id: 1,
    label: "Fast Chucks",
    description:
      "High-speed chuck system for rapid tube loading and unloading, maximising throughput on every production run.",
    image: "/images/FastChucks.webp",
  },
  // {
  //   id: 2,
  //   label: "Intelligent Gas Pressure Control",
  //   description:
  //     "Automated assist-gas regulation that adapts in real time to material thickness for clean, burr-free cuts.",
  //   image: "/images/IntelligentGasPressureControlling.webp",
  // },
  {
    id: 3,
    label: "One-Second Edge Finding",
    description:
      "Laser-based edge detection that locates workpiece boundaries in under a second, eliminating manual setup.",
    image: "/images/One-SecondEdgeFinding.webp",
  },
  {
    id: 4,
    label: "Over-Edge Protection",
    description:
      "Intelligent collision-avoidance that safeguards the cutting head when traversing complex profiles and edges.",
    image: "/images/OverEdgeProtection.webp",
  },
  {
    id: 5,
    label: "Remnants Layout",
    description:
      "Smart nesting algorithm that maximises material utilisation by optimally placing parts on sheet remnants.",
    image: "/images/RemnantsLayout.webp",
  },
];

export default function CoreTechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section
      ref={sectionRef}
      className="section-pad relative overflow-hidden section-light"
      style={{
        borderTop: "1px solid var(--color-light-border)",
      }}
    >
      {/* Background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, black 35%, transparent 100%)",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <AnimatedSection direction="up">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="h-px w-8"
                  style={{
                    background: "var(--color-light-accent)",
                    opacity: 0.35,
                  }}
                />
                <span
                  className="eyebrow"
                  style={{
                    margin: 0,
                    color: "var(--color-light-faint)",
                  }}
                >
                  Core Technologies
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.05}>
              <h2
                className="font-display font-bold leading-tight"
                style={{
                  fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
                  color: "var(--color-light-text)",
                }}
              >
                Built with{" "}
                <span style={{ color: "var(--color-light-accent)" }}>
                  Precision Systems
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <p
                className="text-base leading-relaxed mt-4"
                style={{
                  color: "var(--color-light-muted)",
                  maxWidth: "56ch",
                }}
              >
                From high-accuracy CNC machining to inspection, tooling, and
                finishing, our manufacturing capabilities are designed to
                deliver consistent quality at scale.
              </p>
            </AnimatedSection>
          </div>

          {/* Controls */}
          <AnimatedSection direction="up" delay={0.15}>
            <div className="flex items-center gap-4">
              <div
                className="font-display uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  color: "var(--color-light-faint)",
                }}
              >
                {String(activeIndex).padStart(2, "0")} /{" "}
                {String(technologies.length).padStart(2, "0")}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  aria-label="Previous slide"
                  className="flex items-center justify-center rounded-sm transition-all duration-200"
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid var(--color-light-border)",
                    color: "var(--color-light-text)",
                    background: "var(--color-light-bg)",
                  }}
                >
                  <FiChevronLeft size={18} />
                </button>

                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  aria-label="Next slide"
                  className="flex items-center justify-center rounded-sm transition-all duration-200"
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid var(--color-light-border)",
                    color: "var(--color-light-bg)",
                    background: "var(--color-light-accent)",
                  }}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>

      {/* Slider */}
      <div
        className="relative z-10 pl-4 md:pl-8 lg:pl-[max(2rem,calc((100vw-1200px)/2+1rem))] pr-4"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={18}
          slidesPerView={1.15}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1.6, spaceBetween: 18 },
            900: { slidesPerView: 2.2, spaceBetween: 20 },
            1200: { slidesPerView: 3.1, spaceBetween: 24 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex + 1);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex + 1);
          }}
          className="!overflow-visible"
        >
          {technologies.map((tech, index) => (
            <SwiperSlide key={tech.id}>
              {({ isActive }) => (
                <div
                  className="group relative overflow-hidden rounded-sm"
                  style={{
                    aspectRatio: "4/3",
                    border: "1px solid var(--color-light-border)",
                    background: "var(--color-light-bg)",
                    transform: isActive ? "translateY(0)" : "translateY(12px)",
                    transition: "transform 0.45s ease",
                  }}
                >
                  {/* Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={tech.image}
                      alt={tech.label}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 900px) 60vw, (max-width: 1200px) 45vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Overlays */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.34) 45%, rgba(0,0,0,0.08) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
                    }}
                  />

                  {/* Top meta */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div
                      className="px-3 py-1.5 rounded-sm"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span
                        className="font-display uppercase"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.16em",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        backdropFilter: "blur(8px)",
                        color: "white",
                      }}
                    >
                      <FiArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div
                      className="mb-4 h-px w-10"
                      style={{
                        background: "rgba(255,255,255,0.5)",
                      }}
                    />

                    <h3
                      className="font-display font-bold text-white leading-snug"
                      style={{
                        fontSize: "clamp(1rem, 1.35vw, 1.2rem)",
                        maxWidth: "18ch",
                      }}
                    >
                      {tech.label}
                    </h3>

                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        maxWidth: "28ch",
                      }}
                    >
                      {tech.description}
                    </p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
