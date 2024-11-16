"use client";

import {
  locationAtom,
  priceRangeAtom,
  propertyTypeAtom,
  termAtom,
} from "@/atoms/discoverAtoms";
import PropertyCard from "@/components/CampaignCard";
import { useCampaignsStore } from "@/state/useCampaignsStore";
import { useAtom } from "jotai";
import Link from "next/link";
const ActiveCampaigns = () => {
  const [priceRange] = useAtom(priceRangeAtom);
  const [propertyType] = useAtom(propertyTypeAtom);
  const [location] = useAtom(locationAtom);
  const [term] = useAtom(termAtom);

  const { currentCampaigns } = useCampaignsStore();

  const filteredCampaigns = currentCampaigns?.filter((campaign) => {
    const priceInRange =
      (!priceRange.min || campaign.minInvestment >= priceRange.min) &&
      (!priceRange.max || campaign.minInvestment <= priceRange.max);

    const matchesPropertyType =
      propertyType === "all" || campaign.propertyType === propertyType;
    const matchesLocation =
      location === "all" || campaign.location === location;
    const matchesTerm = term === "all" || campaign.term === term;

    return (
      priceInRange && matchesPropertyType && matchesLocation && matchesTerm
    );
  });

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Active Campaigns
        </h2>
      </div>
      {filteredCampaigns?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns?.map((campaign) => (
            <Link href={`/fund/${campaign.id}`} key={campaign.id}>
              <PropertyCard {...campaign} fill />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No campaigns found matching your filters. Try adjusting your search
          criteria.
        </div>
      )}
    </section>
  );
};

export default ActiveCampaigns;
