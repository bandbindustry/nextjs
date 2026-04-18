// src/services/legal.service.ts
import api, { isTestEnv } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import type { LegalPageData } from "@/sections/legal/LegalPage";

// ─── API Types ────────────────────────────────────────────────────────────────

export type PolicyType =
  | "payment_policy"
  | "privacy_policy"
  | "terms_conditions";

interface ApiPolicy {
  id: string;
  type: PolicyType;
  description: string; // HTML
}

interface ApiPoliciesResponse {
  code?: number;
  status: boolean;
  message: string;
  data: ApiPolicy[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tryDecrypt(data: unknown): unknown {
  if (isTestEnv) return data;
  if (typeof data === "string" && data.includes(":")) {
    return decryptData(data);
  }
  return data;
}

/** Extract plain-text h2 headings from HTML for the TOC. */
function extractHeadings(html: string): string[] {
  return [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim(),
  );
}

function mapPolicy(
  policy: ApiPolicy,
  title: string,
  subtitle: string,
): LegalPageData {
  return {
    title,
    subtitle,
    lastUpdated: new Date().toISOString(),
    content: policy.description,
    headings: extractHeadings(policy.description),
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

async function getPolicies(): Promise<ApiPoliciesResponse> {
  const response = await api.post(endpoints.POLICIES);
  return tryDecrypt(response.data) as ApiPoliciesResponse;
}

export async function getPrivacyPolicy(): Promise<LegalPageData | null> {
  try {
    const res = await getPolicies();
    const policy = res.status
      ? res.data.find((p) => p.type === "privacy_policy")
      : undefined;
    return policy
      ? mapPolicy(
          policy,
          "Privacy Policy",
          "How we collect, use, and protect your information.",
        )
      : null;
  } catch {
    return null;
  }
}

export async function getTermsConditions(): Promise<LegalPageData | null> {
  try {
    const res = await getPolicies();
    const policy = res.status
      ? res.data.find((p) => p.type === "terms_conditions")
      : undefined;
    return policy
      ? mapPolicy(
          policy,
          "Terms of Use",
          "The rules and conditions governing your use of our website.",
        )
      : null;
  } catch {
    return null;
  }
}

export async function getPaymentPolicy(): Promise<LegalPageData | null> {
  try {
    const res = await getPolicies();
    const policy = res.status
      ? res.data.find((p) => p.type === "payment_policy")
      : undefined;
    return policy
      ? mapPolicy(
          policy,
          "Payment Policy",
          "Pricing, payment terms, and refund conditions.",
        )
      : null;
  } catch {
    return null;
  }
}
