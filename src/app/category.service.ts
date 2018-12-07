import { MonsterService } from './monster.service';
import { Attribute } from './attribute';
import { NavService } from './nav.service';
import { Injectable } from '@angular/core';
import { Monster } from './monster';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { query } from '@angular/core/src/render3/query';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 // Filter Switch
 filter = false;
 enableMCFilter = false;
 enablePriceFilter = false;

 // MonsterAttr Selector
 public MonsterAttrs: Attribute[] = [
  // { name: '一般', color : '#aa9',active: false },
  // { name: '火', color : '#f42',active: false },
  // { name: '水', color : '#39f',active: false },
  // { name: '電', color : '#fc3',active: false },
  // { name: '草', color : '#7c5',active: false },
  // { name: '冰', color : '#6cf',active: false },
  // { name: '毒', color : '#a59',active: false },
  // { name: '鋼', color : '#aab',active: false },
  // { name: '超能力', color :'#f59',active: false },
  // { name: '岩石', color : '#ba6',active: false },
  // { name: '幽靈', color :'#66b',active: false },
  // { name: '惡', color :'#754',active: false },
  // { name: '妖精', color : '#e9e',active: false},
  // { name: '蟲', color : '#ab2',active: false },
  // { name: '飛行', color :'#89f',active: false },
  // { name: '地面', color : '#db5',active: false },
  // { name: '格鬥', color : '#b54',active: false },
  // { name: '龍', color : '#76e',active: false },
 ];



 // PriceFilter
 priceMax = 40000;
 priceMin = 1000;

 // Monster Buffer
 productMax = 0;
 CacheIndex = 0;

 // Pages
 productsPerPage = 12;
 page = 1;
 pageMax = 0;
 indexS = 0;
 indexE = 0;
 PageIndexNum = 5;

// Buffer
public monCache: Monster[] = [];
public perCache = 36;


 // Query String
 QS_MonsterCat = '';
 QS_PriceFilter = '';
 QS_Sort = '';

 // Search String
  SearchString = '';

 // tslint:disable-next-line:max-line-length
 constructor(public monsterService: MonsterService,
             public cartService: CartService,
             private navService: NavService,
             private router: Router) {
   this.navService.currentPage = 'category';

  //  Initialization
   this.SortNone();
   this.FilterOff();
   this.monsterService.getAttributes().subscribe((data: Attribute[]) => {
      this.MonsterAttrs = data;
      this.MonsterAttrs.forEach((entry) => {
        entry.active = false;
      });
   });
   
 }


 // tslint:disable-next-line:use-life-cycle-interface
 ngAfterContentInit(): void {

 }


 Init() {
  this.SortNone();
  this.FilterOn();
 }

 // Helper Function
 MathRound(value) {
  return Math.floor(value);
}

