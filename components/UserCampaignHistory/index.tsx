"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Campaign } from "@/types/campaign";
import Link from "next/link";

const UserCampaignHistory = ({
  pastUserCampaigns,
}: {
  pastUserCampaigns: Campaign[];
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Investment History
      </h2>
      <div className="overflow-x-auto">
        <Table className="overflow-hidden rounded-xl shadow-sm">
          <TableHeader className="bg-gray-200 dark:bg-gray-700">
            <TableRow>
              <TableHead className="first:rounded-tl-xl last:rounded-tr-xl">
                Property
              </TableHead>
              <TableHead className="first:rounded-tl-xl last:rounded-tr-xl">
                Amount
              </TableHead>
              <TableHead className="first:rounded-tl-xl last:rounded-tr-xl">
                Status
              </TableHead>
              <TableHead className="first:rounded-tl-xl last:rounded-tr-xl">
                End Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pastUserCampaigns.map((campaign: Campaign, index) => (
              <TableRow
                key={campaign.id}
                className={`bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600/20 cursor-pointer ${
                  index === pastUserCampaigns.length - 1
                    ? "last:rounded-b-xl"
                    : ""
                }`}
              >
                <TableCell
                  className={`${
                    index === pastUserCampaigns.length - 1
                      ? "first:rounded-bl-xl"
                      : ""
                  }`}
                >
                  <Link href={`/fund/${campaign.id}`}>{campaign.title}</Link>
                </TableCell>
                <TableCell>${campaign.amountRaised}</TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell
                  className={`${
                    index === pastUserCampaigns.length - 1
                      ? "last:rounded-br-xl"
                      : ""
                  }`}
                >
                  {campaign.endDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default UserCampaignHistory;
