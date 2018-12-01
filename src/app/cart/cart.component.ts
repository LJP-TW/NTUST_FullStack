import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';
import { MonsterService } from '../monster.service';
import { Monster } from '../monster';
import { Attribute } from '@angular/compiler';
import { AuthService } from '../auth.service';


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
    public authService: AuthService
  ) {}

  // 接 DataService
  // 購物車陣列
  Cart: CartItem[] = [];
  // 購物車詳細資料
  CartData: Order[] = [];
  cartTotal = 0;

  CartTotalCtrl = true;
  subTotal = 0;
  shippingCharge = 0;
  amountTotal = 0;
  CartAmount = 0;

  ngOnInit() {
    // console.log(this.cartTotal);
    // this.amountTotal = 0;
    // this.Cart = this.cartService.cart;
    // this.cartChanged();
    // this.Page(1);

    // this.cartTotal = this.cartService.totalPrice;
    // this.CartAmount = this.Cart.length;

    this.authService.LoggedInRedirect();
    this.cartService.GetFromDB();
    this.initCartData();
    // this.amountTotal = 0;

    // this.Cart = this.cartService.cart;
    // if (this.cartService.cart.length === 0) {
    //   alert('gg');
    // }
    setTimeout(() => {
      this.cartChanged();
      this.Page(1);
      for (let i = 0; i < this.cartService.cart.length; i++) {
        this.amountTotal += this.cartService.cart[i].Count;
      }
      this.cartTotal = this.cartService.totalPrice;
      console.log(this.cartService.cart.length);
    }, 500);

  }

  ngAfterViewInit(): void {
    this.amountTotal = 0;
    this.Cart = this.cartService.cart;
    this.cartTotal = this.cartService.totalPrice;
    for (let i = 0; i < this.cartService.cart.length; i++) {
      this.amountTotal += this.cartService.cart[i].Count;
    }
    this.cartChanged();
    this.Page(1);
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    console.log(this.cartService.cart.length);

    // <script src="assets/js/main.js"></script>
    const sliderAffect = document.createElement('script');
    sliderAffect.type = 'text/javascript';
    sliderAffect.src = 'assets/js/main.js';
    this.elementRef.nativeElement.appendChild(sliderAffect);
  }

  // 加號紐被按下，增加商品數量
  plusClick(index: number) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }
    // this.CartData[index].amount++;
    // this.CartData[index].total += this.CartData[index].price;
    // this.cartTotal += this.CartData[index].price;
    this.cartService.Plus(this.cartService.cart[index].ProductId);
    this.cartTotal = this.cartService.totalPrice;
    this.amountTotal++;
  }
  // 減號紐被按下，減少商品數量
  minusClick(index: number) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }

    if (this.cartService.cart[index].Count !== 0) {
      this.cartService.Minus(this.cartService.cart[index].ProductId);
      // this.CartData[index].amount--;
      // this.CartData[index].total -= this.CartData[index].price;
      // this.cartTotal -= this.CartData[index].price;
      this.cartTotal = this.cartService.totalPrice;
      this.amountTotal--;
    }
  }
  // 將商品移出購物車
  CartRemove(index: number) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }
    this.cartTotal =
      (this.cartTotal * 1000 -
      this.cartService.cart[index].Count * this.cartService.cart[index].Price * 1000) /
      1000;
    this.amountTotal -= this.cartService.cart[index].Count;
    this.cartService.Remove(this.cartService.cart[index].ProductId);

    // this.CartData.splice(index, 1);
    // this.updateCartData();
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
  //
  // 初始化購物車，從資料庫抓資料
  initCartData() {
    // todo 利用Cart裡的Cart資訊，從資料庫裡撈資料丟進CartData裡
    this.amountTotal = 0;
    for (let i = 0; i < this.Cart.length; i++) {
      this.monster
        .getMonstersByID(this.Cart[i].ProductId)
        .subscribe((data: Monster) => {
          this.cartService.cart[i].Icon = data[0].Icon;
          this.cartService.cart[i].attributes = data[0].attributes;
          this.cartService.cart[i].NAME = data[0].NAME;
        });

      this.amountTotal += this.Cart[i].Count;
    }
  }
  // 更新購物車
  updateCartData() {
    this.ngAfterViewInit();
  }

  // page
  cartChanged() {
    this.productMax = this.cartService.cart.length;
    this.pageMax = Math.ceil(this.productMax / this.productsPerPage);
    console.log(this.pageMax);
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
    // console.log(this.pageMax);
    return Array.from(Array(this.pageMax).keys()).map(n => {
      return (n = n + 1);
    });
  }
}
