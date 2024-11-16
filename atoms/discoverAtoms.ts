import { atom } from "jotai";

interface PriceRange {
  min: number | null;
  max: number | null;
}

export const priceRangeAtom = atom<PriceRange>({
  min: null,
  max: null,
});

export const propertyTypeAtom = atom<string>("all");

export const locationAtom = atom<string>("all");

export const searchAtom = atom<string>("");

export const termAtom = atom<string>("all");
