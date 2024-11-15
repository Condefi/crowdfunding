import { create } from "zustand";

interface Campaign {
  id: string;
  name: string;
  amountContributed: number;
  tokenSymbol: string;
  timestamp: number;
  status: "active" | "completed" | "failed";
}

interface UserCampaignsState {
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Campaign) => void;
  removeCampaign: (id: string) => void;
}

export const useUserCampaignsStore = create<UserCampaignsState>((set) => ({
  campaigns: [],

  setCampaigns: (campaigns) => set({ campaigns }),

  addCampaign: (campaign) =>
    set((state) => ({
      campaigns: [...state.campaigns, campaign],
    })),

  removeCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
    })),
}));
