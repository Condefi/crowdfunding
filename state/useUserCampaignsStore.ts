import { currentUserCampaigns, pastUserCampaigns } from "@/mock/campaigns";
import { Campaign } from "@/types/campaign";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserCampaignsState {
  currentUserCampaigns: Campaign[];
  pastUserCampaigns: Campaign[];
  setCurrentUserCampaigns: (campaigns: Campaign[]) => void;
  setPastUserCampaigns: (campaigns: Campaign[]) => void;
  addUserCampaign: (campaign: Campaign) => void;
  removeUserCampaign: (id: string) => void;
}

export const useUserCampaignsStore = create<UserCampaignsState>()(
  persist(
    (set) => ({
      currentUserCampaigns: [...currentUserCampaigns],
      pastUserCampaigns: [...pastUserCampaigns],

      setCurrentUserCampaigns: (campaigns) =>
        set({ currentUserCampaigns: campaigns }),
      setPastUserCampaigns: (campaigns) =>
        set({ pastUserCampaigns: campaigns }),

      addUserCampaign: (campaign) =>
        set((state) => ({
          currentUserCampaigns: [...state.currentUserCampaigns, campaign],
        })),

      removeUserCampaign: (id) =>
        set((state) => ({
          currentUserCampaigns: state.currentUserCampaigns.filter(
            (campaign) => campaign.id !== id
          ),
          pastUserCampaigns: state.pastUserCampaigns.filter(
            (campaign) => campaign.id !== id
          ),
        })),
    }),
    {
      name: "user-campaigns-storage",
    }
  )
);
