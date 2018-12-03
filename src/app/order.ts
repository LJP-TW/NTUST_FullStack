import { Monster } from './monster';
import { Icon } from './icon';
interface OrderItem {
  ProductId: number;
  Count: number;
  Price: number;
  NAME: string;
  Icon: Icon;
}

export interface Order {
  Address: string;
  Shipment: number;
  created_at: string;
  items: OrderItem[];
}
