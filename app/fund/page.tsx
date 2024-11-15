"use client";

import ActiveCampaigns from "@/components/Campaigns/ActiveCampaigns";
import DiscoverCampaigns from "@/components/Campaigns/DiscoverCampaigns";
import PastCampaigns from "@/components/Campaigns/PastCampaigns";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Fund() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const staggerDelay = 0.2;

  return (
    <div className="relative min-h-screen pt-24 px-8 flex flex-col gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DiscoverCampaigns />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: staggerDelay * 2 }}
      >
        <ActiveCampaigns />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: staggerDelay * 3 }}
      >
        <PastCampaigns />
      </motion.div>
    </div>
  );
}
