export type PropertyCategory = "Apartment" | "House" | "Shop" | "Land";
export type PropertyType = "Premium" | "Executive" | "Standard";
export type PropertyStatus = "Available" | "Occupied";
export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number | "N/A";
  baths: number;
  sqft: string;
  type: PropertyType;
  category: PropertyCategory;
  description: string;
  images: string[];
  amenities?: string[];
  status: PropertyStatus;
}
