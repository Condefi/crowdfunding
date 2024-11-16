"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { truncateAddress } from "@/lib/utils";
import { Info } from "lucide-react";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import NetworkSwitch from "../NetworkSwitch";
import { Button } from "../ui/button";

export const UserModal = () => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <WalletConnected />;
  }

  return <WalletNotConnected />;
};

const WalletInfo = ({ address }: { address: string }) => {
  const items = [
    {
      label: "Wallet Address",
      value: truncateAddress(address),
      tooltip: "Your wallet address",
      showTooltip: true,
    },
  ];

  return (
    <div className="p-4 rounded-lg border border-gray-300 dark:border-neutral-700">
      <div className="flex flex-col space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{item.label}</span>
              {item.showTooltip && (
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-blue-400" />
                  </TooltipTrigger>
                  <TooltipContent>{item.tooltip}</TooltipContent>
                </Tooltip>
              )}
            </div>
            <span className="font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const WalletNotConnected = () => {
  const { connect, connectors, error } = useConnect();

  return (
    <Modal>
      <ModalTrigger>
        <HoverBorderGradient className="text-xs sm:text-sm font-medium text-primary-foreground">
          <span className="w-auto text-primary z-10 bg-background  py-2 rounded-[inherit]">
            Connect Wallet
          </span>
        </HoverBorderGradient>
      </ModalTrigger>
      <ModalBody className="!m-6">
        <ModalContent className="space-y-4 md:!p-6">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <div className="space-y-4">
            {connectors.map((connector) => {
              return (
                <Button
                  variant="outline"
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="w-full p-4 flex items-center justify-between rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={connector?.icon ?? ""}
                      alt="Kinto Logo"
                      width={24}
                      height={24}
                    />
                    <span className="font-medium">{connector.name}</span>
                  </div>
                  <Button className="text-sm text-gray-500">Connect</Button>
                </Button>
              );
            })}
            {error && <div>{error.message}</div>}
          </div>
        </ModalContent>
        <ModalFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-500 text-center">
            Connect with Web3Auth to get started
          </p>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

const WalletConnected = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Modal>
      <ModalTrigger>
        <HoverBorderGradient className="text-xs sm:text-sm font-medium text-primary-foreground">
          <span className="w-auto text-primary z-10 bg-background px-2 sm:px-4 py-2 rounded-[inherit]">
            {truncateAddress(address ?? "")}
          </span>
        </HoverBorderGradient>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h2 className="text-2xl font-bold mb-6">Web3Auth Account</h2>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </div>
          <div className="space-y-4">
            <WalletInfo address={address ?? ""} />
            <NetworkSwitch />
          </div>
        </ModalContent>
        <ModalFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-500 text-center">
            Connected with Web3Auth
          </p>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};
