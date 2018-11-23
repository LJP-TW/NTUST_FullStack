import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.css']
})
export class ForgetPwdComponent implements OnInit {

  email: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  forgetPwd() {
    if (this.authService.ForgetPwd(this.email)) {
      console.log('ForgetPwd success');
    } else {
      console.log('ForgetPwd fail');
    }
  }

}
