import { PropertyCampaign, PropertyCampaigns } from "@/types/campaign";
import { create } from "zustand";

interface CampaignsState {
  campaigns: PropertyCampaigns;
  setCampaigns: (campaigns: PropertyCampaigns) => void;
  addCampaign: (campaign: PropertyCampaign) => void;
  removeCampaign: (id: number) => void;
  updateCampaign: (id: number, campaign: Partial<PropertyCampaign>) => void;
}

export const useCampaignsStore = create<CampaignsState>((set) => ({
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

  updateCampaign: (id, updatedCampaign) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
      ),
    })),
}));
