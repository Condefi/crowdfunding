"use client";

import KintoLogo from "@/assets/kinto.svg";
import Web3AuthLogo from "@/assets/web3auth.svg";
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
import { useGetKintoAccount } from "@/hooks/user/useGetKintoAccount";
import { useGetKYCViewerInfo } from "@/hooks/user/useGetKYCViewerInfo";
import { useWeb3Auth } from "@/hooks/user/useWeb3Auth";
import { truncateAddress } from "@/lib/utils";
import { KintoAccountInfo } from "kinto-web-sdk";
import { Info } from "lucide-react";
import Image from "next/image";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "../ui/button";

export const UserModal = () => {
  const { accountInfo, handleCreateNewWallet } = useGetKintoAccount();
  const { isConnected: isWeb3AuthConnected, handleWeb3AuthConnect } =
    useWeb3Auth();

  const { isConnected } = useAccount();

  if (isConnected || isWeb3AuthConnected) {
    return <WalletConnected accountInfo={accountInfo as KintoAccountInfo} />;
  }

  return (
    <WalletNotConnected
      handleCreateNewWallet={handleCreateNewWallet}
      handleWeb3AuthConnect={handleWeb3AuthConnect}
    />
  );
};

const WalletInfo = ({ accountInfo }: { accountInfo: KintoAccountInfo }) => {
  const { data: kycInfo } = useGetKYCViewerInfo();

  const items = [
    {
      label: "Wallet Address",
      value: truncateAddress(accountInfo?.walletAddress ?? ""),
      tooltip: "Your Kinto Account wallet address",
      showTooltip: true,
    },
    {
      label: "Exists",
      value: accountInfo?.exists ? "Yes" : "No",
      showTooltip: true,
      tooltip: "Whether your Kinto Account exists",
    },
    {
      label: "KYC Status",
      value: kycInfo?.isKYC ? "Yes" : "No",
      show: kycInfo?.isKYC,
    },
  ];

  return (
    <div className="p-4 rounded-lg border border-gray-300 dark:border-neutral-700">
      <div className="flex flex-col space-y-2">
        {items.map(
          (item, index) =>
            (item.show === undefined || item.show) && (
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
                <span
                  className={item.label === "Wallet Address" ? "font-mono" : ""}
                >
                  {item.value}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

const WalletNotConnected = ({
  handleCreateNewWallet,
  handleWeb3AuthConnect,
}: {
  handleCreateNewWallet: () => void;
  handleWeb3AuthConnect: () => void;
}) => {
  return (
    <Modal>
      <ModalTrigger>
        <HoverBorderGradient className="text-xs sm:text-sm font-medium text-primary-foreground">
          <span className="w-auto text-primary z-10 bg-background px-2 sm:px-4 py-2 rounded-[inherit]">
            Connect Wallet
          </span>
        </HoverBorderGradient>
      </ModalTrigger>
      <ModalBody className="!m-6">
        <ModalContent className="space-y-4 md:!p-6">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <div className="space-y-4">
            <button
              onClick={() => handleCreateNewWallet()}
              className="w-full p-4 flex items-center justify-between rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={KintoLogo}
                  alt="Kinto Logo"
                  width={24}
                  height={24}
                />
                <span className="font-medium">Kinto Account</span>
              </div>
              <span className="text-sm text-gray-500">Recommended</span>
            </button>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => handleWeb3AuthConnect()}
              className="w-full p-4 flex items-center justify-between rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={Web3AuthLogo}
                  alt="Web3Auth Logo"
                  width={24}
                  height={24}
                />
                <span className="font-medium">Web3Auth</span>
              </div>
            </button>
          </div>
        </ModalContent>
        <ModalFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-500 text-center">New to web3?</p>
          <p className="text-sm text-gray-500 text-center">
            We recommend using Kinto Account for the best experience.
          </p>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

const WalletConnected = ({
  accountInfo,
}: {
  accountInfo: KintoAccountInfo;
}) => {
  const { disconnect } = useDisconnect();

  return (
    <Modal>
      <ModalTrigger>
        <HoverBorderGradient className="text-xs sm:text-sm font-medium text-primary-foreground">
          <span className="w-auto text-primary z-10 bg-background px-2 sm:px-4 py-2 rounded-[inherit]">
            {truncateAddress(accountInfo?.walletAddress ?? "")}
          </span>
        </HoverBorderGradient>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h2 className="text-2xl font-bold mb-6">Kinto Account</h2>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </div>
          <div className="space-y-4">
            <WalletInfo accountInfo={accountInfo} />
          </div>
        </ModalContent>
        <ModalFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-500 text-center">
            Connected with Kinto Account
          </p>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};
