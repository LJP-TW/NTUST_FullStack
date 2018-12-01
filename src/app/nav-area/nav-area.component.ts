import { AuthService } from './../auth.service';
import { MonsterService } from './../monster.service';
import { CartService } from './../cart.service';
import { NavService } from './../nav.service';
import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';

interface MonsterCache {
  name: string;
}

@Component({
  selector: 'app-nav-area',
  templateUrl: './nav-area.component.html',
  styleUrls: ['./nav-area.component.css']
})
export class NavAreaComponent implements OnInit {
  hover = 0;

  // 最大秀出的 CartItem 數量
  maxShowNum = 4;

  // 暫存
  monstersCache: MonsterCache[] = [];

  constructor(public navService: NavService,
    public cartService: CartService,
    public monsterService: MonsterService,
    public authService: AuthService) { }

  ngOnInit() {
    if (this.authService.LoggedIn()) {
      this.cartService.GetFromDB();

      for (let i = 0; i < this.maxShowNum; ++i) {
        if (this.cartService.cart.length <= i) {
          break;
        }

        this.monstersCache.push({
          name: '',
        });

        this.monsterService.getMonstersByID(this.cartService.cart[i].ProductId).subscribe((data) => {
          console.log(data);
          // this.monstersCache[i].name = data;
        });
      }
    }
  }

  test() {
    console.log(this.cartService.cart);
  }

  Remove(id: number, index: number) {
    this.cartService.Remove(id);
  }
}
