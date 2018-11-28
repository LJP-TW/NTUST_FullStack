import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

interface Message {
  error: string;
  token: string;
}

interface LoginResponse {
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

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.Login(this.user).subscribe((data: LoginResponse) => {
      if (data.status) {
        localStorage.setItem('token', data.message.token);
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
