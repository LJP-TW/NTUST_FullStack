import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';


interface Data {
  country: string;
  name: string;
  address: string;
  postcode: string;
  email: string;
  phone: string;
  payment: string;
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
  postcode = '';
  email = '';
  phone = '';
  payment = '';
  ck = false;
  list: Data[] = [];

  constructor(public productDataBase: ProductDataBaseService) { }
  ngOnInit() {
  }

  output() {
    this.list.push({country: this.country, name: this.name, address: this.address,
    postcode: this.postcode, email: this.email, phone: this.phone, payment: this.payment});
    console.log(this.list);
  }
}
