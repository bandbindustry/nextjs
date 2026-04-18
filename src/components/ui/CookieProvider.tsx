// src/components/ui/CookieProvider.tsx
// Wrap this in your root layout — renders the banner globally.
"use client";

import CookieBanner from "./CookieBanner";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieProvider() {
  const { visible, acceptAll, declineAll, saveCustom } = useCookieConsent();

  return (
    <CookieBanner
      visible={visible}
      onAcceptAll={acceptAll}
      onDeclineAll={declineAll}
      onSaveCustom={saveCustom}
    />
  );
}
