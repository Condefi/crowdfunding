import { QueryClient } from "@tanstack/react-query";

const DEFAULT_STALE_TIME = 1000000;

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: DEFAULT_STALE_TIME,
    },
  },
});
