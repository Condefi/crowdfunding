import Property1 from "@/assets/properties/property-1.avif";
import Property2 from "@/assets/properties/property-2.avif";
import CampaignCard from "@/components/CampaignCard";
import { PropertyCampaign, PropertyCampaigns } from "@/types/campaign";

export default function Dashboard() {
  const currentInvestments: PropertyCampaigns = [
    {
      id: 1,
      imageUrl: Property1.src,
      title: "Property 1",
      status: "Active",
      amountRaised: 5000,
      investors: 100,
      endDate: "2024-01-15",
      progress: 50,
      type: "user",
    },
  ];

  const pastInvestments: PropertyCampaigns = [
    {
      id: 2,
      imageUrl: Property2.src,
      title: "Property 2",
      status: "Completed",
      amountRaised: 10000,
      investors: 150,
      endDate: "2023-12-01",
      progress: 100,
      type: "user",
    },
  ];

  return (
    <div className="relative min-h-screen pt-24 px-8">
      {/* Investment Summary Section */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Your Investment Portfolio
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Total Invested</h3>
            <p className="text-2xl font-bold">$15,000</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Active Investments</h3>
            <p className="text-2xl font-bold">{currentInvestments.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Completed Investments</h3>
            <p className="text-2xl font-bold">{pastInvestments.length}</p>
          </div>
        </div>
      </div>

      {/* Active Investments */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Active Investments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentInvestments.map((investment) => (
            <CampaignCard key={investment.id} {...investment} />
          ))}
        </div>
      </section>

      {/* Investment History */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Investment History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-4 text-left">Property</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {pastInvestments.map((investment: PropertyCampaign) => (
                <tr
                  key={investment.id}
                  className="border-b dark:border-gray-700"
                >
                  <td className="p-4">{investment.title}</td>
                  <td className="p-4">${investment.amountRaised}</td>
                  <td className="p-4">{investment.status}</td>
                  <td className="p-4">{investment.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
