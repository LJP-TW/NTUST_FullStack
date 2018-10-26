import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor() {}
  // 商品數量及資訊
  productNum = 4;
  prodoct = [];
  //
  SHIPPINGCtrl = true;
  CartTotalCtrl = true;
  price1 = 90;
  price2 = 80;
  price3 = 110;
  price4 = 70;
  quantity1 = 1;
  quantity2 = 1;
  quantity3 = 1;
  quantity4 = 1;
  total1 = this.price1 * this.quantity1;
  total2 = this.price2 * this.quantity2;
  total3 = this.price3 * this.quantity3;
  total4 = this.price4 * this.quantity4;

  subTotal = 0;
  shippingCharge = 0;
  total = 0;

  ngOnInit() {}

  // 加號紐被按下，增加商品數量
  plusClick(id) {
    switch (id) {
      case 1:
        this.quantity1++;
        this.total1 = this.price1 * this.quantity1;
        break;
      case 2:
        this.quantity2++;
        this.total2 = this.price2 * this.quantity2;
        break;
      case 3:
        this.quantity3++;
        this.total3 = this.price3 * this.quantity3;
        break;
      case 4:
        this.quantity4++;
        this.total4 = this.price4 * this.quantity4;
        break;
    }
  }
  // 減號紐被按下，減少商品數量
  minusClick(id) {
    switch (id) {
      case 1:
        if (this.quantity1 !== 0) {
          this.quantity1--;
          this.total1 = this.price1 * this.quantity1;
        }
        break;
      case 2:
        if (this.quantity2 !== 0) {
          this.quantity2--;
          this.total2 = this.price2 * this.quantity2;
        }
        break;
      case 3:
        if (this.quantity3 !== 0) {
          this.quantity3--;
          this.total3 = this.price3 * this.quantity3;
        }
        break;
      case 4:
        if (this.quantity4 !== 0) {
          this.quantity4--;
          this.total4 = this.price4 * this.quantity4;
        }
        break;
    }
  }

  // 隱藏、顯示左側資訊欄位
  shipClick() {
    //if (this.SHIPPINGCtrl === false) {
    //  this.SHIPPINGCtrl = true;
    //} else {
    //  this.SHIPPINGCtrl = false;
    //}
  }
  cartTotalClick() {
    // if (this.CartTotalCtrl === false) {
    //   this.CartTotalCtrl = true;
    // } else {
    //   this.CartTotalCtrl = false;
    // }
  }
  //
  // 更新購物車
  updateTotal() {
    this.subTotal = this.total1 + this.total2 + this.total3 + this.total4;
    this.total = this.subTotal + this.shippingCharge;
  }
  updateCart() {
    this.subTotal = this.total1 + this.total2 + this.total3 + this.total4;
    this.total = this.subTotal + this.shippingCharge;
  }
}
