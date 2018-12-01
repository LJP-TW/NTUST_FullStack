import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';
import { Router } from '@angular/router';
import { Monster } from '../monster';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { CartItem } from '../cart-item';

interface Message {
  order: string;
}
interface OrderResponse {
  status: boolean;
  message: Message;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  Data = {
    country: '',
    name: '',
    Address: '',
    email: '',
    phone: '',
    total: 0,
  };
  order: CartItem[];
  ck = false;

  constructor(public cartService: CartService,
              private authService: AuthService,
              private router: Router,
              public productDataBase: ProductDataBaseService) { }
  ngOnInit() {
    this.authService.LoggedInRedirect();
    this.cartService.UpdateFunc();
    this.cartService.GetFromDB();
    this.Data.total = this.cartService.totalPrice,
    this.order = this.cartService.cart;
    console.log(this.order);
    /*this.productDataBase.odCart.forEach(price => {
      this.Data.total += price.total;
    });*/
  }
  output() {
    this.cartService.MakeOrder(this.Data).subscribe((data: OrderResponse) => {
      if (data.status) {
        alert('下單成功!');
        this.router.navigate(['/']);
      } else {
        alert('fail, check again!');
      }
    });
    console.log(this.Data);
  }
}
