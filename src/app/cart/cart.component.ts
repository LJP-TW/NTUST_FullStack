import { Component, OnInit } from '@angular/core';
import { CartsService } from "../carts.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  get items() {
    return this.cartsService.items;
  }

  constructor(private cartsService: CartsService) {}

  CartTotalCtrl = true;
  subTotal = 0;
  shippingCharge = 0;
  total = 0;

  ngOnInit() {}

  // 加號紐被按下，增加商品數量
  plusClick(index) {
    this.items[index].quantity++;
    this.items[index].cost = this.items[index].price * this.items[index].quantity;
  }
  // 減號紐被按下，減少商品數量
  minusClick(index) {
    if (this.items[index].quantity > 0)
    {
      this.items[index].quantity--;
      this.items[index].cost = this.items[index].price * this.items[index].quantity;
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
  // 更新購物車
  updateCart() {
    this.subTotal = 0;
    for(var i = 0;i <　this.items.length;i++)
    {
      this.subTotal +=  this.items[i].cost;
    }
    this.total = this.subTotal + this.shippingCharge;
  }
}
