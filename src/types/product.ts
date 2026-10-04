export type Category = "Lifestyle" | "Performance Inspired" | "Premium";

export type ColorFamily = "Black" | "Red" | "Silver" | "White";

export interface Colorway {
  name: string;
  swatches: string[];
  available: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  category: Category;
  isNew: boolean;
  releasedAt: string;
  color: string;
  colorFamilies: ColorFamily[];
  colorways: Colorway[];
  rating: number;
  reviewCount: number;
  sizes: number[];
  soldOutSizes: number[];
  image: ProductImage;
  gallery: ProductImage[];
  badge?: string;
}

export interface CartItem {
  key: string;
  product: Product;
  size: number;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  size: number;
  fit: "Runs small" | "True to size" | "Runs large";
  verified: boolean;
}