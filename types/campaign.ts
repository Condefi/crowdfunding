export interface Campaign {
  id: string;
  title: string;
  imageUrl: string;
  status: string;
  amountRaised: string;
  investors: string;
  endDate: string;
  progress: string;
  propertyType: string;
  location: string;
  minInvestment: string;
  term: string;
  type?: "public" | "user";
}

export type PropertyCampaigns = Campaign[];
