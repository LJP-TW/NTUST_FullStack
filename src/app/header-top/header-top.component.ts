import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {
  hover: number;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.hover = 0;
  }

  logout() {
    this.authService.Logout();
  }
}
