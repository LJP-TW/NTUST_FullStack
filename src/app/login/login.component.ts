import { CartService } from './../cart.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

interface Message {
  error: string;
  token: string;
  expires_in: number;
}

interface Response {
  status: boolean;
  message: Message;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  invalid = false;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {
  }

  ngOnInit() {
  }

  login() {
    this.invalid = false;
    this.authService.Login(this.user).subscribe((resp: Response) => {
      if (resp.status) {
        localStorage.setItem('token', resp.message.token);

        // 提早十分鐘 重新要一次 Token
        this.authService.updateTime = (resp.message.expires_in - 600) * 1000;
        this.authService.enabled = true;
        this.authService.tokenUpdater = setInterval(() => {
          if (this.authService.enabled) {
            this.authService.TokenFresh();
          }
        }, this.authService.updateTime);

        // 抓一次使用者資訊
        this.authService.GetUserInfo();

        // 抓一次使用者購物車
        this.cartService.GetFromDB();
        this.router.navigate(['/']);
      } else {
        alert('Fail');
      }
    }, (error) => {
      this.invalid = true;
      this.user.password = '';
    });
  }
}
