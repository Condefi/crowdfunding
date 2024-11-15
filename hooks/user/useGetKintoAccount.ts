import { kintoSDK } from "@/lib/kintoSDK";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetKintoAccount = () => {
  const queryClient = useQueryClient();

  const { data: accountInfo } = useQuery({
    queryKey: ["kintoUserInfo"],
    queryFn: async () => {
      try {
        return await kintoSDK.connect();
      } catch (error) {
        console.error("Failed to fetch account info:", error);
        throw error;
      }
    },
  });

  const { mutateAsync: handleConnectWallet } = useMutation({
    mutationFn: async () => {
      try {
        return await kintoSDK.connect();
      } catch (error) {
        console.error("Failed to fetch account info:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kintoUserInfo"] });
    },
  });

  const { mutateAsync: handleCreateNewWallet } = useMutation({
    mutationFn: async () => {
      try {
        await kintoSDK.createNewWallet();
        return await kintoSDK.connect();
      } catch (error) {
        console.error("Failed to create Kinto wallet:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kintoUserInfo"] });
    },
  });

  return {
    isLoading: !accountInfo,
    accountInfo,
    handleConnectWallet,
    handleCreateNewWallet,
  };
};
