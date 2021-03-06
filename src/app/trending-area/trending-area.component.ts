import { CartItem } from './../cart-item';
import { Component, OnInit, ElementRef } from '@angular/core';
import { MonsterService} from '../monster.service';
import { Monster } from '../monster';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-trending-area',
  templateUrl: './trending-area.component.html',
  styleUrls: ['./trending-area.component.css']
})
export class TrendingAreaComponent implements OnInit {

  // 預設先塞空殼, 讓 html 能 binding 到, ngOnInit 時再更新
  product: Monster[] = [
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    },
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    },
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    },
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    },
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    },
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    },
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    },
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    },
    {
      NAME: '',
      createdAt: '',
      discount: 0,
      id: 0,
      price: 0,
      sold: 0,
      finalPrice: 0,
      Icon: {src: ''},
    }
  ];
  productNew: Monster[];
  productCheap: Monster[];
  productSold: Monster[];

  constructor(public monsterSvc: MonsterService, public cartService: CartService, public elementRef: ElementRef) { }

  ngOnInit() {
    this.monsterSvc.getMonsters(0, 8, 'newest').subscribe((data: Monster[]) => {
      console.log('trending-area');
      console.log(data);
      this.productNew = data;
      this.product = this.productNew;
    });
    this.monsterSvc.getMonsters(0, 8, 'cheapest').subscribe((data: Monster[]) => {
      this.productCheap = data;
    });
    this.monsterSvc.getMonsters(0, 8, 'hottest').subscribe((data: Monster[]) => {
      this.productSold = data;
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
    this.product = this.productNew;
  }
  sortByPrice() {
    this.product = this.productCheap;
  }
  sortBySold() {
    this.product = this.productSold;
  }
  AddToCart(id) {
    this.cartService.Add(id);
  }
}
