import { Attribute } from './attribute';
export interface CartItem {
  ProductId: number;
  Count: number;
  Price: number;
  attributes?: Attribute[];
  icon?: string;
  name?: string;
  // [key: string]: any;
}
