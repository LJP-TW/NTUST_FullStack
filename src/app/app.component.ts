import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project01';

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const jquery1 = document.createElement('script');
    jquery1.type = 'text/javascript';
    jquery1.src = 'assets/js/jquery.min.js';
    this.elementRef.nativeElement.appendChild(jquery1);

    const jquery2 = document.createElement('script');
    jquery2.type = 'text/javascript';
    jquery2.src = 'assets/js/jquery-ui.js';
    this.elementRef.nativeElement.appendChild(jquery2);

    // const jquery3 = document.createElement('script');
    // jquery3.type = 'text/javascript';
    // jquery3.src = 'assets/js/custom1.js';
    // this.elementRef.nativeElement.appendChild(jquery3);

    const jquery4 = document.createElement('script');
    jquery4.type = 'text/javascript';
    jquery4.src = 'assets/js/owl.carousel.min.js';
    this.elementRef.nativeElement.appendChild(jquery4);

    const jquery5 = document.createElement('script');
    jquery5.type = 'text/javascript';
    jquery5.src = 'assets/js/lightbox.min.js';
    this.elementRef.nativeElement.appendChild(jquery5);

    const jquery6 = document.createElement('script');
    jquery6.type = 'text/javascript';
    jquery6.src = 'assets/js/jquery.elevatezoom.js';
    this.elementRef.nativeElement.appendChild(jquery6);

    const jquery7 = document.createElement('script');
    jquery7.type = 'text/javascript';
    jquery7.src = 'assets/js/jquery.bxslider.min.js';
    this.elementRef.nativeElement.appendChild(jquery7);

    const jquery8 = document.createElement('script');
    jquery8.type = 'text/javascript';
    jquery8.src = 'assets/js/custom2.js';
    this.elementRef.nativeElement.appendChild(jquery8);

    const jquery9 = document.createElement('script');
    jquery9.type = 'text/javascript';
    jquery9.src = 'assets/js/bootstrap-select.min.js';
    this.elementRef.nativeElement.appendChild(jquery9);

    const jquery10 = document.createElement('script');
    jquery10.type = 'text/javascript';
    jquery10.src = 'assets/js/rs-plugin/js/jquery.themepunch.plugins.min.js';
    this.elementRef.nativeElement.appendChild(jquery10);

    const jquery11 = document.createElement('script');
    jquery11.type = 'text/javascript';
    jquery11.src = 'assets/js/rs-plugin/js/jquery.themepunch.revolution.min.js';
    this.elementRef.nativeElement.appendChild(jquery11);

    const jquery12 = document.createElement('script');
    jquery12.type = 'text/javascript';
    jquery12.src = 'assets/js/rs-plugin/rs.home.js';
    this.elementRef.nativeElement.appendChild(jquery12);

    const jquery13 = document.createElement('script');
    jquery13.type = 'text/javascript';
    jquery13.src = 'assets/js/bootstrap.min.js';
    this.elementRef.nativeElement.appendChild(jquery13);

    const jquery14 = document.createElement('script');
    jquery14.type = 'text/javascript';
    jquery14.src = 'assets/js/main.js';
    this.elementRef.nativeElement.appendChild(jquery14);
  }
}
