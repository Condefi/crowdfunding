import Property1 from "@/assets/properties/property-1.webp";
import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: 1,
    name: "Luxury Downtown Tower",
    campaignId: "campaign_001",
    description:
      "Modern luxury high-rise in prime downtown location with stunning city views",
    image: Property1.src,
    external_url: "https://example.com/luxury-downtown-tower",
    attributes: [
      {
        trait_type: "Location",
        value: "Downtown",
      },
      {
        trait_type: "Property Type",
        value: "High-rise",
      },
      {
        trait_type: "Year Built",
        value: 2022,
      },
      {
        trait_type: "Square Footage",
        value: 450000,
        unit: "sq ft",
      },
    ],
    properties: {
      amenities: [
        "Rooftop Pool",
        "Fitness Center",
        "24/7 Concierge",
        "Underground Parking",
        "Business Center",
      ],
      building_stats: {
        height: 400,
        floors: 45,
        total_units: 200,
        retail_centers: 5,
        elevators: 8,
      },
      investment_metrics: {
        projected_roi: 12.5,
        projected_occupancy: 95,
        projection_period: 5,
      },
    },
    treasury: {
      minDeposit: 5000,
      maxDeposit: 500000,
      deadline: 1703980800, // Dec 31, 2023
    },
  },
  {
    id: 2,
    name: "Seaside Resort Complex",
    campaignId: "campaign_002",
    description:
      "Beachfront resort property with luxury amenities and ocean views",
    image: Property1.src,
    external_url: "https://example.com/seaside-resort",
    attributes: [
      {
        trait_type: "Location",
        value: "Beachfront",
      },
      {
        trait_type: "Property Type",
        value: "Resort",
      },
      {
        trait_type: "Year Built",
        value: 2021,
      },
      {
        trait_type: "Square Footage",
        value: 320000,
        unit: "sq ft",
      },
    ],
    properties: {
      amenities: [
        "Private Beach",
        "Spa",
        "Multiple Pools",
        "Restaurant",
        "Tennis Courts",
      ],
      building_stats: {
        height: 200,
        floors: 20,
        total_units: 150,
        retail_centers: 8,
        elevators: 6,
      },
      investment_metrics: {
        projected_roi: 15,
        projected_occupancy: 85,
        projection_period: 3,
      },
    },
    treasury: {
      minDeposit: 10000,
      maxDeposit: 1000000,
      deadline: 1709251200, // Feb 29, 2024
    },
  },
];
