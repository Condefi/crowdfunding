import { Campaign } from "@/types/campaign";
import { Wallet } from "lucide-react";
import Deposit from "../Deposit";
import { RainbowButton } from "../ui/rainbow-button";

const CampaignActions = ({ campaign }: { campaign: Campaign }) => {
  const renderContent = () => {
    switch (campaign?.status) {
      case "Active":
        return <Deposit campaign={campaign} />;

      case "Failed":
        return (
          <div className="text-center space-y-4 p-6">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
              Campaign Failed
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This campaign did not reach its funding goal and is no longer
              accepting investments.
            </p>
            <RainbowButton className="bg-gradient-to-r from-blue-600 to-purple-600 w-full">
              <Wallet className="mr-2 h-5 w-5" />
              View Campaign
            </RainbowButton>
          </div>
        );

      case "Completed":
        return (
          <div className="text-center space-y-4 p-6">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
              Funding Completed
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This campaign has successfully reached its funding goal and is no
              longer accepting new investments.
            </p>
            <RainbowButton className="bg-gradient-to-r from-blue-600 to-purple-600 w-full">
              <Wallet className="mr-2 h-5 w-5" />
              View Campaign
            </RainbowButton>
          </div>
        );

      default:
        return (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Campaign {campaign?.status}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This campaign is currently not accepting new investments.
            </p>
            <RainbowButton className="bg-gradient-to-r from-blue-600 to-purple-600 w-full">
              <Wallet className="mr-2 h-5 w-5" />
              View Campaign
            </RainbowButton>
          </div>
        );
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-lg dark:bg-transparent dark:border dark:border-input">
      {renderContent()}
    </div>
  );
};

export default CampaignActions;
