// src/components/shared/GoogleAnalytics.tsx
// Wraps @next/third-parties GoogleAnalytics with cookie consent awareness.
// Uses useSyncExternalStore — the React-recommended way to read external stores.
"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "bnb_cookie_consent";

// ── External store helpers ────────────────────────────────────────────────────

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed?.prefs?.analytics === true;
  } catch {
    return false;
  }
}

// Server snapshot — always false (no localStorage on server)
function getServerSnapshot(): boolean {
  return false;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function GoogleAnalytics() {
  const enabled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!GA_ID) return null;
  console.log("GA_ID: ", GA_ID);

  return <NextGoogleAnalytics gaId={GA_ID} />;
}
