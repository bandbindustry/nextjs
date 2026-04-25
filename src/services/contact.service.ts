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
  country_code?: string;
  subject?: string;
  // Location fields — folded into message before sending (API has no dedicated params)
  city_name?: string;
  state?: string;
  pincode?: string;
  country_name?: string;
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
  // Send every field as a separate key — backend will handle each individually.
  const apiPayload = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    company_name: payload.company_name,
    email: payload.email,
    phone: payload.phone,
    country_code: payload.country_code,
    subject: payload.subject,
    city_name: payload.city_name,
    state: payload.state,
    pincode: payload.pincode,
    country_name: payload.country_name,
    message: payload.message,
  };

  try {
    const response = await api.post(endpoints.CONTACT_FORM, apiPayload);
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
