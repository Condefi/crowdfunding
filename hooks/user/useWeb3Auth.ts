import { kintoSDK } from "@/lib/kintoSDK";
import Web3AuthConnectorInstance from "@/lib/web3auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, useConnect } from "wagmi";
import { mainnet } from "wagmi/chains";

export const useWeb3Auth = () => {
  const queryClient = useQueryClient();
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  const { mutateAsync: handleWeb3AuthConnect } = useMutation({
    mutationFn: async () => {
      try {
        // Connect using Web3Auth connector instance
        const connector = connect({
          connector: Web3AuthConnectorInstance([mainnet]),
        });

        await connector;
        return await kintoSDK.connect();
      } catch (error) {
        console.error("Failed to connect with Web3Auth:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kintoUserInfo"] });
    },
  });

  return {
    isConnected,
    handleWeb3AuthConnect,
  };
};
