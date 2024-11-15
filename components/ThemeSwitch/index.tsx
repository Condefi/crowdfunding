"use client";

import { Button } from "@/components/ui/button";
import useDarkMode from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

const ThemeSwitch = () => {
  const [isDarkMode, setTheme] = useDarkMode();

  return (
    <Button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      variant="secondary"
      size="icon"
      className="bg-background rounded-2xl !p-0 shadow-lg border border-gray-300 dark:border-gray-700 hover:bg-background/80"
    >
      <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0 text-primary" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100 text-primary" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};

export default ThemeSwitch;
