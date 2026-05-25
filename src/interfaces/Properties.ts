export type PropertyCategory = "Apartment" | "House" | "Shop" | "Land";
export type PropertyType = "Premium" | "Executive" | "Standard";
export type PropertyStatus = "Available" | "Occupied";

export interface PropertyImage {
  id: string;
  imageUrl: string;
  fileName: string;
  isPrimary: boolean;
}
export interface Property {
  id: number;
  title: string;
  location: string;
  rentAmount: string;
  beds: number | "N/A";
  baths: number;
  sqft: string;
  type: PropertyType;
  category: PropertyCategory;
  description: string;
  primaryImageUrl: string;
  images: PropertyImage[];
  amenities?: string[];
  status: PropertyStatus;
}
