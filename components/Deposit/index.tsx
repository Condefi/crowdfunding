import { Campaign } from "@/types/campaign";
import { AlertCircle, Wallet } from "lucide-react";
import { Input } from "../ui/input";
import { RainbowButton } from "../ui/rainbow-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Deposit = ({ campaign }: { campaign: Campaign }) => {
  const renderContent = () => {
    switch (campaign?.status) {
      case "Active":
        return (
          <form className="space-y-6 p-6 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-2">
                Investment Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-accent sm:text-sm">$</span>
                </div>
                <Input
                  type="number"
                  min={campaign?.minInvestment}
                  className="pl-7"
                  defaultValue={campaign?.minInvestment}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <Select defaultValue="USDT">
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Important Information
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Minimum investment: ${campaign?.minInvestment}</li>
                      <li>
                        Tokens will be locked in escrow until funding ends
                      </li>
                      <li>Refunds available if target not met</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <RainbowButton
              className="bg-gradient-to-r from-blue-600 to-purple-600 w-full"
              type="submit"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Invest Now
            </RainbowButton>
          </form>
        );

      case "Failed":
        return (
          <div className="text-center space-y-4">
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
          <div className="text-center space-y-4">
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

export default Deposit;
