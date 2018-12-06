import { Attribute } from 'src/app/attribute';
import { CategoryService } from './../category.service';
import { AuthService } from './../auth.service';
import { MonsterService } from './../monster.service';
import { CartService } from './../cart.service';
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

  // 最大秀出的 CartItem 數量
  maxShowNum = 4;

  // 最大秀出的 分類 數量
  maxCategoryNum = 7;

  // Monster Attributes
  attributes: Attribute[] = [];

  constructor(public navService: NavService,
    public cartService: CartService,
    public monsterService: MonsterService,
    public authService: AuthService,
    public categoryService: CategoryService) { }

  ngOnInit() {
    this.monsterService.getAttributes().subscribe((data: Attribute[]) => {
      this.attributes = data;
    }, (error) => {
      console.log(error);
    });
  }

  test() {
    console.log(this.cartService.cart);
  }

  Remove(id: number, index: number) {
    this.cartService.Remove(id);
  }
}
