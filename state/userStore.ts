import { Address } from "viem";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  smartAccountAddress: Address | null;
  isSmartAccount: boolean;
  setSmartAccountAddress: (address: Address | null) => void;
  setIsSmartAccount: (isSmartAccount: boolean) => void;
  initializeSmartAccount: (connector: any) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      smartAccountAddress: null,
      isSmartAccount: false,
      setSmartAccountAddress: (address) =>
        set({ smartAccountAddress: address }),
      setIsSmartAccount: (isSmartAccount) => set({ isSmartAccount }),
      initializeSmartAccount: async (connector: any) => {
        if (connector) {
          const accts = await connector.getAccounts();

          if (accts.length > 0) {
            set({
              smartAccountAddress: accts[0],
              isSmartAccount: true,
            });
          }
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
