import contractsJSON from "@/lib/abis/7887.json";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { useReadContracts } from "wagmi";
import { useGetKintoAccount } from "./useGetKintoAccount";

export interface KYCViewerInfo {
  isIndividual: boolean;
  isCorporate: boolean;
  isKYC: boolean;
  isSanctionsSafe: boolean;
  getCountry: string;
  getWalletOwners: Address[];
}

export const useGetKYCViewerInfo = () => {
  const { accountInfo } = useGetKintoAccount();

  const { data: kycInfo } = useReadContracts({
    contracts: [
      {
        address: contractsJSON.contracts.KYCViewer.address as Address,
        abi: contractsJSON.contracts.KYCViewer.abi,
        functionName: "isIndividual",
        args: [accountInfo?.walletAddress as Address],
      },
      {
        address: contractsJSON.contracts.KYCViewer.address as Address,
        abi: contractsJSON.contracts.KYCViewer.abi,
        functionName: "isCompany",
        args: [accountInfo?.walletAddress as Address],
      },
      {
        address: contractsJSON.contracts.KYCViewer.address as Address,
        abi: contractsJSON.contracts.KYCViewer.abi,
        functionName: "isKYC",
        args: [accountInfo?.walletAddress as Address],
      },
      {
        address: contractsJSON.contracts.KYCViewer.address as Address,
        abi: contractsJSON.contracts.KYCViewer.abi,
        functionName: "isSanctionsSafe",
        args: [accountInfo?.walletAddress as Address],
      },
      {
        address: contractsJSON.contracts.KYCViewer.address as Address,
        abi: contractsJSON.contracts.KYCViewer.abi,
        functionName: "getCountry",
        args: [accountInfo?.walletAddress as Address],
      },
      {
        address: contractsJSON.contracts.KYCViewer.address as Address,
        abi: contractsJSON.contracts.KYCViewer.abi,
        functionName: "getWalletOwners",
        args: [accountInfo?.walletAddress as Address],
      },
    ],
  });

  return useQuery({
    queryKey: ["kycViewerInfo", accountInfo?.walletAddress],
    queryFn: async () => {
      if (!accountInfo?.walletAddress || !kycInfo) return null;

      try {
        const [
          isIndividual,
          isCorporate,
          isKYC,
          isSanctionsSafe,
          getCountry,
          getWalletOwners,
        ] = kycInfo.map((result) => result.result);

        return {
          isIndividual,
          isCorporate,
          isKYC,
          isSanctionsSafe,
          getCountry,
          getWalletOwners,
        } as KYCViewerInfo;
      } catch (error) {
        console.error("Failed to fetch KYC viewer info:", error);
        throw error;
      }
    },
    enabled: !!accountInfo?.walletAddress && !!kycInfo,
  });
};
