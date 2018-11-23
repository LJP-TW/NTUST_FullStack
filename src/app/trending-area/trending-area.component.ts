import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';

@Component({
  selector: 'app-trending-area',
  templateUrl: './trending-area.component.html',
  styleUrls: ['./trending-area.component.css']
})
export class TrendingAreaComponent implements OnInit {

product: any[];

  constructor(public productDataBase: ProductDataBaseService, public elementRef: ElementRef) { }

  ngOnInit() {
    this.product = this.productDataBase.Products.sort((a, b) => {
      const d1 = new Date(a.updatedAt);
      const d2 = new Date(b.updatedAt);
      if (d1 > d2) {
        return 1;
      } else if (d1 < d2) {
        return -1;
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    // <script src="assets/js/bootstrap-select.min.js"></script>
    const JQuery = document.createElement('script');
    JQuery.type = 'text/javascript';
    JQuery.src = 'assets/js/bootstrap-select.min.js';
    this.elementRef.nativeElement.appendChild(JQuery);

    // <script src="assets/js/bootstrap.min.js"></script>
    const JQuery2 = document.createElement('script');
    JQuery2.type = 'text/javascript';
    JQuery2.src = 'assets/js/bootstrap.min.js';
    this.elementRef.nativeElement.appendChild(JQuery2);

    // <script src="assets/js/main.js"></script>
    const JQuery3 = document.createElement('script');
    JQuery3.type = 'text/javascript';
    JQuery3.src = 'assets/js/main.js';
    this.elementRef.nativeElement.appendChild(JQuery3);
  }

  sortByDate() {
    this.product = this.productDataBase.Products.sort((a, b) => {
      const d1 = new Date(a.updatedAt);
      const d2 = new Date(b.updatedAt);
      if (d1 > d2) {
        return 1;
      } else if (d1 < d2) {
        return -1;
      }
    });
  }
  sortByPrice() {
    this.product = this.productDataBase.Products.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      } else if (b.price > a.price) {
        return -1;
      }
    });
  }
}
