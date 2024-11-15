"use client";

import KintoLogo from "@/assets/kinto.svg";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useAccount } from "wagmi";

const NetworkSwitch = () => {
  const { isConnected } = useAccount();
  return isConnected ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="bg-background rounded-2xl !p-0 shadow-lg border border-gray-300 dark:border-gray-700 hover:bg-background/80"
        >
          <Image
            src={KintoLogo}
            alt="Kinto Network"
            width={20}
            height={20}
            className="text-primary"
          />
          <span className="sr-only">Kinto Network</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Connected to Kinto Network</p>
      </TooltipContent>
    </Tooltip>
  ) : null;
};

export default NetworkSwitch;
