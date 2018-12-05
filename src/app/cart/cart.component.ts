import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';
import { MonsterService } from '../monster.service';
import { Monster } from '../monster';
import { Attribute } from '@angular/compiler';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


interface Order {
 // monster: Monster;
  productID: number;
  name: string;
  amount: number;
  price: number;
  // 總價
  total: number;
  attributes: Attribute[];
  icon: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {
  productsPerPage = 4;
  page = 1;
  pageMax = 0;
  productMax = 0;
  indexS = 0;
  indexE = 0;
  filter = true;

  constructor(
    public cartService: CartService,
    public monster: MonsterService,
    private elementRef: ElementRef,
    public authService: AuthService,
    private router: Router
  ) {}

  // 接 DataService
  // 購物車陣列
  Cart: CartItem[] = [];
  // 購物車詳細資料
  CartData: Order[] = [];

  CartTotalCtrl = true;
  subTotal = 0;
  shippingCharge = 0;
  amountTotal = 0;
  CartAmount = 0;

  ngOnInit() {
    if (this.authService.LoggedInRedirect()) {
      return;
    }

    this.WaitForService();
  }

  ngAfterViewInit(): void {
    const sliderAffect = document.createElement('script');
    sliderAffect.type = 'text/javascript';
    sliderAffect.src = 'assets/js/main.js';
    this.elementRef.nativeElement.appendChild(sliderAffect);
  }

  WaitForService() {
    const clock = 200;
    let count = 0;
    const init = setInterval(() => {
      if (this.cartService.Gotten) {
        if (this.cartService.cart.length === 0) {
          this.router.navigate(['/category']);
        }
        this.cartChanged();
        this.Page(1);
        this.updateCartAmount();
        clearInterval(init);
        return;
      } else {
        ++count;
        if (count === 50) {
          alert('購物車加載失敗');
          clearInterval(init);
          return;
        }
      }
    }, clock);
  }

  // 加號紐被按下，增加商品數量
  plusClick(index: number) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }
    this.cartService.Plus(this.cartService.cart[index].ProductId);
    this.updateCartAmount();
  }
  // 減號紐被按下，減少商品數量
  minusClick(index: number) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }

    if (this.cartService.cart[index].Count !== 1) {
      this.cartService.Minus(this.cartService.cart[index].ProductId);
      this.updateCartAmount();
    }
  }
  // 將商品移出購物車
  CartRemove(index: number) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }
    this.updateCartAmount();
    this.cartService.Remove(this.cartService.cart[index].ProductId);

    this.cartChanged();
    if (this.pageMax < this.page) {
      this.Page(this.page - 1);
    }
  }

  // 隱藏、顯示左側資訊欄位
  cartTotalClick() {
    if (this.CartTotalCtrl === false) {
      this.CartTotalCtrl = true;
    } else {
      this.CartTotalCtrl = false;
    }
  }

  // 更新購物車
  updateCartData(index) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }

    if (isNaN(Number(this.cartService.cart[index].Count))) {
      this.cartService.cart[index].Count = 1;
    } else if (Number(this.cartService.cart[index].Count) <= 0) {
      this.cartService.cart[index].Count = -this.cartService.cart[index].Count;
    } else {
      this.cartService.cart[index].Count = Number(this.cartService.cart[index].Count);
    }

    this.cartService.refreshTotalPrice();

    this.ngAfterViewInit();
  }

  updateCartAmount() {
    this.amountTotal = 0;
    for (let i = 0; i < this.cartService.cart.length; i++) {
      this.amountTotal += Number(this.cartService.cart[i].Count);
    }
    return this.amountTotal;
  }

  // page
  cartChanged() {
    this.productMax = this.cartService.cart.length;
    this.pageMax = Math.ceil(this.productMax / this.productsPerPage);
  }

  Page(value: number) {
    if (value > this.pageMax) {
      value = this.pageMax;
    } else if (value < 1) {
      value = 1;
    }
    this.page = value;
    this.indexS = this.productsPerPage * (this.page - 1);
    const tmpEnd = this.productsPerPage * this.page;
    this.indexE = tmpEnd < this.cartService.cart.length ? tmpEnd : this.cartService.cart.length;
  }

  nextPage() {
    if (this.page < this.pageMax) {
      this.Page(this.page + 1);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.Page(this.page - 1);
    }
  }

  CreatePageIndex(value: number): Array<number> {
    return Array.from(Array(this.pageMax).keys()).map(n => {
      return (n = n + 1);
    });
  }

  checkout() {
    this.cartService.ForceUpdate();
    const clock = 200;
    let count = 0;
    const timer = setInterval(() => {
      if (this.cartService.cartUpdated) {
        this.router.navigate(['/checkout']);
        clearInterval(timer);
        return;
      } else {
        ++count;
        // 等了 50 個 clock, 也就是 10 秒
        if (count === 50) {
          alert('購物車無法更新');
          clearInterval(timer);
          return;
        }
      }
    }, clock);
  }
}
