import { Component, OnInit, ElementRef } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-t-to-b-slider-area',
  templateUrl: './t-to-b-slider-area.component.html',
  styleUrls: ['./t-to-b-slider-area.component.css']
})
export class TToBSliderAreaComponent implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.slider8').bxSlider({
       mode: 'vertical',
       slideWidth: 300,
       minSlides: 3,
       slideMargin: 10
       });
      $('.slider9').bxSlider({
       mode: 'vertical',
       slideWidth: 300,
       minSlides: 3,
       slideMargin: 10
       });
      $('.slider10').bxSlider({
       mode: 'vertical',
       slideWidth: 300,
       minSlides: 3,
       slideMargin: 10
       });
     });
  }

  ngAfterViewInit() {
    const jquery = document.createElement('script');
    jquery.type = 'text/javascript';
    jquery.src = 'assets/js/jquery.bxslider.min.js';
    this.elementRef.nativeElement.appendChild(jquery);
  }
}
