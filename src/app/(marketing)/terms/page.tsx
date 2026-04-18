import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import LegalPageLayout from "@/sections/legal/LegalPage";
import { getTermsConditions } from "@/services/legal.service";

export const metadata: Metadata = createMetadata({
  title: "Terms of Use",
  description:
    "Read the terms and conditions governing your use of the B and B Industries website and services.",
  keywords: [
    "B and B Industries terms of use",
    "website terms and conditions",
    "legal terms India",
  ],
  path: "/terms",
  noIndex: true,
});

export default async function TermsPage() {
  const page = await getTermsConditions();
  console.log("page:>>>>> ", page);
  if (!page) return null;
  return <LegalPageLayout page={page} variant="terms" />;
}
