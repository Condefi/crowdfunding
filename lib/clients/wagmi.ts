/**
 * @file Wagmi Configuration
 * @description This file sets up the Wagmi configuration for the application, including wallet connectors and chain configurations.
 */

import { createConfig, http } from "wagmi";
import { baseSepolia, mantleSepoliaTestnet, scrollSepolia } from "wagmi/chains";
import Web3AuthConnectorInstance from "../web3auth/web3auth";

export const wagmiConfig = createConfig({
  chains: [mantleSepoliaTestnet, scrollSepolia, baseSepolia],
  transports: {
    [mantleSepoliaTestnet.id]: http(),
    [scrollSepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    Web3AuthConnectorInstance([
      mantleSepoliaTestnet,
      scrollSepolia,
      baseSepolia,
    ]),
  ],
  // Enable state persistence between page reloads
  ssr: true,
});
