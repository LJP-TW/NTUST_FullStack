import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';

@Component({
  selector: 'app-nav-area',
  templateUrl: './nav-area.component.html',
  styleUrls: ['./nav-area.component.css']
})
export class NavAreaComponent implements OnInit {

  constructor(public productDataBase: ProductDataBaseService) { }

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
