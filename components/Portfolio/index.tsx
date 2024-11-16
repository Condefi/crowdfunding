"use client";

import { Campaign } from "@/types/campaign";

const Portfolio = ({ campaigns }: { campaigns: Campaign[] }) => {
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Your Investment Portfolio
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Total Invested</h3>
          <p className="text-2xl font-bold">$15,000</p>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Active Investments</h3>
          <p className="text-2xl font-bold">{campaigns.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Completed Investments</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
