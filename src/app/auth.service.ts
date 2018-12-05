import { ForgetPwdPost } from './forget-pwd-post';
import { LoginPost } from './login-post';
import { RegisterPost } from './register-post';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPwdPost } from './reset-pwd-post';

interface Message {
  error: string;
  token: string;
  expires_in: number;
}

interface Response {
  status: boolean;
  message: Message;
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // token 更新 timer
  tokenUpdater;
  tokenUpdateTime = 1; // 單位毫秒
  tokenRefreshEnabled = false;

  // User 資料
  userInfo = {
    id: null,
    name: null,
    email: null,
    email_verified_at: null,
    created_at: null
  };

  constructor(private router: Router, private httpClient: HttpClient) {
    if (this.LoggedIn()) {
      console.log('重新整理');
      this.setTokenUpdater();
      this.GetUserInfo();
    }
  }

  Register(data: RegisterPost) {
    return this.httpClient.post('http://127.0.0.1:8000/api/register', data);
  }

  Login(data: LoginPost) {
    // Initial
    this.tokenRefreshEnabled = false;

    return this.httpClient.post(`${environment.api}/login`, data);
  }

  Logout() {
    this.tokenRefreshEnabled = false;
    this.userInfo.id = null;
    this.userInfo.name = null;
    this.userInfo.email = null;
    this.userInfo.email_verified_at = null;
    this.userInfo.created_at = null;

    this.httpClient.get(`${environment.api}/logout?token=${localStorage.getItem('token')}`).subscribe((data) => {
    });

    localStorage.removeItem('token');
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
      this.router.navigate(['/auth/login']);
      return true;
    }
    return false;
  }

  GetUserInfo() {
    this.httpClient.get(`${environment.api}/user?token=${localStorage.getItem('token')}`).subscribe((data: UserInfo) => {
      this.userInfo.id = data.id;
      this.userInfo.name = data.name;
      this.userInfo.email = data.email;
      this.userInfo.email_verified_at = data.email_verified_at;
      this.userInfo.created_at = data.created_at;
    });
  }

  TokenFresh() {
    this.httpClient.get(`${environment.api}/refresh?token=${localStorage.getItem('token')}`).subscribe((resp: Response) => {
      if (resp.status) {
        console.log('Token Fresh Success');
        localStorage.setItem('token', resp.message.token);

        // 提早十分鐘 重新要一次 Token
        this.tokenUpdateTime = (resp.message.expires_in - 600) * 1000;
        this.setTokenUpdater();
      }
    }, (error: HttpErrorResponse) => {
      console.log('Token Fresh Fail');
      console.log(error);
      this.Logout();
    });
  }

  setTokenUpdater() {
    console.log('設定 Updater');
    this.tokenRefreshEnabled = true;
    this.tokenUpdater = setTimeout(() => {
      if (this.tokenRefreshEnabled) {
        console.log('執行 TokenFresh');
        this.TokenFresh();
      }
    }, this.tokenUpdateTime);
  }

  ConfigName(name) {
    const post = {
      token: localStorage.getItem('token'),
      name: name,
      email: this.userInfo.email
    };

    return this.httpClient.post(`${environment.api}/config`, post);
  }

  ConfigEmail(email) {
    const post = {
      token: localStorage.getItem('token'),
      name: this.userInfo.name,
      email: email
    };

    return this.httpClient.post(`${environment.api}/config`, post);
  }

  ConfigPwd(password, new_password, confirm_password): Response|any {
    const post = {
      token: localStorage.getItem('token'),
      name: this.userInfo.name,
      email: this.userInfo.email,
      password: password,
      new_password: new_password,
      confirm_password: confirm_password
    };

    return this.httpClient.post(`${environment.api}/config`, post);
  }
}
