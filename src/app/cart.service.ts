import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartItem[];

  constructor(private httpClient: HttpClient) { }

  /**
   * 新增商品到 this.cart
   * 只需要參數 ID
   * 若有重複 ID，增加 Count
   * 若沒有此 Product ID，新增商品到 this.cart
   *
   * @param id: number
   */
  Add(id: number) {
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].productID === id) {
          found = true;
          break;
        }
    }

    if (!found) {
      this.cart.push({
        productID: id,
        count: 1
      });
    } else {
      this.cart[i].count++;
    }
  }

  /**
   * 將在 this.cart 中特定 ID 的商品數量加1
   * 若 this.cart 中沒有此 ID，就不會更改到 this.cart
   *
   * @param id: number
   */
  Plus(id: number) {
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].productID === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.cart[i].count++;
    }
  }

  /**
   * 將在 this.cart 中特定 ID 的商品數量減1
   * 若 this.cart 中沒有此 ID，就不會更改到 this.cart
   *
   * @param id: number
   */
  Minus(id: number) {
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].productID === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.cart[i].count--;
    }
  }

  /**
   * 從 this.cart 移除特定 ID 的商品
   * 若 this.cart 中沒有此商品，就不會更改到 this.cart
   *
   * @param id: number
   */
  Remove(id: number) {
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].productID === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.cart.splice(i, 1);
    }
  }

  UpdateToDB() {
    // 沒有 UPDATE METHOD 可以用
    // return this.httpClient.post('http://localhost:8000/api/UpdateCart');
  }

  GetFromDB() {
    // return this.httpClient.get('http://localhost:8000/api/GetCart');
  }

  MakeOrder() {
    // return this.httpClient.post('http://localhost:8000/api/MakeOrder');
  }
}
