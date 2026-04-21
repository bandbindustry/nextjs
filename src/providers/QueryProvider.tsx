"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // One QueryClient per browser session — created once per component mount
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5 min stale time — avoids redundant refetches on navigation
            staleTime: 5 * 60 * 1000,
            // Keep cached data for 10 min after component unmounts
            gcTime: 10 * 60 * 1000,
            // Don't retry on 4xx errors
            retry: (failureCount, error) => {
              if (error instanceof Error && error.message.includes("404"))
                return false;
              return failureCount < 2;
            },
            // Don't refetch on window focus for this marketing site
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
