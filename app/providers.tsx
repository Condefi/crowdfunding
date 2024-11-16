import { ModalProvider } from "@/components/ui/animated-modal";
import { TooltipProvider } from "@/components/ui/tooltip";
import { reactQueryClient } from "@/lib/clients/react-query";
import { wagmiConfig } from "@/lib/clients/wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={reactQueryClient}>
        <ModalProvider>
          <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
        </ModalProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
