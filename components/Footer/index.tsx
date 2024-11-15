"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import MainLogo from "../ui/logo";

const Footer = () => {
  return (
    <footer className="bg-transparent">
      <div className=" px-8 pb-8 pt-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <div className="flex flex-row gap-4">
            <Github className="w-5 h-5 text-gray-400" />
            <Twitter className="w-5 h-5 text-gray-400" />
            <Linkedin className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <MainLogo height={96} width={96} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
