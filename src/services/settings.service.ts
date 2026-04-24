// src/services/settings.service.ts
import api, { isTestEnv } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SettingItem {
  id: string;
  screen_name: string | null;
  key: string;
  value: string;
}

export interface SiteSettings {
  whatsapp_phone_number: string;
  contact_address: string;
  contact_phone_number: string;
  contact_email: string;
  social_link_facebook: string;
  social_link_instagram: string;
  social_link_youtube: string;
  social_link_linkedin: string;
  [key: string]: string; // allow any extra keys
}

// ─── Fallback (used while loading or on error) ────────────────────────────────
export const SETTINGS_FALLBACK: SiteSettings = {
  whatsapp_phone_number: "",
  contact_address: "",
  contact_phone_number: "",
  contact_email: "",
  social_link_facebook: "",
  social_link_instagram: "",
  social_link_youtube: "",
  social_link_linkedin: "",
};

// ─── Decrypt helper ───────────────────────────────────────────────────────────
function tryDecrypt(data: unknown): unknown {
  if (isTestEnv) return data;
  if (typeof data === "string" && data.includes(":")) {
    return decryptData(data);
  }
  return data;
}

// ─── Service ──────────────────────────────────────────────────────────────────
export async function getSettings(): Promise<SiteSettings> {
  try {
    // API uses POST with empty body
    const res = await api.get(endpoints.SETTINGS);
    const payload = tryDecrypt(res.data) as {
      code: number;
      status: boolean;
      message: string;
      data: SettingItem[];
    };

    if (!payload?.status || !Array.isArray(payload.data)) {
      return SETTINGS_FALLBACK;
    }

    // Map key-value array → typed object
    const settings = payload.data.reduce<Record<string, string>>(
      (acc, item) => {
        acc[item.key] = item.value ?? "";
        return acc;
      },
      {},
    );

    return {
      ...SETTINGS_FALLBACK,
      ...settings,
    } as SiteSettings;
  } catch (err) {
    console.error("getSettings error:", err);
    return SETTINGS_FALLBACK;
  }
}
