import { Property } from "./property";

export interface Campaign {
  id: string;
  title: string;
  imageUrl: string;
  status: string;
  amountRaised: bigint;
  amountToRaise: bigint;
  endDate: bigint;
  progress: string;
  propertyType: string;
  location: string;
  minInvestment: bigint;
  type?: "public" | "user";
  property?: Property;
  chains?: Record<string, string>;
}

export type PropertyCampaigns = Campaign[];
