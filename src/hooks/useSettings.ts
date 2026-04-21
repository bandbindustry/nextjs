// src/hooks/useSettings.ts
import { useQuery } from "@tanstack/react-query";
import {
  getSettings,
  SETTINGS_FALLBACK,
  type SiteSettings,
} from "@/services/settings.service";

export function useSettings(): SiteSettings {
  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    // Settings rarely change — cache for 30 min
    staleTime: 30 * 60 * 1000,
  });
  return data ?? SETTINGS_FALLBACK;
}
