"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface FiltersProps {
  onPriceRangeChange?: (range: PriceRange) => void;
  onPropertyTypeChange?: (type: string) => void;
  onLocationChange?: (location: string) => void;
  onTermChange?: (term: string) => void;
}

export default function CampaignFilters({
  onPriceRangeChange,
  onPropertyTypeChange,
  onLocationChange,
  onTermChange,
}: FiltersProps) {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: null,
    max: null,
  });
  const [propertyType, setPropertyType] = useState<string | undefined>();
  const [location, setLocation] = useState<string | undefined>();
  const [term, setTerm] = useState<string | undefined>();

  const placeholders = [
    "Search by location...",
    "Find properties in Miami, FL",
    "Browse luxury homes in Los Angeles",
    "Search investment properties in New York",
    "Find commercial real estate opportunities",
  ];

  const handlePriceRangeChange = (key: "min" | "max", value: number | null) => {
    const newRange = { ...priceRange, [key]: value };
    setPriceRange(newRange);
    onPriceRangeChange?.(newRange);
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
    onPropertyTypeChange?.(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onLocationChange?.(value);
  };

  const handleTermChange = (value: string) => {
    setTerm(value);
    onTermChange?.(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <section className="flex flex-row gap-3 justify-start">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      <div className="flex flex-row gap-3 ">
        <Select
          value={priceRange.min?.toString()}
          onValueChange={(val) => handlePriceRangeChange("min", Number(val))}
        >
          <SelectTrigger className="h-12 w-full text-primary lg:whitespace-nowrap">
            <SelectValue
              placeholder="Select price range"
              className="px-4 py-2 rounded-lg w-full placeholder:text-primary"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100000">$100,000</SelectItem>
            <SelectItem value="250000">$250,000</SelectItem>
            <SelectItem value="500000">$500,000</SelectItem>
            <SelectItem value="1000000">$1,000,000+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={propertyType} onValueChange={handlePropertyTypeChange}>
          <SelectTrigger className="h-12 text-primary w-full lg:whitespace-nowrap">
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={handleLocationChange}>
          <SelectTrigger className="h-12 text-primary w-full lg:whitespace-nowrap">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="urban">Urban</SelectItem>
            <SelectItem value="suburban">Suburban</SelectItem>
            <SelectItem value="rural">Rural</SelectItem>
          </SelectContent>
        </Select>

        <Select value={term} onValueChange={handleTermChange}>
          <SelectTrigger className="h-12 text-primary w-full lg:whitespace-nowrap">
            <SelectValue placeholder="Select investment term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Term</SelectItem>
            <SelectItem value="short">Short Term (1-2 years)</SelectItem>
            <SelectItem value="medium">Medium Term (3-5 years)</SelectItem>
            <SelectItem value="long">Long Term (5+ years)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
