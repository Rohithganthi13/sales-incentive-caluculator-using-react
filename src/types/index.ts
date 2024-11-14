export interface Product {
  id: string;
  name: string;
  price: number;
  incentivePercentage: number;
  description: string;
  category: string;
}

export interface SalesData {
  [productId: string]: number;
}