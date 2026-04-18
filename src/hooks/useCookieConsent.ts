// src/hooks/useCookieConsent.ts
"use client";

import { useState, useEffect } from "react";

export type ConsentStatus = "pending" | "accepted" | "declined";

export interface CookiePreferences {
  necessary: true; // always true — cannot be toggled
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const STORAGE_KEY = "bnb_cookie_consent";

function readStorage(): {
  status: ConsentStatus;
  prefs: CookiePreferences;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeStorage(status: ConsentStatus, prefs: CookiePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status, prefs }));
  } catch {
    // storage blocked
  }
}

export function useCookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);
  const [visible, setVisible] = useState(false);

  // Hydrate from storage on mount
  useEffect(() => {
    const saved = readStorage();
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus(saved.status);
      setPrefs(saved.prefs);
      setVisible(false);
    } else {
      // Small delay so banner doesn't flash instantly on first paint
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function acceptAll() {
    const newPrefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPrefs(newPrefs);
    setStatus("accepted");
    setVisible(false);
    writeStorage("accepted", newPrefs);
  }

  function declineAll() {
    const newPrefs: CookiePreferences = { ...DEFAULT_PREFS };
    setPrefs(newPrefs);
    setStatus("declined");
    setVisible(false);
    writeStorage("declined", newPrefs);
  }

  function saveCustom(customPrefs: Omit<CookiePreferences, "necessary">) {
    const newPrefs: CookiePreferences = { necessary: true, ...customPrefs };
    setPrefs(newPrefs);
    setStatus("accepted");
    setVisible(false);
    writeStorage("accepted", newPrefs);
  }

  function openBanner() {
    setVisible(true);
  }

  return {
    status,
    prefs,
    visible,
    acceptAll,
    declineAll,
    saveCustom,
    openBanner,
  };
}
