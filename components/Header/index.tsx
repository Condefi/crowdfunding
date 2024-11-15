"use client";

import Navbar from "../Navbar";
import ThemeSwitch from "../ThemeSwitch";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import MainLogo from "../ui/logo";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-300 py-4 bg-white dark:bg-gray-900">
      <div className="flex h-14 items-center justify-between px-8 w-full mx-auto">
        <div className="flex items-center gap-4">
          <MainLogo />
          <Navbar />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <HoverBorderGradient className="text-xs sm:text-sm font-medium text-primary-foreground">
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
