import Property1 from "@/assets/properties/property-1.webp";
import Property2 from "@/assets/properties/property-2.webp";
import Property3 from "@/assets/properties/property-3.webp";
import Property4 from "@/assets/properties/property-4.webp";
import { Campaign } from "@/types/campaign";
import { v4 as uuidv4 } from "uuid";
import { properties } from "./properties";
import { baseSepolia, scrollSepolia, mantleSepoliaTestnet } from "wagmi/chains";

export const statuses = ["Active", "Failed", "Completed"] as const;

export const pastCampaigns: Campaign[] = [
  {
    id: uuidv4(),
    title: "Historic Downtown Lofts",
    imageUrl: Property3.src,
    status: "Completed",
    amountRaised: "2000000",
    investors: "150",
    endDate: "2023-12-01",
    progress: "100",
    propertyType: "apartment",
    location: "miami",
    minInvestment: "2000",
    term: "short",
    type: "public",
    property: properties[0],
    chains: {
      [baseSepolia.id]: "",
      [scrollSepolia.id]: "",
      [mantleSepoliaTestnet.id]: "",
    },
  },
  {
    id: uuidv4(),
    title: "Retail Plaza Development",
    imageUrl: Property4.src,
    status: "Failed",
    amountRaised: "800000",
    investors: "75",
    endDate: "2023-11-15",
    progress: "40",
    propertyType: "commercial",
    location: "new-york",
    minInvestment: "5000",
    term: "long",
    type: "public",
    property: properties[1],
  },
];

export const currentCampaigns: Campaign[] = [
  {
    id: uuidv4(),
    title: "Luxury Apartment Complex",
    imageUrl: Property1.src,
    status: "Active",
    amountRaised: "5000000",
    investors: "100",
    endDate: "2024-01-15",
    progress: "50",
    propertyType: "apartment",
    location: "miami",
    minInvestment: "1000",
    term: "short",
    type: "public",
    property: properties[0],
  },
  {
    id: uuidv4(),
    title: "Commercial Office Building",
    imageUrl: Property2.src,
    status: "Active",
    amountRaised: "3000000",
    investors: "80",
    endDate: "2024-02-28",
    progress: "30",
    propertyType: "commercial",
    location: "new-york",
    minInvestment: "5000",
    term: "long",
    type: "public",
    property: properties[1],
  },
];

export const currentUserCampaigns: Campaign[] = [
  {
    id: uuidv4(),
    imageUrl: Property1.src,
    title: "Property 1",
    status: "Active",
    amountRaised: "5000",
    investors: "100",
    endDate: "2024-01-15",
    progress: "50",
    propertyType: "apartment",
    location: "miami",
    minInvestment: "1000",
    term: "short",
    type: "user",
    property: properties[0],
  },
  {
    id: uuidv4(),
    imageUrl: Property2.src,
    title: "Property 2",
    status: "Active",
    amountRaised: "10000",
    investors: "150",
    endDate: "2023-12-01",
    progress: "100",
    propertyType: "commercial",
    location: "new-york",
    minInvestment: "5000",
    term: "long",
    type: "user",
    property: properties[1],
  },
  {
    id: uuidv4(),
    imageUrl: Property3.src,
    title: "Property 3",
    status: "Active",
    amountRaised: "10000",
    investors: "150",
    endDate: "2023-12-01",
    progress: "100",
    propertyType: "commercial",
    location: "new-york",
    minInvestment: "5000",
    term: "long",
    type: "user",
    property: properties[2],
  },
];

export const pastUserCampaigns: Campaign[] = [
  {
    id: uuidv4(),
    title: "Historic Downtown Lofts",
    imageUrl: Property3.src,
    status: "Completed",
    amountRaised: "2000000",
    investors: "150",
    endDate: "2023-12-01",
    progress: "100",
    propertyType: "apartment",
    location: "miami",
    minInvestment: "2000",
    term: "short",
    type: "user",
    property: properties[0],
  },
  {
    id: uuidv4(),
    title: "Retail Plaza Development",
    imageUrl: Property4.src,
    status: "Failed",
    amountRaised: "800000",
    investors: "75",
    endDate: "2023-11-15",
    progress: "40",
    propertyType: "commercial",
    location: "new-york",
    minInvestment: "5000",
    term: "long",
    type: "user",
    property: properties[1],
  },
];

export const allCampaigns: Campaign[] = [
  ...currentCampaigns,
  ...pastCampaigns,
  ...currentUserCampaigns,
  ...pastUserCampaigns,
];
