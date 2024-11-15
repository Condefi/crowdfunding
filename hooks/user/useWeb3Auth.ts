import { useAccount, useConnect } from "wagmi";

export const useWeb3Auth = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  const connectWallet = () => {
    // Find the Web3Auth connector
    const web3AuthConnector = connectors.find((c) => c.name === "Web3Auth");

    if (web3AuthConnector) {
      connect({ connector: web3AuthConnector });
    }
  };

  return {
    isConnected,
    connect: connectWallet,
    connectors,
  };
};
