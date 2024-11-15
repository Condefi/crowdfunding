"use client";

import { cn } from "@/lib/utils";
import { createKintoSDK, KintoAccountInfo } from "kinto-web-sdk";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import ThemeSwitch from "../ThemeSwitch";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import MainLogo from "../ui/logo";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo | undefined>(
    undefined
  );
  const kintoSDK = createKintoSDK("0x14A1EC9b43c270a61cDD89B6CbdD985935D897fE");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      setAccountInfo(await kintoSDK.connect());
    } catch (error) {
      console.error("Failed to fetch account info:", error);
    }
  };

  const handleConnect = async () => {
    try {
      await kintoSDK.createNewWallet();
      await fetchAccountInfo();
    } catch (error) {
      console.error("Failed to create new wallet:", error);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 py-4 bg-transparent",
        !showHeader && "-translate-y-full"
      )}
    >
      <div className="flex h-14 items-center justify-between px-8 w-full mx-auto">
        <div className="flex items-center gap-4">
          <MainLogo />
          <Navbar />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <HoverBorderGradient
            className="text-xs sm:text-sm font-medium text-primary-foreground"
            onClick={() => handleConnect()}
          >
            <a className="w-auto text-primary z-10 bg-background px-2 sm:px-4 py-2 rounded-[inherit]">
              {accountInfo?.walletAddress
                ? `${accountInfo.walletAddress.slice(
                    0,
                    4
                  )}...${accountInfo.walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </a>
          </HoverBorderGradient>
        </div>
      </div>
    </header>
  );
};

export default Header;
