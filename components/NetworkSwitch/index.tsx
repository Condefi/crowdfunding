"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount, useSwitchChain } from "wagmi";

const NetworkSwitch = () => {
  const { chain } = useAccount();
  const { chains, error, switchChain } = useSwitchChain();

  return (
    <div className="p-4 rounded-lg border border-gray-300 dark:border-neutral-700">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Network</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <Select
            value={chain?.id.toString()}
            onValueChange={(value) => {
              switchChain?.({ chainId: parseInt(value) });
            }}
          >
            <SelectTrigger className="w-[200px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-none hover:from-blue-500/20 hover:to-purple-500/20 transition-all">
              <SelectValue placeholder="Select Network" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem
                  key={chain.id}
                  value={chain.id.toString()}
                  className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    {chain.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {error && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/50 p-3 rounded-md">
            Error switching network: {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkSwitch;
