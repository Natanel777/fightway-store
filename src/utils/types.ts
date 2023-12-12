export interface Product {
    id: number;
    description: string;
    imageUrl?: string;
    name: string;
    price: number;
    type: string;
    category?: {id:number, name:string};
  }

  export interface Page {
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
  }