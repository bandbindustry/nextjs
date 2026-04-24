"use client";

import { motion } from "framer-motion";

export default function VideoMaskSection() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#000" }}
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
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.45)", zIndex: 1 }}
      />

      {/* Caption */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center gap-2 px-4"
        style={{ bottom: "clamp(32px, 6vh, 64px)", zIndex: 2 }}
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
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.6rem)", lineHeight: 1.3 }}
        >
          Where Quality Meets Innovation
        </p>

        {/* Sub caption */}
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
      </div>
    </div>
  );
}
