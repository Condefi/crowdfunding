export interface CampaignProperty {
  id: number;
  imageUrl: string;
  title: string;
  status: string;
  amountRaised: number;
  investors: number;
  endDate: string;
  progress: number;
}

export type CampaignProperties = CampaignProperty[];
