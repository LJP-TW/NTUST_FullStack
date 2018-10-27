import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slider-wrap',
  templateUrl: './slider-wrap.component.html',
  styleUrls: ['./slider-wrap.component.css']
})
export class SliderWrapComponent implements OnInit {

  constructor(public elementRef: ElementRef) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // <script src="js/rs-plugin/js/jquery.themepunch.plugins.min.js"></script>
    const sliderAffect1 = document.createElement('script');
    sliderAffect1.type = 'text/javascript';
    sliderAffect1.src = 'assets/js/rs-plugin/js/jquery.themepunch.plugins.min.js';
    this.elementRef.nativeElement.appendChild(sliderAffect1);

    // <script src="js/rs-plugin/js/jquery.themepunch.revolution.min.js"></script>
    const sliderAffect2 = document.createElement('script');
    sliderAffect2.type = 'text/javascript';
    sliderAffect2.src = 'assets/js/rs-plugin/js/jquery.themepunch.revolution.min.js';
    this.elementRef.nativeElement.appendChild(sliderAffect2);

    // <script src="js/rs-plugin/rs.home.js"></script>
    const sliderAffect3 = document.createElement('script');
    sliderAffect3.type = 'text/javascript';
    sliderAffect3.src = 'assets/js/rs-plugin/rs.home.js';
    this.elementRef.nativeElement.appendChild(sliderAffect3);
  }
}
