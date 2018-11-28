import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

interface UserInfo {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userInfo = {
    id: null,
    name: null,
    email: null,
    email_verified_at: null,
    created_at: null
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.LoggedIn()) {
      this.router.navigate(['/']);
    }
    this.authService.getUserInfo().subscribe((data: UserInfo) => {
      this.userInfo.id = data.id;
      this.userInfo.name = data.name;
      this.userInfo.email = data.email;
      this.userInfo.email_verified_at = data.email_verified_at;
      this.userInfo.created_at = data.created_at;
    });
  }

  logout() {
    console.log('test');
    this.authService.Logout().subscribe((data) => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }

}
