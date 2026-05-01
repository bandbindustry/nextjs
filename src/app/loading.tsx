// src/app/loading.tsx
// Next.js App Router loading UI — shown during page/route transitions.
// Server component — no hooks, pure CSS animation.

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#0a0a0a" }}
    >
      {/* Logo mark */}
      <div className="flex flex-col items-center gap-6">
        {/* Animated ring */}
        <div className="relative w-16 h-16">
          {/* Outer spinning ring */}
          <span
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: "#f97316",
              borderRightColor: "#f97316",
              animationDuration: "0.9s",
            }}
          />
          {/* Inner static ring */}
          <span className="absolute inset-2 rounded-full border border-white/10" />
          {/* Center dot */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#f97316" }}
            />
          </span>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <p
            className="font-display font-black uppercase tracking-[0.3em] text-white"
            style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
          >
            B&amp;B Industries
          </p>
          <p
            className="font-display uppercase tracking-[0.2em] text-xs"
            style={{ color: "#525252" }}
          >
            Precision in every cut
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="w-40 h-px overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <span
            className="block h-full animate-pulse"
            style={{
              background:
                "linear-gradient(90deg, transparent, #f97316, transparent)",
              animation: "shimmer 1.4s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
