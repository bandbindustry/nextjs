"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidget from "@/components/shared/FloatingWidget";
import { ModalProvider } from "@/context/ModalContext";
import QuoteModal from "@/components/shared/QuoteModal";
import LenisController from "@/components/shared/LenisController";

/** Minimal skeleton shown while the Header client component hydrates */
function HeaderSkeleton() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 py-5"
      style={{
        background: "rgba(10,10,10,0.96)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo placeholder */}
        <div
          className="w-16 h-10 rounded-sm animate-pulse"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        {/* Nav placeholder */}
        <div className="hidden md:flex items-center gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-3 rounded animate-pulse"
              style={{
                width: `${48 + i * 8}px`,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
        {/* CTA placeholder */}
        <div
          className="hidden md:block h-8 w-28 rounded-sm animate-pulse"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
      </div>
    </div>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <LenisController />
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <FloatingWidget />
      <QuoteModal />
    </ModalProvider>
  );
}
