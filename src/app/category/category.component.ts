import { MonsterService } from './../monster.service';
import { NavService } from './../nav.service';
import { Component, OnInit, ElementRef, PACKAGE_ROOT_URL, AfterViewInit, AfterContentInit,SimpleChanges,OnChanges } from '@angular/core';
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
export class CategoryComponent implements AfterViewInit,AfterContentInit,OnInit,AfterContentInit,OnChanges {

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
     this.FilterOnJS();
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {

    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class

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
  }

  FilterOff() {
    this.categoryService.FilterOff();
  }

  FilterOnJS(){
    setTimeout( ()=>{
    //Collapse Bars
    $('.collapse').on('shown.bs.collapse',
    function(){
			$(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
			}).on('hidden.bs.collapse', function(){
			$(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
    });
    // $('#collapseOne').collapse('show');
		// $('#collapseTwo').collapse('show')
		// $('#collapseThree').collapse('show')
		// $('#collapseFour').collapse('show')
		// $('#collapseFive').collapse('show')

    //slider
    $("#slider-range" ).slider({
      range: true,
      min: 0,
      max: 50000,
      values: [ 0, 0],
      slide: function( event, ui ) {
        $( "#amount1" ).val(ui.values[ 0 ]);
        $( "#amount2" ).val(ui.values[ 1 ]);
      }
      });
    $( "#slider-range" ).slider( "values", 1,this.categoryService.priceMax );
    $( "#slider-range" ).slider( "values", 0,this.categoryService.priceMin );
    $( "#amount1" ).val( $( "#slider-range" ).slider( "values", 0 ));
    $( "#amount2" ).val( $( "#slider-range" ).slider( "values", 1 ));
    }
    ,100);
  }

  ToggleFilter(){
    if(!this.categoryService.filter){
      this.FilterOnJS();
    }
  }
}
