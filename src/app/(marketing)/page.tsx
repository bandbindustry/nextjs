import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import HeroSection from "@/sections/home/HeroSection";
import StatsSection from "@/sections/home/StatsSection";
import AboutSnapshot from "@/sections/home/AboutSnapshot";
import ProductsGrid from "@/sections/home/ProductsGrid";
import VideoMaskSection from "@/sections/home/VideoMaskSection";
import InsightSection from "@/sections/home/InsightSection";
import IndustriesSection from "@/sections/home/IndustriesSection";
import CtaSection from "@/sections/home/CtaSection";
import CoreTechnologiesSection from "@/sections/home/CoreTechnologiesSection";

export const metadata: Metadata = createMetadata({
  title: "Precision Manufacturing & Industrial Solutions",
  description:
    "B and B Industries delivers world-class precision-engineered components, CNC machinery, and industrial solutions across Gujarat and India. ISO-certified. Est. 1998.",
  keywords: [
    "precision manufacturing Gujarat",
    "CNC components India",
    "industrial machinery Jamnagar",
    "ISO certified manufacturer",
    "custom fabrication India",
  ],
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsGrid />
      <AboutSnapshot />
      <VideoMaskSection />
      <CoreTechnologiesSection />
      <InsightSection />
      <StatsSection />
      <IndustriesSection />
      <CtaSection />
    </>
  );
}