getIcon(index) {

  return this.monCache[index].Icon;
  // return this.monsterService.getMonsterImg(300,id);
  // return "assets/images/blog1.jpg";
}

 // Sorting
 SortNone() {
   this.QS_Sort = '';
   this.QueryMonster();
 }

 SortNewest() {
   this.QS_Sort = 'newest';
   this.QueryMonster();
 }

 SortCheapest() {
   this.QS_Sort = 'cheapest';
   this.QueryMonster();
 }

 SortHottest() {
   this.QS_Sort = 'hottest';
   this.QueryMonster();
 }

 // Filtering
 FilterPrice() {
   if (!this.enablePriceFilter) {return; }
   this.priceMin = $('#amount1').val();
   this.priceMax = $('#amount2').val();
   this.QS_PriceFilter = `price:${this.priceMin}-${this.priceMax}`;
   this.QueryMonster();
 }

 FilterAttr() {
   if (!this.enableMCFilter) {return; }
   let queryString = '';
   this.MonsterAttrs.forEach((attr:Attribute)=>{
      if(attr.active){
        queryString += attr.value.toString() + ',';
      }
   })
   this.QS_MonsterCat = queryString.slice(0, -1);
   this.QueryMonster();
 }

 ToggleMT(type) {
  this.MonsterAttrs[type].active = !this.MonsterAttrs[type].active;
  }


 // Displaying
 Display(category?: string[], price?: string, sort?: string) {
   this.enableMCFilter = false;
   this.enablePriceFilter = false;
   this.QS_Sort = '';
   if (category !== undefined) {
     this.enableMCFilter = true;
    const fbuf: any[] =  this.MonsterAttrs.filter((data) => {
      return category.findIndex((ele, ind) => data.NAME === ele) !== -1;
    });
    this.MonsterAttrs.forEach((data) => {data.active = false; });
    fbuf.forEach((data) => {data.active = true; });
    let queryString = '';
    for (let i = 0 ; i < this.MonsterAttrs.length; i++) {
      if (this.MonsterAttrs[i].active) {
        queryString += this.MonsterAttrs[i].value.toString() + ',';
      }
    }
    this.QS_MonsterCat = queryString.slice(0, -1);
  }
  if (price !== undefined) {

  }
  if (sort !== undefined) {

  }
  this.QueryMonster();
  this.router.navigate(['/category']);
 }


 // Searching
 SearchMonster() {
   if (this.SearchString.length) {
    this.monCache  = [];
    this.monsterService.searchMonsters(this.SearchString).subscribe((data: Monster[]) => {
      this.monCache  = data;
      this.productMax = this.monCache.length;
      this.AdjustPaging();
      this.Page(1);
      this.router.navigate(['/category']);
    });
   }
 }

 // Paging
 AdjustPaging() {
   this.pageMax = Math.ceil(this.productMax / this.productsPerPage);
 }


 PageBuf() {
   if (this.monCache.length === 0) {return; }
   const shift = this.perCache * this.CacheIndex;
   return this.monCache.slice(this.indexS - shift - 1, this.indexE - shift);
 }


 Page(value: number = 1) {
   if (this.pageMax === 0) {
     this.page = 0;
     this.indexS = 0;
     this.indexE = 0;
     this.CacheIndex = 0;
     return;
   } else if (value > this.pageMax) {
     value = this.pageMax;
   } else if (value < 1) {
     value = 1;
   }
   this.page = value;

   this.indexS = this.productsPerPage * (this.page - 1) + 1;
   const tmpEnd = this.productsPerPage * this.page;
   this.indexE =  tmpEnd < this.productMax ? tmpEnd : this.productMax;

   const lowThresh = this.perCache * this.CacheIndex + 1;
   const hiThresh = this.perCache * (this.CacheIndex + 1);

   if (this.indexS < lowThresh || this.indexE > hiThresh) {
       this.CacheIndex = Math.floor((this.productsPerPage * this.page - 1) / this.perCache);
       this.QueryMonster(this.page);
   }
   window.scrollTo(0, 0);
 }

 nextPage() {
   if (this.page < this.pageMax) {
     this.Page(this.page + 1);
   }
 }

 nextTenPage() {
  if (this.page < this.pageMax) {
    this.Page(this.page + 10);
  }
  }

 prevPage() {
  if (this.page > 1) {
     this.Page(this.page - 1);
   }
 }

 prevTenPage() {
  if (this.page > 1) {
    this.Page(this.page - 10);
  }
}

 CreatePageIndex(): Array<number> {
   if (this.monCache.length === 0) {return [0]; }

   const PageIndex: number[] = [];

   if (this.pageMax < this.PageIndexNum) {
       for (let i = 1 ; i <= this.pageMax ; i++) {
         PageIndex[i - 1] = i;
       }
       return PageIndex;
   } else {
     let direction = false;
     let left = 0;
     let right = 0;
     for (; left + right + 1 < this.PageIndexNum;) {
       if (!direction) {
         if (this.page - left - 1 >= 1) {
           left += 1;
         }
       } else {
         if (this.page + right + 1 <= this.pageMax) {
           right += 1;
         }
       }
       direction = !direction;
     }
     for (; left >= 0 ; left--) {
       PageIndex.push(this.page - left);
     }
     for (let i = 1; i <= right ; i++) {
       PageIndex.push(this.page + i );
     }
     return PageIndex;
   }
 }

 // FilterButton
 FilterIco_Loc() {
   if (!this.filter) {return 'assets/images/filter_ico_off.png'; } else { return 'assets/images/filter_ico.png'; }
 }

 FilterOn() {
   this.productsPerPage = 9;
   this.filter = true;
   this.AdjustPaging();
   this.Page(this.page);
 }

 FilterOff() {
   this.productsPerPage = 12;
   this.filter = false;
   this.AdjustPaging();
   this.Page(this.page);
 }

 // Query
 QueryMonster(Page: number = 1) {
   // Preparing the queryString
   let queryString = '';
   if (this.QS_Sort.length) {
     queryString += this.QS_Sort + ',';
   }
   if (this.QS_PriceFilter.length && this.enablePriceFilter) {
     queryString += this.QS_PriceFilter + ',';
   }
   if (this.QS_MonsterCat.length && this.enableMCFilter) {
     queryString += this.QS_MonsterCat + ',';
   }

   if (queryString.length === 0) {
     queryString = '*';
   } else {
     queryString = queryString.slice(0, -1);
   }



   // Api
   const start = this.CacheIndex * this.perCache;
   const end = start + this.perCache - 1;
   this.monCache  = [];
   this.monsterService.getMonsters(start, end, queryString).subscribe((data: Monster[]) => {
     this.monCache  = data;
     this.monsterService.getMonstersAmount(queryString).subscribe((data2: number) => {
      this.productMax = data2;
      this.AdjustPaging();
      this.Page(Page);
    });
   });

 }


}
