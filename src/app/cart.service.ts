import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart-item';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartItem[] = [];

  constructor(private httpClient: HttpClient,
              private authSvc: AuthService) { }

  cartUpdater;
  cartUpdated = true;
  Updating = false;


  StartUpdate() {
    console.log('Update Start');
    if (!this.Updating) {
        this.Updating = true;
        this.cartUpdater = setInterval(() => {
        if (this.cartUpdated) {
             this.StopUpdate();
        } else {
          this.UpdateToDB();
        }
      }, 5000);
    }
    return this.cartUpdater;
  }


  StopUpdate() {
    if (this.Updating) {
      console.log('Update Stop');
      clearInterval(this.cartUpdater);
      this.Updating = false;
    }
  }

  /**
   * 新增商品到 this.cart
   * 只需要參數 ID
   * 若有重複 ID，增加 Count
   * 若沒有此 Product ID，新增商品到 this.cart
   *
   * @param id: number
   */
  Add(id: number) {
    if (this.authSvc.LoggedInRedirect()) {return; }
    this.ModifyCart();
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
    if (this.authSvc.LoggedInRedirect()) {return; }
    this.ModifyCart();
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
    if (this.authSvc.LoggedInRedirect()) {return; }
    this.ModifyCart();
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
    if (this.authSvc.LoggedInRedirect()) {return; }
    this.ModifyCart();
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

  ModifyCart() {
    if (this.cartUpdated) {
      this.cartUpdated = false;
      if (!this.Updating) {
        this.StartUpdate();
      }
    }
  }

  UpdateToDB() {
    console.log('Updating');
    this.cartUpdated = true;

    // 沒有 UPDATE METHOD 可以用
    // return this.httpClient.post('${environment.api}/UpdateCart');
  }

  GetFromDB() {
    // return this.httpClient.get('${environment.api}/GetCart');
  }

  MakeOrder(Order) {
    // return this.httpClient.post('${environment.api}/MakeOrder');
  }
}
