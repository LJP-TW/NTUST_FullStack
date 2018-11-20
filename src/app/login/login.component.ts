import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  pwd: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.authService.Login(this.email, this.pwd)) {
      console.log('login success');
    } else {
      console.log('login fail');
    }
  }
}
