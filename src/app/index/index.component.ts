import { NavService } from './../nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private navService: NavService) {
    this.navService.currentPage = 'index';
  }

  ngOnInit() {
  }

}
