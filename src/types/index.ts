// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: Size[];
  colors: Color[];
  category: string;
  featured: boolean;
}

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Color {
  name: string;
  value: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  size: Size;
  color: Color;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// UI Types
export type ViewMode = 'grid' | 'list' | 'carousel';