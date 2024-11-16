"use client";

import {
  locationAtom,
  priceRangeAtom,
  propertyTypeAtom,
  searchAtom,
  termAtom,
} from "@/atoms/discoverAtoms";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

const CampaignFilters = () => {
  const [priceRange, setPriceRange] = useAtom(priceRangeAtom);
  const [propertyType, setPropertyType] = useAtom(propertyTypeAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const [term, setTerm] = useAtom(termAtom);
  const [search, setSearch] = useAtom(searchAtom);

  const placeholders = [
    "Search by location...",
    "Find properties in Miami, FL",
    "Browse luxury homes in Los Angeles",
    "Search investment properties in New York",
    "Find commercial real estate opportunities",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <div className="flex flex-row items-end gap-4">
        <div>
          <div className="flex h-12 gap-2 items-center">
            <Input
              type="number"
              placeholder="Min"
              className="h-12 text-primary placeholder:text-none"
              value={priceRange.min || ""}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  min: e.target.value ? Number(e.target.value) : null,
                }))
              }
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              className="h-12 text-primary placeholder:text-none"
              value={priceRange.max || ""}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  max: e.target.value ? Number(e.target.value) : null,
                }))
              }
            />
          </div>
        </div>

        <div>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-12 w-full text-primary lg:whitespace-nowrap">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-12 w-full text-primary lg:whitespace-nowrap">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="miami">Miami</SelectItem>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={term} onValueChange={setTerm}>
            <SelectTrigger className="h-12 w-full text-primary lg:whitespace-nowrap">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              <SelectItem value="short">Short Term (1-2 years)</SelectItem>
              <SelectItem value="medium">Medium Term (3-5 years)</SelectItem>
              <SelectItem value="long">Long Term (5+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CampaignFilters;
