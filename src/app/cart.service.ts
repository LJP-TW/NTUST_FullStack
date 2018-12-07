import { MonsterService } from './monster.service';
import { Monster } from './monster';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartItem } from './cart-item';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AnimationService } from './animation.service';

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
  updateTime = 30000;
  // timer 是否開啟
  Updating = false;

  // 是否有 GetFromDB 過
  Gotten = false;

  constructor(private httpClient: HttpClient,
              private authSvc: AuthService,
              private monsterService: MonsterService,
              private animationService: AnimationService) {
    if (this.authSvc.LoggedIn()) {
      this.GetFromDB();
    }
  }

  refreshTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.cart.length; ++i) {
      this.totalPrice += this.cart[i].Price * this.cart[i].Count;
    }
  }

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

  UpdateFunc() {
    if (this.cartUpdated) {
      console.log('StopUpdating');
      this.StopUpdate();
    } else {
      console.log('UpdateToDB');
      this.UpdateToDB().subscribe((resp) => {
        console.log(resp);
        this.cartUpdated = true;
      }, (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authSvc.Logout();
        }
      });
    }
  }

  ForceUpdate() {
    if (this.authSvc.LoggedIn()) {
      this.cartUpdated = false;
      this.UpdateFunc();
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
  Add(id: number) {
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
      // 從 server 抓一次此 monster

      // 先將必要資訊推到cart當中，防止api在取資料的期間，cart尚未加入Product的情況。
      // (快速連續執行Add()可能會成功觸發多次，造成「商品的重複檢測」失效)。
      this.cart.push(
        {
          ProductId: id,
          Count: 1,
          Price: 0,
          NAME: '',
          NAME_EN: '',
          NAME_JP: '',
          attributes: [],
          Icon: {
            src: ''
          }
        }
      );
      const index = this.cart.length - 1;
      // 事後補齊資訊
      this.monsterService.getMonstersByID(id).subscribe((resp: Monster[]) => {
        this.cart[index] = {
          ProductId: id,
          Count: 1,
          Price: resp[0].finalPrice,
          NAME: resp[0].NAME,
          NAME_EN: resp[0].NAME_EN,
          NAME_JP: resp[0].NAME_JP,
          attributes: resp[0].attributes,
          Icon: {
            src: resp[0].Icon.src
          },
        };
        this.totalPrice += resp[0].finalPrice;

        this.animationService.ScreenCenter("assets/img/pika_naughty.gif",2000,350,350);

        // 與資料庫同步相關的部分
        this.ModifyCart();
      });
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
      this.totalPrice += this.cart[i].Price;
      this.cart[i].Count++;
      this.animationService.ScreenCenter("assets/img/pika_naughty.gif",1200,350,350);
      // 與資料庫同步相關的部分
      this.ModifyCart();
    }
  }

  CustomPlus(id: number, count: number) {
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
      this.totalPrice += this.cart[i].Price * count;
      this.cart[i].Count += count;
      this.animationService.ScreenCenter("assets/img/pika_naughty.gif",1200,350,350);
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
      this.totalPrice -= this.cart[i].Price;
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
      this.totalPrice -= this.cart[i].Price * this.cart[i].Count;
      this.cart.splice(i, 1);

      // 與資料庫同步相關的部分
      this.ModifyCart();
    }
  }
  Exist(id: number) {
    for (let i = 0 ; i < this.cart.length ; i++) {
      if (this.cart[i].ProductId === id) {
         return true;

      }
    }
    return false;
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
    console.log(postData);
    return this.httpClient.post(`${environment.api}/UpdateCart`, postData);
  }

  GetFromDB() {
    console.log('Oh');
    this.httpClient.get(`${environment.api}/GetCart?token=${localStorage.getItem('token')}`).subscribe((data: GetFromDBResPonse) => {
      if (data.status) {
        this.cart = [];
        this.totalPrice = 0;
        for (const product of data.cart) {
          this.cart.push({
            ProductId: product.ProductId,
            Count: product.Count,
            Price: product.Price,
            NAME: product.NAME,
            NAME_EN: product.NAME_EN,
            NAME_JP: product.NAME_JP,
            attributes: product.attributes,
            Icon: product.Icon,
          });
          this.totalPrice += (product.Count * product.Price);
        }
        this.Gotten = true;
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.authSvc.TokenFresh();
        this.Gotten = true;
      }
    });
  }

  MakeOrder(Order) {
    const Result = Order;
    Result.token = localStorage.getItem('token');
    return this.httpClient.post(`${environment.api}/MakeOrder`, Result);
  }
}
