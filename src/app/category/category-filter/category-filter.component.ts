import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  categories = '';
  priceMin = 520;
  color = 'black';
  size = 'm';
  brands = '';

  constructor() {
  }

  ngOnInit() {
  }

  test() {
    console.log(this.categories);
    console.log(this.priceMin);
    console.log(this.color);
    console.log(this.size);
    console.log(this.brands);
  }
}
