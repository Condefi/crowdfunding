/**
 * @file Wagmi Configuration
 * @description This file sets up the Wagmi configuration for the application, including wallet connectors and chain configurations.
 */

import { createConfig, http } from "wagmi";
import { base, mantle, scroll } from "wagmi/chains";
import Web3AuthConnectorInstance from "../web3auth/web3auth";

export const wagmiConfig = createConfig({
  chains: [mantle, scroll, base],
  transports: {
    [mantle.id]: http(),
    [scroll.id]: http(),
    [base.id]: http(),
  },
  connectors: [Web3AuthConnectorInstance([mantle, scroll, base])],
  // Enable state persistence between page reloads
  ssr: true,
});
