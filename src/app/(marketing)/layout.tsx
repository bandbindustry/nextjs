"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidget from "@/components/shared/FloatingWidget";
import { ModalProvider } from "@/context/ModalContext";
import QuoteModal from "@/components/shared/QuoteModal";
import LenisController from "@/components/shared/LenisController";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <LenisController />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingWidget />
      <QuoteModal />
    </ModalProvider>
  );
}
