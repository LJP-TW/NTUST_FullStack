import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart-item';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

interface Message {
  [key: string]: any;
}

interface GetFromDBResPonse {
  status: boolean;
  message: Message;
  cart: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // 購物車中的東西
  cart: CartItem[] = [];

  // 總額
  totalPrice = 0;

  cartUpdater;
  // 購物車是否已經更新
  cartUpdated = true;
  // 與資料庫同步的一個timer
  updateTime = 180000;
  // timer 是否開啟
  Updating = false;

  constructor(private httpClient: HttpClient,
              private authSvc: AuthService) { }

  /**
   * 開啟與資料庫同步的一個timer
   * 在此 timer 正在進行的期間內, 所有對購物車做的更動都不會真的打一個同步要求到資料庫
   * 避免消耗後端運算量
   */
  StartUpdate() {
    console.log('Update Start');
    if (!this.Updating) {
      console.log('Updating');
      this.Updating = true;
      this.UpdateFunc();
      this.cartUpdater = setInterval(() => {
        this.UpdateFunc();
      }, this.updateTime);
    }
  }

  UpdateFunc() {
    if (this.cartUpdated) {
      console.log('StopUpdating');
      this.StopUpdate();
    } else {
      console.log('UpdateToDB');
      this.UpdateToDB().subscribe((resp) => {
        console.log(resp);
      }, (error) => {
        console.log(error);
      });
    }
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

    // 執行真正要做的事
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].ProductId === id) {
          found = true;
          break;
        }
    }
    if (!found) {
      this.cart.push({
        ProductId: id,
        Count: 1,
        Price: price,
        attributes: [],
        icon: '',
      });
      this.totalPrice += price;

      // 與資料庫同步相關的部分
      this.ModifyCart();
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

    // 執行真正要做的事
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].ProductId === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.totalPrice = (this.totalPrice * 1000 + this.cart[i].Price * 1000) / 1000;
      this.cart[i].Count++;

      // 與資料庫同步相關的部分
      this.ModifyCart();
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

    // 執行真正要做的事
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].ProductId === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.totalPrice = (this.totalPrice * 1000 - this.cart[i].Price * 1000) / 1000;
      this.cart[i].Count--;

      // 與資料庫同步相關的部分
      this.ModifyCart();
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

    // 執行真正要做的事
    let found = false;
    let i;
    for (i = 0 ; i < this.cart.length ; i++) {
        if (this.cart[i].ProductId === id) {
          found = true;
          break;
        }
    }

    if (found) {
      this.totalPrice = (this.totalPrice * 1000 -  this.cart[i].Count * (this.cart[i].Price * 1000)) / 1000;
      this.cart.splice(i, 1);

      // 與資料庫同步相關的部分
      this.ModifyCart();
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
    const postData: any = {
      cart: JSON.parse(JSON.stringify(this.cart, ['ProductId', 'Count'])),
      token: localStorage.getItem('token'),
    };

    return this.httpClient.post(`${environment.api}/UpdateCart`, postData);
  }

  GetFromDB() {
    this.httpClient.get(`${environment.api}/GetCart?token=${localStorage.getItem('token')}`).subscribe((data: GetFromDBResPonse) => {
      console.log(data);
      if (data.status) {
        this.cart = [];
        this.totalPrice = 0;
        for (const product of data.cart) {
          this.cart.push({
            ProductId: product.ProductId,
            Count: product.Count,
            Price: (product.Price * 1000) / 1000,
            attributes: [],
            icon: '',
          });
          this.totalPrice = (this.totalPrice * 1000 + product.Count * (product.Price * 1000)) / 1000;
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
