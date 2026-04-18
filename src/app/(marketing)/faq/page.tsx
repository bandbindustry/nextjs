// src/app/(marketing)/faq/page.tsx
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import FaqPageLayout from "@/sections/faq/FaqPage";
import { getFaqs } from "@/services/faq.service";

export const metadata: Metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about B and B Industries — our products, processes, and policies.",
  keywords: ["FAQ", "frequently asked questions", "B and B Industries support"],
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();
  return <FaqPageLayout faqs={faqs} />;
}
