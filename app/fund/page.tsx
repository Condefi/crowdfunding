import Property1 from "@/assets/properties/property-1.avif";
import Property2 from "@/assets/properties/property-2.avif";
import PropertyCard from "@/components/PropertyCard";
import { CampaignProperties } from "@/types/property";

export default function Fund() {
  const currentCampaigns: CampaignProperties = [
    {
      id: 1,
      imageUrl: Property1.src,
      title: "Property 1",
      status: "Active",
      amountRaised: 10000,
      investors: 100,
      endDate: "2024-12-31",
      progress: 50,
    },
  ];

  const pastCampaigns: CampaignProperties = [
    {
      id: 2,
      imageUrl: Property2.src,
      title: "Property 2",
      status: "Completed",
      amountRaised: 20000,
      investors: 150,
      endDate: "2023-12-31",
      progress: 100,
    },
  ];

  return (
    <div className="relative min-h-screen pt-24 px-8 space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Current Campaigns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCampaigns.map((campaign) => (
            <PropertyCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Past Campaigns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pastCampaigns.map((campaign) => (
            <PropertyCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </section>
    </div>
  );
}
