import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {
  hover = 0;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  test() {
    console.log('Test');
  }
}
