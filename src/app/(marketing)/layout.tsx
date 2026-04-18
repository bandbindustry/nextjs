"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidget from "@/components/shared/FloatingWidget";
import { ModalProvider } from "@/context/ModalContext";
import QuoteModal from "@/components/shared/QuoteModal";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Init Lenis smooth scroll (no GSAP dependency)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Drive Lenis with a native rAF loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <ModalProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWidget />
        <QuoteModal /> {/* ← always mounted, shown via context */}
      </ModalProvider>
    </>
  );
}
