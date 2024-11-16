"use client";

import { Button } from "@/components/ui/button";
import { appRoutes } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-screen animated-background text-gray-900 dark:text-white overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4 md:px-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl text-accent">
          Campaign not found
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-lg md:text-2xl mb-10 drop-shadow-2xl"
        >
          We cannot find the campaign you are looking for.. <br /> If you think
          this is a bug, please reach out on Discord.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.01 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link href={appRoutes.fund}>
            <Button
              variant="default"
              size="lg"
              className="font-bold shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 z-50 relative"
            >
              Discover Campaigns
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
