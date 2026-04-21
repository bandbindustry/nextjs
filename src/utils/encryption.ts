// src/utils/encryption.ts
import CryptoJS from "crypto-js";

const KEY = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY_APP || "";
const DEFAULT_IV = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_IV_APP || "";

// ─── Shared key helper ────────────────────────────────────────────────────────
function getKey(): CryptoJS.lib.WordArray {
  let key = CryptoJS.enc.Utf8.parse(KEY);
  if (key.sigBytes !== 16) {
    if (key.sigBytes < 16) {
      const padding = CryptoJS.lib.WordArray.create(
        new Array(16 - key.sigBytes).fill(0),
      );
      key = key.concat(padding);
    } else {
      key.sigBytes = 16;
    }
  }
  return key;
}

// ─── API response decryption ──────────────────────────────────────────────────
export function decryptData(encryptedData: string): unknown {
  try {
    const parts = encryptedData.split(":");
    if (parts.length !== 2) {
      throw new Error("Invalid encrypted payload format");
    }

    const ciphertext = parts[0];
    const ivBase64 = parts[1];

    const key = getKey();
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
      throw new Error("Decryption resulted in empty string");
    }

    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decryption error:", error);
    throw error;
  }
}

// ─── URL param encryption (deterministic — fixed IV so same input = same URL) ─

/**
 * Encrypt a plain string for use in a URL query param.
 * Uses the fixed DEFAULT_IV so the same category ID always produces the same URL.
 * Returns a URL-encoded string safe for query params.
 */
export function encryptUrlParam(value: string): string {
  if (!KEY || !DEFAULT_IV) return encodeURIComponent(value);
  try {
    const key = getKey();
    const iv = CryptoJS.enc.Base64.parse(DEFAULT_IV);
    const encrypted = CryptoJS.AES.encrypt(value, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // Format: "ciphertext:ivBase64" — same format decryptData expects
    return encodeURIComponent(`${encrypted.toString()}:${DEFAULT_IV}`);
  } catch {
    return encodeURIComponent(value);
  }
}

/**
 * Decrypt a URL query param that was encrypted with encryptUrlParam.
 * Returns the original plain string, or the raw param if decryption fails.
 */
export function decryptUrlParam(param: string): string {
  if (!KEY || !DEFAULT_IV) {
    try {
      return decodeURIComponent(param);
    } catch {
      return param;
    }
  }
  try {
    const decoded = decodeURIComponent(param);
    const parts = decoded.split(":");
    if (parts.length !== 2) return param;

    const [ciphertext, ivBase64] = parts;
    const key = getKey();
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    return result || param;
  } catch {
    return param;
  }
}

export { DEFAULT_IV };
