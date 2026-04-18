"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  /** "dark" = white button (on dark bg) | "light" = black button (on white bg) */
  theme?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  variant = "primary",
  theme = "dark",
  className,
  onClick,
}: ButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const blobLeft = useMotionValue(0);
  const blobTop = useMotionValue(0);
  const blobScale = useMotionValue(0);
  const blobOpacity = useMotionValue(1);
  const textY = useMotionValue(0);
  const btnScale = useMotionValue(1);
  const btnRotateX = useMotionValue(0);
  const btnRotateY = useMotionValue(0);

  // ── Token sets per theme ──────────────────────────────────────────────────
  const tokens = {
    dark: {
      primary: {
        base: "bg-[var(--color-accent)] text-[var(--color-bg)]",
        blob: "var(--color-accent-hover)",
      },
      outline: {
        base: "border border-[var(--color-border)] text-[var(--color-text-muted)]",
        blob: "var(--color-surface-3)",
      },
      ghost: {
        base: "text-[var(--color-text-muted)]",
        blob: "transparent",
      },
    },
    light: {
      primary: {
        base: "bg-[var(--color-light-accent)] text-[var(--color-light-bg)]",
        blob: "var(--color-light-accent-hover)",
      },
      outline: {
        base: "border border-[var(--color-light-border)] text-[var(--color-light-muted)]",
        blob: "var(--color-light-surface-3)",
      },
      ghost: {
        base: "text-[var(--color-light-muted)]",
        blob: "transparent",
      },
    },
  };

  const activeTokens = tokens[theme][variant];

  const base =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold font-display uppercase tracking-wider rounded-sm cursor-pointer overflow-hidden";

  const classes = cn(base, activeTokens.base, className);

  // ── Mouse helpers ─────────────────────────────────────────────────────────
  function getRelativePos(e: React.MouseEvent) {
    const rect = wrapperRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      cx: rect.width / 2,
      cy: rect.height / 2,
    };
  }

  function onEnter(e: React.MouseEvent) {
    if (!wrapperRef.current) return;
    const { x, y } = getRelativePos(e);

    blobLeft.set(x);
    blobTop.set(y);
    blobOpacity.set(1);
    blobScale.set(0);
    animate(blobScale, 4, { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] });
    animate(textY, -2, { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] });

    if (variant !== "ghost") {
      animate(btnScale, 1.04, {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
    }
  }

  function onMove(e: React.MouseEvent) {
    if (!wrapperRef.current || variant === "ghost") return;
    const { x, y, cx, cy } = getRelativePos(e);

    btnRotateX.set(((y - cy) / cy) * -6);
    btnRotateY.set(((x - cx) / cx) * 6);
    blobLeft.set(x);
    blobTop.set(y);
  }

  function onLeave(e: React.MouseEvent) {
    if (!wrapperRef.current) return;
    const { x, y } = getRelativePos(e);

    blobLeft.set(x);
    blobTop.set(y);
    animate(blobScale, 0, { duration: 0.4, ease: [0.55, 0.055, 0.675, 0.19] });
    animate(blobOpacity, 0, {
      duration: 0.4,
      ease: [0.55, 0.055, 0.675, 0.19],
    });
    animate(textY, 0, { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] });
    animate(btnScale, 1, { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] });
    animate(btnRotateX, 0, {
      duration: 0.4,
      ease: [0.175, 0.885, 0.32, 1.275],
    });
    animate(btnRotateY, 0, {
      duration: 0.4,
      ease: [0.175, 0.885, 0.32, 1.275],
    });
  }

  function onPress() {
    animate(btnScale, [1, 0.95, 1.02, 1], {
      duration: 0.45,
      times: [0, 0.22, 0.55, 1],
    });
  }

  // ── Inner content ─────────────────────────────────────────────────────────
  const inner = (
    <>
      {variant !== "ghost" && (
        <motion.span
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "120px",
            height: "120px",
            background: activeTokens.blob,
            left: blobLeft,
            top: blobTop,
            scale: blobScale,
            opacity: blobOpacity,
            x: "-50%",
            y: "-50%",
            zIndex: 0,
          }}
        />
      )}
      <motion.span
        className="relative z-10 inline-flex items-center gap-2"
        style={{ y: textY }}
      >
        {children}
      </motion.span>
    </>
  );

  const wrapperStyle = {
    scale: btnScale,
    rotateX: btnRotateX,
    rotateY: btnRotateY,
    transformPerspective: 600,
  };

  const eventHandlers = {
    onMouseEnter: onEnter,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onMouseDown: onPress,
  };

  if (href) {
    return (
      <motion.div
        ref={wrapperRef}
        className="inline-flex"
        style={wrapperStyle}
        {...eventHandlers}
      >
        <Link href={href} className={classes} onClick={onClick}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={wrapperRef}
      className="inline-flex"
      style={wrapperStyle}
      {...eventHandlers}
    >
      <button className={classes} onClick={onClick}>
        {inner}
      </button>
    </motion.div>
  );
}
