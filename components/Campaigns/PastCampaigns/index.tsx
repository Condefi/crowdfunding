"use client";

import PropertyCard from "@/components/CampaignCard";
import { useCampaignsStore } from "@/state/useCampaignsStore";
import { Campaign } from "@/types/campaign";
import Link from "next/link";
const PastCampaigns = () => {
  const { pastCampaigns } = useCampaignsStore();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Successfully Funded
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastCampaigns.map((campaign: Campaign) => (
          <Link href={`/fund/${campaign.id}`} key={campaign.id}>
            <PropertyCard {...campaign} fill />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PastCampaigns;
