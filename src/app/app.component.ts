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
}
