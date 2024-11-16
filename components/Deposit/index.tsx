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
  return (
    <div className="sticky top-24 bg-white rounded-lg dark:bg-transparent dark:border dark:border-input">
      <form className="space-y-6 p-6 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-2">
            Investment Amount
          </label>
          <div className="relative">
            <Input
              type="number"
              min={campaign?.minInvestment}
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
        <div>
          <label className="block text-sm font-medium mb-2">Network</label>
          <Select defaultValue="Base">
            <SelectTrigger>
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Base">Base</SelectItem>
              <SelectItem value="Mantle">Mantle</SelectItem>
              <SelectItem value="Scroll">Scroll</SelectItem>
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
                  <li>Tokens will be locked in escrow until funding ends</li>
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
    </div>
  );
};

export default Deposit;
