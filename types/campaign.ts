export interface PropertyCampaign {
  id: number;
  imageUrl: string;
  title: string;
  status: string;
  amountRaised: number;
  investors: number;
  endDate: string;
  progress: number;
  type?: "public" | "user";
}

export type PropertyCampaigns = PropertyCampaign[];
