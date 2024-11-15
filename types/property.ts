export interface PropertyOverview {
  price: number;
  location: {
    building: string;
    area: string;
    city: string;
  };
  propertyType: string;
  size: number; // in sqft
  ownership: string;
}

export interface PropertyHighlights {
  buildingHeight: number; // in meters
  amenities: string[];
  awards: string[];
  designedBy: string;
}

export interface InvestmentDetails {
  handover: string;
  estimatedROI: {
    percentage: number;
    years: number;
    occupancy: number;
  };
  management: string;
  managementType: string;
}

export interface PropertyFeatures {
  floor: string;
  features: string[];
}

export interface ProjectDetails {
  developer: string;
  status: string;
  completionDate: string;
  plotNumber: string;
  totalUnits: number;
  totalFloors: number;
  facilities: {
    retailCenters: number;
    swimmingPools: number;
    officeSpaces: number;
    elevators: number;
  };
}

export interface ValidationInfo {
  referenceNumber: string;
  truCheckDate: Date;
  inspectionDate: Date;
}

export interface Property {
  id: string;
  overview: PropertyOverview;
  highlights: PropertyHighlights;
  investmentDetails: InvestmentDetails;
  features: PropertyFeatures;
  projectDetails: ProjectDetails;
  validation: ValidationInfo;
}

export type Properties = Property[];
