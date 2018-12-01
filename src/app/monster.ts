export interface Monster {
  ATTACK: number;
  DEFENSE: number;
  HP: number;
  NAME: string;
  NAME_EN: string;
  NAME_JP: string;
  SPEED: number;
  SP_ATTACK: number;
  SP_DEFENSE: number;
  createdAt: string;
  description: string;
  discount: number;
  id: number;
  imgNum: number;
  price: number;
  sold: number;
  attributes: Attribute[];
  Icon?: string;
}

interface Attribute {
  NAME: string;
  NAME_JP: string;
  NAME_EN: string;
}
