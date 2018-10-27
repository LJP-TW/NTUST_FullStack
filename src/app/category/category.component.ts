import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private priceMax = 0;
  private buf:any[];
  private productsPerPage = 10;
  private page = 1;
  private pageMax:number = 0;
  private productMax = 0;
  private indexS = 0;
  private indexE = 0;
  public filter = true;
  constructor(public productDataBase:ProductDataBaseService) { }

  ngOnInit() {
    
  }

  ngAfterContentInit(): void {

    this.Buf2All();
    this.bufChanged;
    this.Page(1);
    this.FilterOn();
  }

  finalPrice(value){
    return Math.ceil(value);
  }
  // 購物車, 只新增不重複的ID到service的Cart裡面, 數量在結帳才設定
  AddToCart(id: number) {
    let found = false;
    for(let i = 0 , j = this.productDataBase.odCart.length ; i < j ;i++){
        if(this.productDataBase.odCart[i].product.id == id){
          found = true;
          break;
        }
    }

    if (!found) {
      let product = this.productDataBase.Products.find((element)=>{
        return element.id ==  id;
      })
      if(product === undefined) return;
      let fPrice = Math.ceil(product.price/100 * (100-product.discount));
      this.productDataBase.odCart.push({product:product, amount: 1,finalPrice: fPrice, total: fPrice });
    }
  }

  // Sorting
  Buf2All(){
    this.buf = this.productDataBase.Products;
    this.bufChanged();
    this.Page(1);
  }


  Buf2SortNew(ASC:boolean){
    this.buf = this.productDataBase.Products.sort(
      (n1,n2) => {
        let d1 = new Date(n1.updatedAt);
        let d2 = new Date(n2.updatedAt);
        let reval = 0;
        let rev = ASC ? 1 : -1;
        if (d1.getTime() > d2.getTime()){
            reval  = 1 ;
        }
        else if ( d1.getTime() < d2.getTime()){
            reval = -1;
        }
        return reval * rev;
      });
    this.bufChanged();
    this.Page(1);
  }

  Buf2SortPrice(ASC: boolean){
    this.buf = this.productDataBase.Products.sort((n1, n2) => {
      let reval = 0;
      let rev = ASC ? 1 : -1;
      if (n1.price < n2.price){
          reval  = 1 ;
      }
      else if ( n1.price >  n2.price){
          reval = -1;
      }
      return reval * rev;
    })

    this.bufChanged();
    this.Page(1);
  }

  //Filtering
  Buf2Filter_maxPrice(value: number){
    value = this.priceMax;
    this.buf = this.productDataBase.Products.filter((n) => {
      return n.price <= value;
    });

    this.bufChanged();
    this.Page(1);
  }

  Buf2Filter_attribute(tagList: Array<string>){
    this.buf = this.productDataBase.Products;
    tagList.forEach(element => {
      this.buf = this.buf.filter((n) => {
        return n.attributes.findIndex(element) != -1
      })
    });

    this.bufChanged();
    this.Page(1);
  }

  //Paging
  bufChanged(){
    this.pageMax = Math.ceil(this.buf.length / this.productsPerPage);
    this.productMax = this.buf.length;
  }

  Page(value: number){
    if(value > this.pageMax)value = this.pageMax;
    else if(value < 1)value = 1;
    this.page = value;
    this.indexS = this.productsPerPage * (this.page - 1);
    let tmpEnd = this.productsPerPage * this.page;
    this.indexE =  tmpEnd < this.buf.length ? tmpEnd : this.buf.length;
  }

  nextPage(){
    if (this.page < this.pageMax){
      this.Page(this.page + 1);
    }
  }

  prevPage(){
    if (this.page > 1){
      this.Page(this.page - 1);
    }
  }

  CreatePageIndex(value: number): Array<number>{
    return Array.from(Array(this.pageMax).keys()).map((n) => {
      return n = n + 1;
    });
  }

  //Filtering
  FilterIco_Loc(){
    if (!this.filter)return "images/filter_ico_off.png"
    else return "images/filter_ico.png"
  }

  FilterOn(){
    this.productsPerPage = 6;
    this.filter = true;
    this.bufChanged();
    this.Page(this.page);
  }

  FilterOff(){
    this.productsPerPage = 9;
    this.filter = false;
    this.bufChanged();
    this.Page(this.page);
  }

}
