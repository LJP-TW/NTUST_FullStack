import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-trending-area',
  templateUrl: './trending-area.component.html',
  styleUrls: ['./trending-area.component.css']
})
export class TrendingAreaComponent implements OnInit {

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // <script src="js/bootstrap-select.min.js"></script>
    const JQuery = document.createElement('script');
    JQuery.type = 'text/javascript';
    JQuery.src = 'assets/js/bootstrap-select.min.js';
    this.elementRef.nativeElement.appendChild(JQuery);

    // <script src="js/bootstrap.min.js"></script>
    const JQuery2 = document.createElement('script');
    JQuery2.type = 'text/javascript';
    JQuery2.src = 'assets/js/bootstrap.min.js';
    this.elementRef.nativeElement.appendChild(JQuery2);
  }
}
