import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataBaseService } from '../product-data-base.service';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private monsterService: MonsterService,
    private elementRef: ElementRef,
    private cartService: CategoryService,
    ) { }

  public Product: Monster;
  ngOnInit() {
    // <script src="assets/js/bootstrap.min.js"></script>
    const sliderAffect = document.createElement('script');
    sliderAffect.type = 'text/javascript';
    sliderAffect.src = 'assets/js/bootstrap.min.js';
    this.elementRef.nativeElement.appendChild(sliderAffect);

    // <script src="assets/js/main.js"></script>
    const sliderAffect2 = document.createElement('script');
    sliderAffect2.type = 'text/javascript';
    sliderAffect2.src = 'assets/js/main.js';
    this.elementRef.nativeElement.appendChild(sliderAffect2);

    // 要更新
    this.route.params.subscribe( (data: any) => {
      if (this.cartService.monCache.length) {
        this.Product = this.cartService.monCache.filter((cacheData: Monster) => {
          return cacheData.id === data.id;
        })[0];
      } else {
        this.router.navigate(['**']);
      }
    });
  }

}
