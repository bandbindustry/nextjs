// src/utils/encryption.ts
import CryptoJS from "crypto-js";

const KEY = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY_APP || "";
const DEFAULT_IV = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_IV_APP || "";

export function decryptData(encryptedData: string): unknown {
  try {
    // Split the encrypted data and IV
    const parts = encryptedData.split(":");

    if (parts.length !== 2) {
      throw new Error("Invalid encrypted payload format");
    }

    const ciphertext = parts[0];
    const ivBase64 = parts[1];

    // For AES-128-CBC:
    // - Key should be exactly 16 bytes (128 bits)
    // - IV should be exactly 16 bytes (128 bits)

    // Parse key as UTF-8 and ensure it's 16 bytes
    let key = CryptoJS.enc.Utf8.parse(KEY);

    // If key is not 16 bytes, pad or truncate it
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

    // Parse IV from Base64
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    // Decrypt using AES-128-CBC
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert to UTF-8 string
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

export { DEFAULT_IV };
