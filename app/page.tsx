"use client";

import CondoBG from "@/assets/condo-bg.avif";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { appRoutes } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <Image
        src={CondoBG}
        alt="Condotel Background"
        className="absolute inset-0 object-cover w-full h-full opacity-20"
        priority
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center w-full"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-center font-sans font-bold leading-tight"
              >
                Start funding in Condotels
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-foreground max-w-[90%] sm:max-w-2xl lg:max-w-3xl mx-auto px-4"
              >
                Fractionalized Condotel Ownership. Simplified.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-8 sm:mt-10 flex justify-center px-4"
              >
                <Link href={appRoutes.fund}>
                  <RainbowButton className="w-full sm:w-auto bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
                    Discover Campaigns
                  </RainbowButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
