import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';


interface Data {
  country: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  total: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  country = '';
  name = '';
  address = '';
  email = '';
  phone = '';
  total = 0;
  ck = false;
  list: Data[] = [];

  constructor(public productDataBase: ProductDataBaseService) { }
  ngOnInit() {
    this.productDataBase.odCart.forEach(price => {
      this.total += price.total;
    });
  }

  output() {
    this.list.push({country: this.country, name: this.name, address: this.address,
    email: this.email, phone: this.phone, total: this.total});
    console.log(this.list);
  }
}
