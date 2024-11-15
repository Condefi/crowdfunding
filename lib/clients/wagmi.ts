/**
 * @file Wagmi Configuration
 * @description This file sets up the Wagmi configuration for the application, including wallet connectors and chain configurations.
 */

import { defineChain } from "viem";
import { createConfig, http } from "wagmi";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import Web3AuthConnectorInstance from "../web3auth";

const kinto = defineChain({
  id: 7887,
  name: "Kinto",
  network: "kinto",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.kinto-rpc.com/"],
      webSocket: ["wss://rpc.kinto.xyz/ws"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://kintoscan.io" },
  },
});

/**
 * @constant
 * @type {ReturnType<typeof createConfig>}
 * @description Wagmi configuration
 * @dev Add authenticated RPC URL to prevent rate-limiting in http()
 */
export const wagmiConfig = createConfig({
  chains: [kinto],
  transports: {
    [kinto.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: "3314f39613059cb687432d249f1658d2",
      showQrModal: true,
    }),
    coinbaseWallet({ appName: "wagmi" }),
    Web3AuthConnectorInstance([kinto]),
  ],
});
