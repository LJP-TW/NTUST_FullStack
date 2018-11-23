import { NavService } from './../nav.service';
import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';

@Component({
  selector: 'app-nav-area',
  templateUrl: './nav-area.component.html',
  styleUrls: ['./nav-area.component.css']
})
export class NavAreaComponent implements OnInit {
  hover = 0;

  constructor(public productDataBase: ProductDataBaseService, public navService: NavService) { }

  ngOnInit() {
  }

  CartTotalCost() {
    let total = 0;
    this.productDataBase.odCart.forEach((n) => {
        total += n.total;
    });
    return total;
  }
}
