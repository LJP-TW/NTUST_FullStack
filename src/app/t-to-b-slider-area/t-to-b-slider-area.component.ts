import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-t-to-b-slider-area',
  templateUrl: './t-to-b-slider-area.component.html',
  styleUrls: ['./t-to-b-slider-area.component.css']
})
export class TToBSliderAreaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
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
}
