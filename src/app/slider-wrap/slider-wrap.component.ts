import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slider-wrap',
  templateUrl: './slider-wrap.component.html',
  styleUrls: ['./slider-wrap.component.css']
})
export class SliderWrapComponent implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const jquery1 = document.createElement('script');
    jquery1.type = 'text/javascript';
    jquery1.src = 'assets/js/rs-plugin/js/jquery.themepunch.plugins.min.js';
    this.elementRef.nativeElement.appendChild(jquery1);

    const jquery2 = document.createElement('script');
    jquery2.type = 'text/javascript';
    jquery2.src = 'assets/js/rs-plugin/js/jquery.themepunch.revolution.min.js';
    this.elementRef.nativeElement.appendChild(jquery2);

    const jquery3 = document.createElement('script');
    jquery3.type = 'text/javascript';
    jquery3.src = 'assets/js/rs-plugin/rs.home.js';
    this.elementRef.nativeElement.appendChild(jquery3);
  }
}
