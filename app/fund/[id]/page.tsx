"use client";

import PlaceholderImage from "@/assets/properties/placeholder.webp";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyOverview from "@/components/PropertyOverview";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CampaignStatus } from "@/components/ui/campaign-status";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCampaignsStore } from "@/state/useCampaignsStore";
import { AlertCircle, Wallet } from "lucide-react";
import Image from "next/image";

const CampaignPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { allCampaigns } = useCampaignsStore();
  const campaign = allCampaigns.find((campaign) => campaign.id === id);

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div className="relative min-h-screen pt-24 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AspectRatio ratio={16 / 9} className="mb-6">
            <Image
              src={campaign?.imageUrl || PlaceholderImage}
              alt={campaign?.title || ""}
              fill
              className="object-cover rounded-xl"
            />
          </AspectRatio>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{campaign?.title}</h1>
                <CampaignStatus
                  status={campaign?.status || ""}
                  type={campaign?.type || "public"}
                />
              </div>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Property Details</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <PropertyOverview campaign={campaign} />
                </TabsContent>
                <TabsContent value="details">
                  <PropertyDetails />
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Investment Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-accent sm:text-sm">$</span>
                    </div>
                    <Input
                      type="number"
                      min={campaign?.minInvestment}
                      className="pl-7"
                      defaultValue={campaign?.minInvestment}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Currency
                  </label>
                  <Select defaultValue="USDT">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Important Information
                      </h3>
                      <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            Minimum investment: ${campaign?.minInvestment}
                          </li>
                          <li>
                            Tokens will be locked in escrow until funding ends
                          </li>
                          <li>Refunds available if target not met</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <RainbowButton
                  className="bg-gradient-to-r from-blue-600 to-purple-600 w-full"
                  type="submit"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Invest Now
                </RainbowButton>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
