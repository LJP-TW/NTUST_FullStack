import { Monster } from './monster';
import { Icon } from './icon';
import { Coupon } from './coupon';
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
  Total: number;
  Phone: string;
  createdAt: string;
  items: OrderItem[];
  coupons: Coupon[];
}
