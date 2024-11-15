"use client";

import { CampaignProperty } from "@/types/property";
import { Calendar, DollarSign, Users } from "lucide-react";
import Image from "next/image";

const PropertyCard = ({
  imageUrl,
  title,
  status,
  amountRaised,
  investors,
  endDate,
  progress,
}: CampaignProperty) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow w-[350px]">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            {status}
          </span>
        </div>
        <div className="space-y-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <DollarSign className="h-4 w-4 mr-2" />$
              {amountRaised.toLocaleString()} raised
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Users className="h-4 w-4 mr-2" />
              {investors} investors
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            Ends {endDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
