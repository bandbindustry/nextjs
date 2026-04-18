// src/services/faq.service.ts
import api, { isTestEnv } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface ApiFaqsResponse {
  code?: number;
  status: boolean;
  message: string;
  data: FaqItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tryDecrypt(data: unknown): unknown {
  if (isTestEnv) return data;
  if (typeof data === "string" && data.includes(":")) {
    return decryptData(data);
  }
  return data;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const response = await api.get(endpoints.FAQS);
    const decoded = tryDecrypt(response.data) as ApiFaqsResponse;
    if (decoded.status && Array.isArray(decoded.data)) {
      return decoded.data;
    }
    return [];
  } catch {
    return [];
  }
}
