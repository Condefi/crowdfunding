/**
 * @file Wagmi Configuration
 * @description This file sets up the Wagmi configuration for the application, including wallet connectors and chain configurations.
 */

import { createConfig, http } from "wagmi";
import { arbitrum, arbitrumNova } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import Web3AuthConnectorInstance from "../web3auth";

export const wagmiConfig = createConfig({
  chains: [arbitrum, arbitrumNova],
  transports: {
    [arbitrum.id]: http(),
    [arbitrumNova.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: "3314f39613059cb687432d249f1658d2",
      showQrModal: true,
    }),
    injected({
      shimDisconnect: true,
    }),
    Web3AuthConnectorInstance([arbitrum, arbitrumNova]),
  ],
});
