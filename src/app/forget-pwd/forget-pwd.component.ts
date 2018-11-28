import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

interface Message {
  URL: string;
  User: string;
}

interface ForgetPwdResponse {
  status: boolean;
  message: Message;
}

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.css']
})

export class ForgetPwdComponent implements OnInit {

  user = {
    name: '',
    email: '',
  };

  invalid = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  forgetPwd() {
    this.invalid = false;
    this.authService.ForgetPwd(this.user).subscribe((data: ForgetPwdResponse) => {
      if (data.status) {
        alert(data.message.URL);
      } else {
        alert('Fail');
      }
    }, (error) => {
      this.invalid = true;
      this.user.name = '';
    });
  }

}
