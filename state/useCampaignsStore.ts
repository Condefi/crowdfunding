import {
  allCampaigns,
  currentCampaigns,
  pastUserCampaigns,
} from "@/mock/campaigns";
import { Campaign } from "@/types/campaign";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CampaignsState {
  allCampaigns: Campaign[];
  currentCampaigns: Campaign[];
  pastCampaigns: Campaign[];
  setAllCampaigns: (campaigns: Campaign[]) => void;
  setCurrentCampaigns: (campaigns: Campaign[]) => void;
  setPastCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Campaign) => void;
  removeCampaign: (id: string) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
}

export const useCampaignsStore = create<CampaignsState>()(
  persist(
    (set) => ({
      allCampaigns: allCampaigns,
      currentCampaigns: currentCampaigns,
      pastCampaigns: pastUserCampaigns,

      setCurrentCampaigns: (campaigns) => set({ currentCampaigns: campaigns }),
      setPastCampaigns: (campaigns) => set({ pastCampaigns: campaigns }),
      setAllCampaigns: (campaigns) => set({ allCampaigns: campaigns }),
      addCampaign: (campaign) =>
        set((state) => ({
          currentCampaigns: [...state.currentCampaigns, campaign],
        })),

      removeCampaign: (id) =>
        set((state) => ({
          currentCampaigns: state.currentCampaigns.filter(
            (campaign) => campaign.id !== id
          ),
          pastCampaigns: state.pastCampaigns.filter(
            (campaign) => campaign.id !== id
          ),
        })),

      updateCampaign: (id, updatedCampaign) =>
        set((state) => ({
          currentCampaigns: state.currentCampaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
          ),
          pastCampaigns: state.pastCampaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
          ),
        })),
    }),
    {
      name: "campaigns-storage",
    }
  )
);
