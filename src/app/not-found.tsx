// src/app/not-found.tsx
// Next.js App Router 404 page — rendered for any unmatched route.
// Server component.

import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "404 — Page Not Found | B&B Industries",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#0a0a0a" }}
    >
      {/* Decorative background number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-black leading-none"
          style={{
            fontSize: "clamp(12rem, 40vw, 28rem)",
            color: "rgba(255,255,255,0.02)",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg">
        {/* Orange accent line */}
        <span className="block w-12 h-0.5" style={{ background: "#f97316" }} />

        {/* Eyebrow */}
        <p
          className="font-display uppercase tracking-[0.25em] text-xs"
          style={{ color: "#f97316" }}
        >
          Error 404
        </p>

        {/* Heading */}
        <h1
          className="font-display font-black uppercase text-white"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.1 }}
        >
          Page Not Found
        </h1>

        {/* Description */}
        <p
          className="text-base leading-relaxed max-w-sm"
          style={{ color: "#a3a3a3" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-display font-semibold uppercase tracking-widest transition-opacity duration-200 hover:opacity-85"
            style={{ background: "#f97316", color: "#fff" }}
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-display font-semibold uppercase tracking-widest transition-colors duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#a3a3a3",
            }}
          >
            View Products
          </Link>
        </div>

        {/* Brand tagline */}
        <p
          className="font-display uppercase tracking-[0.2em] text-xs mt-4"
          style={{ color: "#525252" }}
        >
          {siteConfig.tagline}
        </p>
      </div>
    </div>
  );
}
