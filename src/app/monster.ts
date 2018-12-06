import { Icon } from './icon';
import { Attribute } from './attribute';
export interface Monster {
  ATTACK?: number;
  DEFENSE?: number;
  HP?: number;
  NAME: string;
  NAME_EN?: string;
  NAME_JP?: string;
  SPEED?: number;
  SP_ATTACK?: number;
  SP_DEFENSE?: number;
  createdAt: string;
  description?: string;
  discount: number;
  id: number;
  imgNum?: number;
  price: number;
  finalPrice?: number;
  sold: number;
  attributes?: Attribute[];
  Icon?: Icon;
}
