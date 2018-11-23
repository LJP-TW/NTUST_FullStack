import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  Login(email: string, pwd: string) {
    // return this.httpClient.post('http://localhost:8000/api/Login');
    console.log(email);
    console.log(pwd);
    return true;
  }

  Register(name: string, pwd: string, email: string) {
    // return this.httpClient.post('http://localhost:8000/api/Register');
    console.log(name);
    console.log(pwd);
    console.log(email);
    console.log('register');
    return true;
  }

  Logout() {
    // return this.httpClient.get('http://localhost:8000/api/Logout');
  }

  ForgetPwd(email: string) {
    // return this.httpClient.post('http://localhost:8000/api/ForgetPwd');
    return true;
  }
}
