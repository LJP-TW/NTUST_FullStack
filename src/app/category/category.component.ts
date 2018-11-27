import { MonsterService } from './../monster.service';
import { NavService } from './../nav.service';
import { Component, OnInit, ElementRef, PACKAGE_ROOT_URL } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';
import { Monster } from '../monster'
import { ThrowStmt } from '@angular/compiler';
import * as $ from 'jquery'
import { CartService } from '../cart.service';
import { QueryReadType } from '@angular/core/src/render3/interfaces/query';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  //Filter Switch
  filter = true;
  enableMCFilter = false;
  enablePriceFilter = false;

  //MonsterAttr Selector
  FilterMonsterAttr = [false,false,false,
                       false,false,false,
                       false,false,false,
                       false,false,false,
                       false,false,false,
                       false,false,false];
  
  //PriceFilter
  priceMax = 0;
  priceMin = 0;

  //Monster Buffer
  productMax = 0;
  CacheIndex = 0;

  //Pages
  productsPerPage = 12;
  page = 1;
  pageMax = 0;
  indexS = 0;
  indexE = 0;
  PageIndexNum = 5;





  //Query String
  QS_MonsterCat="";
  QS_PriceFilter="";
  QS_Sort="";

  // tslint:disable-next-line:max-line-length
  constructor(public monsterService: MonsterService, 
              public cartService: CartService,
              private elementRef: ElementRef,
              private navService: NavService) {
    this.navService.currentPage = 'category';
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentInit(): void {
    this.SortNone();
    this.FilterOn();
  }


  // Helper Function
  MathRound(value){
    return Math.floor(value)
  }
 
  getIcon(id){
    return "assets/images/blog1.jpg";
  }

 
  // Sorting
  SortNone() {
    this.QS_Sort="";
    this.QueryMonster();
    this.Page();
  }

  SortNewest() {
    this.QS_Sort="newest";
    this.QueryMonster();
  }

  SortCheapest() {
    this.QS_Sort="cheapest";
    this.QueryMonster();
  }

  SortHottest(){
    this.QS_Sort="hottest";
    this.QueryMonster();
  }

  // Filtering
  FilterPrice() {
    if(!this.enablePriceFilter)return;
    this.priceMin = $("#amount1").val();
    this.priceMax = $("#amount2").val();
    this.QS_PriceFilter=`price:${this.priceMin}-${this.priceMax}`;
    this.QueryMonster();
  }

  FilterAttr() {
    if(!this.enableMCFilter)return;
    let queryString = "";
    for(let i = 0 ; i <this.FilterMonsterAttr.length;i++){
      if(this.FilterMonsterAttr[i]){
        queryString += (i+1).toString()+",";
      }
    }
    this.QS_MonsterCat = queryString.slice(0,-1);
    this.QueryMonster();
  }

  ToggleMT(type){
    this.FilterMonsterAttr[type-1] = !this.FilterMonsterAttr[type-1];
  }

  // Paging
  
  AdjustPaging(){
    this.pageMax = Math.ceil(this.productMax / this.productsPerPage);
  }


  bufChanged() {

  }

  PageBuf()
  {
    let shift = this.monsterService.perCache*this.CacheIndex;
    return this.monsterService.monCache.slice(this.indexS-shift-1,this.indexE - shift);
  }


  Page(value: number = 1) {
    if (value > this.pageMax) {value = this.pageMax; } else if (value < 1) {value = 1; }
    this.page = value;

    this.indexS = this.productsPerPage * (this.page - 1)+1;
    const tmpEnd = this.productsPerPage * this.page;
    this.indexE =  tmpEnd < this.productMax ? tmpEnd : this.productMax;

    let lowThresh = this.monsterService.perCache * this.CacheIndex+1;
    let hiThresh = this.monsterService.perCache * (this.CacheIndex+1);

    if(this.indexS<lowThresh || this.indexE > hiThresh)
    {
        this.CacheIndex = Math.floor((this.productsPerPage * this.page-1)/ this.monsterService.perCache);
        this.QueryMonster(this.page);
        console.log('CacheIndex Changed',this.CacheIndex,'Range:',this.monsterService.perCache*this.CacheIndex+1,this.monsterService.perCache*(this.CacheIndex+1));
    }
    
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

  CreatePageIndex(): Array<number> {
    let PageIndex:number[] = [];

    if(this.pageMax < this.PageIndexNum){
        for(let i = 1 ; i<= this.pageMax ; i++){
          PageIndex[i-1] = i;
        }
        return PageIndex;
    }
    else{
      let direction = false;
      let left = 0;
      let right = 0;
      for(;left+right+1 < this.PageIndexNum;){
        if(!direction){
          if(this.page - left -1 >= 1){
            left+=1;
          }
        }
        else {
          if(this.page + right +1 <= this.pageMax)
          {
            right+=1;
          }
        }
        direction = !direction;
      }
      for(;left >= 0 ;left--){
        PageIndex.push(this.page - left);
      }
      for(let i = 1; i<=right ;i++){
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

    // <script src="assets/js/odAdd.js"></script>
    const sliderEffect = document.createElement('script');
    sliderEffect.type = 'text/javascript';
    sliderEffect.src = 'assets/js/odAdd.js';
    this.elementRef.nativeElement.appendChild(sliderEffect);
  }

  FilterOff() {
    this.productsPerPage = 12;
    this.filter = false;
    this.AdjustPaging();
    this.Page(this.page);
  }

  //Query
  QueryMonster(Page:number = 1){
    //Preparing the queryString
    let queryString = "";
    if(this.QS_Sort.length){
      queryString += this.QS_Sort+ ',';
    }
    if(this.QS_PriceFilter.length && this.enablePriceFilter){
      queryString += this.QS_PriceFilter+',';
    }
    if(this.QS_MonsterCat.length && this.enableMCFilter){
      queryString += this.QS_MonsterCat +',';
    }

    if(queryString.length==0){
      queryString = "*";
    }
    else{
      queryString = queryString.slice(0,-1);
    }

    console.log(queryString);



    //Api
    let start = 0 + this.CacheIndex * this.monsterService.perCache;
    let end = start + this.monsterService.perCache-1;
    this.monsterService.monCache  = [];
    this.monsterService.getMonsters(start,end,queryString).subscribe((data:Monster[])=>{
      this.monsterService.monCache  = data;
    })
    this.monsterService.getMonstersAmount(queryString).subscribe((data:number)=>{
      this.productMax = data;
      this.AdjustPaging();
      this.Page(Page);
    })
  }

}
