import { baseSepolia, mantleSepoliaTestnet, scrollSepolia } from "wagmi/chains";

export const factories: Record<number, `0x${string}`> = {
  [baseSepolia.id]: "0xB8b62443CDba678e6c00204Ba5a292052Cc50C54",
  [mantleSepoliaTestnet.id]: "0xF4c03194BB7231ce0151134764EedF93F6d896B8",
  [scrollSepolia.id]: "0xF4c03194BB7231ce0151134764EedF93F6d896B8",
};

export const usdc: Record<number, `0x${string}`> = {
  [baseSepolia.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  [mantleSepoliaTestnet.id]: "0xBC06dB4bbCC27DFB0Fb762D7fd9Bb800c7f1789f",
  [scrollSepolia.id]: "0xBC06dB4bbCC27DFB0Fb762D7fd9Bb800c7f1789f",
};
