export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  images?: Images[];
  available_sizes: AvailableSizes[] | null;
  in_stock: number | null;
  gender: string;
  color: string;
  brand: string;
  created_at: string;
  material: string;
}

interface Images {
  image_url: string;
}

export enum AvailableSizes {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}
