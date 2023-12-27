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
  quantity:number,
  totalAmount:number,
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

export interface Page {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
}

export const SortDir = {
  asc: "asc",
  desc: "desc"
}