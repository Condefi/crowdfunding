import {
  AccountAbstractionProvider,
  SafeSmartAccount,
} from "@web3auth/account-abstraction-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Chain } from "wagmi/chains";

export default function AAProviderInstance(chains: Chain[]) {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
  };

  const accountAbstractionProvider = new AccountAbstractionProvider({
    config: {
      chainConfig,
      smartAccountInit: new SafeSmartAccount(),
      bundlerConfig: {
        // Get the pimlico API Key from dashboard.pimlico.io
        url: `https://api.pimlico.io/v2/11155111/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`,
      },
      paymasterConfig: {
        url: `https://api.pimlico.io/v2/11155111/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`,
      },
    },
  });

  return accountAbstractionProvider;
}
