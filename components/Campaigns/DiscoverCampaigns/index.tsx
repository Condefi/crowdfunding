import CampaignFilters from "@/components/CampaignFilters";

const DiscoverCampaigns = () => {
  return (
    <section className="flex flex-col gap-6 mt-4">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Discover Investment Opportunities
        </h1>
        <p className="text-lg mb-6">
          Browse through our carefully curated selection of real estate
          investment opportunities.
        </p>

        <CampaignFilters />
      </div>
    </section>
  );
};

export default DiscoverCampaigns;
