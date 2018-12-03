import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

interface Message {
  email: string;
}

interface Response {
  status: boolean;
  message: Message;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    new_password: '',
    confirm_password: '',
  };

  isConfig = {
    name: false,
    email: false,
    password: false
  };

  error = {
    name: false,
    email: false,
    password: false
  };

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.LoggedInRedirect();

    if (this.authService.userInfo.name === null) {
      this.authService.GetUserInfo();
    }
  }

  logout() {
    this.authService.Logout();
    this.router.navigate(['/auth/login']);
  }

  inConfigName() {
    this.isConfig.name = true;
    this.user.name = this.authService.userInfo.name;
  }

  outConfigName() {
    this.isConfig.name = false;

    if (this.user.name !== this.authService.userInfo.name) {
      this.authService.ConfigName(this.user.name).subscribe((resp: Response) => {
        if (resp.status) {
          this.error.name = false;
          this.authService.GetUserInfo();
        } else {
          console.log('Config Name Fail');
          this.error.name = true;
        }
      }, (error) => {
        console.log(error);
        this.error.name = true;
      });
    }
  }

  inConfigEmail() {
    this.isConfig.email = true;
    this.user.email = this.authService.userInfo.email;
  }

  outConfigEmail() {
    this.isConfig.email = false;

    if (this.user.email !== this.authService.userInfo.email) {
      this.authService.ConfigEmail(this.user.email).subscribe((resp: Response) => {
        if (resp.status) {
          this.error.email = false;
          this.authService.GetUserInfo();
        } else {
          console.log('Config Email Fail');
          console.log(resp);
          this.error.email = true;
        }
      }, (error) => {
        console.log(error);
        this.error.email = true;
      });
    }
  }

  inConfigPassword() {
    this.isConfig.password = true;
  }

  outConfigPassword() {
    this.isConfig.password = false;
    if (this.user.password !== this.user.new_password) {
      this.authService.ConfigPwd(this.user.password, this.user.new_password, this.user.confirm_password).subscribe((resp: Response) => {
        if (resp.status) {
          this.error.password = false;
          this.authService.GetUserInfo();
        } else {
          console.log('Config Password Fail');
          console.log(resp);
          this.error.password = true;
        }
      }, (error) => {
        console.log(error);
        this.error.password = true;
      });
    }
  }
}
