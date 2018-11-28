import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart-item';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

interface Message {
  [key: string]: any;
}

interface Cart {
  ProductId: number;
  Count: number;
}

interface GetFromDBResPonse {
  status: boolean;
  message: Message;
  cart: Cart[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // 購物車中的東西 (只有 ID, Count)
  cart: CartItem[] = [];

  // 總額
  totalPrice: number;

  constructor(private httpClient: HttpClient,
              private authSvc: AuthService) { }

  cartUpdater;
  // 購物車是否已經更新
  cartUpdated = true;
  // 與資料庫同步的一個timer
  updateTime = 180000;
  // timer 是否開啟
  Updating = false;

  /**
   * 開啟與資料庫同步的一個timer
   * 在此 timer 正在進行的期間內, 所有對購物車做的更動都不會真的打一個同步要求到資料庫
   * 避免消耗後端運算量
   */
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
      }, this.updateTime);
    }
    return this.cartUpdater;
  }

  /**
   * 當 timer 停止, 才會再跟資料庫同步一次購物車內容
   */
  StopUpdate() {
    if (this.Updating) {
      console.log('Update Stop');
      clearInterval(this.cartUpdater);
      this.Updating = false;
    }
  }

  /**
   * 新增商品到 this.cart
   * 需要參數 MonsterID 以及打折過後的 price
   * 若有重複 ID，增加 Count
   * 若購物車中沒有此 Product ID，就新增商品到 this.cart
   *
   * @param id: number
   * @param price: number
   */
  Add(id: number, price: number) {
    // 有登入才能使用購物車
    if (this.authSvc.LoggedInRedirect()) {return; }
    // 與資料庫同步相關的部分
    this.ModifyCart();
    // 執行真正要做的事
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].productID === id) {
          found = true;
          break;
        }
    }
    this.totalPrice += price;
    if (!found) {
      this.cart.push({
        productID: id,
        count: 1,
        tempPrice: price
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
    // 有登入才能使用購物車
    if (this.authSvc.LoggedInRedirect()) {return; }
    // 與資料庫同步相關的部分
    this.ModifyCart();
    // 執行真正要做的事
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].productID === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.totalPrice += this.cart[i].tempPrice;
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
    // 有登入才能使用購物車
    if (this.authSvc.LoggedInRedirect()) {return; }
    // 與資料庫同步相關的部分
    this.ModifyCart();
    // 執行真正要做的事
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].productID === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.totalPrice -= this.cart[i].tempPrice;
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
    // 有登入才能使用購物車
    if (this.authSvc.LoggedInRedirect()) {return; }
    // 與資料庫同步相關的部分
    this.ModifyCart();
    // 執行真正要做的事
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].productID === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.totalPrice -= this.cart[i].tempPrice * this.cart[i].count;
      this.cart.splice(i, 1);
    }
  }

  /**
   * 更改到購物車後，check 是否要與資料庫進行同步
   */
  ModifyCart() {
    if (this.cartUpdated) {
      this.cartUpdated = false;
      if (!this.Updating) {
        this.StartUpdate();
      }
    }
  }

  /**
   * 與資料庫進行購物車的同步
   */
  UpdateToDB() {
    const postData = this.cart;
    postData['token'] = localStorage.getItem('token');
    return this.httpClient.post(`${environment.api}/UpdateCart`, postData);
  }

  GetFromDB() {
    this.httpClient.get(`${environment.api}/GetCart?token=${localStorage.getItem('token')}`).subscribe((data: GetFromDBResPonse) => {
      if (data.status) {
        this.cart = [];
        for (const product of data.cart) {
          this.cart.push({
            productID: product.ProductId,
            count: product.Count,
            tempPrice: 0
          });
        }
      }
    });
  }

  MakeOrder(Order) {
    const Result = Order;
    Result.token = localStorage.getItem('token');
    return this.httpClient.post(`${environment.api}/MakeOrder`, Result);
  }
}
