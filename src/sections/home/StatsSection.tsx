"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  createCoordinates,
} from "@vnedyalk0v/react19-simple-maps";
import Container from "@/components/ui/Container";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import AnimatedSection from "@/components/ui/AnimatedSection";
// Direct import — no fetch, no CDN, works offline and in all environments
import geoData from "../../../public/countries-110m.json";

const presenceDots = [
  { id: "india", label: "India", coordinates: createCoordinates(78.96, 20.59) },
  { id: "uae", label: "UAE", coordinates: createCoordinates(53.84, 23.42) },
  {
    id: "germany",
    label: "Germany",
    coordinates: createCoordinates(10.45, 51.16),
  },
  { id: "usa", label: "USA", coordinates: createCoordinates(-95.71, 37.09) },
  {
    id: "australia",
    label: "Australia",
    coordinates: createCoordinates(133.77, -25.27),
  },
  {
    id: "brazil",
    label: "Brazil",
    coordinates: createCoordinates(-51.92, -14.23),
  },
  { id: "japan", label: "Japan", coordinates: createCoordinates(138.25, 36.2) },
  { id: "uk", label: "UK", coordinates: createCoordinates(-3.43, 55.37) },
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "60+", label: "Projects Delivered" },
  { value: "60+", label: "Industry Partners" },
  { value: "99%", label: "Client Satisfaction" },
];

function PulseMarker({
  coordinates,
  label,
  delay,
}: {
  coordinates: ReturnType<typeof createCoordinates>;
  label: string;
  delay: number;
}) {
  return (
    <Marker coordinates={coordinates}>
      <motion.circle
        r={5}
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={0.8}
        animate={{ r: [5, 20], opacity: [0.55, 0] }}
        transition={{ duration: 2.2, delay, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        r={5}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={0.6}
        animate={{ r: [5, 30], opacity: [0.3, 0] }}
        transition={{
          duration: 2.2,
          delay: delay + 0.4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.circle
        r={3}
        fill="var(--color-accent)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={0.8}
        animate={{ r: [2.5, 3.5, 2.5] }}
        transition={{
          duration: 2.5,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <text
        textAnchor="middle"
        y={-9}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "6px",
          fontWeight: 700,
          fill: "rgba(255,255,255,0.85)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {label}
      </text>
    </Marker>
  );
}

// Larger map config
const MAP_CONFIG = {
  projection: "geoNaturalEarth1" as const,
  projectionConfig: {
    scale: 185,
    center: createCoordinates(15, 5),
  },
  width: 980,
  height: 560,
  style: { width: "100%", height: "100%" } as React.CSSProperties,
};

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* ── Stats strip at top ── */}
      <div
        style={{
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Container className="py-10">
          {/* Eyebrow heading */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span
                className="h-px w-6"
                style={{ background: "var(--color-accent)", opacity: 0.4 }}
              />
              <span
                className="font-display font-semibold uppercase tracking-[0.2em]"
                style={{
                  fontSize: "0.65rem",
                  color: "var(--color-text-faint)",
                }}
              >
                Global Presence
              </span>
              <span
                className="h-px w-6"
                style={{ background: "var(--color-accent)", opacity: 0.4 }}
              />
            </div>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--color-text)",
              }}
            >
              Trusted in{" "}
              <span style={{ color: "var(--color-accent)" }}> India</span>{" "}
              {/* Worldwide */}
            </h2>
          </motion.div>

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-sm overflow-hidden"
            style={{ background: "var(--color-border)" }}
          >
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} direction="up">
                <div
                  className="relative flex flex-col items-center text-center py-8 px-6"
                  style={{ background: "var(--color-surface-2)" }}
                >
                  <span
                    className="absolute top-3 right-4 font-display font-black select-none pointer-events-none"
                    style={{
                      fontSize: "2.5rem",
                      lineHeight: 1,
                      color: "var(--color-accent)",
                      opacity: 0.06,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p
                    className="font-display font-black tabular-nums"
                    style={{
                      fontSize: "clamp(2.2rem, 4vw, 3rem)",
                      color: "var(--color-accent)",
                      lineHeight: 1,
                    }}
                  >
                    <AnimatedCounter value={stat.value} />
                  </p>

                  <motion.div
                    className="rounded-full my-3"
                    style={{
                      height: "2px",
                      background: "var(--color-accent)",
                      width: 0,
                      opacity: 0.35,
                    }}
                    animate={isInView ? { width: "24px" } : { width: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />

                  <p
                    className="text-[10px] font-display font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--color-text-faint)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Map area — larger, unobstructed ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "560px" }}>
        {/* Countries layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.25 }}
        >
          <ComposableMap {...MAP_CONFIG}>
            <Graticule stroke="rgba(255,255,255,0.07)" strokeWidth={0.5} />
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "rgba(255,255,255,0.12)",
                        stroke: "rgba(255,255,255,0.25)",
                        strokeWidth: 0.4,
                        outline: "none",
                      },
                      hover: {
                        fill: "rgba(255,255,255,0.12)",
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Pulse dots layer */}
        <div className="absolute inset-0 pointer-events-none">
          <ComposableMap {...MAP_CONFIG}>
            {presenceDots.map((dot, i) => (
              <PulseMarker
                key={dot.id}
                coordinates={dot.coordinates}
                label={dot.label}
                delay={i * 0.3}
              />
            ))}
          </ComposableMap>
        </div>

        {/* Edge vignette — fades map into section bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, var(--color-bg) 100%)",
          }}
        />
      </div>
    </section>
  );
}
