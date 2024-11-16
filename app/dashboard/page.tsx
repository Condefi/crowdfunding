"use client";

import Portfolio from "@/components/Portfolio";
import UserActiveCampaigns from "@/components/UserActiveCampagins";
import UserCampaignHistory from "@/components/UserCampaignHistory";
import { useUserCampaignsStore } from "@/state/useUserCampaignsStore";

export default function Dashboard() {
  const { currentUserCampaigns, pastUserCampaigns } = useUserCampaignsStore();
  return (
    <div className="relative min-h-screen pt-24 px-8">
      <Portfolio campaigns={currentUserCampaigns} />
      <UserActiveCampaigns currentUserCampaigns={currentUserCampaigns} />
      <UserCampaignHistory pastUserCampaigns={pastUserCampaigns} />
    </div>
  );
}
