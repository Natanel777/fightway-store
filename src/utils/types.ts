import { JwtPayload as DecodedJwtPayload } from 'jwt-decode';

export interface Product {
  id: number;
  description: string;
  imageUrl?: string;
  name: string;
  price: number;
  type: string;
  category?: { id: number, name: string };
}

export interface Cart {
  quantity: number,
  totalAmount: number,
  product: {
    id: number;
    description: string;
    imageUrl?: string;
    name: string;
    price: number;
    type: string;
    category?: { id: number, name: string };
  }
}

export interface OrderPayload {
  items: {
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      type: string;
      category?: {
        id: number;
        name: string;
      };
      imageUrl?: string;
    };
    quantity: number;
    subtotal: number;
  }[];
  paymentInformation: string;
  address: string;
  city: string;
  phoneNumber: string;
  postalCode: string;
}

export interface Page {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  type: string
}

export interface FormBasicValues {
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
}

export const SortDir = {
  asc: "asc",
  desc: "desc"
}

export interface CustomJwtPayload extends DecodedJwtPayload {
  roles?: string[];
}

export const deliveryFee = 15;