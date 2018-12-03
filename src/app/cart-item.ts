import { Icon } from './icon';
import { Attribute } from './attribute';
export interface CartItem {
  ProductId: number;
  Count: number;
  Price: number;
  NAME?: string;
  NAME_EN?: string;
  NAME_JP?: string;
  attributes?: Attribute[];
  Icon?: Icon;
  // [key: string]: any;
}
