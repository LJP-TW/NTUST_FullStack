import { ForgetPwdPost } from './forget-pwd-post';
import { LoginPost } from './login-post';
import { RegisterPost } from './register-post';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPwdPost } from './reset-pwd-post';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router, private httpClient: HttpClient) { }

  Register(data: RegisterPost) {
    return this.httpClient.post('http://127.0.0.1:8000/api/register', data);
  }

  Login(data: LoginPost) {
    return this.httpClient.post(`${environment.api}/login`, data);
  }

  Logout() {
    return this.httpClient.get(`${environment.api}/logout?token=${localStorage.getItem('token')}`);
  }

  ForgetPwd(data: ForgetPwdPost) {
    return this.httpClient.post(`${environment.api}/forgetPwd`, data);
  }

  ResetPwd(data: ResetPwdPost) {
    return this.httpClient.post(`${environment.api}/reset`, data);
  }

  LoggedIn() {
    return !(localStorage.getItem('token') === null);
  }

  LoggedInRedirect() {
    if (!this.LoggedIn()) {
      this.route.navigate(['/login']);
      return true;
    }
    return false;
  }
}
