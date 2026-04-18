import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import LegalPageLayout from "@/sections/legal/LegalPage";
import { getPrivacyPolicy } from "@/services/legal.service";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn how B and B Industries collects, uses, and protects your personal information. We are committed to safeguarding your privacy.",
  keywords: [
    "B and B Industries privacy policy",
    "data protection India",
    "personal information policy",
  ],
  path: "/privacy",
  noIndex: true,
});

export default async function PrivacyPage() {
  const page = await getPrivacyPolicy();
  if (!page) return null;
  return <LegalPageLayout page={page} variant="privacy" />;
}
