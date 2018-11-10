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

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    // <script src="assets/js/rs-plugin/rs.home.js"></script>
    const sliderAffect = document.createElement('script');
    sliderAffect.type = 'text/javascript';
    sliderAffect.src = 'assets/js/rs-plugin/rs.home.js';
    this.elementRef.nativeElement.appendChild(sliderAffect);
  }
}
