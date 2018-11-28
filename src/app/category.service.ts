import { MonsterService } from './monster.service';
import { NavService } from './nav.service';
import { Component, OnInit, ElementRef, PACKAGE_ROOT_URL,Injectable } from '@angular/core';
import { ProductDataBaseService } from './product-data-base.service';
import { Monster } from './monster'
import { ThrowStmt } from '@angular/compiler';
import * as $ from 'jquery'
import { CartService } from './cart.service';
import { QueryReadType } from '@angular/core/src/render3/interfaces/query';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 //Filter Switch
 filter = true;
 enableMCFilter = false;
 enablePriceFilter = false;

 //MonsterAttr Selector
 public MonsterAttrs = [
  '一般',
  '火',
  '水',
  '電',
  '草',
  '冰',
  '毒',
  '鋼',
  '超能力',
  '岩石',
  '幽靈',
  '惡',
  '妖精',
  '蟲',
  '飛行',
  '地面',
  '格鬥',
  '龍',
 ]
 public FilterMonsterAttr =[];
 //PriceFilter
 priceMax = 40000;
 priceMin = 1000;

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

  //Bufffer
  public monCache:Monster[]=[];
  public perCache = 108;


 //Query String
 QS_MonsterCat="";
 QS_PriceFilter="";
 QS_Sort="";

 // tslint:disable-next-line:max-line-length
 constructor(public monsterService: MonsterService, 
             public cartService: CartService,
             private navService: NavService) {
   this.navService.currentPage = 'category';

  //  Initialization
   for(let i = 0 ; i < this.MonsterAttrs.length;i++){
      this.FilterMonsterAttr[i]=false;
   }




   this.SortNone();
   this.FilterOn();
 }

 ngOnInit() {

 }

 // tslint:disable-next-line:use-life-cycle-interface
 ngAfterContentInit(): void {
 }


 Init(){
  this.SortNone();
  this.FilterOn();
 }

 //Helper Function
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
   this.FilterMonsterAttr[type] = !this.FilterMonsterAttr[type];
 }

 // Paging
 AdjustPaging(){
   this.pageMax = Math.ceil(this.productMax / this.productsPerPage);
 }

 PageBuf()
 {
   let shift = this.perCache*this.CacheIndex;
   return this.monCache.slice(this.indexS-shift-1,this.indexE - shift);
 }


 Page(value: number = 1) {
   if (value > this.pageMax) {value = this.pageMax; } else if (value < 1) {value = 1; }
   this.page = value;

   this.indexS = this.productsPerPage * (this.page - 1)+1;
   const tmpEnd = this.productsPerPage * this.page;
   this.indexE =  tmpEnd < this.productMax ? tmpEnd : this.productMax;

   let lowThresh = this.perCache * this.CacheIndex+1;
   let hiThresh = this.perCache * (this.CacheIndex+1);

   if(this.indexS<lowThresh || this.indexE > hiThresh)
   {
       this.CacheIndex = Math.floor((this.productsPerPage * this.page-1)/ this.perCache);
       this.QueryMonster(this.page);
       console.log('CacheIndex Changed',this.CacheIndex,'Range:',this.perCache*this.CacheIndex+1,this.perCache*(this.CacheIndex+1));
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
   let start = 0 + this.CacheIndex * this.perCache;
   let end = start + this.perCache-1;
   this.monCache  = [];
   this.monsterService.getMonsters(start,end,queryString).subscribe((data:Monster[])=>{
     this.monCache  = data;
   })
   this.monsterService.getMonstersAmount(queryString).subscribe((data:number)=>{
     this.productMax = data;
     this.AdjustPaging();
     this.Page(Page);
   })
 }

}
