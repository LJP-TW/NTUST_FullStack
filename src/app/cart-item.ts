export interface CartItem {
  ProductId: number;
  Count: number;
  Price: number;
  attributes?: string[];
  icon?: string;
  // [key: string]: any;
}
