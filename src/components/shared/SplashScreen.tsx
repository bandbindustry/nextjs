// src/components/shared/SplashScreen.tsx
// Laser-cutting splash screen — shown on every page load for ~2.5s then fades out.
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ── Main component ────────────────────────────────────────────────────────────
export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setVisible(true), 0);
    const t1 = setTimeout(() => setCutting(true), 300);
    const t2 = setTimeout(() => setDone(true), 1800);
    const t3 = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Laser travels full width in 1.5s
  const LASER_DURATION = 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#0a0a0a" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── Metal grid background ── */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* ── Laser cut line — horizontal sweep ── */}
          {cutting && (
            <div className="absolute inset-0 flex items-center pointer-events-none">
              {/* Laser beam head — moves left to right */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: 0 }}
                initial={{ left: "-2%" }}
                animate={{ left: "102%" }}
                transition={{ duration: LASER_DURATION, ease: "linear" }}
              >
                {/* Core beam dot */}
                <div
                  className="relative"
                  style={{ width: 4, height: 4, marginTop: -2 }}
                >
                  {/* Outer glow */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 24,
                      height: 24,
                      top: -10,
                      left: -10,
                      background:
                        "radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 70%)",
                    }}
                  />
                  {/* Inner bright core */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      top: -1,
                      left: -1,
                      background: "#fff",
                      boxShadow:
                        "0 0 8px 4px #f97316, 0 0 20px 8px rgba(249,115,22,0.4)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Laser trail — grows from left */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 left-0"
                style={{ height: 1 }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: LASER_DURATION, ease: "linear" }}
              >
                {/* Glow layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    height: 3,
                    top: -1,
                    background: "rgba(249,115,22,0.25)",
                    filter: "blur(2px)",
                  }}
                />
                {/* Core line */}
                <div
                  className="absolute inset-0"
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, rgba(249,115,22,0.3), rgba(249,115,22,0.8))",
                  }}
                />
              </motion.div>
            </div>
          )}

          {/* ── Brand text — revealed by laser clip ── */}
          <div className="relative z-10 flex flex-col items-center gap-3 select-none">
            {/* Text with laser-reveal clip */}
            <div className="relative overflow-hidden">
              {/* Ghost text (always visible, very faint) */}
              <p
                className="font-display font-black uppercase text-white/5"
                style={{
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  letterSpacing: "0.15em",
                }}
              >
                B&amp;B Industries
              </p>

              {/* Revealed text — clip grows with laser */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={cutting ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{
                  duration: LASER_DURATION,
                  ease: "linear",
                  delay: 0,
                }}
              >
                <p
                  className="font-display font-black uppercase text-white"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 4rem)",
                    letterSpacing: "0.15em",
                    textShadow: done ? "0 0 20px rgba(249,115,22,0.4)" : "none",
                  }}
                >
                  B&amp;B Industries
                </p>
              </motion.div>
            </div>

            {/* Tagline — fades in after cut */}
            <motion.p
              className="font-display uppercase tracking-[0.3em] text-xs"
              style={{ color: "#f97316" }}
              initial={{ opacity: 0 }}
              animate={done ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              Precision in every cut
            </motion.p>
          </div>

          {/* ── Scan line flicker ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
