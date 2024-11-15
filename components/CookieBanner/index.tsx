"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 mb-4 left-0 right-0 bg-white dark:bg-[#222] border border-solid border-gray-500 dark:border-gray-700 p-4 shadow-2xl w-11/12 mx-auto rounded-xl z-50"
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 sm:mb-0">
                We use cookies to enhance your browsing experience and analyze
                our traffic.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                By clicking <span className="font-bold">Accept</span>, you
                consent to our use of cookies.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="default" onClick={handleAccept}>
                Accept
              </Button>
              <Button variant="defaultInverted" onClick={handleDecline}>
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
