"use client";

import { createKintoSDK } from "kinto-web-sdk";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import Navbar from "../Navbar";
import ThemeSwitch from "../ThemeSwitch";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import MainLogo from "../ui/logo";
const appAddress = "0xF4c03194BB7231ce0151134764EedF93F6d896B8";
const kintoSDK = createKintoSDK(appAddress);

const Header = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnect = () => {
    kintoSDK
      .connect()
      .then(() => {
        console.log("New wallet created successfully");
      })
      .catch((error) => {
        console.error("Failed to create new wallet:", error);
      });
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
              Connect Wallet
            </a>
          </HoverBorderGradient>
        </div>
      </div>
    </header>
  );
};

export default Header;
