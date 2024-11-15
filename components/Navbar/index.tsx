// App
import { appRoutes } from "@/lib/constants";
import { motion } from "framer-motion";
import { Coins, LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface NavbarItem {
  id: number;
  title: string;
  path: string;
  parentRoute: string;
  isDisabled?: boolean;
  icon: ReactNode;
  postfix?: ReactNode;
  externalRoute?: string;
}

const Navbar = () => {
  const path = usePathname();

  const navbarItems = [
    {
      id: 31231232,
      path: appRoutes.fund,
      isDisabled: false,
      parentRoute: "fund", // Changed to lowercase to match URL path
      title: "Fund",
      icon: <Coins className="max-w-full" />,
    },
    {
      id: 65743534,
      path: appRoutes.dashboard,
      parentRoute: "dashboard",
      isDisabled: false,
      title: "Dashboard",
      icon: <LayoutGridIcon className="max-w-full" />,
    },
  ];

  return (
    <nav className="flex flex-row items-center justify-center sm:hidden md:hidden lg:flex xl:flex xxl:flex">
      <ul className="flex flex-row items-center justify-center gap-4 list-none">
        {navbarItems.map((item: NavbarItem) => {
          const active = path === item.path; // Changed to exact path matching
          if (item.isDisabled) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <li
                    className={`flex flex-col items-center justify-center py-1 px-3 rounded-[80px] cursor-not-allowed ${
                      active &&
                      "bg-gradient-to-r from-gradient-start to-gradient-end"
                    }`}
                  >
                    <span
                      className={`flex items-center gap-2 [text-decoration:none] cursor-not-allowed ${
                        active && "text-white"
                      }`}
                    >
                      <span className="w-5 h-5 flex items-center">
                        {item.icon}
                      </span>
                      {item.title}
                    </span>
                  </li>
                </TooltipTrigger>
                <TooltipContent>
                  <div>Coming Soon!</div>
                </TooltipContent>
              </Tooltip>
            );
          }
          return (
            <li key={item.id}>
              <Link
                href={item.externalRoute ? item.externalRoute : item.path}
                target={item.externalRoute ? "_blank" : undefined}
                className={`relative flex py-1.5 px-3 items-center gap-2 no-underline rounded-full text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-transparent ${
                  active ? "text-white" : "dark:hover:bg-factor-950"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-gradient-to-r from-gradient-start/50 to-gradient-end/80 rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 1 }}
                  />
                )}
                <span className="w-5 h-5 flex items-center z-20">
                  {item.icon}
                </span>
                <span className="text-sm leading-5 tracking-wider z-20">
                  {item.title}
                </span>
                {item.postfix && <span className="z-20">{item.postfix}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
