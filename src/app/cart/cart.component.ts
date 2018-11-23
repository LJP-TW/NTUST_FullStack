import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';

interface Order {
  product: any;
  amount: number;
  finalPrice: number;
  total: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsPerPage = 4;
  page = 1;
  pageMax = 0;
  productMax = 0;
  indexS = 0;
  indexE = 0;
  filter = true;

  constructor(
    public productDataBase: ProductDataBaseService,
    private elementRef: ElementRef
  ) {}

  // 接 DataService
  // 購物車陣列
  Cart: Order[] = [];
  total = 0;

  CartTotalCtrl = true;
  subTotal = 0;
  shippingCharge = 0;
  amountTotal = 0;
  CartAmount = 0;

  ngOnInit() {
    // for (const id of this.productDataBase.Cart) {
    //   for (const product of this.productDataBase.Products ) {
    //     if (product.id === id) {
    //       console.log(product);
    //       this.Cart.push({product: product, amount: 1, total: product.price/100 * (100-product.discount)});
    //       this.total += product.price;
    //       break;
    //     }
    //   }
    // }
    this.Cart = this.productDataBase.odCart;
    this.Cart.forEach(element => {
      this.total += element.total;
    });
    for (let i = 0 ; i < this.Cart.length ; i++) {
      this.amountTotal += this.Cart[i].amount;
    }
    this.CartAmount = this.Cart.length;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.Cart = this.productDataBase.odCart;
    this.cartChanged();
    this.Page(1);
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

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
    ++this.Cart[index].amount;
    this.Cart[index].total += this.Cart[index].finalPrice;
    this.total += this.Cart[index].finalPrice;
    this.amountTotal++;
  }
  // 減號紐被按下，減少商品數量
  minusClick(index: number) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }

    if (this.Cart[index].amount !== 0) {
      --this.Cart[index].amount;
      this.Cart[index].total -= this.Cart[index].finalPrice;
      this.total -= this.Cart[index].finalPrice;
      this.amountTotal--;
    }
  }
  // 將商品移出購物車
  CartRemove(index: number) {
    if (this.page !== 1) {
      index += (this.page - 1) * this.productsPerPage;
    }
    this.total -= this.Cart[index].total;
    this.amountTotal -= this.Cart[index].amount;
    this.productDataBase.CartRemove(index);
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
  // 更新購物車
  updateCart() {}


  // page
  cartChanged() {
    this.pageMax = Math.ceil(this.Cart.length / this.productsPerPage);
    console.log(this.pageMax);
    this.productMax = this.Cart.length;
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
    this.indexE = tmpEnd < this.Cart.length ? tmpEnd : this.Cart.length;
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
}
