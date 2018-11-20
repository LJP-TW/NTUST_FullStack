import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  Login() {
    // return this.httpClient.post('http://localhost:8000/api/Login');
  }

  Register() {
    // return this.httpClient.post('http://localhost:8000/api/Register');
  }

  Logout() {
    // return this.httpClient.get('http://localhost:8000/api/Logout');
  }

  ForgetPwd() {
    // return this.httpClient.post('http://localhost:8000/api/ForgetPwd');
  }
}
