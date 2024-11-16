import AAProviderInstance from "@/lib/web3auth/AAProvider";
import Web3AuthConnectorInstance from "@/lib/web3auth/web3auth";
import { useAccount, useConnect } from "wagmi";
import { base, mantle, scroll } from "wagmi/chains";

export const useWeb3Auth = () => {
  const { isConnected, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const web3AuthConnector = Web3AuthConnectorInstance([mantle, scroll, base]);

  const connectWallet = async () => {
    try {
      await connect({ connector: web3AuthConnector });
      // After connection, check if we can enable Account Abstraction
      if (connector) {
        const provider = (await connector.getProvider()) as any;
        // Initialize AA provider if not already initialized
        if (!provider.isAccountAbstractionProvider) {
          await provider.setupProvider(AAProviderInstance);
        }
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return {
    isConnected,
    connect: connectWallet,
    connectors,
    provider: connector?.getProvider(),
    AAProviderInstance,
  };
};
