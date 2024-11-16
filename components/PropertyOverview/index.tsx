"use client";

import { Campaign } from "@/types/campaign";

const PropertyOverview = ({ campaign }: { campaign: Campaign }) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Campaign Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Funding Progress</span>
                <span className="text-sm font-medium">
                  {campaign?.progress}%
                </span>
              </div>
              <div className="w-full bg-accent h-2.5 rounded-full">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${campaign?.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-accent">Target Amount</span>
                <span className="text-sm font-medium">
                  ${campaign?.minInvestment}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-accent">Raised Amount</span>
                <span className="text-sm font-medium">
                  ${campaign?.amountRaised}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;
