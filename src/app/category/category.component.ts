import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private buf:any[];
  private productsPerPage = 12;
  private page = 1;
  private pageMax:number = 0;
  private indexS = 0;
  private indexE = 12;
  public filter = true;
  constructor(public productDataBase:ProductDataBaseService) { }

  ngOnInit() {
    this.buf = this.productDataBase.Products;
   
    
  }

  Buf2SortNew(){
    this.buf = this.productDataBase.SortByPrice(false);
    this.Page(1);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  ngAfterContentInit(): void {
    this.Page(1);
  }

  //Paging
  Page(value:number){
    
    console.log(value);
    this.pageMax = Math.ceil(this.buf.length/this.productsPerPage);
    this.page = value;
    this.indexS = this.productsPerPage*(this.page - 1);
    let tmpEnd = this.productsPerPage*this.page;
    this.indexE =  tmpEnd < this.buf.length ? tmpEnd:this.buf.length;
    console.log(this.buf.length);
    console.log(this.pageMax,this.indexS,this.indexE);

  }

  nextPage(){
    if(this.page < this.pageMax){
      this.Page(this.page+1);
    }
  }

  prevPage(){
    if(this.page >= 0){
      this.Page(this.page-1);
    }
  }

  CreatePageIndex(value:number):Array<number>{
    return Array.from(Array(this.pageMax).keys()).map((n)=>{
      return n=n+1;
    });
  }

  //Filter
  FilterIco_Loc(){
    if(!this.filter)return "images/filter_ico_off.png"
    else return "images/filter_ico.png"
  }

  FilterOn(){
    this.filter = true;
  }

  FilterOff(){
    this.filter = false;
  }
    
}
