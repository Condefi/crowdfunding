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
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Network</span>
          <Select
            value={chain?.id.toString()}
            onValueChange={(value) => {
              switchChain?.({ chainId: parseInt(value) });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Network" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  <div className="flex items-center gap-2">{chain.name}</div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {error && (
          <div className="text-sm text-red-500">
            Error switching network: {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkSwitch;
