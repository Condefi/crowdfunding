import { TooltipProvider } from "@/components/ui/tooltip";
import { reactQueryClient } from "@/lib/clients/react-query";
import { wagmiConfig } from "@/lib/clients/wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={reactQueryClient}>
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
