import { CartItem } from './cart-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartItem[];

  constructor() { }

  /**
   * 新增商品到 this.cart
   * 只需要參數 ID
   * 若有重複 ID、或沒有此 Product ID，就不會更改到 this.cart
   *
   * @param id: number
   */
  Add(id: number) {

  }

  /**
   * 將在 this.cart 中特定 ID 的商品數量加1
   * 若 this.cart 中沒有此 ID，就不會更改到 this.cart
   *
   * @param id: number
   */
  Plus(id: number) {
  }

  /**
   * 將在 this.cart 中特定 ID 的商品數量減1
   * 若 this.cart 中沒有此 ID，就不會更改到 this.cart
   *
   * @param id: number
   */
  Minus(id: number) {

  }

  /**
   * 從 this.cart 移除特定 ID 的商品
   * 若 this.cart 中沒有此商品，就不會更改到 this.cart
   *
   * @param id: number
   */
  Remove(id: number) {

  }
}