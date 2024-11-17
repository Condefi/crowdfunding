"use client";

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
import { useWeb3Auth } from "@/hooks/user/useWeb3Auth";
import { truncateAddress } from "@/lib/utils";
import { Info } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useUserStore } from "../../state/userStore";
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
  const { smartAccountAddress, isSmartAccount, initializeSmartAccount } =
    useUserStore();
  const { connector } = useAccount();

  useEffect(() => {
    if (connector && !smartAccountAddress) {
      initializeSmartAccount(connector);
    }
  }, [connector, smartAccountAddress, initializeSmartAccount]);

  const items = [
    {
      label: isSmartAccount ? "Smart Account" : "Wallet Address",
      value: isSmartAccount
        ? smartAccountAddress
          ? truncateAddress(smartAccountAddress)
          : "Loading..."
        : truncateAddress(address),
      tooltip: isSmartAccount
        ? "Your Smart Account contract address"
        : "Your wallet address",
      showTooltip: true,
    },
    ...(isSmartAccount
      ? [
          {
            label: "EOA Address",
            value: truncateAddress(address),
            tooltip: "Your EOA wallet address",
            showTooltip: true,
          },
        ]
      : []),
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
  const { connect } = useWeb3Auth();

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
            <div
              className="flex items-center justify-between gap-2  border border-gray-300 dark:border-neutral-700 transition rounded-lg cursor-pointer"
              onClick={connect}
            >
              <div className="flex items-center gap-2 p-4">
                <Image
                  src={Web3AuthLogo}
                  alt="Web3Auth Logo"
                  width={24}
                  height={24}
                />
                <span className="text-md bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">
                  Web3Auth
                </span>
              </div>
              <Button className="text-sm mr-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                Connect
              </Button>
            </div>
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
      <ModalBody className="!m-6">
        <ModalContent className="space-y-6 md:!p-6">
          <div className="flex flex-row tems-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Web3Auth Account
              </h2>
              <p className="text-sm text-gray-500">
                We have connected your account with Web3Auth social login and
                integrated Smart Account. All transactions are gasless since the
                Paymaster will cover the gas fees for your transactions.{" "}
                <span
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => {
                    window.open(
                      "https://web3auth.io/docs/features/account-abstraction",
                      "_blank"
                    );
                  }}
                >
                  Read more
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <WalletInfo address={address ?? ""} />
            <NetworkSwitch />
          </div>
          <Button
            variant="outline"
            onClick={() => disconnect()}
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            Disconnect
          </Button>
        </ModalContent>

        <ModalFooter className="flex flex-col items-center pt-4 border-t">
          <p className="text-sm text-gray-500 text-center">
            Connected with Web3Auth
          </p>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default UserModal;
