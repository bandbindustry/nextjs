// src/services/contact.service.ts
import api, { isTestEnv } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import axios from "axios";

export interface ContactPayload {
  first_name: string;
  last_name?: string;
  company_name?: string;
  email: string;
  /** Pass as "<dial_code> <number>", e.g. "+91 9876543210" */
  phone: string;
  subject?: string;
  city_name: string;
  state?: string;
  country_name?: string;
  country_code?: string;
  message?: string;
}

interface ContactApiResponse {
  code?: number;
  status: boolean;
  message: string;
}

/** Decrypt if prod and the response is an encrypted string; otherwise return as-is. */
function tryDecrypt(data: unknown): ContactApiResponse {
  if (!isTestEnv && typeof data === "string" && data.includes(":")) {
    return decryptData(data) as ContactApiResponse;
  }
  return data as ContactApiResponse;
}

export async function submitContactForm(
  payload: ContactPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.post(endpoints.CONTACT_FORM, payload);
    const decoded = tryDecrypt(response.data);
    return {
      success: decoded.status === true,
      message: decoded.message ?? "Submitted successfully.",
    };
  } catch (err: unknown) {
    // Axios throws for 4xx/5xx — the body may be encrypted; decrypt and surface the message.
    if (axios.isAxiosError(err) && err.response?.data) {
      try {
        const decoded = tryDecrypt(err.response.data);
        return {
          success: false,
          message: decoded.message ?? "Submission failed. Please try again.",
        };
      } catch {
        // decryption failed — fall through to generic message
      }
    }
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
