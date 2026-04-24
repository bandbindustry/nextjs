import { ImageResponse } from "next/og";

// ─── Route segment config ─────────────────────────────────────────────────────
export const runtime = "edge";
export const alt = "B and B Industries — Precision Manufacturing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ─── OG Image ─────────────────────────────────────────────────────────────────
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "#f97316",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          zIndex: 1,
        }}
      >
        {/* Brand name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          B&amp;B Industries
        </div>

        {/* Accent divider */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "#f97316",
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "#f97316",
            fontWeight: 600,
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Precision in every cut
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "#9ca3af",
            marginTop: 8,
            textAlign: "center",
            maxWidth: 720,
            lineHeight: 1.5,
          }}
        >
          World-class laser cutting machines &amp; precision manufacturing
          solutions from Jamnagar, Gujarat
        </div>
      </div>

      {/* Bottom domain strip */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#f97316",
          }}
        />
        <div style={{ fontSize: 18, color: "#6b7280", letterSpacing: "1px" }}>
          bandbindustries.com
        </div>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#f97316",
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
