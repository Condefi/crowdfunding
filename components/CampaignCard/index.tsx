"use client";

import { cn } from "@/lib/utils";
import { PropertyCampaign } from "@/types/campaign";
import { Calendar, DollarSign, Users } from "lucide-react";
import Image from "next/image";

const CampaignCard = ({
  imageUrl,
  title,
  status,
  amountRaised,
  investors,
  endDate,
  progress,
  type = "public",
  width = 300,
  height = 300,
  fill = false,
}: PropertyCampaign & { width?: number; height?: number; fill?: boolean }) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow",
        fill ? "w-full" : "w-[350px]"
      )}
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          {...(fill
            ? { fill: true, className: "object-cover w-full h-full" }
            : { width, height, className: "object-cover" })}
          priority
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <span
            className={cn(
              "px-2 py-1 text-xs rounded-full",
              status === "Completed"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                : type === "user"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
            )}
          >
            {status}
          </span>
        </div>
        <div className="space-y-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full",
                type === "user" ? "bg-indigo-600" : "bg-blue-600"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <DollarSign className="h-4 w-4 mr-2" />$
              {amountRaised.toLocaleString()}{" "}
              {type === "user" ? "contributed" : "raised"}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Users className="h-4 w-4 mr-2" />
              {investors} investors
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            {type === "user"
              ? "Invested on"
              : status === "Completed"
              ? "Ended"
              : "Ends"}{" "}
            {endDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
