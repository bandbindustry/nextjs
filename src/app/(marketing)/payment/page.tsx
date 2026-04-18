// src/app/(marketing)/payment/page.tsx
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import LegalPageLayout from "@/sections/legal/LegalPage";
import { getPaymentPolicy } from "@/services/legal.service";

export const metadata: Metadata = createMetadata({
  title: "Payment, Pricing & Refund Policy",
  description:
    "Pricing, payment terms, and refund conditions for B and B Industries.",
  keywords: ["payment policy", "refund policy", "pricing terms India"],
  path: "/payment",
  noIndex: true,
});

export default async function PaymentPage() {
  const page = await getPaymentPolicy();
  if (!page) return null;
  return <LegalPageLayout page={page} variant="payment" />;
}
