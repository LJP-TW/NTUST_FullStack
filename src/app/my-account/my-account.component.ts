import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    if (!authService.LoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  logout() {
    this.authService.Logout().subscribe((data) => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }

}
