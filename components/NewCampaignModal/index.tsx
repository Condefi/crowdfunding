"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCampaignsStore } from "@/state/useCampaignsStore";
import { Campaign } from "@/types/campaign";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useChainId } from "wagmi";

import { useTreasuryCreation } from "@/hooks/user/useDeposit";
import { Calendar } from "../ui/calendar";
import ImageInputPreview from "../ui/image-input-preview";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RainbowButton } from "../ui/rainbow-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const NewCampaignModal = () => {
  const chainId = useChainId();
  const router = useRouter();
  const initialFormState = {
    title: "",
    imageUrl: "",
    status: "Active",
    amountRaised: BigInt(0),
    amountToRaise: BigInt(0),
    endDate: BigInt(0),
    progress: "",
    propertyType: "",
    location: "",
    minInvestment: BigInt(0),
    type: "user" as const,
  };

  const [formData, setFormData] = useState<Partial<Campaign>>(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const { addCampaign } = useCampaignsStore();
  const [open, setOpen] = useState(false);

  const {
    handleApproval,
    isWaitingForApproval,
    isWaitingForTreasury,
    approvalReceipt,
    treasuryReceipt,
  } = useTreasuryCreation({
    minInvestment: formData.minInvestment ?? BigInt(0),
    endDate: formData.endDate ?? BigInt(0),
    chainId,
  });

  useEffect(() => {
    if (isWaitingForTreasury && treasuryReceipt) {
      const newCampaign = {
        id: uuidv4(),
        ...formData,
      } as Campaign;

      addCampaign(newCampaign);
      setFormData(initialFormState);
      setCurrentStep(1);
      setOpen(false);
      router.push(`/fund/${newCampaign.id}`);
    }
  }, [treasuryReceipt, isWaitingForTreasury]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }
    await handleApproval();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateInputChange = (date: Date | undefined) => {
    if (date) {
      const unixTimestamp = BigInt(Math.floor(date.getTime() / 1000));
      setFormData((prev) => ({ ...prev, endDate: unixTimestamp }));
    } else {
      setFormData((prev) => ({ ...prev, endDate: undefined }));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
              Treasury Details
            </h3>
            <Input
              type="text"
              name="title"
              placeholder="Campaign Title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-neutral-700"
            />
            <Input
              type="text"
              name="minInvestment"
              placeholder="Minimum Investment"
              value={
                formData.minInvestment && formData.minInvestment > BigInt(0)
                  ? formData.minInvestment.toString().replace(/[^\d]/g, "")
                  : ""
              }
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-neutral-700"
            />
            <Input
              type="text"
              name="amountToRaise"
              placeholder="Amount to Raise"
              value={
                formData.amountToRaise && formData.amountToRaise > BigInt(0)
                  ? formData.amountToRaise.toString().replace(/[^\d]/g, "")
                  : ""
              }
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-neutral-700"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.endDate && "text-accent"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? (
                    format(new Date(Number(formData.endDate) * 1000), "PPP")
                  ) : (
                    <span>Pick a end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    formData.endDate
                      ? new Date(Number(formData.endDate) * 1000)
                      : undefined
                  }
                  onSelect={handleDateInputChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
              Property Details
            </h3>
            <Select
              name="propertyType"
              value={formData.propertyType}
              onValueChange={(value) =>
                handleInputChange({
                  target: { name: "propertyType", value },
                } as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            <Select
              name="location"
              value={formData.location}
              onValueChange={(value) =>
                handleInputChange({
                  target: { name: "location", value },
                } as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="miami">Miami</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
              </SelectContent>
            </Select>
            <ImageInputPreview
              file={formData.imageUrl ? new File([], "") : null}
              onFileChange={(file) => {
                if (file) {
                  const url = URL.createObjectURL(file);
                  setFormData((prev) => ({
                    ...prev,
                    imageUrl: url,
                    imageFile: file,
                  }));
                } else {
                  setFormData((prev) => ({
                    ...prev,
                    imageUrl: "",
                    imageFile: null,
                  }));
                }
              }}
              width={400}
              height={300}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <RainbowButton className="bg-gradient-to-r from-blue-600 to-purple-600 w-full rounded-full h-10">
          Create Campaign
        </RainbowButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderStep()}

          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                Previous
              </Button>
            )}

            <RainbowButton
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 flex-1 h-10"
            >
              {currentStep === totalSteps ? "Create Campaign" : "Next"}
            </RainbowButton>
          </div>
        </form>
        <DialogFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-500 text-center">
            Disclaimer: All investments carry risk. Please ensure you understand
            the terms and potential risks before creating or participating in
            any investment campaign.{" "}
            <span className="text-xs text-underline text-accent cursor-pointer">
              Read more
            </span>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignModal;
