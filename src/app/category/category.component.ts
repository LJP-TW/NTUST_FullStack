import { MonsterService } from './../monster.service';
import { NavService } from './../nav.service';
import { Component, OnInit, ElementRef, PACKAGE_ROOT_URL, AfterViewInit, AfterContentInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';
import { Monster } from '../monster'
import { ThrowStmt } from '@angular/compiler';
import * as $ from 'jquery'
import { CartService } from '../cart.service';
import { QueryReadType } from '@angular/core/src/render3/interfaces/query';
import { CategoryService } from '../category.service';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements AfterViewInit,AfterContentInit,OnInit,AfterContentInit {






  // tslint:disable-next-line:max-line-length
  constructor(public monsterService: MonsterService, 
              public cartService: CartService,
              private elementRef: ElementRef,
              private navService: NavService,
              public categoryService: CategoryService) {
    this.navService.currentPage = 'category';
  }

  ngOnInit() {
    if(this.categoryService.filter){
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
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentInit(): void {
    setTimeout(()=>{
       $( "#slider-range" ).slider( "values", 1,this.categoryService.priceMax );
       $( "#slider-range" ).slider( "values", 0,this.categoryService.priceMin );
       $("#amount1").val(this.categoryService.priceMin); 
       $("#amount2").val(this.categoryService.priceMax); 
      },500);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  
  // Helper Function
  MathRound(value){
    return Math.floor(value)
  }
 
  getIcon(id){
    return "assets/images/blog1.jpg";
  }

  FilterOn() {
    
    this.categoryService.FilterOn();

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
    this.categoryService.FilterOff();
  }


}
