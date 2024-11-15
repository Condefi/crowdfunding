"use client";

import Property1 from "@/assets/properties/property-1.avif";
import Property2 from "@/assets/properties/property-2.avif";
import PropertyCard from "@/components/CampaignCard";
import { PropertyCampaigns } from "@/types/campaign";

const PastCampaigns = () => {
  const pastCampaigns: PropertyCampaigns = [
    {
      id: 1,
      title: "Campaign 1",
      imageUrl: Property1.src,
      status: "Completed",
      amountRaised: 10000,
      investors: 150,
      endDate: "2023-12-01",
      progress: 100,
    },
    {
      id: 2,
      title: "Campaign 2",
      imageUrl: Property2.src,
      status: "Completed",
      amountRaised: 10000,
      investors: 150,
      endDate: "2023-12-01",
      progress: 100,
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Successfully Funded
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastCampaigns.map((campaign) => (
          <PropertyCard key={campaign.id} {...campaign} fill />
        ))}
      </div>
    </section>
  );
};

export default PastCampaigns;
