"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import NetworkSwitch from "../NetworkSwitch";
import ThemeSwitch from "../ThemeSwitch";
import MainLogo from "../ui/logo";
import { UserModal } from "../UserProfile";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

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
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <NetworkSwitch />
          </div>
          <UserModal />
        </div>
      </div>
    </header>
  );
};

export default Header;
