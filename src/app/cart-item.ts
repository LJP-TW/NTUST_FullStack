export interface CartItem {
  productID: number;
  count: number;
  tempPrice: number;
  [key: string]: any;
}
