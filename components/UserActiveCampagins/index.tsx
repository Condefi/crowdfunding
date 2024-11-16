"use client";

import CampaignCard from "@/components/CampaignCard";
import { Campaign } from "@/types/campaign";
import Link from "next/link";

const UserActiveCampaigns = ({
  currentUserCampaigns,
}: {
  currentUserCampaigns: Campaign[];
}) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Active Investments
      </h2>
      <div className="flex flex-row gap-6">
        {currentUserCampaigns.map((campaign: Campaign) => (
          <Link href={`/fund/${campaign.id}`} key={campaign.id}>
            <CampaignCard {...campaign} fill />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default UserActiveCampaigns;
