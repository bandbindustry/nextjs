"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoMaskSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const maskScale = useTransform(scrollYProgress, [0, 0.45], [1, 30]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0.55, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.58, 0.72], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.58, 0.72], [40, 0]);

  return (
    <div ref={sectionRef} style={{ height: "300vh", position: "relative" }}>
      {/* Sticky panel */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/manufacturing.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ zIndex: 0 }}
        />

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "rgba(0,0,0,0.55)",
            zIndex: 1,
            opacity: overlayOpacity,
          }}
        />

        {/* ── Masked text ── */}
        <div
          className="absolute inset-0 flex items-center justify-center px-4"
          style={{ zIndex: 2 }}
        >
          <motion.div
            className="select-none text-center leading-none font-display font-black uppercase w-full"
            style={{
              // On mobile use a smaller start size so it fits screen
              fontSize: "clamp(2.8rem, 12vw, 13rem)",
              letterSpacing: "-0.02em",
              mixBlendMode: "screen",
              color: "white",
              WebkitTextStroke: "0px",
              textShadow: "none",
              scale: maskScale,
            }}
          >
            {/* Stack vertically on small screens, same line on larger */}
            <span className="block">PRECISION</span>
            <span
              className="block"
              style={{
                fontSize: "clamp(1.6rem, 7vw, 9rem)",
                letterSpacing: "0.12em",
                marginTop: "0.05em",
              }}
            >
              ENGINEERING
            </span>
          </motion.div>
        </div>

        {/* ── Caption ── */}
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center gap-2 px-4"
          style={{
            bottom: "clamp(32px, 6vh, 64px)",
            zIndex: 3,
            opacity: captionOpacity,
            y: captionY,
          }}
        >
          {/* Brand label */}
          <p
            className="font-display uppercase text-center"
            style={{
              letterSpacing: "0.3em",
              fontSize: "clamp(9px, 1.2vw, 12px)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            B & B Industries
          </p>

          {/* Main caption */}
          <p
            className="text-white font-display font-semibold text-center max-w-xs sm:max-w-md md:max-w-xl"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
              lineHeight: 1.3,
            }}
          >
            Where Quality Meets Innovation
          </p>

          {/* Sub caption — hide on very small screens */}
          <p
            className="hidden sm:block text-center text-sm max-w-sm"
            style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}
          >
            Delivering precision-engineered components trusted by industries
            across India and beyond.
          </p>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-1.5 mt-3">
            <p
              className="font-display uppercase text-center"
              style={{
                fontSize: "9px",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Scroll to explore
            </p>
            <div
              className="w-px h-8 md:h-10 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <motion.div
                className="absolute top-0 w-full"
                style={{ height: "40%", background: "white" }}
                animate={{ scaleY: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
