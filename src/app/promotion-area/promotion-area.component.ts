import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-area',
  templateUrl: './promotion-area.component.html',
  styleUrls: ['./promotion-area.component.css']
})
export class PromotionAreaComponent implements OnInit {

  constructor(public categoryService: CategoryService) { }

  ngOnInit() {
  }

}
